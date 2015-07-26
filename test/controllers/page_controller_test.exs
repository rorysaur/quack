defmodule Quack.PageControllerTest do
  use Quack.ConnCase

  test "GET /" do
    conn = get conn(), "/"
    assert html_response(conn, 200) =~ "Quack"
  end
end
