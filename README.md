# Inwerter - DI for Typescript
Inwerter is Depedency Injection for Typescript codebases.  
It is vastly inspired by Angular's DI system but **is framework-agnostic**.  

Be it browser or Node, you can use it in any environment.

Please note, that it is still under development - although it will be avoided,  
public API may be subject to changes until it reaches `1.0.0` version.

## Installation
Just install it as project dependency using yarn or npm:
```
yarn add inwerter
```

## Usage
Let's say you want to get instance of `Car` class.
`Car` is designed to accept `Engine` and `Wheels`.
How to achieve that without passing them manually? 2 steps are required:

1. Decorate classes with `@Injectable()` decorator
2. Call `injector.resolve(Car)`

Calling `resolve(Car)` will return fully functional `Car` instance.
(answer to *how it works* will be enclosed in docs soon).

```ts
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
    public roar() {
        console.log('V6 roars nicely!');
    }
}

@Injectable()
class Wheels {
    public spin() {
        console.log('They see me rollin\'!');
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

But what about more complex scenario?

### Advanced (not really) instantiation
What to do, when we need to get some constant, for example?  
Unless instantiating a class, which we know how to instantiate (more about it in docs),  
we need to **explicitly tell injector how to get some entity**.

This is what `injector.register()` method is for.

So, how to get `PI` through DI? 3 steps are required:

1. *Define* PI's **injection token** (can be anything, but use of ES2015 Symbols is encouraged to avoid conflicts)
2. *Associate* PI's injection token with description of how to get value of PI - `ProviderMetadata`
3. *Resolve* by calling `injector.resolve(PI_TOKEN)` (note we are asking to resolve `PI_TOKEN`, not PI itself)

```ts
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

## Public API
The outline of options and entities available. Coming soon.

## Docs
Coming soon - at the time being I encourage to read the specs (they are not hard to eyes, I believe).

## Roadmap and release log
Coming soon.

## Contributing and issues
Guide is coming soon.

## License
[MIT License](./LICENSE)
