<template>
  <div id="le">
    <Layout>
      <div slot="page-bottom" class="footer">Apache-2.0 | Copyright © 2020 The AssemblyScript Project</div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@vuepress/theme-default/layouts/Layout.vue'

export default {
  components: {
    Layout,
  }
}
</script>
