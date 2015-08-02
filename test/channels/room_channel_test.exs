defmodule Quack.RoomChannelTest do
  use Quack.ChannelCase
  require AliasMany
  AliasMany.alias [RoomChannel, Room, RoomActivityService, OperatorMessage, RoomUsers, Message], from: Quack

  setup do
    {:ok, _, socket} = subscribe_and_join(RoomChannel, "rooms:lobby", %{"user" => %{"name" => "guest"}})
    on_exit fn ->
      RoomActivityService.flush_all
    end
    {:ok, socket: socket}
  end

  test "room is created on join", %{socket: _socket} do
    assert Repo.insert! %Room{name: "lobby"}
  end

  test "user is registered on join", %{socket: socket} do
    assert RoomActivityService.register(room: "lobby", user: "guest", pid: socket.channel_pid)
  end

  test "channel is notified of join", %{socket: _socket} do
    assert_broadcast("user:joined", %{new_user: "guest"})
  end

  test "messages get broadcasted", %{socket: socket} do
    push socket, "msg:new", %{"text" => "Hi"}
    assert_broadcast "msg:new", %{"text" => "Hi"}
  end

  test "messages get persisted to the db", %{socket: socket} do
    ref = push socket, "msg:new", %{"text" => "Hi"}
    assert_reply ref, :ok
    assert Repo.insert! %Message{body: "Hi"}
  end

  test "when a user changes their nick the room is alerted to the names currently in the channel", %{socket: socket} do
    new_nick = "Jessica"
    push socket, "user:nickchange", %{"newName" => new_nick}
    assert_broadcast "user:nickchange", %{users: [^new_nick]}
  end

  test "when a user changes their nick an announcement is sent to the channel", %{socket: socket} do
    new_nick = "Roger"
    ref = push socket, "user:nickchange", %{"newName" => new_nick}
    assert_reply ref, :ok
    announcement = "guest is now known as #{new_nick}"
    assert OperatorMessage.new(announcement)
    assert_broadcast "msg:new", %{text: ^announcement}
  end

  test "a user changing their nick registers the new nick and unregisters the old one", %{socket: socket} do
    new_nick = "Jessica"
    ref = push socket, "user:nickchange", %{"newName" => new_nick}
    assert_reply ref, :ok
    assert RoomActivityService.unregister(room: "lobby", pid: socket.channel_pid)
    assert RoomActivityService.register(room: "lobby", user: new_nick, pid: socket.channel_pid)
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"some" => "data"}
    assert_push "broadcast", %{"some" => "data"}
  end

  test "user:left is broadcast when someone leaves", %{socket: socket} do
    Process.unlink(socket.channel_pid)
    :ok = close(socket)
    assert RoomUsers.get_room("lobby")
    assert_broadcast "user:left", %{users: [], leaving_user: "guest"}
  end

  test "the channel is told about a user leaving via a server message", %{socket: socket} do
    Process.unlink(socket.channel_pid)
    :ok = close(socket)
    announcement = "guest has left"
    assert OperatorMessage.new(announcement)
    assert_broadcast "msg:new", %{text: ^announcement}
  end
end
