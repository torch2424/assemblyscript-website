<template>
  <div class="editor">
    <div class="tabs">
      <a ref="sourceTab" class="tab source" @click="switchTab" v-bind:class="{ active: show == 'source' }">input.ts</a>
      <a ref="binaryTab" class="tab binary" @click="switchTab" v-bind:class="{ active: show == 'binary' }">output.wat</a>
      <a ref="canvasTab" class="tab canvas" @click="switchTab" v-if="canvas" v-bind:class="{ active: show == 'canvas' }">index.html</a>
    </div>
    <Monaco ref="source" class="monaco source" language="typescript" v-bind="source" v-model="code" v-if="show == 'source'" />
    <Monaco ref="binary" class="monaco binary" language="webassembly" v-bind="binary" v-model="output" v-else />
  </div>
</template>

<script>
import Monaco from './Monaco'
import watConfig from './../wat-config'
import watTokens from './../wat-tokens'

var compiler = null
var compilerPromise = null
var extrasAdded = false

function getCompiler() {
  if (!compilerPromise) {
    compilerPromise = new Promise((resolve, reject) => {
      console.log('[asc] Loading compiler ...')
      var script = document.createElement('script')
      script.onload = () => {
        requirejs([ 'https://cdn.jsdelivr.net/npm/assemblyscript@latest/dist/sdk.js' ], ({ asc }) => {
          asc.ready.then(() => {
            compiler = asc
            console.log(`[asc] Compiler is ready (v${asc.version})`)
            resolve(compiler)
          })
        }, err => {
          reject(err)
        })
      }
      script.onerror = err => {
        reject(err)
      }
      setTimeout(() => {
        script.src = 'https://cdn.jsdelivr.net/npm/requirejs@2/require.min.js'
        document.head.appendChild(script)
      });
    })
  }
  return compilerPromise
}

export default {
  name: 'Editor',
  code: '',
  output: '',
  show: 'source',

  components: {
    Monaco
  },

  props: {
    runtime: {
      type: String,
      default: 'none'
    },
    optimize: {
      type: Boolean,
      default: true
    },
    canvas: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      code: this.code,
      output: this.output,
      show: this.show,
      source: {
        options: {
          readOnly: false
        }
      },
      binary: {
        options: {
          readOnly: true
        }
      }
    }
  },

  beforeCreate() {
    const slots = this.$slots.default

    let code = slots[0].children[0].text // first child or <pre>
    let codeIndent = /^(\s+)/.exec(code)
    if (codeIndent) code = code.replace(new RegExp('^' + codeIndent[1], 'mg'), '').trimRight() + "\n"

    this.show = 'source'
    this.code = code
    this.output = ''
  },

  mounted() {
    const monaco = this.$refs.source.getMonaco()
    const editor = monaco.editor
    editor.defineTheme('vs-wasm', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'instruction', foreground: '001080' },
        { token: 'controlInstruction', foreground: 'af00db' },
        { token: 'identifier', foreground: '795e26' },
        { token: 'identifier.ts', foreground: '001080' }
      ]
    });
    editor.setTheme('vs-wasm')
    const languages = monaco.languages
    languages.register({ id: 'webassembly' })
    languages.setLanguageConfiguration('webassembly', watConfig)
    languages.setMonarchTokensProvider('webassembly', watTokens)
    getCompiler().then(asc => {
      if (!extrasAdded) {
        extrasAdded = true
        const typescriptDefaults = languages.typescript.typescriptDefaults
        typescriptDefaults.addExtraLib(asc.definitionFiles.assembly, "assemblyscript/std/assembly/index.d.ts")
        // TODO: leads to ts.worker.js errors when set - do we even need it?
        // typescriptDefaults.setCompilerOptions(asc.tscOptions)
      }
    })
  },

  methods: {
    switchTab(evt) {
      let show
      if (evt.target == this.$refs.binaryTab) {
        show = 'binary'
      } else if (evt.target == this.$refs.canvasTab) {
        show = 'canvas'
      } else {
        show = 'source'
      }
      if (show != this.show) {
        this.show = show
        this.output = '(module\n  🚀\n)\n'
        setTimeout(() => {
          const startTime = Date.now()
          console.log('[asc] Compiling code ...')
          getCompiler().then(asc => {
            asc.ready.then(() => {
              const { text, binary, stderr } = asc.compileString(this.code, {
                optimize: this.optimize,
                runtime: this.runtime
              })
              const time = Date.now() - startTime
              let diags = stderr.toString().trim()
              if (diags.length) {
                const pos = diags.indexOf('\n    at ')
                if (~pos) diags = diags.substring(0, pos)
                if (diags.length) {
                  diags = diags.replace(/(^|\n)/g, '$1; ') + "\n"
                }
              }
              if (typeof text === "string") {
                console.log(`[asc] Compilation complete (${time} ms)`)
                this.output = diags + text
              } else {
                this.output = diags + "\n"
              }
            })
          })
        }, 1)
      }
    }
  }
}
</script>

<style>
.editor {
  text-align: left;
}
.editor .tabs {
  background: #2d2d2d;
  padding: 10px 10px 0 10px;
  user-select: none;
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
.editor .tab.canvas {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHRpdGxlPmZpbGVfdHlwZV9odG1sPC90aXRsZT48cG9seWdvbiBwb2ludHM9IjUuOTAyIDI3LjIwMSAzLjY1NSAyIDI4LjM0NSAyIDI2LjA5NSAyNy4xOTcgMTUuOTg1IDMwIDUuOTAyIDI3LjIwMSIgc3R5bGU9ImZpbGw6I2U0NGYyNiIvPjxwb2x5Z29uIHBvaW50cz0iMTYgMjcuODU4IDI0LjE3IDI1LjU5MyAyNi4wOTIgNC4wNjEgMTYgNC4wNjEgMTYgMjcuODU4IiBzdHlsZT0iZmlsbDojZjE2NjJhIi8+PHBvbHlnb24gcG9pbnRzPSIxNiAxMy40MDcgMTEuOTEgMTMuNDA3IDExLjYyOCAxMC4yNDIgMTYgMTAuMjQyIDE2IDcuMTUxIDE1Ljk4OSA3LjE1MSA4LjI1IDcuMTUxIDguMzI0IDcuOTgxIDkuMDgzIDE2LjQ5OCAxNiAxNi40OTggMTYgMTMuNDA3IiBzdHlsZT0iZmlsbDojZWJlYmViIi8+PHBvbHlnb24gcG9pbnRzPSIxNiAyMS40MzQgMTUuOTg2IDIxLjQzOCAxMi41NDQgMjAuNTA5IDEyLjMyNCAxOC4wNDQgMTAuNjUxIDE4LjA0NCA5LjIyMSAxOC4wNDQgOS42NTQgMjIuODk2IDE1Ljk4NiAyNC42NTQgMTYgMjQuNjUgMTYgMjEuNDM0IiBzdHlsZT0iZmlsbDojZWJlYmViIi8+PHBvbHlnb24gcG9pbnRzPSIxNS45ODkgMTMuNDA3IDE1Ljk4OSAxNi40OTggMTkuNzk1IDE2LjQ5OCAxOS40MzcgMjAuNTA3IDE1Ljk4OSAyMS40MzcgMTUuOTg5IDI0LjY1MyAyMi4zMjYgMjIuODk2IDIyLjM3MiAyMi4zNzQgMjMuMDk4IDE0LjIzNyAyMy4xNzQgMTMuNDA3IDIyLjM0MSAxMy40MDcgMTUuOTg5IDEzLjQwNyIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwb2x5Z29uIHBvaW50cz0iMTUuOTg5IDcuMTUxIDE1Ljk4OSA5LjA3MSAxNS45ODkgMTAuMjM1IDE1Ljk4OSAxMC4yNDIgMjMuNDQ1IDEwLjI0MiAyMy40NDUgMTAuMjQyIDIzLjQ1NSAxMC4yNDIgMjMuNTE3IDkuNTQ4IDIzLjY1OCA3Ljk4MSAyMy43MzIgNy4xNTEgMTUuOTg5IDcuMTUxIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+');
}
.monaco {
  border: 1px solid #ddd;
  border-bottom-width: 2px;
  border-top: 0;
  width: 100%;
  resize: vertical;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  min-height: 200px;
  height: 500px;
}
.monaco .monaco-editor,
.monaco .monaco-editor .margin,
.monaco .monaco-editor-background,
.monaco .monaco-editor .inputarea.ime-input {
  background: #fff;
}
</style>
