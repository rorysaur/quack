# Quack

A humble but ambitious clone of Slack, the chat app, using React, Flux, and eventually Firebase.

## Installation

`git clone https://github.com/rorysaur/quack.git`

`npm install`

## Dependencies

Will be explained in detail.

## Dev workflow

In one terminal pane, navigate to the project root and run `npm start`. This runs the `start` script specified in the `package.json`, which watches for any changes in the `js/` directory, transpiles JSX to JavaScript, and concatenates everything into `js/bundle.js`.

In another terminal pane, navigate to the project root and boot up a server for `index.html`. I use `python -m SimpleHTTPServer`, then visit `localhost:8000` in my browser.

You should be able to save changes to the `js/` directory, then refresh in the browser to see the changes.

### Testing
Run tests with `npm test`.
Tests go in a __tests__ directory in the folder of the module being tested and are suffixed with _test.
See [here](http://facebook.github.io/react/blog/2014/09/24/testing-flux-applications.html) for a good explanation of testing Flux with Jest.

## Contributing

If you are a collaborator, branch from `master` and create a pull request for each feature. Merge `master` when necessary.

We'll use the Issues section for task tracking. Assign an issue to yourself as soon as you start working on it, so that others know to not work on the same feature.

If you are not a collaborator, fork this repo, create a feature branch, and submit a pull request from your fork.
