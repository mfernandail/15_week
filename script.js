const dropCurrency = document.getElementById('currency')
const resultBody = document.getElementById('result-body')
const headCurrency = document.getElementById('head-currency')
const headDate = document.getElementById('head-date')

document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://api.frankfurter.dev/v1/currencies'
  fetchCurrency(url, 'select')
})

dropCurrency.addEventListener('change', searchCurrency)

function searchCurrency(e) {
  const currencySelected = e.target.value

  const url = `https://api.frankfurter.dev/v1/latest?base=${currencySelected}`

  console.log(currencySelected)

  fetchCurrency(url, 'result')
}

async function fetchCurrency(url, typeEndpoint) {
  try {
    const response = await fetch(url)

    if (!response.ok) throw new Error('Error to get data')

    const data = await response.json()

    typeEndpoint === 'select' ? renderSelect(data) : renderResult(data)
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
  resultBody.innerHTML = ''
  headCurrency.innerHTML = ''
  headDate.innerHTML = ''

  const { date, rates, base } = data

  const table = document.createElement('table')

  headCurrency.textContent = `Base: ${base}`
  headDate.textContent = `Date: ${date}`

  Object.entries(rates).forEach(([code, value]) => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${code}</td>
      <td>${value}</td>
    `
    table.appendChild(row)
  })

  resultBody.appendChild(table)
}