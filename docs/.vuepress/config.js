const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  base: process.env.GH_ACTIONS
    ? '/assemblyscript-website/'
    : '/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'AssemblyScript',
      description: 'Definitely not a TypeScript to WebAssembly compiler 🚀',
    }
  },
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"} ],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"} ],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"} ],
    ['link', { rel: "manifest", href: "/site.webmanifest"} ],
    ['link', { rel: "mask-icon", href: "/favicons/safari-pinned-tab.svg", color: "#007acc"} ],
    ['link', { rel: "shortcut icon", href: "/favicon.ico"} ],
    ['meta', { name: "msapplication-TileColor", content: "#ffffff"} ],
    ['meta', { name: "msapplication-config", content: "/browserconfig.xml"} ],
    ['meta', { name: "theme-color", content: "#ffffff"} ],
  ],
  themeConfig: {
    logo: '/images/icon.svg',
    nav: [
      {
        text: 'Quick start',
        link: '/quick-start'
      },
      {
        text: 'The Basics',
        link: '/basics/'
      },
      {
        text: 'The Details',
        link: '/details/'
      },
      {
        text: 'Standard library',
        items: [
          {
            text: 'Globals',
            link: '/standard-library/globals'
          },
          {
            text: 'Array',
            link: '/standard-library/array'
          },
          {
            text: 'ArrayBuffer',
            link: '/standard-library/arraybuffer'
          },
          {
            text: 'DataView',
            link: '/standard-library/dataview'
          },
          {
            text: 'Date',
            link: '/standard-library/date'
          },
          {
            text: 'Error',
            link: '/standard-library/error'
          },
          {
            text: 'Map',
            link: '/standard-library/map'
          },
          {
            text: 'Math',
            link: '/standard-library/math'
          },
          {
            text: 'Number',
            link: '/standard-library/number'
          },
          {
            text: 'Set',
            link: '/standard-library/set'
          },
          {
            text: 'StaticArray ✨',
            link: '/standard-library/staticarray'
          },
          {
            text: 'String',
            link: '/standard-library/string'
          },
          {
            text: 'TypedArray',
            link: '/standard-library/typedarray'
          }
        ]
      }
    ],
    repo: 'AssemblyScript/assemblyscript',
    repoLabel: 'AssemblyScript on GitHub',

    docsRepo: 'AssemblyScript/website',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us to improve this page!',

    smoothScroll: true,
    sidebar: {
      '/standard-library/': [
      ],
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
        'faq',
        'built-with-assemblyscript'
      ]
    },
    sidebarDepth: 1
  },
  evergreen: true,
  extraWatchFiles: [
    '**/*.md',
    "**/*.vue"
  ],
  plugins: [
    require('./plugin')
  ],
  chainWebpack(config, isServer) {
    if (isServer) return
    config
      .plugin('monaco')
      .use(MonacoEditorPlugin, [
        {
          languages: ['typescript']
        }
      ])
    config
      .entry('custom')
      .add('./docs/.vuepress/index.js')
  }
}
