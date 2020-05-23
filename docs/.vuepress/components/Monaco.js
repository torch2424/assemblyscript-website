/*
The MIT License (MIT)

Copyright (c) egoist <0x142857@gmail.com> (https://egoist.moe)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// https://github.com/egoist/vue-monaco

function assign(obj) {
  for (let i = 1; i < arguments.length; i++) {
    for (const p in arguments[i]) obj[p] = arguments[i][p]
  }
  return obj
}

const Monaco = {
  name: 'Monaco',

  props: {
    original: String,
    value: {
      type: String
    },
    theme: {
      type: String,
      default: 'vs'
    },
    language: String,
    options: Object,
    amdRequire: {
      type: Function
    },
    diffEditor: {
      type: Boolean,
      default: false
    }
  },

  model: {
    event: 'change'
  },

  watch: {
    options: {
      deep: true,
      handler(options) {
        if (this.editor) {
          const editor = this.getModifiedEditor()
          editor.updateOptions(options)
        }
      }
    },

    value(newValue) {
      if (this.editor) {
        const editor = this.getModifiedEditor()
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue)
        }
      }
    },

    original(newValue) {
      if (this.editor && this.diffEditor) {
        const editor = this.getOriginalEditor()
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue)
        }
      }
    },

    language(newVal) {
      if (this.editor) {
        const editor = this.getModifiedEditor()
        this.monaco.editor.setModelLanguage(editor.getModel(), newVal)
      }
    },

    theme(newVal) {
      if (this.editor) {
        this.monaco.editor.setTheme(newVal)
      }
    }
  },

  mounted() {
    if (this.amdRequire) {
      this.amdRequire(['vs/editor/editor.main'], () => {
        this.monaco = window.monaco
        this.initMonaco(window.monaco)
      })
    } else {
      // ESM format so it can't be resolved by commonjs `require` in eslint
      // eslint-disable-next-line import/no-unresolved
      const monaco = require('monaco-editor')
      this.monaco = monaco
      this.initMonaco(monaco)
    }
  },

  beforeDestroy() {
    this.editor && this.editor.dispose()
  },

  methods: {
    initMonaco(monaco) {
      this.$emit('editorWillMount', this.monaco)

      const options = assign(
        {
          value: this.value,
          theme: this.theme,
          language: this.language,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false
          }
        },
        this.options
      )

      if (this.diffEditor) {
        this.editor = monaco.editor.createDiffEditor(this.$el, options)
        const originalModel = monaco.editor.createModel(
          this.original,
          this.language
        )
        const modifiedModel = monaco.editor.createModel(
          this.value,
          this.language
        )
        this.editor.setModel({
          original: originalModel,
          modified: modifiedModel
        })
      } else {
        this.editor = monaco.editor.create(this.$el, options)
      }
      this.editor.getModel().updateOptions({
        tabSize: 2
      })

      // @event `change`
      const editor = this.getModifiedEditor()
      editor.onDidChangeModelContent(event => {
        const value = editor.getValue()
        if (this.value !== value) {
          this.$emit('change', value, event)
        }
      })

      this.$emit('editorDidMount', this.editor)
    },

    getMonaco() {
      return this.monaco
    },

    getEditor() {
      return this.editor
    },

    getModifiedEditor() {
      return this.diffEditor ? this.editor.getModifiedEditor() : this.editor
    },

    getOriginalEditor() {
      return this.diffEditor ? this.editor.getOriginalEditor() : this.editor
    },

    focus() {
      this.editor.focus()
    }
  },

  render(h) {
    return h('div')
  }
}

export default Monaco

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.component(Monaco.name, Monaco)
// }
