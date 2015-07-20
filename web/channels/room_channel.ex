defmodule Quack.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("rooms:" <> room_name, payload, socket) do
    payload = atomize_keys(payload)
    if authorized?(payload) do
      unless Quack.Repo.get_by(Quack.Room, name: room_name) do
        Quack.Repo.insert! %Quack.Room{name: room_name}
      end
      Quack.RoomUsers.add_room(room_name)
      Quack.RoomUsers.add_user(room_name, payload.user.name)
      send(self, "user:joined")
      {:ok, Quack.RoomUsers.get_room(room_name), socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info("user:joined", socket) do
    "rooms:" <> room_name = socket.topic
    broadcast! socket, "join:notification", %{users: Quack.RoomUsers.get_room(room_name)}
    {:noreply, socket}
  end

  def handle_in("new:msg", payload, socket) do
    Quack.Repo.insert! %Quack.Message{body: payload["text"]}
    broadcast! socket, "new:msg", payload
    {:noreply, socket}
  end

  def handle_in("nick:change", payload, socket) do
    payload = atomize_keys(payload)
    "rooms:" <> room_name = socket.topic
    Quack.RoomUsers.remove_user(room_name, payload.oldName)
    Quack.RoomUsers.add_user(room_name, payload.newName)
    broadcast! socket, "nick:changed", %{users: Quack.RoomUsers.get_room(room_name)}
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
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
