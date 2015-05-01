# flux-play

The best module ever.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Install](#install)
- [Usage](#usage)
- [Developing](#developing)
  - [Requirements](#requirements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
git clone https://github.com/joeybaker/flux-play
cd flux-play
npm i
```


## Usage

Use ribcage-preview to demo these. There are also handy npm scripts

```sh
# run the big demo
npm run demos
# run the in-progress project
npm run erbody
```

## Tests
Tests are in [tape](https://github.com/substack/tape) and code coverage is run though [covert](https://github.com/substack/covert).

* `npm test` will run both server and browser tests
* `npm run test-browser` run their respective tests
* `npm run tdd-browser` will run the server tests on every file change.

## Developing
_NOTE: you might need to `sudo ln -s /usr/local/bin/node /usr/bin/node` to ensure node is in your path for the git hooks to work_

### Requirements
* **npm > 2.0.0** So that passing args to a npm script will work. `npm i -g npm`
* **git > 1.8.3** So that `git push --follow-tags` will work. `brew install git`

## License

Artistic 2.0 © []()


[npm-url]: https://npmjs.org/package/flux-play
[npm-image]: https://badge.fury.io/js/flux-play.svg
[travis-url]: https://travis-ci.org//flux-play
[travis-image]: https://travis-ci.org//flux-play.svg?branch=master
[daviddm-url]: https://david-dm.org//flux-play.svg?theme=shields.io
[daviddm-image]: https://david-dm.org//flux-play
