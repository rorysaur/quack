defmodule Quack.Router do
  use Quack.Web, :router

  socket "/ws", Quack do
    channel "rooms:*", RoomChannel
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Quack do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Quack do
    pipe_through :api

    post "/register", RegistrationController, :create
  end
end
