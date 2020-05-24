const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  base: process.env.GH_ACTIONS
    ? '/assemblyscript-website/'
    : '/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'The AssemblyScript Book',
      description: 'Definitely not a TypeScript to WebAssembly compiler 🚀',
    }
  },
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/favicons/safari-pinned-tab.svg", color: "#007acc"}],
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#ffffff"}],
    ['meta', { name: "msapplication-config", content: "/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
    ['meta', { name: "viewport", content: "width=device-width, initial-scale=1"}]
  ],
  theme: '.vuepress/theme',
  themeConfig: {
    logo: '/images/icon.svg',
    nav: require('./nav'),
    docsRepo: 'AssemblyScript/website',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us to improve this page!',
    sidebar: require('./sidebar'),
    sidebarDepth: 1
  },
  evergreen: true,
  extraWatchFiles: [
    '.vuepress/nav.js',
    '.vuepress/sidebar.js',
    '**/*.md',
    '**/*.vue'
  ],
  plugins: [
    'docs/.vuepress/plugin',
    '@vuepress/plugin-html-redirect',
    'vuepress-plugin-serve'
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
  },
  markdown: {
    extendMarkdown
  }
}

function extendMarkdown(md) {
  const prism = require('prismjs')
  require('prismjs/components/prism-typescript')
  prism.languages.typescript.builtin = new RegExp('\\b(?:' + [

    // Common types
    'string', 'number', 'boolean', 'symbol', 'void',

    // Common names
    'ArrayBuffer', 'String', 'Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'DataView',
    'Map', 'Set', 'Promise', 'Math', 'Number', 'Error', 'Date',

    // AssemblyScript types
    'i8', 'i16', 'i32', 'i64', 'isize', 'u8', 'u16', 'u32', 'u64', 'usize', 'bool', 'f32', 'f64',
    'v128', 'anyref', 'auto',

    // AssemblyScript names
    'memory', 'table', 'atomic', 'i8x16', 'i16x8', 'i32x4', 'i64x2', 'f32x4', 'f64x2', 'v8x16',
    'v16x8', 'v32x2', 'Int64Array', 'Uint64Array',

  ].join('|') + ')\\b')
}
