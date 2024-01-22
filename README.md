> [!NOTE]
> This repository is now archived and read-only. The project is continued in https://github.com/archware-io/di

# Inwerter - DI for Typescript
[![Build Status](https://travis-ci.org/dulowski-marek/inwerter.svg?branch=master)](https://travis-ci.org/dulowski-marek/inwerter)
[![npm Version](https://badgen.net/npm/v/inwerter)](https://www.npmjs.com/package/inwerter)
[![Minified size](https://badgen.net/bundlephobia/min/inwerter)](https://bundlephobia.com/result?p=inwerter)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/inwerter)](https://bundlephobia.com/result?p=inwerter)

Inwerter is a lightweight solution for dependency injection in TypeScript applications.
Although heavily inspired by Angular API, **it can be used in any environment**.

The goal is to provide a balanced, usable on its own but extensible base API you can
build anything on top of.

*Please note that Inwerter is still work in progress.
The public API may change before the 1.0.0 release.*

## Installation
Just install it as project dependency using yarn or npm:
```
yarn add inwerter
```

## The problem inwerter solves
Let's say you want to get an instance of `Car` class.
`Car` is designed to accept `Engine` and `Wheels` as dependencies.
```ts
class Engine {
    roar() {
        console.log('V8 roars nicely!');
    }
}

class Wheels {
    spin() {
        console.log('They see me rollin');
    }
}

class Car {
    constructor(
        private engine: Engine,
        private wheels: Wheels,
    ) { }

    start() {
        this.engine.roar();
        this.wheels.spin();
    }
}
```

### Classic approach
Normally, you have to instantiate both `Engine` and `Wheels`
before you create a `Car`. This can be done as follows:
```ts
const engine = new Engine();
const wheels = new Wheels();

const car = new Car(engine, wheels);
```

While for a simplified usecase like this this works, it gets more messy
for bigger business applications. Just imagine wheels accepting `Tyres`, `Rims` and engine `Cylinders`.
This adds overhead, as the order in which the classes are instantiated does matter and you have to manually supply dependencies
in a place different to where they are declared.

### Inwerter approach
Inwerter tries to solve this issue by describing how symbols are instantiated in place where they are declared.
Imagine the previous scenario. To achieve the same thing, two steps are required:
1. Decorate classes with `@Resolvable()`
2. Call `injector.resolve(Car)`

Calling `resolve` will return an instance of `Car`.

```typescript
import {
    Injector,
    Injectable,
    Resolvable,
} from 'inwerter';

@Resolvable()
class Engine { ... }

@Resolvable()
class Wheels { ... }

@Resolvable()
class Car {
    constructor(
        private engine: Engine,
        private wheels: Wheels,
    ) { }

    public start() {
        this.engine.roar();
        this.wheels.spin();
    }
}

const injector = new Injector();

// Call injector.resolve to get instance of Car
const car = injector.resolve(Car);

// Use it as usually
car.start();
```
By now, you should see `V8 roars nicely! They see me rollin'!` in the console.  

## Usage

### `injector.resolve()`
```ts
import { Injector, Resolvable } from 'inwerter';

@Resolvable()
class Dependency { }

@Resolvable()
class Target {
    constructor(
        private dependency: Dependency,
    ) { }
}

const injector = new Injector();
const instance = injector.resolve(Target);
const anotherInstance = injector.resolve(Target);
```

#### Register
Registering a resolvable is useful whenever you don't deal with class,
to associate some token (e.g. string) with a constant.

```ts
import { Injector } from 'inwerter';
import { ofConst } from 'inwerter/descriptors';

const injector = new Injector();
const APP_CONFIG = {
    foo: 'bar',
};

injector.register(ofConst('APP_CONFIG', config));

const resolvedAppConfig = injector.resolve('APP_CONFIG');
```

This is particularly useful in tandem with `@Inject()` decorator, if your classes
accept other dependency types (not classes).

#### `@Inject()` decorator
`@Inject()` decorator is being used to specify which token should be used to resolve dependency when instantiating
a class. For classes, the token is class itself (like `Engine` in example above). For other types (flag, object, constant)
you have to decorate the parameter with `@Inject()` decorator.

```ts
import { Injector, Resolvable, Inject, ofConst } from 'inwerter';

const config = {
    foo: 'bar',
};

@Resolvable()
class Target {
    constructor(
        @Inject('APP_CONFIG') private config: { foo: string; }
    ) { }
}

const injector = new Injector();

injector.register(ofConst('APP_CONFIG', config));
// Target will receive config, because it's associated with `APP_CONFIG` token
const instance = injector.resolve(Target);
```
## License
[MIT License](./LICENSE)
