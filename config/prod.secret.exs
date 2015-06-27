use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :quack, Quack.Endpoint,
  secret_key_base: "eCeyrDv1Z/VbR26DDr+hOegCTWHwLRHb6Pwd+yJCl/FTm+7MTeo4sDqhmmLh70s9"

# Configure your database
config :quack, Quack.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "quack_prod",
  size: 20 # The amount of database connections in the pool
