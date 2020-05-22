<template>
  <div class="editor">
    <div class="tabs">
      <a ref="sourceTab" class="tab source" @click="switchTab" v-bind:class="{ active: showSource }">input.ts</a>
      <a ref="binaryTab" class="tab binary" @click="switchTab" v-bind:class="{ active: !showSource }">output.wat</a>
    </div>
    <Monaco ref="source" class="monaco source" language="typescript" v-bind="source" v-model="code" v-if="showSource" />
    <Monaco ref="binary" class="monaco binary" language="webassembly" v-bind="binary" v-model="output" v-else />
  </div>
</template>

<script>
import Monaco from './Monaco'

export default {
  name: 'Editor',
  code: '',
  output: '',
  showSource: true,

  components: {
    Monaco
  },

  data () {
    return {
      code: this.code,
      output: this.output,
      source: {
        options: {
          readOnly: false
        }
      },
      binary: {
        options: {
          readOnly: true
        }
      },
      showSource: this.showSource
    }
  },

  beforeCreate() {
    // ¯\_(ツ)_/¯
    this.code = this.$slots.default[0].children[0].children[0].children[0].text
    this.output = ''
  },

  mounted() {
    this.showSource = true
    var script = document.createElement('script')
    script.onload = () => {
      requirejs([ 'https://cdn.jsdelivr.net/npm/assemblyscript@latest/dist/sdk.js' ], ({ asc }) => {
        this.asc = asc
      })
    }
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'
    document.head.appendChild(script)
  },

  methods: {
    switchTab(evt) {
      if (!this.asc) return
      this.showSource = !this.showSource
      if (!this.showSource) {
        this.output = '(module\n  🚀\n)\n'
        setTimeout(() => {
          this.asc.ready.then(() => {
            const { text, stderr } = this.asc.compileString(this.code, {
              optimizeLevel: 3,
              runtime: "none"
            })
            if (typeof text === "string") {
              this.output = text
            } else {
              let text = stderr.toString()
              const pos = text.indexOf('\n    at ')
              if (~pos) text = text.substring(0, pos)
              this.output = text
            }
          })
        }, 1)
      }
    }
  }
}
</script>

<style>
.editor .tabs {
  background: #2d2d2d;
  padding: 10px 10px 0 10px;
}
.editor .tab {
  color: #aaa;
  font-size: 0.9rem;
  font-weight: 300;
  padding: 8px 16px 8px 34px;
  background: #2d2d2d;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 8px center;
  display: inline-block;
  cursor: pointer;
}
.editor .tab:hover {
  background-color: #3e3e3e;
}
.editor .tab.active {
  color: #111;
  background-color: #fff;
}
.editor .tab.active:hover {
  background-color: #fff;
}
.editor .tab.source {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHRpdGxlPmZpbGVfdHlwZV90eXBlc2NyaXB0X29mZmljaWFsPC90aXRsZT48cG9seWdvbiBwb2ludHM9IjIgMTYgMiAzMCAxNiAzMCAzMCAzMCAzMCAxNiAzMCAyIDE2IDIgMiAyIDIgMTYiIHN0eWxlPSJmaWxsOiMwMDdhY2MiLz48cGF0aCBkPSJNMjQuNTY0LDE0Ljg4NGEzLjQ4NSwzLjQ4NSwwLDAsMSwxLjc1MSwxLjAwOSw0LjYxMSw0LjYxMSwwLDAsMSwuNjcxLjljLjAwOS4wMzYtMS4yMDkuODUzLTEuOTQ3LDEuMzExLS4wMjcuMDE4LS4xMzMtLjEtLjI1My0uMjc2YTEuNTg3LDEuNTg3LDAsMCwwLTEuMzE2LS43OTFjLS44NDktLjA1OC0xLjQuMzg3LTEuMzkxLDEuMTI5YTEuMDI3LDEuMDI3LDAsMCwwLC4xMi41MjRjLjE4Ny4zODcuNTMzLjYxOCwxLjYyMiwxLjA4OSwyLC44NjIsMi44NjIsMS40MzEsMy40LDIuMjRhNC4wNjMsNC4wNjMsMCwwLDEsLjMyNCwzLjQxMywzLjc1MywzLjc1MywwLDAsMS0zLjEsMi4yMTgsOC41ODQsOC41ODQsMCwwLDEtMi4xMzMtLjAyMiw1LjE0NSw1LjE0NSwwLDAsMS0yLjg0OS0xLjQ4NCw0Ljk0Nyw0Ljk0NywwLDAsMS0uNzI5LTEuMDgsMi4wOTIsMi4wOTIsMCwwLDEsLjI1OC0uMTY0Yy4xMjQtLjA3MS42LS4zNDIsMS4wNC0uNmwuOC0uNDY3TDIxLDI0LjA4QTMuNzU5LDMuNzU5LDAsMCwwLDIyLjA2NywyNS4xYTIuNiwyLjYsMCwwLDAsMi43MjQtLjEzOCwxLjIxNywxLjIxNywwLDAsMCwuMTU2LTEuNTUxYy0uMjE4LS4zMTEtLjY2Mi0uNTczLTEuOTI0LTEuMTJhNi45Myw2LjkzLDAsMCwxLTIuNjM2LTEuNjIyLDMuNjkyLDMuNjkyLDAsMCwxLS43NjktMS40LDUuNjA2LDUuNjA2LDAsMCwxLS4wNDktMS43ODcsMy40MTMsMy40MTMsMCwwLDEsMi44NzEtMi42NThBNy4wOTIsNy4wOTIsMCwwLDEsMjQuNTY0LDE0Ljg4NFptLTYuNTczLDEuMTY5TDE4LDE3LjJIMTQuMzU2VjI3LjU1NkgxMS43NzhWMTcuMkg4LjEzM1YxNi4wNzZhMTEuMDE4LDExLjAxOCwwLDAsMSwuMDMxLTEuMTU2Yy4wMTMtLjAxOCwyLjIzMS0uMDI3LDQuOTItLjAyMmw0Ljg5My4wMTNaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+');
}
.editor .tab.binary {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHRpdGxlPmZpbGVfdHlwZV93YXNtPC90aXRsZT48cGF0aCBkPSJNMTkuMTUzLDIuMzVWMi41YTMuMiwzLjIsMCwxLDEtNi40LDBoMFYyLjM1SDJWMzAuMjY5SDI5LjkxOVYyLjM1WiIgc3R5bGU9ImZpbGw6IzY1NGZmMCIvPjxwYXRoIGQ9Ik04LjQ4NSwxNy40aDEuODVMMTEuNiwyNC4xMjNoLjAyM0wxMy4xNCwxNy40aDEuNzMxbDEuMzcxLDYuODFoLjAyN2wxLjQ0LTYuODFoMS44MTVsLTIuMzU4LDkuODg1SDE1LjMyOWwtMS4zNi02LjcyOGgtLjAzNmwtMS40NTYsNi43MjhoLTEuODdabTEzLjEyNCwwaDIuOTE3bDIuOSw5Ljg4NUgyNS41MTVsLS42My0yLjJIMjEuNTYybC0uNDg2LDIuMkgxOS4yMTdabTEuMTEsMi40MzctLjgwNywzLjYyN2gyLjUxMkwyMy41LDE5LjgzMloiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=');
}
.monaco {
  border: 1px solid #ddd;
  border-top: 0;
  width: 100%;
  height: 500px;
}
</style>
