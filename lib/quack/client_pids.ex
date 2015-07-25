defmodule Quack.ClientPids do
  @moduledoc """
  Agent that stores a hash of channel pids and the nick belonging to that channel id. We can store more about the user in the future.
  """
  @name __MODULE__
  def start_link do
    Agent.start_link(fn -> HashDict.new end, name: @name)
  end

  def add_user(pid, user) do
    Agent.update(@name, &HashDict.put_new(&1, pid, user))
  end

  def get_user(pid) do
    Agent.get(@name, &HashDict.fetch(&1, pid))
  end

  def drop_user(pid) do
    Agent.update(@name, &HashDict.delete(&1, pid))
  end

  @doc """
  Fetches user for pid. Returns the user while droping it from storage.
  """
  def pop_user(pid) do
    {:ok, user} = get_user(pid)
    drop_user(pid)
    {:ok, user}
  end
end
