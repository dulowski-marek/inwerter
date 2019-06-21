# Inwerter - DI for Typescript
[![Build Status](https://travis-ci.org/dulowski-marek/inwerter.svg?branch=master)](https://travis-ci.org/dulowski-marek/inwerter)
[![npm Version](https://badgen.net/npm/v/inwerter)](https://www.npmjs.com/package/inwerter)

Inwerter provides depedency injection for Typescript projects.  
It is heavily inspired by Angular's DI system but not bound to any framework.

Be it browser or Node, you can use it in any environment.

*Please note that Inwerter is still work in progress.
The public API may change before the 1.0.0 release.*

## Installation
Just install it as project dependency using yarn or npm:
```
yarn add inwerter
```

## Simple usage
Let's say you want to get an instance of `Car` class.
`Car` is designed to accept `Engine` and `Wheels` as dependencies.
How to achieve that without passing them manually?

2 steps are required:
1. Decorate classes with `@Injectable()` decorator
2. Call `injector.resolve(Car)`

Calling `resolve` will return an instance of `Car`.

```typescript
import {
    Injector,
    Injectable,
} from 'inwerter';

const injector = new Injector();

/**
 * Mark the classes as Injectable.
 * Its significance is explained in docs.
 */
@Injectable()
class Engine {
    private message = 'V6 roars nicely!');

    public roar() {
        console.log(this.message);
    }
}

@Injectable()
class Wheels {
    private message = 'They see me rollin\'!');

    public spin() {
        console.log(this.message);
    }
}

@Injectable()
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

// Call injector.resolve to get instance of Car
const car = injector.resolve(Car);

// Use it as usually
car.start();
```
By now, we should see `Nice V6 roar! They see me rollin'!` in the console.  

This is the simplest scenario, in which we use the defaults for a class:
- resolve logic is `(...inferredDeps) => new Car(...inferredDeps)`
- class is not a singleton, which won't preserve the first instance for subsequent calls

### Advanced (not really) instantiation
What to do, when we need to manually tell what and how to instantiate?  
Let's use an example of retrieving a constant.  

Unless instantiating a class, we need to **explicitly tell injector how to get some entity**.
This is what `injector.register()` method is for.

So, how to get `PI` through DI? 3 steps are required:

1. **Define** PI's *injection token* (can be anything, but use of ES2015 Symbols is encouraged to avoid conflicts)
2. **Associate** PI's injection token with description of how to get the value of PI - `ProviderMetadata`
3. **Resolve** by calling `injector.resolve(PI_TOKEN)` (note we are asking to resolve `PI_TOKEN` injection token, not PI itself)

Specifying an injection token is required, because we cannot simply amend metadata
to primitives.

```typescript
import {
    Injector,
    Injectable,
} from 'inwerter';

const injector = new Injector();

const PI = 3.1415;
// You may use any naming convention
const PI_TOKEN = Symbol('inject.PI');

// Associate PI_TOKEN with its factory function (way to "instantiate" PI)
injector.register(PI_TOKEN, {
    factory: () => PI,
});

console.log('Is PI equal to PI?', PI === injector.resolve(PI_TOKEN));
```
`Is PI equal to PI? true` should be printed to the console.

## Docs
Complete docs coming soon.

## License
[MIT License](./LICENSE)
