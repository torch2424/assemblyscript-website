---
title: AssemblyScript
description: Definitely not a TypeScript to WebAssembly compiler 🚀
layout: Frontpage
home: true
heroImage: /images/logo.svg
heroText: null
tagline: A language made for the modern Web.
actionText: Get Started →
actionLink: /introduction
footer: Apache-2.0 | Copyright © 2020 The AssemblyScript Project
---

<div class="features">
  <div class="feature">
    <h2>Designed for WebAssembly</h2>
    <p>AssemblyScript targets WebAssembly specifically, giving developers full control over their code.</p>
  </div>
  <div class="feature">
    <h2>Familiar TypeScript syntax</h2>
    <p>It's a strict variant of TypeScript, making it easy to compile to WebAssembly without learning a new language.</p>
  </div>
  <div class="feature">
    <h2>Right at your fingertips</h2>
    <p>Due to its integration with the existing Web ecosystem, all you need to get going is to run `npm install`.</p>
  </div>
</div>

---

<p align="center">
  <strong>Thanks to our sponsors and backers!</strong><br /><br />
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/0/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/0/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/1/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/1/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/2/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/2/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/3/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/3/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/4/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/4/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/5/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/5/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/6/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/6/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/7/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/7/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/8/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/8/avatar.svg"></a>
  <a href="https://opencollective.com/assemblyscript/tiers/sponsor/9/website" target="_blank"><img src="https://opencollective.com/assemblyscript/tiers/sponsor/9/avatar.svg"></a>
</p>
<br />
<p align="center">
  <a href="https://opencollective.com/assemblyscript#backers" target="_blank"><img src="https://opencollective.com/assemblyscript/backer.svg?avatarHeight=44" /></a>
</p>
<br />

## Try it out!

<Editor>
```
export function fib(n: i32): i32 {
  var a = 0, b = 1
  for (let i = 0; i < n; i++) {
    let t = a + b; a = b; b = t
  }
  return b
}
```
</Editor>

<div class="hero">
  <p class="action">
    <a href="/quick-start.html" class="nav-link action-button">Ready for a ride? Install locally!</a>
  </p>
</div>
