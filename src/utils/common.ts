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

export function getCertificationIcons(certificationText: string): { src: string; alt: string }[] {
  const certArr = certificationText.split(' ')
  const certIcons: { src: string; alt: string }[] = []
  certArr.forEach((certName) => {
    const certIcon = {
      src: '/',
      alt: 'no cert found',
    }

    switch (certName) {
      case 'RAW':
        certIcon.src = 'raw-cert-icon.png'
        certIcon.alt = 'raw certification'
        break

      case 'ORGANIC':
        certIcon.src = 'organic-cert-icon.png'
        certIcon.alt = 'organic certification'
        break

      case 'VEGAN':
        certIcon.src = 'vegan-cert-icon.png'
        certIcon.alt = 'vegan certification'
        break

      case 'NON-GMO':
        certIcon.src = 'non-gmo-cert-icon.png'
        certIcon.alt = 'non gmo certification'
        break

      case 'GLUTEN-FREE':
        certIcon.src = 'gluten-free-cert-icon.png'
        certIcon.alt = 'gluten free certification'
        break

      case 'DAIRY-FREE':
        certIcon.src = 'dairy-free-cert-icon.png'
        certIcon.alt = 'dairy free certification'
        break

      default:
        break
    }

    certIcons.push(certIcon)
  })

  return certIcons
}
