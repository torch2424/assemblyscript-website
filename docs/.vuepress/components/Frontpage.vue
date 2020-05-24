<template>
  <div
    class="theme-container"
    :class="pageClasses"
  >
    <Navbar
      v-if="shouldShowNavbar"
    />
    <Home v-if="$page.frontmatter.home" />
    <Page
      v-else
    >
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@vuepress/theme-default/components/Navbar.vue'
import Page from '@vuepress/theme-default/components/Page.vue'

export default {
  name: 'Frontpage',

  components: {
    Home,
    Page,
    Navbar
  },

  computed: {
    shouldShowNavbar () {
      return false
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': false,
          'no-sidebar': true
        },
        userPageClass
      ]
    }
  }
}
</script>
