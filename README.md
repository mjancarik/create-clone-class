# create-clone-class

[![Build Status](https://travis-ci.org/mjancarik/create-clone-class.svg?branch=master)](https://travis-ci.org/mjancarik/create-clone-class) [![dependencies Status](https://david-dm.org/mjancarik/create-clone-class/status.svg)](https://david-dm.org/mjancarik/create-clone-class)
[![Coverage Status](https://coveralls.io/repos/github/mjancarik/create-clone-class/badge.svg?branch=master)](https://coveralls.io/github/mjancarik/create-clone-class?branch=master)
[![NPM package version](https://img.shields.io/npm/v/create-clone-class/latest.svg)](https://www.npmjs.com/package/create-clone-class)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

```bash
npm i create-clone-class --save
```

## Usage

You have some common class. For example:

``` javascript
import createCloneClass from 'create-clone-class';

class A {
  constructor(variable) {
    this.variable = variable;
  }

  method() {
    return this.variable;
  }
}

// create clone
const CloneA = createCloneClass(A);

// modify original
A.prototype.method = () => 'override original';

const clone = new CloneA('clone');
const original = new A('original');

clone.method(); // returns 'clone';
original.method(); // returns 'override original';
```
