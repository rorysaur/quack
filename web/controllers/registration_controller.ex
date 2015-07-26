defmodule Quack.RegistrationController do
  use Quack.Web, :controller

  alias Quack.Password

  plug :scrub_params, "user" when action in [:create]

  def create(conn, params) do
    changeset = User.changeset(%User{}, params["user"])

    if changeset.valid? do
      new_user = Password.encrypt_password_and_save_user(changeset)

      conn
        |> put_flash(:info, "Successfully registered and logged in")
        |> put_session(:current_user, new_user)
        |> redirect(to: page_path(conn, :index))
    else
      # render json error
      json conn, %{error: "WHOOPS!"}
    end
  end
end
