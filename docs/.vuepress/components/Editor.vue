<template>
  <MonacoEditor class="editor" v-model="code" language="javascript" theme="vs" />
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  name: 'Editor',
  code: "",

  components: {
    MonacoEditor
  },

  data () {
    return {
      code: this.code
    }
  },

  beforeCreate() {
    // ¯\_(ツ)_/¯
    this.code = this.$slots.default[0].children[0].children[0].children[0].text;
  },

  methods: {
  }
}
</script>

<style>
.editor {
  width: 100%;
  height: 400px;
  border: 1px solid #ddd;
}
</style>
