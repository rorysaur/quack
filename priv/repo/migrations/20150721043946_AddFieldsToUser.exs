defmodule Quack.Repo.Migrations.AddFieldsToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :email, :string
      add :password_encrypted, :string
    end
  end
end
