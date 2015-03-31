# Quack

A humble but ambitious clone of Slack, the chat app, using React, Flux, and Firebase.

## Installation

`git clone https://github.com/rorysaur/quack.git`

`npm install`

## Dependencies

#### bourbon

Some sort of Sass mixin library we may use more of in the future.

[thoughtbot/bourbon](http://bourbon.io/)

#### bourbon-neat

Sass grid framework.

[thoughtbot/neat](http://neat.bourbon.io/)

#### firebase

We use Firebase's generic web client; we don't use ReactFire because it would not help us learn Flux, but also because it would make our codebase less backend-agnostic.

[firebase](https://www.firebase.com/docs/web/)

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

#### browserify

Lets you load dependencies with npm's `require()` and `module.exports` system, but on the client side.
Concatenates everything into `js/bundle.js`.

[substack/node-browserify](https://github.com/substack/node-browserify)

#### browserify-shim

Lets you use browserify to require libraries that aren't CommonJS-compatible (in other words, they attach themselves to the `window` object as a global variable, rather than yielding an `exports` object).

[thlorenz/browserify-shim](https://github.com/thlorenz/browserify-shim)

#### jest-cli

A unit testing framework we figure will be friendly with Flux and React, seeing as it's also made by Facebook. It's a simple wrapper for [Jasmine](http://jasmine.github.io/) which changes the `require` function to auto-mock *everything*. This forces you to specify exactly what you're testing with `jest.dontMock()` and is great for enforcing modular code and one-way data flow. It will be super obvious your God-object is deeply intertwined with the entire app because you'll have 10 lines of boilerplate telling jest to not mock things.

[facebook/jest](https://facebook.github.io/jest/)

#### reactify

A browserify transform (a step that can be added to the browserify concatenation process) that transpiles JSX to JavaScript.

[andreypopp/reactify](https://github.com/andreypopp/reactify)

#### sassify

Compiles all your SCSS/Sass and lets you `require` and browserify it as JavaScript.
We've turned on the auto-inject feature so when you require a scss file sassify will append a link to the compiled stylesheet to document head.
[Like so](https://github.com/davidguttman/cssify/blob/master/browser.js#L28).
[davidguttman/sassify](https://github.com/davidguttman/sassify)

#### watchify

Watch mode for browserify: it runs browserify and rebuilds `bundle.js` every time you save changes to a file in the watched project.

[substack/watchify](https://github.com/substack/watchify)


## Firebase

Firebase is a real-time backend platform thing that opens a WebSockets connection with each client.
It stores data as JSON objects and its client library provides methods to write, read, and listen for changes to the data.

Firebase has a dashboard/UI for looking at and managing the app's data. Collaborators will be given access to the Quack account.

### Some terms

+ A `ref` is a reference to a node in the tree of the app's Firebase data.
The highest-level ref you can point to (the root node) is denoted by the project name, "quack", in the Firebase dashboard.
Setting a key on this ref adds a child to it.
In our codebase, we get a ref for the root level, then derive any needed child refs from the root.
A value found at `quack --> messages --> bestcohort` would be referred to thus:
`var messagesRef = FirebaseRef.child('messages/bestcohort')`, where `/` indicates nesting.
+ A `snapshot` is the form in which Firebase sends data. It has [its own little API](https://www.firebase.com/docs/web/api/datasnapshot/), but we mainly use `val()`, to get the POJO.

### Some Firebase methods we use

#### For saving data

+ [set()](https://www.firebase.com/docs/web/api/firebase/set.html): Sets a key/value pair.
+ [push()](https://www.firebase.com/docs/web/api/firebase/push.html): Adds an item to a list. Note that Firebase does not use true lists or arrays, because indices are not reliable when you have multiple clients manipulating data simultaneously. Instead, think of `push` as `set` but, instead of providing a key, you let Firebase generate one that is unique and based on the current time. We use a `toArray` utility function that translates Firebase objects to JavaScript arrays when retrieving data.

#### For retrieving data

+ [on()](https://www.firebase.com/docs/web/api/query/on.html): Listens for a Firebase event (something changed, added, removed, etc.), for a given ref and its children, and fires a callback.
+ [off()](https://www.firebase.com/docs/web/api/query/off.html): Stops listening for a Firebase event.
+ [once()](https://www.firebase.com/docs/web/api/query/once.html): Fetches a snapshot for a given ref, and fires a callback, just once and doesn't listen for further changes.

### Our "schema"

Below is some example Firebase data to show our planned schema (which is a work in progress). It uses ideas and recommendations from [Firebase docs](https://www.firebase.com/docs/web/guide/structuring-data.html).

The gibberish keys are unique ids, which Firebase automatically generates if you use `push` instead of `set` (i.e., if you don't provide your own key).

channels-messages are associated by the messages being categorized/bucketed by channel.
users-channels is the two-way relationship discussed in the link above.
users-messages are associated by each message having a reference to the user id.

```
users: {
  rorysaur: {
    name: "rory", // this the display name and can be changed with /nick
    channels: {
      bestcohort: true // this is an "index" as recommended by firebase docs
    }
  },
  jacknoble: {
    name: "jack",
    channels: {
      bestcohort: true
    }
  }
},

channels: {
  bestcohort: {
    users: {
      wkejfak: "rorysaur", // rory's unique id
      iasudsd: "jacknoble", // jack's unique id
    }
  }
},

messages: {
  bestcohort: {
    qeouqdfue: {
      timestamp: 123456789,
      text: "hi",
      user: "rorysaur"
    }
  }
}
```

## Dev workflow

In one terminal pane, navigate to the project root and run `npm start`. This runs the `start` script specified in the `package.json`, which watches for any changes in the `js/` directory, transpiles JSX to JavaScript, and concatenates everything into `js/bundle.js`.

In another terminal pane, navigate to the project root and boot up a server for `index.html`. I use `python -m SimpleHTTPServer`, then visit `localhost:8000` in my browser.

You should be able to save changes to the `js/` directory, then refresh in the browser to see the changes.

### Testing
Run tests with `npm test`.
Tests go in a `__tests__` directory in the folder of the module being tested and are suffixed with `_test`.
See [here](http://facebook.github.io/react/blog/2014/09/24/testing-flux-applications.html) for a good explanation of testing Flux with Jest.

### Other Tools

+ [React dev tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) for Chrome.
+ [Firebase dev tools](https://chrome.google.com/webstore/detail/vulcan-by-firebase/oippbnlmebalopjbkemajgfbglcjhnbl?hl=en) for Chome (called Vulcan).

## Contributing

If you are a collaborator, branch from `master` and create a pull request for each feature. Merge `master` when necessary.

We'll use the Issues section for task tracking. Assign an issue to yourself as soon as you start working on it, so that others know to not work on the same feature.

If you are not a collaborator, fork this repo, create a feature branch, and submit a pull request from your fork.
