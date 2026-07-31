import { toPng } from 'html-to-image'

function sanitizeForFilename(text) {
  const cleaned = text.replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|-+$/g, '')
  return cleaned || 'wizard'
}

export async function exportNodeToPng(node, { username, house }) {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: undefined,
  })

  const filename = `hogwarts-certificate-${sanitizeForFilename(username)}-${house ?? 'wizard'}.png`
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return dataUrl
}
