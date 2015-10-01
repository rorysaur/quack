defmodule Quack.PageController do
  use Quack.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
