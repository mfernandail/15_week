const dropCurrency = document.getElementById('currency')

document.addEventListener('DOMContentLoaded', fetchCurrency)

async function fetchCurrency() {
  try {
    const url = 'https://api.frankfurter.dev/v1/currencies'
    const response = await fetch(url)

    if (!response.ok) throw new Error('Error to get data')

    const data = await response.json()

    Object.keys(data).forEach((currencyCode) => {
      const op = document.createElement('option')

      op.value = currencyCode
      op.textContent = currencyCode

      dropCurrency.appendChild(op)
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}
