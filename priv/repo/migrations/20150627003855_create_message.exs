defmodule Quack.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :body, :string
      add :sender_id, :integer

      timestamps
    end
  end
end
