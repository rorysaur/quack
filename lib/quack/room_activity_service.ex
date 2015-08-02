defmodule Quack.RoomActivityService do
  def register(room: room, user: user, pid: pid) do
    Quack.RoomUsers.add_room(room)
    Quack.RoomUsers.add_user(room, user)
    Quack.ClientPids.add_user(pid, user)
  end

  def unregister(room: room, pid: pid) do
    {:ok, user} = Quack.ClientPids.pop_user(pid)
    Quack.RoomUsers.remove_user(room, user)
    {:ok, user}
  end

  def flush_all do
    Quack.RoomUsers.flush
    Quack.ClientPids.flush
  end
end
