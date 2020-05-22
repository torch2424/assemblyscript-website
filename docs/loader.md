---
description: How to make working with an AssemblyScript module more convenient.
---

# Loader

AssemblyScript has a tiny [module loader](https://github.com/AssemblyScript/assemblyscript/tree/master/lib/loader) that makes working with AssemblyScript modules as convenient as it gets without sacrificing efficiency \([see also / alternatives](#why-not-more-convenient)\). It mirrors the relevant parts of the WebAssembly API while also providing utility to load and store numbers as well as to allocate and read strings, arrays and classes.

::: tip NOTE
Some of the loader's functionality, like allocating strings, requires the [managed runtime](./runtime.md) interface to be exported to the host.
:::

## Install

For each version of the AssemblyScript compiler, there is a standalone version of the loader that can be installed from npm:

```sh
npm install @assemblyscript/loader
```

::: tip
If you need a [specific version](https://github.com/AssemblyScript/assemblyscript/releases) of the loader, append the respective version number as usual. For each nightly version of the compiler there is a respective nightly of the loader as well. If using the standalone package isn't strictly necessary as a separate dependency, the loader also ships with the compiler as `assemblyscript/lib/loader`.
:::

## Example

```js
// browser

const loader = require("@assemblyscript/loader")
const myImports = { /* ... */ }
/*`loader.instantiate` will use `WebAssembly.instantiateStreaming`
   if possible. Overwise fallback to `WebAssembly.instantiate`. */
const myModule = await loader.instantiate(
  fetch("optimized.wasm"),
  myImports
)
```

```js
// node.js (sync)

const fs = require("fs")
const loader = require("@assemblyscript/loader")
const myImports = { /* ... */ }
const myModule = loader.instantiateSync(
  fs.readFileSync("optimized.wasm"),
  myImports
)
```

```js
// node.js (async)

const fs = require("fs")
const loader = require("@assemblyscript/loader")
const myImports = { /* ... */ }
const myModule = await loader.instantiate(
  fs.promises.readFile("optimized.wasm"),
  myImports
)
```

What this basically does is to instantiate the module normally, adding some utility to it and evaluating export names making a nice object structure of them. If one for example exports an entire class `Foo`, there will be a `myModule.Foo` constructor when using the loader.

One task the loader does not perform, however, is to implicitly translate between pointers and objects. For example, if one has

```ts
export class Foo {
  constructor(public str: string) {}
  getString(): string { return this.str }
}
```

and then wants to call `new myModule.Foo(theString)` externally, the `theString` argument cannot just be a JavaScript string but must first be allocated and its [lifetime tracked](./runtime.md#managing-lifetimes), like so:

```js
const { Foo, __allocString, __retain, __release } = myModule

const str = __retain(__allocString("my string"))
const foo = new Foo(str)

// do something with foo here //

__release(foo)
__release(str)
```

Likewise, when calling the following function externally

```ts
export function getFoo(): Foo {
  return new Foo("my string")
}
```

the resulting pointer must first be wrapped in a `myModule.Foo` instance:

```js
const { Foo, getFoo, __getString, __release } = myModule

const foo = Foo.wrap(getFoo())
const str = foo.getString();
console.log(__getString(str))
__release(str)
__release(foo)
```

## Why not more convenient?

Making it any more convenient has its trade-offs. One would either have to include extended type information with the module itself or generate an additional JavaScript file of glue code that does \(and hides\) all the lifting. One can consider the loader as a small and efficient building block that can do it all, yet does not sacrifice efficiency for convenience. If that's not exactly what you are looking for, you might like to take a look at higher level tools below.

### Higher level tools

* [as-bind](https://github.com/torch2424/as-bind) is a library, built on top of the loader, to make passing high-level data structures between AssemblyScript and JavaScript more convenient.

## Further resources

For a full list of the provided utility and more usage examples, please see [the loader's README](https://github.com/AssemblyScript/assemblyscript/tree/master/lib/loader). For more information on what `__retain` and `__release` are about and where it's necessary and where it's not, see the information about the [managed runtime](./runtime.md).
