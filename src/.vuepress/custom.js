// Editor component

let maximized = false
window.maximize = function(editorId) {
  const editor = document.getElementById(editorId)
  if (maximized = !maximized) {
    editor.classList.add('maximized')
    document.body.style.overflow = 'hidden'
  } else {
    editor.classList.remove('maximized')
    document.body.style.overflow = 'auto'
    editor.scrollIntoView()
  }
}
