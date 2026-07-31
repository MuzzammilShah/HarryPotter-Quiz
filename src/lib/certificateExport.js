import html2canvas from 'html2canvas'

function sanitizeForFilename(text) {
  const cleaned = text.replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|-+$/g, '')
  return cleaned || 'wizard'
}

export async function exportNodeToPng(node, { username, house }) {
  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  const canvas = await html2canvas(node, {
    backgroundColor: '#060a18',
    scale: 2,
    useCORS: true,
  })
  const dataUrl = canvas.toDataURL('image/png')

  const filename = `hogwarts-certificate-${sanitizeForFilename(username)}-${house ?? 'wizard'}.png`
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return dataUrl
}
