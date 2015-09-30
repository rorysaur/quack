# Quack

A humble but ambitious clone of Slack, the chat app, using React, Flux, Elixir and Phoenix.

## Installation (MacOSX)

`brew install elixir`

`brew install postgresql`

ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

postgres -D /usr/local/var/postgres

createuser quackuser -d

`git clone https://github.com/rorysaur/quack.git`

`mix deps.get`

`mix deps.compile`

`mix ecto.create`

`mix ecto.migrate`

`npm install`

`mix phoenix.server`

Quack will be at localhost:4000.

## Dependencies

#### bourbon

Some sort of Sass mixin library we may use more of in the future.

[thoughtbot/bourbon](http://bourbon.io/)

#### bourbon-neat

Sass grid framework.

[thoughtbot/neat](http://neat.bourbon.io/)

#### flux

Unidirectional data flow.
We use Facebook's notorious library only for the Dispatcher.

[facebook/flux](https://facebook.github.io/flux/)

#### object-assign

An polyfill/ponyfill for ES6's [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
I guess it's like Underscore's `extend`. We'll probably remove this library when we move to ES6.

[sindresorhus/object-assign](https://github.com/sindresorhus/object-assign)

#### react

A JavaScript library for building user interfaces.

[facebook/react](https://facebook.github.io/react/)

#### react-router

A routing library for React.

[rackt/react-router](https://github.com/rackt/react-router) 

#### webpack

Lets you load dependencies with npm's `require()` and `module.exports` system, but on the client side.
Concatenates everything into `priv/static/js/bundle.js`.

[webpack/webpack](https://github.com/webpack/webpack)

#### jest-cli

A unit testing framework we figure will be friendly with Flux and React, seeing as it's also made by Facebook. It's a simple wrapper for [Jasmine](http://jasmine.github.io/) which changes the `require` function to auto-mock *everything*. This forces you to specify exactly what you're testing with `jest.dontMock()` and is great for enforcing modular code and one-way data flow. It will be super obvious your God-object is deeply intertwined with the entire app because you'll have 10 lines of boilerplate telling jest to not mock things.

[facebook/jest](https://facebook.github.io/jest/)

#### jsx-loader

A webpack loarder (a step that can be added to the webpack concatenation process) that transpiles JSX to JavaScript.

[petehunt/jsx-loader](https://github.com/petehunt/jsx-loader)

#### sass-loader, css-loader, style-loader

Compiles all your SCSS/Sass and lets you `require` and apply it to your document.
[jtangelder/sass-loader](https://github.com/jtangelder/sass-loader)

### Testing
#### Front End
Run front-end tests with `npm test`.
Tests go in a `__tests__` directory in the folder of the module being tested and are suffixed with `_test`.
See [here](http://facebook.github.io/react/blog/2014/09/24/testing-flux-applications.html) for a good explanation of testing Flux with Jest.

#### Back End
`mix test`

### Other Tools
+ [React dev tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) for Chrome.

## Contributing

If you are a collaborator, branch from `master` and create a pull request for each feature. Merge `master` when necessary.

We'll use the Issues section for task tracking. Assign an issue to yourself as soon as you start working on it, so that others know to not work on the same feature.

If you are not a collaborator, fork this repo, create a feature branch, and submit a pull request from your fork.
