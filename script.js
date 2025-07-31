const dropCurrency = document.getElementById('currency')

document.addEventListener('DOMContentLoaded', loadCurrency)

function loadCurrency() {
  const op = document.createElement('option')

  fetchCurrency()
}

async function fetchCurrency() {
  const url = 'https://api.frankfurter.dev/v1/currencies'
  const currencyList = await fetch(url)
  const data = await currencyList.json()

  Object.keys(data).forEach((c) => {
    const op = document.createElement('option')

    op.value = c
    op.textContent = c

    dropCurrency.appendChild(op)
  })
}
