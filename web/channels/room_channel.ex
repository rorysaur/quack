defmodule Quack.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("rooms:" <> room_name, payload, socket) do
    payload = atomize_keys(payload)
    if authorized?(payload) do
      unless Quack.Repo.get_by(Quack.Room, name: room_name) do
        Quack.Repo.insert! %Quack.Room{name: room_name}
      end
      Quack.RoomActivityService.register(room: room_name, user: payload.user.name, pid: socket.channel_pid)
      send(self, %{event: "user:joined", new_user: payload.user.name})
      {:ok, Quack.RoomUsers.get_room(room_name), socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info(%{event: "user:joined" = event, new_user: user}, socket) do
    "rooms:" <> room_name = socket.topic
    broadcast! socket, event, %{users: Quack.RoomUsers.get_room(room_name), new_user: user}
    broadcast! socket, "new:msg", Quack.OperatorMessage.new("#{user} has joined")
    {:noreply, socket}
  end

  def handle_in("new:msg" = event, payload, socket) do
    Quack.Repo.insert! %Quack.Message{body: payload["text"]}
    broadcast! socket, event, payload
    {:noreply, socket}
  end

  def handle_in("nick:change" = event, payload, socket) do
    payload = atomize_keys(payload)
    "rooms:" <> room_name = socket.topic
    Quack.RoomActivityService.unregister(room: room_name, pid: socket.channel_pid)
    Quack.RoomActivityService.register(room: room_name, user: payload.newName, pid: socket.channel_pid)
    broadcast! socket, event, %{users: Quack.RoomUsers.get_room(room_name)}
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  def terminate(error, socket) do
    "rooms:" <> room_name = socket.topic
    {:ok, user} = Quack.RoomActivityService.unregister(room: room_name, pid: socket.channel_pid)
    broadcast! socket, "user:left", %{users: Quack.RoomUsers.get_room(room_name), leaving_user: user}
    broadcast! socket, "new:msg", Quack.OperatorMessage.new("#{user} has left")
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end

  defp atomize_keys(struct) do
    Enum.reduce(struct, %{}, fn({k, v}, map) ->
      val = if is_map(v), do: atomize_keys(v), else: v
      Map.put(map, String.to_atom(k), val)
    end)
  end
end
