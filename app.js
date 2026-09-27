/**
 * Motor Fiscal Inmobiliario y Calculadora de Beneficio Neto Limpio
 * Cumplimiento Ley IRPF España (Tramos del Ahorro), Exención +65 años y Régimen No Residentes.
 */

const AppState = {
  currentStep: 1,
  totalSteps: 4,
  webhookUrl: localStorage.getItem('neto_webhook_url') || '',
  agentPhone: localStorage.getItem('neto_agent_phone') || '+34600000000',
  calcResult: null
};

document.addEventListener('DOMContentLoaded', () => {
  const webhookInput = document.getElementById('webhook-url-input');
  const agentPhoneInput = document.getElementById('agent-phone-input');
  if (webhookInput) webhookInput.value = AppState.webhookUrl;
  if (agentPhoneInput) agentPhoneInput.value = AppState.agentPhone;

  initFormHandler();
});

function toggleMortgageInput(hasMortgage) {
  const container = document.getElementById('mortgage-amount-container');
  if (hasMortgage) {
    container.classList.remove('hidden');
  } else {
    container.classList.add('hidden');
  }
}

function nextStep(stepNumber) {
  document.getElementById(`step-${AppState.currentStep}`).classList.add('hidden');
  document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
  AppState.currentStep = stepNumber;

  updateProgress(stepNumber);
  if (window.lucide) lucide.createIcons();
  window.scrollTo({ top: 80, behavior: 'smooth' });
}

function validateAndGoStep(targetStep) {
  if (targetStep === 2) {
    const sale = Number(document.getElementById('sale_price').value);
    const purchase = Number(document.getElementById('purchase_price').value);
    const city = document.getElementById('property_city').value.trim();

    if (!sale || sale <= 0 || !purchase || purchase <= 0 || !city) {
      alert('Por favor, indica un precio de venta, precio de compra y municipio válidos.');
      return;
    }
  }
  nextStep(targetStep);
}

function updateProgress(stepNumber) {
  const progressBar = document.getElementById('progress-bar');
  const stepLabel = document.getElementById('step-label');
  const progressPercentage = document.getElementById('progress-percentage');

  const stepsLabels = [
    "Paso 1 de 4: Precios de la Operación",
    "Paso 2 de 4: Situación Fiscal y Exenciones",
    "Paso 3 de 4: Cargas Hipotecarias y Gastos",
    "Paso 4 de 4: Datos de Contacto y Balance"
  ];

  const percentage = Math.round((stepNumber / AppState.totalSteps) * 100);
  progressBar.style.width = `${percentage}%`;
  progressPercentage.textContent = `${percentage}% completado`;
  stepLabel.textContent = stepsLabels[stepNumber - 1];
}

function initFormHandler() {
  const form = document.getElementById('lead-funnel-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="animate-spin inline-block mr-2">⏳</span> Calculando Balance Notarial...`;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 1. Ejecutar el Motor de Cálculo Fiscal
    const financialReport = calculateNetProceeds(data);

    // 2. Ejecutar el Lead Scoring
    const scoring = calculateSellerLeadScoring(data, financialReport);

    const payload = {
      timestamp: new Date().toISOString(),
      lead: {
        name: data.lead_name,
        phone: data.lead_phone,
        email: data.lead_email
      },
      property_financials: {
        sale_price: Number(data.sale_price),
        purchase_price: Number(data.purchase_price),
        city: data.property_city,
        years_held: Number(data.years_held)
      },
      fiscal_profile: {
        housing_use: data.housing_use,
        is_over_65: data.is_over_65 === 'si',
        tax_residency: data.tax_residency
      },
      mortgage_and_costs: {
        has_mortgage: data.has_mortgage === 'si',
        mortgage_balance: data.has_mortgage === 'si' ? Number(data.mortgage_balance) : 0,
        agency_percent: Number(data.agency_fee_percent),
        sale_urgency: data.sale_urgency
      },
      financial_breakdown: financialReport,
      lead_scoring: scoring
    };

    AppState.calcResult = payload;

    // Enviar a Webhook si existe
    if (AppState.webhookUrl) {
      try {
        await fetch(AppState.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Webhook no accesible:', err);
      }
    }

    showFinancialResults(payload);
  });
}

/**
 * Motor de Cálculo Notarial y Fiscal Completo (España 2026)
 */
function calculateNetProceeds(data) {
  const salePrice = Number(data.sale_price);
  const purchasePrice = Number(data.purchase_price);
  const yearsHeld = Number(data.years_held) || 8;
  const isOver65 = data.is_over_65 === 'si';
  const isHabitual = data.housing_use === 'habitual';
  const isNonResident = data.tax_residency === 'no_residente';

  // 1. Honorarios de Intermediación Inmobiliaria
  const agencyPercent = Number(data.agency_fee_percent) || 0;
  const agencyFeeNet = salePrice * (agencyPercent / 100);
  const agencyFeeIVA = agencyFeeNet * 0.21;
  const totalAgencyFee = agencyFeeNet + agencyFeeIVA;

  // 2. Gastos de Documentación (CEE, Cédula de habitabilidad, Nota Simple informativa)
  const docCosts = 250;

  // 3. Plusvalía Municipal (IIVTNU) Estimada
  // Según RD-Ley 26/2021 sobre incremento de valor del suelo.
  let plusvaliaRate = 0.015;
  if (yearsHeld > 10) plusvaliaRate = 0.022;
  const estimatedPlusvalia = Math.round(salePrice * plusvaliaRate);

  // 4. Cancelación de Hipoteca
  let mortgageDebt = 0;
  let mortgageCancellationCosts = 0;
  if (data.has_mortgage === 'si') {
    mortgageDebt = Number(data.mortgage_balance) || 0;
    // Aranceles de notario, registro y comisión gestoría bancaria para carta de pago
    mortgageCancellationCosts = mortgageDebt > 0 ? 950 : 0;
  }
  const totalMortgageOutflow = mortgageDebt + mortgageCancellationCosts;

  // 5. Cálculo de Ganancia Patrimonial
  // Valor Transmisión Neto = Precio Venta - Honorarios Agencia - Plusvalía Municipal - Docs
  const netTransmissionValue = salePrice - totalAgencyFee - estimatedPlusvalia - docCosts;

  // Valor Adquisición Neto = Precio Compra + Gastos de Adquisición históricos (aprox 10% ITP/Notaría)
  const pastAcquisitionExpenses = purchasePrice * 0.10;
  const netAcquisitionValue = purchasePrice + pastAcquisitionExpenses;

  const rawCapitalGain = Math.max(0, netTransmissionValue - netAcquisitionValue);

  // 6. Liquidación de Impuesto IRPF o IRNR
  let finalTaxAmount = 0;
  let potentialTaxAmount = 0;
  let isSeniorExempt = false;
  let nonResidentRetention3 = 0;

  // Calcular cuota teórica en IRPF
  if (rawCapitalGain > 0) {
    potentialTaxAmount = calculateSpanishCapitalGainsTax(rawCapitalGain);
  }

  if (isNonResident) {
    // Régimen No Residentes
    nonResidentRetention3 = Math.round(salePrice * 0.03); // Retención obligatoria 3% Modelo 211
    finalTaxAmount = Math.round(rawCapitalGain * 0.19); // 19% estándar UE en Modelo 210
  } else {
    // Régimen Residente
    if (isOver65 && isHabitual) {
      // EXENCIÓN TOTAL DEL ART. 33.4.b LEY IRPF
      isSeniorExempt = true;
      finalTaxAmount = 0;
    } else {
      finalTaxAmount = potentialTaxAmount;
    }
  }

  // 7. Saldo Líquido Final en el Bolsillo
  const totalDeductions = totalMortgageOutflow + finalTaxAmount + estimatedPlusvalia + totalAgencyFee + docCosts;
  const netProceeds = salePrice - totalDeductions;

  return {
    sale_price: salePrice,
    purchase_price: purchasePrice,
    raw_capital_gain: rawCapitalGain,
    agency_fee_total: Math.round(totalAgencyFee),
    doc_costs: docCosts,
    plusvalia_municipal: estimatedPlusvalia,
    mortgage_debt: mortgageDebt,
    mortgage_cancellation_costs: mortgageCancellationCosts,
    total_mortgage_outflow: totalMortgageOutflow,
    irpf_tax_amount: Math.round(finalTaxAmount),
    potential_irpf_without_exemption: Math.round(potentialTaxAmount),
    is_senior_exempt: isSeniorExempt,
    senior_savings: isSeniorExempt ? Math.round(potentialTaxAmount) : 0,
    is_non_resident: isNonResident,
    non_resident_retention_3: nonResidentRetention3,
    total_deductions: Math.round(totalDeductions),
    net_proceeds: Math.round(netProceeds)
  };
}

/**
 * Tramos del IRPF Ahorro España 2026:
 * - Hasta 6.000 €: 19%
 * - De 6.000 a 50.000 €: 21%
 * - De 50.000 a 200.000 €: 23%
 * - De 200.000 a 300.000 €: 27%
 * - Más de 300.000 €: 28%
 */
function calculateSpanishCapitalGainsTax(gain) {
  let tax = 0;

  if (gain <= 6000) {
    tax = gain * 0.19;
  } else if (gain <= 50000) {
    tax = 6000 * 0.19 + (gain - 6000) * 0.21;
  } else if (gain <= 200000) {
    tax = 6000 * 0.19 + 44000 * 0.21 + (gain - 50000) * 0.23;
  } else if (gain <= 300000) {
    tax = 6000 * 0.19 + 44000 * 0.21 + 150000 * 0.23 + (gain - 200000) * 0.27;
  } else {
    tax = 6000 * 0.19 + 44000 * 0.21 + 150000 * 0.23 + 100000 * 0.27 + (gain - 300000) * 0.28;
  }

  return tax;
}

/**
 * Lead Scoring Especializado en Vendedores de Alta Cualificación
 */
function calculateSellerLeadScoring(data, report) {
  let score = 0;
  let tags = [];

  // Urgencia
  if (data.sale_urgency === 'urgente') {
    score += 40;
    tags.push("Urgencia Inmediata (<2 meses)");
  } else if (data.sale_urgency === 'medio') {
    score += 25;
    tags.push("Plazo Estándar (3-6 meses)");
  } else {
    score += 10;
  }

  // Beneficio por Exención +65 (Lead Diamante: agradecimiento y fidelidad extrema)
  if (report.is_senior_exempt && report.senior_savings > 5000) {
    score += 35;
    tags.push(`Ahorro Fiscal Senior (+${formatCurrency(report.senior_savings)})`);
  }

  // Hipoteca activa a liquidar (cliente con motivación de desapalancamiento)
  if (data.has_mortgage === 'si') {
    score += 15;
    tags.push("Cancelación Hipotecaria");
  }

  // Perfil No Residente
  if (data.tax_residency === 'no_residente') {
    score += 20;
    tags.push("Vendedor No Residente (Requiere Asesoría Notarial)");
  }

  let category = 'B';
  let label = 'Lead Templado (Cualificado)';
  let color = 'bg-amber-100 text-amber-900 border-amber-300';

  if (score >= 65) {
    category = 'A';
    label = 'Lead Prioridad Alta 🔥 (Cierre Inminente)';
    color = 'bg-emerald-100 text-emerald-900 border-emerald-400';
  } else if (score < 40) {
    category = 'C';
    label = 'Lead Informativo / Curioso';
    color = 'bg-slate-100 text-slate-800 border-slate-300';
  }

  return { score, category, label, color, tags };
}

function showFinancialResults(payload) {
  document.getElementById('funnel-intro').classList.add('hidden');
  document.getElementById('progress-container').classList.add('hidden');
  document.getElementById('lead-funnel-form').classList.add('hidden');

  const resultsScreen = document.getElementById('results-screen');
  resultsScreen.classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('calculating-state').classList.add('hidden');
    document.getElementById('results-content').classList.remove('hidden');

    const rep = payload.financial_breakdown;
    const lead = payload.lead;

    // Alertas Condicionales
    if (rep.is_senior_exempt) {
      document.getElementById('senior-exemption-alert').classList.remove('hidden');
      document.getElementById('senior-savings-amount').textContent = formatCurrency(rep.senior_savings);
      document.getElementById('tag-irpf-state').textContent = "(100% EXENTO por ser >65 años en vivienda habitual)";
    } else {
      document.getElementById('senior-exemption-alert').classList.add('hidden');
      document.getElementById('tag-irpf-state').textContent = "(Según escala estatal de ganancia patrimonial)";
    }

    if (rep.is_non_resident) {
      document.getElementById('non-resident-alert').classList.remove('hidden');
      document.getElementById('retention-3-amount').textContent = formatCurrency(rep.non_resident_retention_3);
    } else {
      document.getElementById('non-resident-alert').classList.add('hidden');
    }

    // Gran Cifra Neto Limpio
    document.getElementById('res-net-proceeds').textContent = formatCurrency(rep.net_proceeds);
    document.getElementById('res-gross-sale').textContent = formatCurrency(rep.sale_price);

    // Tabla de Desglose
    document.getElementById('detail-gross').textContent = formatCurrency(rep.sale_price);
    document.getElementById('detail-mortgage').textContent = rep.total_mortgage_outflow > 0 ? `- ${formatCurrency(rep.total_mortgage_outflow)}` : '0 €';
    document.getElementById('detail-irpf').textContent = rep.irpf_tax_amount > 0 ? `- ${formatCurrency(rep.irpf_tax_amount)}` : '0 € (Exento)';
    document.getElementById('detail-plusvalia').textContent = `- ${formatCurrency(rep.plusvalia_municipal)}`;
    document.getElementById('detail-agency').textContent = rep.agency_fee_total > 0 ? `- ${formatCurrency(rep.agency_fee_total)}` : '0 €';
    document.getElementById('detail-total-net').textContent = formatCurrency(rep.net_proceeds);

    // Renderizar Call To Action personalizado para WhatsApp
    renderCustomAction(payload);

    if (window.lucide) lucide.createIcons();
  }, 1300);
}

function renderCustomAction(payload) {
  const box = document.getElementById('action-box');
  const rep = payload.financial_breakdown;
  const lead = payload.lead;
  const city = payload.property_financials.city;

  const netFormatted = formatCurrency(rep.net_proceeds);
  const grossFormatted = formatCurrency(rep.sale_price);

  let waText = `Hola, soy ${lead.name}. He realizado la simulación para vender mi vivienda en ${city} por ${grossFormatted}. Mi saldo neto resultante es ${netFormatted}. `;
  if (rep.is_senior_exempt) {
    waText += `Deseo confirmar la aplicación de la exención fiscal para mayores de 65 años con vuestro equipo notarial.`;
  } else if (rep.is_non_resident) {
    waText += `Deseo coordinar la retención del 3% y el modelo 210 de no residente.`;
  } else {
    waText += `Me gustaría revisar estos números con un asesor para preparar la venta.`;
  }

  const waUrl = `https://wa.me/${AppState.agentPhone.replace(/\+/g, '')}?text=${encodeURIComponent(waText)}`;

  box.className = "bg-emerald-50 border-2 border-emerald-500 rounded-xl p-5 space-y-3";
  box.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
        <i data-lucide="check-check" class="w-5 h-5"></i>
      </div>
      <div>
        <h4 class="font-extrabold text-slate-900 text-sm sm:text-base">¿Quieres auditar esta liquidación con nuestro equipo notarial?</h4>
        <p class="text-xs text-slate-600 mt-1">
          Podemos revisar tus escrituras y recibos de IBI para deducir gastos adicionales (reformas, facturas de compra) y elevar aún más el saldo neto que te llevarás.
        </p>
      </div>
    </div>
    <div class="pt-2">
      <a href="${waUrl}" target="_blank" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition">
        <i data-lucide="message-circle" class="w-4 h-4"></i> Hablar con Asesor Fiscal Inmobiliario por WhatsApp
      </a>
    </div>
  `;
}

function formatCurrency(val) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
}

function resetFunnel() {
  location.reload();
}

function toggleConfigModal() {
  document.getElementById('config-modal').classList.toggle('hidden');
}

function saveConfig() {
  const url = document.getElementById('webhook-url-input').value.trim();
  const phone = document.getElementById('agent-phone-input').value.trim();

  AppState.webhookUrl = url;
  AppState.agentPhone = phone;

  localStorage.setItem('neto_webhook_url', url);
  localStorage.setItem('neto_agent_phone', phone);

  alert('Configuración guardada.');
  toggleConfigModal();
}
