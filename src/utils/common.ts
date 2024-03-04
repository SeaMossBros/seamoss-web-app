export function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}

export function formatDescription(text: string, length: number = 99): string {
  if (!text) return ''
  if (text.length > length) {
    return (text.slice(0, length) + '...').trim()
  }
  return text
}
