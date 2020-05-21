---
description: There is something appealing to it, isn't it?
---

# The Basics

WebAssembly is fundamentally different from JavaScript, ultimately enabling entirely new use cases not only on the web. Consequently, AssemblyScript is much more similar to a static compiler than it is to a JavaScript VM. One can think of it as if TypeScript and C had a somewhat special child.

## Strictness

Unlike TypeScript, which targets a JavaScript environment with all of its dynamic features, AssemblyScript targets WebAssembly with all of its static guarantees, hence intentionally **avoids the dynamicness of JavaScript** where it cannot be compiled ahead of time _efficiently_.

Limiting ourselves to where WebAssembly excels, for example by assigning or inferring definite types, eliminates the need to ship a JIT doing the heavy lifting at runtime, yielding **predictable performance** right from the start of execution while guaranteeing that the resulting WebAssembly **modules are small**.

## Static typing

The first peculiarity one is going to notice when writing AssemblyScript is that its [basic types](./types.md) are a bit different from TypeScript's in that it uses WebAssembly's **more specific integer and floating point types**, with JavaScript's `number` merely an alias of WebAssembly's `f64`.

A JavaScript JIT would try to figure out the best representation of a numeric value while the code is executing, making assumptions as values flow around, potentially recompiling code multiple times, while AssemblyScript lets the developer **specify the ideal type in advance** with all its pros and cons. To give a few examples:

### No any or undefined

```typescript
// 😢
function foo(a?) {
  var b = a + 1
  return b
}

// 😊
function foo(a: i32 = 0): i32 {
  var b = a + 1
  return b
}
```

### No union types

```typescript
// 😢
function foo(a: i32 | string): void {
}

// 😊
function foo<T>(a: T): void {
}
```

### Strictly typed objects

```typescript
// 😢
var a = {}
a.prop = "hello world"

// 😊
var a = new Map<string,string>()
a.set("prop", "hello world")

// 😊
class A {
  constructor(public prop: string) {}
}
var a = new A("hello world")
```

## Sandbox

WebAssembly modules execute in a sandbox, providing **strong security guarantees** for all sorts of use cases not necessarily limited to the browser. As such, a module has **no immediate access to the DOM** or other external APIs out of the box, making it necessary to translate and exchange data either through the module's [exports and imports](./exports-and-imports.md) or reading from respectively writing to the module's linear memory.

## Low-level

Currently, values WebAssembly can exchange out of the box are **limited to basic numeric values**, and one can think of objects as a clever composition of basic values stored in linear memory. As such, whole **objects cannot yet flow in and out of WebAssembly** natively, making it necessary to translate between their representations in WebAssembly memory and JavaScript objects. This is typically the first real bummer one is going to run into.

For now, there is [the loader](./loader.md) that provides the utility necessary to exchange strings and arrays for example, but it is somewhat edgy on its own due to its garbage collection primitives. It's a great starting point however for learning more about how the higher level structures _actually_ work.

In the near to distant future, the [reference types](https://github.com/WebAssembly/reference-types) 🦄, [interface types](https://github.com/WebAssembly/interface-types) 🦄 and ultimately [GC](https://github.com/WebAssembly/gc) 🦄 proposals will make much of this a lot easier.

## Current limitations

Not all language features are equally straight-forward to implement on top of just the WebAssembly MVP, so there are certain features we are still working on while waiting for their respective proposals to become available.

### Closures

Closures are not yet supported \(waiting for [Function References](https://github.com/WebAssembly/function-references) 🦄 / [GC](https://github.com/WebAssembly/gc) 🦄\), so accessing a local variable captured by an inner function will report an error.

```typescript
function computeSum(arr: i32[]): i32 {
  var sum = 0
  arr.forEach(value => {
    sum += value // error
  })
  return sum
}
```

In the meantime we recommend to either use a global \(top-level variable\)

```typescript
var sum = 0 // now becomes a Global
function computeSum(arr: i32[]): i32 {
  arr.forEach(value => {
    sum += value // works
  })
  return sum
}
```

or to adapt code where possible:

```typescript
let sum = 0
for (let i = 0; i < arr.length; ++i) {
  sum += arr[i] // works
}
```

### Exceptions

Exceptions are not yet supported \(waiting for [Exception Handling](https://github.com/WebAssembly/exception-handling) 🦄\), so the following cannot be caught and will instead `abort` \(i.e. crash\) the program:

```typescript
function doThrow(): void {
  throw new Error("message")
}
```

In the meantime we recommend to avoid the use of `try`, `catch`, `finally` and `throw` and do as they did in the olden days, i.e. return an error code or `null` to indicate.

### Triple equals \(===\)

The triple equals binary operation performs an identity equality check \(i.e. the exact same object\) currently. This has its origins in the early requirements of the Standard Library, but is going to change to JavaScript-like semantics in the near future. In the meantime, use `==` and `!=` with strings in case of doubt.

## Frequently asked questions

We've also [dedicated a section to answering general questions](../faq.md) that may arise before, at or after this point. so if you're wondering about one thing or another, make sure to pay it a visit \(and let us know if there's something important we forgot to answer\).

That being said, the following sections cover what AssemblyScript can or cannot do already, one piece at a time. Enjoy!
