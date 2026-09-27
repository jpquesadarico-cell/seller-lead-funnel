# Simulador Fiscal de Beneficio Neto para Vendedores Inmobiliarios

Un embudo de captación de propietarios orientado a resolver la verdadera duda que detiene la decisión de venta: 
**"¿Cuánto dinero real me entra limpio en el bolsillo al salir de la notaría?"**

---

## 1. El Gancho Psicológico y Fiscal (Por qué convierte x3)

A diferencia de una tasación genérica, esta herramienta calcula la liquidación final deduciendo:
1. **IRPF por Ganancia Patrimonial**: Aplicando la escala progresiva del ahorro (19% al 28%).
2. **Exención Fiscal para Mayores de 65 años (Art. 33.4.b Ley IRPF)**: Si venden su vivienda habitual, quedan **100% exentos de IRPF**.
3. **No Residentes (IRNR / Modelo 211 & 210)**: Retención obligatoria del **3% en Notaría** sobre el precio total de venta.
4. **Cancelación Registral de Hipoteca**: Saldo deudor + provisión de aranceles notariales, registrales y gestoría bancaria (~950 €).
5. **Plusvalía Municipal (IIVTNU)**: Estimación según años de propiedad y normativa actual.
6. **Comisiones de Intermediación**: Cálculo con 21% de IVA deducible de la ganancia.
7. **Gastos de Documentación**: Certificado de Eficiencia Energética (CEE), Cédula de Habitabilidad y Nota Simple (~250 €).

---

## 2. Flujo de Datos y Webhook JSON

Cuando el cliente hace clic en *"Descubrir Mi Saldo Limpio"*, el embudo despacha este objeto JSON a tu Webhook (Make / Zapier / CRM):

```json
{
  "timestamp": "2026-09-27T12:00:00.000Z",
  "lead": {
    "name": "Fernando Ramos",
    "phone": "+34612345678",
    "email": "fernando@ejemplo.com"
  },
  "property_financials": {
    "sale_price": 260000,
    "purchase_price": 150000,
    "city": "Madrid",
    "years_held": 8
  },
  "fiscal_profile": {
    "housing_use": "habitual",
    "is_over_65": true,
    "tax_residency": "residente"
  },
  "financial_breakdown": {
    "sale_price": 260000,
    "total_mortgage_outflow": 45950,
    "irpf_tax_amount": 0,
    "is_senior_exempt": true,
    "senior_savings": 19480,
    "plusvalia_municipal": 3900,
    "agency_fee_total": 15730,
    "total_deductions": 65830,
    "net_proceeds": 194170
  },
  "lead_scoring": {
    "score": 90,
    "category": "A",
    "label": "Lead Prioridad Alta 🔥 (Cierre Inminente)",
    "tags": ["Urgencia Inmediata", "Ahorro Fiscal Senior (+19.480 €)"]
  }
}
```

---

## 3. Copys Publicitarios Ganadores

### Anuncio 1: Enfoque Senior (+65 años y Familias)
* **Canal**: Facebook & Instagram (Segmentación 55-65+ años, o hijos de 35-50 cuidando patrimonio familiar).
* **Titular**: *"¿Sabías que si tienes más de 65 años no pagas ni un euro de IRPF al vender tu casa?"*
* **Texto**: 
  > *La Ley del IRPF premia a los mayores de 65 años eximiéndolos del 100% del impuesto sobre la ganancia patrimonial al vender su vivienda habitual. Averigua exactamente cuántos miles de euros te ahorras con nuestro simulador gratuito en 1 minuto.*

### Anuncio 2: Enfoque No Residentes / Extranjeros
* **Canal**: Google Ads / Meta Ads (Idiomas: Español, Inglés, Francés, Alemán en zonas de costa y grandes capitales).
* **Titular**: *"¿Vendes tu propiedad en España sin ser residente? Calcula la retención del 3% y el saldo neto."*
* **Texto**: 
  > *Evita sorpresas en notaría con el Modelo 211 y recupera las retenciones indebidas. Simula tu liquidación fiscal completa antes de firmar las arras.*

---

## 4. Prueba en Local

El servidor local ya se encuentra activo en:
👉 **http://localhost:5500**

Solo recarga la pestaña en tu navegador para ver la nueva versión.
