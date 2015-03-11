# Quack

A humble but ambitious clone of Slack, the chat app, using React, Flux, and eventually Firebase.

## Installation

`git clone https://github.com/rorysaur/quack.git`

`npm install`

## Dependencies

Will be explained in detail.

## Dev workflow

In one terminal pane, navigate to the project root and run `npm start`. This runs the `start` script specified in the `package.json`, which calls `watchify` to watch for any changes in the `js/` directory, and re-run `browserify` which transpiles JSX to JavaScript and concatenates everything into `js/bundle.js`.

In another terminal pane, navigate to the project root and boot up a server for `index.html`. I use `python -m SimpleHTTPServer`, then visit `localhost:8000` in my browser.

You should be able to save changes to the `js/` directory, then refresh in the browser to see the changes.
