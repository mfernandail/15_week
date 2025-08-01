const dropCurrency = document.getElementById('currency')
const result = document.getElementById('result')

document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://api.frankfurter.dev/v1/currencies'
  fetchCurrency(url, 1)
})

dropCurrency.addEventListener('change', searchCurrency)

function searchCurrency(e) {
  const currencySelected = e.target.value

  const url = `https://api.frankfurter.dev/v1/latest?base=${currencySelected}`

  console.log(currencySelected)

  fetchCurrency(url, 2)
}

async function fetchCurrency(url, typeEndpoint) {
  try {
    const response = await fetch(url)

    if (!response.ok) throw new Error('Error to get data')

    const data = await response.json()

    typeEndpoint === 1 ? renderSelect(data) : renderResult(data)
  } catch (error) {
    console.log('Error: ', error)
  }
}

function renderSelect(data) {
  Object.keys(data).forEach((currencyCode) => {
    const op = document.createElement('option')

    op.value = currencyCode
    op.textContent = currencyCode

    dropCurrency.appendChild(op)
  })
}

function renderResult(data) {
  result.innerHTML = ''
  const { date, rates, base } = data

  const dateP = document.createElement('p')
  const baseP = document.createElement('p')
  const table = document.createElement('tr')

  dateP.textContent = date
  baseP.textContent = base

  Object.entries(rates).forEach((currency) => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${currency[0]}</td>
      <td>${currency[1]}</td>
    `
    table.appendChild(row)
  })

  result.appendChild(dateP)
  result.appendChild(baseP)
  result.appendChild(table)
}