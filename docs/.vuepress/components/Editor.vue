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
  background-image: url(/icons/file_type_typescript.svg);
}
.editor .tab.binary {
  background-image: url(/icons/file_type_wasm.svg);
}
.monaco {
  border: 1px solid #ddd;
  border-top: 0;
  width: 100%;
  height: 500px;
}
</style>
