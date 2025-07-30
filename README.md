# 💱 Conversor de Moneda – Semana 15

## 🚀 Descripción

Aplicación web que permite convertir montos entre distintas monedas utilizando una API de tasas de cambio en tiempo real. El usuario puede seleccionar la moneda de origen y destino, ingresar un monto y obtener el valor actualizado según la tasa vigente.

---

## 🎯 Funcionalidades

- Ingreso de monto a convertir
- Selección de moneda base y moneda destino
- Conversión instantánea al hacer clic en "Convertir"
- Actualización automática al cambiar los select o el monto
- Manejo de errores (inputs vacíos, sin conexión, etc.)

---

## 🔧 Tecnologías

- HTML
- CSS
- JavaScript (Vanilla)
- API externa para tasas de cambio

---

## 🌐 API recomendada

**Frankfurter.app**

- Sitio: [https://www.frankfurter.app](https://www.frankfurter.app)
- Ventajas:
  - Gratuita
  - Sin autenticación (no requiere API key)
  - Fácil de usar: `https://api.frankfurter.app/latest?from=USD&to=EUR`

### Ejemplo de respuesta:

```json
{
  "amount": 1,
  "base": "USD",
  "date": "2024-12-19",
  "rates": {
    "EUR": 0.9173
  }
}