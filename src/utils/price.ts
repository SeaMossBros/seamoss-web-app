export const formatPrice = (value: number | null, placeholder = '--') => {
  const price = value
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    : placeholder

  return price
}
