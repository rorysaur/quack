defmodule Quack.OperatorMessage do
  import :os
  @moduledoc """
  Module for generating messages on the server
  """

  @doc """
  Takes raw text and returns a map with the text, timestamp and clientId
  :os.timestamp() returns a tupl with megaseconds, seconds and microseconds.
  """
  def new(text) do
    {mega, sec, micro} = :os.timestamp()
    microseconds = (mega * 1_000_000 + sec) * 1_000_000 + micro
    uuid = Ecto.UUID.generate
    %{text: text, timestamp: div(microseconds, 1000), clientId: uuid}
  end
end
