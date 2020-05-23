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
footer: Apache-2.0 | Copyright © 2020 The AssemblyScript Project
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

---

<div class="sponsors">
  <h2>Thanks to our sponsors and backers! 💖</h2>
  <div class="sponsor">
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/0/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/0/avatar.svg" alt="Sponsor" />
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/1/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/1/avatar.svg" alt="Sponsor">
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/2/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/2/avatar.svg" alt="Sponsor">
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/3/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/3/avatar.svg" alt="Sponsor">
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/4/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/4/avatar.svg" alt="Sponsor">
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/5/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/5/avatar.svg" alt="Sponsor">
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/6/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/6/avatar.svg" alt="Sponsor">
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/7/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/7/avatar.svg" alt="Sponsor">
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/8/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/8/avatar.svg" alt="Sponsor">
    </a>
    <a href="https://opencollective.com/assemblyscript/tiers/sponsor/9/website" target="_blank" rel="noopener">
      <img src="https://opencollective.com/assemblyscript/tiers/sponsor/9/avatar.svg" alt="Sponsor">
    </a>
  </div>
  <div class="backer">
    <a href="https://opencollective.com/assemblyscript#backers" target="_blank" rel="noopener" loading="lazy">
      <img src="https://opencollective.com/assemblyscript/backer.svg?avatarHeight=44" alt="Backers">
    </a>
  </div>
</div>

---

<div class="playground">
  <h2>Try it out!</h2>
  <Editor runtime="half">
    <pre lang="ts">
      export function fib(n: i32): i32 {
        var a = 0, b = 1
        for (let i = 0; i < n; i++) {
          let t = a + b; a = b; b = t
        }
        return b
      }
    </pre>
  </Editor>

  <div class="hero">
    <p class="action">
      <a href="./quick-start.html" class="nav-link action-button">Ready for your next adventure? Install locally!</a>
    </p>
  </div>
</div>
