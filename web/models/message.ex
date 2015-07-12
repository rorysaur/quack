defmodule Quack.Message do
  use Ecto.Model
  
  schema "messages" do
    field :body, :string
    belongs_to :sender, User
    belongs_to :room, Room

    timestamps
  end

  @required_fields ~w(field sender_id)
  @optional_fields ~w()
  
  @doc """
  Creates a changeset based on the `model` and `params`.

  If `params` are nil, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
