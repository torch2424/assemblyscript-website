---
title: AssemblyScript
description: Definitely not a TypeScript to WebAssembly compiler 🚀
layout: Frontpage
home: true
heroImage: /images/logo.svg
heroText: A language made for WebAssembly.
tagline: null
actionText: Get Started →
actionLink: /introduction
footer: Copyright © 2020 The AssemblyScript Project | Apache-2.0
---

<div class="features">
  <div class="feature">
    <h2>Designed for WebAssembly</h2>
    <p>AssemblyScript targets WebAssembly's feature set specifically, giving developers low-level control over their code.</p>
  </div>
  <div class="feature">
    <h2>Familiar TypeScript syntax</h2>
    <p>Being a variant of TypeScript makes it easy to compile to WebAssembly without learning a new language.</p>
  </div>
  <div class="feature">
    <h2>Right at your fingertips</h2>
    <p>Integrates with the existing Web ecosystem - no heavy toolchains to set up. Simply `npm install` it!</p>
  </div>
</div>

<div class="sponsors">
  <h2>Thanks to our sponsors and backers! 💖</h2>
  <p>If you use AssemblyScript for a serious task or plan to do so, and you'd like us to invest more time on it, <a href="https://opencollective.com/assemblyscript/donate" target="_blank" rel="noopener">please donate</a> to our <a href="https://opencollective.com/assemblyscript" target="_blank" rel="noopener">OpenCollective</a>. By sponsoring this project, your logo will show up below. Thank you so much for your support!</p>
  <Sponsors />
</div>

<div class="playground">
  <h2>Try it out right in your browser! 🚀</h2>
  <Editor runtime="half">
    <pre lang="ts">
      /**
      * Calculates the Fibonacci sequence, such that each number
      * is the sum of the two preceding ones, starting from 1.
      */
      export function fib(n: i32): i32 {
        var a = 0, b = 1
        for (let i = 2; i < n; i++) {
          let t = a + b; a = b; b = t
        }
        return b
      }
      &#8203;
      /**
       * Logs a message to console via an import, as implemented
       * on and provided to the module by the host side of things.
       */
      declare namespace console {
        export function log(s: string): void
      }
      &#8203;
      console.log('Hello world!')
    </pre>
  </Editor>
  <div class="hero">
    <p class="action">
      <a href="./quick-start.html" class="nav-link action-button">Ready for your next adventure? Install locally!</a>
    </p>
  </div>
</div>
