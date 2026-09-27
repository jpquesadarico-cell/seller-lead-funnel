/**
 * Motor Fiscal Inmobiliario - Quesada Inmobiliaria (Santa Pola & Costa Blanca)
 * Asesoría Notarial, Cumplimiento Ley IRPF y Simulación de Saldo Líquido.
 */

const AppState = {
  currentStep: 1,
  totalSteps: 4,
  webhookUrl: localStorage.getItem('quesada_webhook_url') || '',
  agentPhone: localStorage.getItem('quesada_agent_phone') || '+34689894231',
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
    submitBtn.innerHTML = `<span class="animate-spin inline-block mr-2">⏳</span> Auditando con Quesada Inmobiliaria...`;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 1. Ejecutar el Motor de Cálculo Fiscal
    const financialReport = calculateNetProceeds(data);

    // 2. Ejecutar el Lead Scoring
    const scoring = calculateSellerLeadScoring(data, financialReport);

    const payload = {
      agency: "Quesada Inmobiliaria",
      source: "Calculadora Fiscal Santa Pola / Costa Blanca",
      timestamp: new Date().toISOString(),
      lead: {
        name: data.lead_name,
        phone: data.lead_phone,
        email: data.lead_email
      },
      property_financials: {
        sale_price: Number(data.sale_price),
        purchase_price: Number(data.purchase_price),
        city: data.property_city || "Santa Pola",
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

    // Enviar a Webhook si existe (n8n / CRM)
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
 * Motor de Cálculo Notarial y Fiscal (Comunidad Valenciana / España 2026)
 */
function calculateNetProceeds(data) {
  const salePrice = Number(data.sale_price);
  const purchasePrice = Number(data.purchase_price);
  const yearsHeld = Number(data.years_held) || 8;
  const isOver65 = data.is_over_65 === 'si';
  const isHabitual = data.housing_use === 'habitual';
  const isNonResident = data.tax_residency === 'no_residente';

  // 1. Honorarios Quesada Inmobiliaria
  const agencyPercent = Number(data.agency_fee_percent) || 0;
  const agencyFeeNet = salePrice * (agencyPercent / 100);
  const agencyFeeIVA = agencyFeeNet * 0.21;
  const totalAgencyFee = agencyFeeNet + agencyFeeIVA;

  // 2. Gastos de Documentación (CEE, Cédula de 2ª ocupación y Nota Simple oficial)
  const docCosts = 250;

  // 3. Plusvalía Municipal (IIVTNU)
  let plusvaliaRate = 0.015;
  if (yearsHeld > 10) plusvaliaRate = 0.022;
  const estimatedPlusvalia = Math.round(salePrice * plusvaliaRate);

  // 4. Cancelación de Hipoteca
  let mortgageDebt = 0;
  let mortgageCancellationCosts = 0;
  if (data.has_mortgage === 'si') {
    mortgageDebt = Number(data.mortgage_balance) || 0;
    // Aranceles notariales, registrales y gestoría bancaria para cancelación registral
    mortgageCancellationCosts = mortgageDebt > 0 ? 950 : 0;
  }
  const totalMortgageOutflow = mortgageDebt + mortgageCancellationCosts;

  // 5. Cálculo de Ganancia Patrimonial
  const netTransmissionValue = salePrice - totalAgencyFee - estimatedPlusvalia - docCosts;
  const pastAcquisitionExpenses = purchasePrice * 0.10; // ITP 10% Comunidad Valenciana + notaría original
  const netAcquisitionValue = purchasePrice + pastAcquisitionExpenses;

  const rawCapitalGain = Math.max(0, netTransmissionValue - netAcquisitionValue);

  // 6. Liquidación de Impuesto IRPF o IRNR
  let finalTaxAmount = 0;
  let potentialTaxAmount = 0;
  let isSeniorExempt = false;
  let nonResidentRetention3 = 0;

  if (rawCapitalGain > 0) {
    potentialTaxAmount = calculateSpanishCapitalGainsTax(rawCapitalGain);
  }

  if (isNonResident) {
    // Régimen de No Residentes (Costa Blanca - Compradores y Vendedores Internacionales)
    nonResidentRetention3 = Math.round(salePrice * 0.03); // Retención obligatoria 3% Modelo 211 en notaría
    finalTaxAmount = Math.round(rawCapitalGain * 0.19); // Modelo 210
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

  // 7. Saldo Líquido Final
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
 * Escala Progresiva del Ahorro IRPF España 2026:
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
 * Lead Scoring Especializado Quesada Inmobiliaria
 */
function calculateSellerLeadScoring(data, report) {
  let score = 0;
  let tags = [];

  if (data.sale_urgency === 'urgente') {
    score += 40;
    tags.push("Urgencia Inmediata (<2 meses)");
  } else if (data.sale_urgency === 'medio') {
    score += 25;
    tags.push("Plazo Estándar (3-6 meses)");
  } else {
    score += 10;
  }

  if (report.is_senior_exempt && report.senior_savings > 3000) {
    score += 35;
    tags.push(`Exención Fiscal Senior (+${formatCurrency(report.senior_savings)})`);
  }

  if (data.has_mortgage === 'si') {
    score += 15;
    tags.push("Cancelación Hipotecaria");
  }

  if (data.tax_residency === 'no_residente') {
    score += 25;
    tags.push("Vendedor No Residente (Gestión Retención 3% Notaría)");
  }

  let category = 'B';
  let label = 'Lead Templado (Cualificado)';

  if (score >= 65) {
    category = 'A';
    label = 'Lead Prioridad Alta 🔥 (Cierre Inminente)';
  } else if (score < 40) {
    category = 'C';
    label = 'Lead Informativo / Curioso';
  }

  return { score, category, label, tags };
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

    renderCustomAction(payload);
    if (window.lucide) lucide.createIcons();
  }, 1200);
}

function renderCustomAction(payload) {
  const box = document.getElementById('action-box');
  const rep = payload.financial_breakdown;
  const lead = payload.lead;
  const city = payload.property_financials.city;

  const netFormatted = formatCurrency(rep.net_proceeds);
  const grossFormatted = formatCurrency(rep.sale_price);

  let waText = `Hola Juan Pedro, soy ${lead.name}. Acabo de realizar la simulación fiscal en Quesada Inmobiliaria para mi vivienda en ${city} (Venta: ${grossFormatted} | Neto estimado: ${netFormatted}). `;
  if (rep.is_senior_exempt) {
    waText += `Deseo confirmar la exención del 100% de IRPF para mayores de 65 años con vuestro equipo.`;
  } else if (rep.is_non_resident) {
    waText += `Soy no residente y me gustaría coordinar la retención del 3% y el modelo 210.`;
  } else {
    waText += `Me gustaría revisar estos números con vosotros para coordinar la venta.`;
  }

  const cleanPhone = AppState.agentPhone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;

  box.className = "bg-quesada-soft border-2 border-quesada rounded-xl p-5 space-y-3";
  box.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="w-9 h-9 rounded-full bg-quesada text-white flex items-center justify-center shrink-0">
        <i data-lucide="check-check" class="w-5 h-5"></i>
      </div>
      <div>
        <h4 class="font-extrabold text-slate-900 text-sm sm:text-base">¿Deseas auditar esta liquidación con Juan Pedro Quesada?</h4>
        <p class="text-xs text-slate-600 mt-1">
          En <strong>Quesada Inmobiliaria</strong> revisamos tus escrituras, IBI y facturas deducibles (reformas, honorarios) para maximizar el dinero limpio que te llevarás el día de la notaría.
        </p>
      </div>
    </div>
    <div class="pt-2">
      <a href="${waUrl}" target="_blank" class="w-full py-3.5 bg-quesada hover:bg-quesada-dark text-white font-bold text-center rounded-xl text-xs sm:text-sm shadow-md shadow-quesada/20 flex items-center justify-center gap-2 transition">
        <i data-lucide="message-circle" class="w-4 h-4"></i> Hablar por WhatsApp con Juan Pedro Quesada
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

  localStorage.setItem('quesada_webhook_url', url);
  localStorage.setItem('quesada_agent_phone', phone);

  alert('Configuración de Quesada Inmobiliaria guardada correctamente.');
  toggleConfigModal();
}
