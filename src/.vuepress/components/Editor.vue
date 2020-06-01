<template>
  <div ref="editor" class="editor">
    <div class="buttons">
      <a class="button maximize" title="Maximize editor" @click="maximize">🗖</a>
    </div>
    <iframe sandbox="allow-scripts" src="editor.html#LyoqCiogQ2FsY3VsYXRlcyB0aGUgRmlib25hY2NpIHNlcXVlbmNlLCBzdWNoIHRoYXQgZWFjaCBudW1iZXIKKiBpcyB0aGUgc3VtIG9mIHRoZSB0d28gcHJlY2VkaW5nIG9uZXMsIHN0YXJ0aW5nIGZyb20gMS4KKi8KZXhwb3J0IGZ1bmN0aW9uIGZpYihuOiBpMzIpOiBpMzIgewogIHZhciBhID0gMCwgYiA9IDEKICBmb3IgKGxldCBpID0gMjsgaSA8IG47IGkrKykgewogICAgbGV0IHQgPSBhICsgYjsgYSA9IGI7IGIgPSB0CiAgfQogIHJldHVybiBiCn0KCi8qKgogICogTG9ncyBhIG1lc3NhZ2UgdG8gY29uc29sZSB2aWEgYW4gaW1wb3J0LCBhcyBpbXBsZW1lbnRlZAogICogb24gYW5kIHByb3ZpZGVkIHRvIHRoZSBtb2R1bGUgYnkgdGhlIGhvc3Qgc2lkZSBvZiB0aGluZ3MuCiAgKi8KZGVjbGFyZSBuYW1lc3BhY2UgY29uc29sZSB7CiAgZXhwb3J0IGZ1bmN0aW9uIGxvZyhzOiBzdHJpbmcpOiB2b2lkCn0KCmNvbnNvbGUubG9nKCdIZWxsbyB3b3JsZCEnKQ=="></iframe>
  </div>
</template>

<script>
export default {
  methods: {
    maximize() {
      const body = document.body;
      const editor = this.$refs.editor
      if (this.maximized = !this.maximized) {
        editor.classList.add('maximized')
        body.style.overflow = 'hidden'
      } else {
        editor.classList.remove('maximized')
        body.style.overflow = 'auto'
        editor.scrollIntoView()
      }
    }
  }
}
</script>

<style scoped>
.editor {
  position: relative;
  width: 100%;
}
.buttons {
  position: absolute;
  padding: 13px 15px 0 0;
  top: 0;
  right: 0;
  user-select: none;
}
.button {
  color: #c7c4c7;
  cursor: pointer;
}
.button:hover {
  color: #fff;
  text-decoration: none !important;
}
iframe {
  width: 100%;
  height: 500px;
  min-height: 500px;
  border: 0;
  resize: vertical;
}

.editor.maximized {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.editor.editor.maximized iframe {
  height: 100% !important;
  resize: none;
}
</style>
