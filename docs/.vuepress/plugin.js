// Additional server code

const Prism = require("prismjs");
require("prismjs/components/prism-typescript");

Prism.languages.ts =
Prism.languages.typescript = Prism.languages.extend('typescript', {
	// 'keyword': /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
	'builtin': /\b(?:string|number|boolean|Array|Map|Set|symbol|Promise|i8|i16|i32|i64|isize|u8|u16|u32|u64|usize|bool|v128|anyref|auto)\b/,
});

module.exports = (options, ctx) => {
  return {}
}
