const decodeHtml = (html: string): string => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = html
  return textarea.value
}

const encodeHtml = (text: string): string => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  return textarea.innerHTML
}

export { decodeHtml, encodeHtml }
