defmodule Quack.ClientPids do
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

  def pop_user(pid) do
    {:ok, user} = get_user(pid)
    drop_user(pid)
    {:ok, user}
  end
end
