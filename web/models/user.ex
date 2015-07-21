defmodule Quack.User do
  use Quack.Web, :model

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_encrypted, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true
    has_many :messages, Message

    timestamps
  end

  @required_fields ~w(email name password password_confirmation)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If `params` are nil, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_unique(:email, on: Quack.Repo, downcase: true)
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, message: "passwords do not match")
  end
end
