defmodule Quack.RoomUsers do
  @name __MODULE__
  def start_link do
    Agent.start_link(fn -> HashDict.new end, name: @name)
  end

  def add_room(roomname) do
    Agent.update(@name, &HashDict.put_new(&1, roomname, HashSet.new))
  end

  def get_room(roomname) do
    {:ok, room} = Agent.get(@name, &HashDict.fetch(&1, roomname))
    HashSet.to_list(room)
  end

  def drop_room(roomname) do
    Agent.update(@name, &HashDict.delete(&1, roomname))
  end

  def add_user(roomname, user) do
    Agent.update(@name, fn(rooms) ->
      Dict.update!(rooms, roomname, fn(room) ->
        HashSet.put(room, user)
      end)
    end)
  end

  def remove_user(roomname, user) do
    Agent.update(@name, fn(rooms) ->
      Dict.update!(rooms, roomname, &HashSet.delete(&1, user))
    end)
  end
end
