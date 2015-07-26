defmodule Quack.Password do
  alias Quack.Repo
  import Ecto.Changeset, only: [put_change: 3]
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]

  @doc """
  Encrypts password in the user changeset and stores it to the changeset as `encrypted_password`.
  """
  def encrypt_password(changeset) do
    put_change(changeset, :encrypted_password, hashpwsalt(changeset.params["password"]))
  end

  @doc """
  Encrypts password in the user changeset and stores it to the database.
  """
  def encrypt_password_and_save_user(changeset) do
    changeset
      |> encrypt_password
      |> Repo.insert
  end
end
