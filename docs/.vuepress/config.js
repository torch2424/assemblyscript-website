const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'AssemblyScript',
      description: 'Definitely not a TypeScript to WebAssembly compiler 🚀',
    }
  },
  themeConfig: {
    logo: '/images/icon.svg',
    nav: [
      { text: 'Quick start', link: '/quick-start' },
      { text: 'The Basics', link: '/basics/' },
      { text: 'The Details', link: '/details/' }
    ],
    repo: 'AssemblyScript/assemblyscript',
    repoLabel: 'AssemblyScript on GitHub',

    docsRepo: 'AssemblyScript/website',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us to improve this page!',

    smoothScroll: true,
    sidebar: {
      '/': [
        'introduction',
        'quick-start',
        {
          title: 'The Basics',
          path: '/basics/',
          collapsable: false,
          children: [
            'basics/types',
            'basics/environment',
            'basics/exports-and-imports',
            'basics/loader'
          ]
        },
        {
          title: 'The Details',
          path: '/details/',
          collapsable: false,
          children: [
            'details/compiler',
            'details/memory',
            'details/runtime',
            'details/peculiarities',
            'details/portability',
            'details/debugging',
            'details/interoperability',
            'details/development',
            'details/transforms'
          ]
        },
        'faq'
      ]
    },
    sidebarDepth: 2
  },
  evergreen: true,
  extraWatchFiles: [
    '**/*.md',
    '.vuepress/components/**/*.vue'
  ],
  chainWebpack(config, isServer) {
    config
      .plugin('monaco')
      .use(MonacoEditorPlugin, [
        {
          languages: ['typescript']
        }
      ])
  },
}
