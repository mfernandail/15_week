const dropCurrency = document.getElementById('currency')
const dropCurrencyTo = document.getElementById('currencyTo')
const inputFrom = document.getElementById('inputFrom')
const inputTo = document.getElementById('inputTo')

let inputFromCal
let inputToCal

let currenciesObj
let currenciesObjFrom
let currenciesObjTo

document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://api.frankfurter.dev/v1/currencies'
  fetchCurrency(url)
})

dropCurrency.addEventListener('change', searchCurrencySelectFrom)
dropCurrencyTo.addEventListener('change', searchCurrencySelectTo)

inputFrom.addEventListener('keydown', calculateFrom)
inputTo.addEventListener('keydown', calculateTo)

async function fetchCurrency(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) throw new Error('Error to get data')

    const data = await response.json()

    renderSelect(data)

    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

async function searchCurrency(currencySelected) {
  //const currencySelected = e.target.value
  const url = `https://api.frankfurter.dev/v1/latest?base=${currencySelected}`

  fetchCurrency(url)
  currenciesObj = await fetchCurrency(url)

  return currenciesObj
}

async function searchCurrencySelectFrom(e) {
  inputFrom.disabled = false
  const currencySelected = e.target.value

  const res = await searchCurrency(currencySelected)

  currenciesObjFrom = currenciesObj

  inputFrom.value = 1
  console.log(res)
}

async function searchCurrencySelectTo(e) {
  //inputTo.disabled = false

  const currencySelected = e.target.value

  const res = await searchCurrency(currencySelected)

  currenciesObjTo = currenciesObj

  const result = currenciesObjFrom.rates[currenciesObjTo.base]

  inputTo.value = result
}

function renderSelect(data) {
  Object.keys(data).forEach((currencyCode) => {
    const opFrom = document.createElement('option')
    const opTo = document.createElement('option')

    opFrom.value = currencyCode
    opFrom.textContent = currencyCode

    opTo.value = currencyCode
    opTo.textContent = currencyCode

    dropCurrency.appendChild(opFrom)
    dropCurrencyTo.appendChild(opTo)
  })
}

function calculateFrom(e) {
  if (inputFrom.value.length === 0) {
    inputTo.value = ''
  }
  inputFromCal = Number(e.target.value)

  const result = currenciesObjFrom.rates[currenciesObjTo.base] * inputFromCal
  inputTo.value = result
}

function calculateTo(e) {
  if (inputTo.value.length === 0) {
    inputFrom.value = ''
  }

  const result = currenciesObjFrom.rates[currenciesObjTo.base] * inputFromCal
  inputTo.value = result
}
