/**
 * Motor Fiscal Inmobiliario Bilingüe (Español / English)
 * Quesada Inmobiliaria (Santa Pola & Costa Blanca)
 */

const I18N = {
  es: {
    header_subtitle: "Simulador Notarial & Fiscal",
    header_badge: "Asesoría Notarial Gratuita",
    hero_pill: "Estudio Fiscal Especializado Costa Blanca 2026",
    hero_title: `¿Cuánto dinero te quedará <span class="text-quesada underline decoration-quesada/30 decoration-4">REALMENTE limpio</span> al vender tu casa?`,
    hero_desc: `Descubre el saldo exacto que entrará en tu banco deduciendo IRPF, Plusvalía Municipal, cancelación de hipoteca, comisiones y la <strong>exención fiscal total si tienes más de 65 años</strong> o eres <strong>no residente</strong>.`,
    
    // Pasos
    step_labels: [
      "Paso 1 de 4: Precios de la Operación",
      "Paso 2 de 4: Situación Fiscal y Exenciones",
      "Paso 3 de 4: Cargas Hipotecarias y Gastos",
      "Paso 4 de 4: Datos de Contacto y Balance"
    ],
    completed_txt: "completado",

    // Paso 1
    step1_title: "Precios de la Operación",
    step1_subtitle: "Calculamos la ganancia patrimonial exacta sujeta a IRPF en la Comunidad Valenciana.",
    label_sale_price: "Precio Estimado o Deseado de Venta (€) *",
    hint_sale_price: "Por cuánto esperas vender tu propiedad.",
    label_purchase_price: "Precio al que se compró o heredó (€) *",
    hint_purchase_price: "Valor que figura en la escritura original.",
    label_city: "Municipio del Inmueble *",
    placeholder_city: "Ej. Santa Pola, Gran Alacant, Elche, Alicante...",
    label_years_held: "Años en propiedad",
    years_opt_1: "Menos de 5 años",
    years_opt_2: "Entre 5 y 15 años",
    years_opt_3: "Entre 15 y 20 años",
    years_opt_4: "Más de 20 años",
    hint_years: "Determina el coeficiente de Plusvalía Municipal.",
    btn_to_fiscal: "Continuar a Fiscalidad",

    // Paso 2
    step2_title: "Situación Fiscal y Posibles Exenciones",
    step2_subtitle: "Comprobamos si puedes acogerte a exenciones notariales de hasta 30.000 € o más.",
    label_housing_use: "1. ¿Qué uso tiene actualmente la vivienda? *",
    opt_habitual: "Vivienda Habitual",
    opt_segunda: "Segunda Residencia / Playa",
    badge_senior_law: "Exención por Edad (Ley IRPF Art. 33.4.b)",
    label_senior_question: "¿El titular (o alguno de los titulares) tiene 65 años o más? *",
    opt_senior_yes: "🎉 Sí, tiene 65 años o más",
    opt_senior_no: "No, menor de 65 años",
    hint_senior_law: "* En Quesada Inmobiliaria auditamos tu caso para aplicar la exención del 100% de IRPF si es vivienda habitual.",
    label_residency: "3. Residencia Fiscal del Propietario *",
    opt_resident: "Residente en España",
    desc_resident: "Tributa en IRPF",
    opt_non_resident: "No Residente (Extranjero)",
    desc_non_resident: "Retención 3% Notaría (Mod. 211)",
    btn_previous: "Anterior",
    btn_to_costs: "Siguiente: Hipoteca y Gastos",

    // Paso 3
    step3_title: "Cargas Hipotecarias y Gastos de Venta",
    step3_subtitle: "Liquidación en notaría el día de la firma de escrituras.",
    label_mortgage_q: "¿Tienes hipoteca pendiente sobre este inmueble?",
    opt_mortgage_no: "No, libre de cargas",
    opt_mortgage_yes: "Sí, tengo hipoteca activa",
    label_mortgage_balance: "Saldo pendiente aproximado (€)",
    hint_mortgage_fee: "* Incluye ~950 € de aranceles de cancelación registral y gestoría bancaria.",
    label_agency_fee: "Honorarios Quesada Inmobiliaria (%)",
    agency_opt_5: "5% + IVA (Gestión Integral Notaría, Certificados y Marketing)",
    agency_opt_3: "3% + IVA",
    agency_opt_0: "0% (Venta particular sin intermediación)",
    label_docs: "Certificados y Notas Registrales",
    val_docs: "~250 € (CEE + Cédula + Nota Simple)",
    label_urgency: "¿En qué plazo te gustaría vender tu casa? *",
    urgency_opt_urgent: "Lo antes posible (1 a 2 meses) - ¡Tengo prisa!",
    urgency_opt_medium: "En los próximos 3 a 6 meses",
    urgency_opt_long: "Más de 6 meses / Solo calculando opciones",
    btn_to_results: "Ver Mi Líquido en Bolsillo",

    // Paso 4
    step4_title: "¡Tu Liquidación Neta está calculada!",
    step4_subtitle: "Indícanos dónde enviarte el informe notarial oficial de Quesada Inmobiliaria con el certificado de ahorro fiscal.",
    label_name: "Nombre y Apellidos *",
    placeholder_name: "Ej. Antonio Martínez",
    label_phone: "WhatsApp / Teléfono Móvil *",
    placeholder_phone: "Ej. +34 689 894 231",
    hint_phone: "Te enviaremos una copia directa a tu WhatsApp al instante.",
    label_email: "Correo Electrónico *",
    placeholder_email: "antonio@ejemplo.com",
    consent_text: "Acepto la política de privacidad de Quesada Inmobiliaria y autorizo la recepción de la simulación fiscal sin compromiso.",
    btn_calculate_submit: "Descubrir Mi Saldo Limpio",

    // Pantalla de Resultados
    loading_title: "Liquidando con el equipo de Quesada Inmobiliaria...",
    loading_desc: "Cruzando tramos IRPF 2026, normativa municipal y exenciones por edad.",
    alert_senior_title: "¡Exención del 100% de IRPF Aplicada por Quesada Inmobiliaria!",
    senior_desc_p: (saving) => `Al ser <strong>mayor de 65 años</strong> y vender tu <strong>vivienda habitual</strong>, la ley te exime de tributar por la ganancia patrimonial. Te estás ahorrando <span class="font-bold underline">${saving}</span> que se quedan íntegramente en tu bolsillo.`,
    alert_non_res_title: "Régimen Fiscal de No Residente (Modelo 211)",
    non_res_desc_p: (retention) => `El comprador retendrá obligatoriamente un <strong>3% del precio de venta (<span class="font-bold underline">${retention}</span>)</strong> en notaría. En Quesada Inmobiliaria gestionamos la recuperación de retenciones indebidas mediante el Modelo 210.`,
    card_net_label: "Saldo Líquido Real en tu Cuenta Bancaria",
    res_net_caption: (gross) => `Dinero neto tras deducir hipoteca, impuestos, gastos de cancelación y honorarios sobre una venta de <span class="font-bold text-amber-300">${gross}</span>.`,
    table_title: "Balance Notarial Certificado por Quesada Inmobiliaria",
    row_gross: "(+) Precio Bruto de Venta",
    row_mortgage: "(-) Cancelación de Hipoteca",
    tag_mortgage: "(capital + gestoría/aranceles)",
    row_irpf: "(-) IRPF / Ganancia Patrimonial",
    tag_irpf_state_exempt: "(100% EXENTO por ser >65 años en vivienda habitual)",
    tag_irpf_state_normal: "(Según escala estatal de ganancia patrimonial)",
    row_plusvalia: "(-) Plusvalía Municipal Estimada (IIVTNU)",
    row_agency: "(-) Honorarios de Intermediación (Gestión Notarial y Venta con IVA)",
    row_docs: "(-) Gastos Documentales (Certificado CEE, Cédula y Nota Simple)",
    row_total: "(=) TOTAL NETO LIMPIO A COBRAR",
    btn_recalculate: "Recalcular con otros datos",
    config_button: "Configuración Técnica (Webhook n8n / Teléfono de Asesor)",
    modal_title: "Ajustes Quesada Inmobiliaria",
    modal_webhook: "Webhook URL (n8n / CRM)",
    modal_phone: "Teléfono WhatsApp de Juan Pedro Quesada",
    modal_save: "Guardar Cambios",
    footer_claim: "Quesada Inmobiliaria • Expertos en Venta y Fiscalidad Inmobiliaria en Costa Blanca",

    // CTA Box
    cta_title: "¿Deseas auditar esta liquidación con Juan Pedro Quesada?",
    cta_desc: "En <strong>Quesada Inmobiliaria</strong> revisamos tus escrituras, IBI y facturas deducibles (reformas, honorarios) para maximizar el dinero limpio que te llevarás el día de la notaría.",
    cta_btn: "Hablar por WhatsApp con Juan Pedro Quesada",
    wa_prompt_senior: "Deseo confirmar la exención del 100% de IRPF para mayores de 65 años con vuestro equipo.",
    wa_prompt_nonres: "Soy no residente y me gustaría coordinar la retención del 3% y el modelo 210.",
    wa_prompt_general: "Me gustaría revisar estos números con vosotros para coordinar la venta."
  },
  en: {
    header_subtitle: "Notary & Spanish Tax Calculator",
    header_badge: "Free Legal & Notary Advice",
    hero_pill: "Specialized Costa Blanca Tax Assessment 2026",
    hero_title: `How much money will you <span class="text-quesada underline decoration-quesada/30 decoration-4">ACTUALLY walk away with</span> after selling your property?`,
    hero_desc: `Discover the exact net cash proceeds that will reach your bank account after deducting Spanish Capital Gains Tax (IRPF), Municipal Plusvalía, mortgage cancellation, fees and <strong>total tax exemptions for over-65s</strong> or <strong>non-residents (Form 211)</strong>.`,
    
    // Steps
    step_labels: [
      "Step 1 of 4: Property Prices",
      "Step 2 of 4: Tax Status & Exemptions",
      "Step 3 of 4: Mortgage & Selling Costs",
      "Step 4 of 4: Contact Details & Balance Sheet"
    ],
    completed_txt: "completed",

    // Step 1
    step1_title: "Property Operation Prices",
    step1_subtitle: "We calculate the exact taxable capital gain according to Valencian Community regulations.",
    label_sale_price: "Estimated or Desired Sale Price (€) *",
    hint_sale_price: "How much you expect to sell your property for.",
    label_purchase_price: "Original Purchase or Inheritance Price (€) *",
    hint_purchase_price: "Price stated on your original title deeds (Escritura).",
    label_city: "Property Municipality / Town *",
    placeholder_city: "e.g. Santa Pola, Gran Alacant, Elche, Alicante...",
    label_years_held: "Years owned",
    years_opt_1: "Less than 5 years",
    years_opt_2: "Between 5 and 15 years",
    years_opt_3: "Between 15 and 20 years",
    years_opt_4: "More than 20 years",
    hint_years: "Determines the Municipal Plusvalia tax coefficient.",
    btn_to_fiscal: "Continue to Tax Status",

    // Step 2
    step2_title: "Tax Status & Exemptions",
    step2_subtitle: "We check whether you qualify for legal tax exemptions saving up to €30,000 or more.",
    label_housing_use: "1. What is the current use of this property? *",
    opt_habitual: "Primary / Main Residence",
    opt_segunda: "Second Home / Holiday Property",
    badge_senior_law: "Senior Exemption (Spanish Tax Law Art. 33.4.b)",
    label_senior_question: "Is the property owner (or either spouse) 65 years or older? *",
    opt_senior_yes: "🎉 Yes, 65 or older",
    opt_senior_no: "No, under 65",
    hint_senior_law: "* At Quesada Inmobiliaria, we audit your deeds to secure 100% Capital Gains Tax exemption on main homes.",
    label_residency: "3. Tax Residency of the Seller *",
    opt_resident: "Spanish Tax Resident",
    desc_resident: "Files standard IRPF tax return",
    opt_non_resident: "Non-Resident (Foreign Seller)",
    desc_non_resident: "3% Notary Retention (Form 211)",
    btn_previous: "Previous",
    btn_to_costs: "Next: Mortgage & Expenses",

    // Step 3
    step3_title: "Mortgage Cancellation & Sales Expenses",
    step3_subtitle: "Amounts cleared directly at the Notary on the completion day.",
    label_mortgage_q: "Do you have an outstanding mortgage on this property?",
    opt_mortgage_no: "No, free of debts/charges",
    opt_mortgage_yes: "Yes, active mortgage to cancel",
    label_mortgage_balance: "Approximate remaining balance (€)",
    hint_mortgage_fee: "* Includes ~€950 in bank gestoría and Land Registry cancellation fees.",
    label_agency_fee: "Quesada Inmobiliaria Professional Fee (%)",
    agency_opt_5: "5% + VAT (Full Notary Conveyancing, EPC, Marketing & Legal Checks)",
    agency_opt_3: "3% + VAT",
    agency_opt_0: "0% (Private sale without agency)",
    label_docs: "Official Certificates & Registry Searches",
    val_docs: "~€250 (Energy EPC + Habitation Licence + Nota Simple)",
    label_urgency: "In what timeframe would you like to sell? *",
    urgency_opt_urgent: "As soon as possible (1 to 2 months) - Urgent!",
    urgency_opt_medium: "In the next 3 to 6 months",
    urgency_opt_long: "More than 6 months / Just exploring options",
    btn_to_results: "Calculate My Net Cash Proceeds",

    // Step 4
    step4_title: "Your Net Settlement is Calculated!",
    step4_subtitle: "Where should we send your certified Quesada Inmobiliaria completion balance sheet?",
    label_name: "Full Name *",
    placeholder_name: "e.g. John Smith",
    label_phone: "WhatsApp / Mobile Phone *",
    placeholder_phone: "e.g. +44 7123 456789 or +34 689 894 231",
    hint_phone: "We will send an instant copy directly to your WhatsApp.",
    label_email: "Email Address *",
    placeholder_email: "john@example.com",
    consent_text: "I accept Quesada Inmobiliaria's privacy policy and authorize receiving the free notary tax breakdown.",
    btn_calculate_submit: "Reveal My Net Proceeds",

    // Results Screen
    loading_title: "Auditing with Quesada Inmobiliaria's legal team...",
    loading_desc: "Applying 2026 Spanish tax brackets, local municipal rates and senior exemptions.",
    alert_senior_title: "100% Tax Exemption Applied by Quesada Inmobiliaria!",
    senior_desc_p: (saving) => `As you are <strong>over 65 years old</strong> selling your <strong>primary residence</strong>, Spanish law exempts you from paying Capital Gains Tax. You are legally saving <span class="font-bold underline">${saving}</span> that stays in your pocket!`,
    alert_non_res_title: "Non-Resident Tax System (Form 211)",
    non_res_desc_p: (retention) => `The buyer must legally withhold <strong>3% of the sale price (<span class="font-bold underline">${retention}</span>)</strong> at the Notary for the Spanish Tax Agency. Quesada Inmobiliaria manages your Form 210 to claim back any overpaid tax.`,
    card_net_label: "Estimated Net Cash in Your Bank Account",
    res_net_caption: (gross) => `Net amount after clearing mortgage, taxes, notary registry fees and agency commissions on a sale of <span class="font-bold text-amber-300">${gross}</span>.`,
    table_title: "Notary Balance Sheet certified by Quesada Inmobiliaria",
    row_gross: "(+) Gross Sale Price",
    row_mortgage: "(-) Mortgage Cancellation",
    tag_mortgage: "(capital + registry lift/gestoría)",
    row_irpf: "(-) Capital Gains Tax (IRPF)",
    tag_irpf_state_exempt: "(100% EXEMPT - Senior Over 65 on Primary Home)",
    tag_irpf_state_normal: "(Official Spanish progressive savings scale)",
    row_plusvalia: "(-) Estimated Municipal Plusvalía Tax (IIVTNU)",
    row_agency: "(-) Agency Professional Fee (Conveyancing & Sales incl. VAT)",
    row_docs: "(-) Documentation (Energy EPC, Habitation Licence & Nota Simple)",
    row_total: "(=) TOTAL NET CASH TO RECEIVE",
    btn_recalculate: "Recalculate with different figures",
    config_button: "Technical Settings (n8n Webhook / Agent Phone)",
    modal_title: "Quesada Inmobiliaria Settings",
    modal_webhook: "Webhook URL (n8n / CRM)",
    modal_phone: "WhatsApp Phone for Juan Pedro Quesada",
    modal_save: "Save Settings",
    footer_claim: "Quesada Inmobiliaria • Experts in Property Sales and Spanish Tax in Costa Blanca",

    // CTA Box
    cta_title: "Would you like Juan Pedro Quesada to audit this settlement?",
    cta_desc: "At <strong>Quesada Inmobiliaria</strong>, we review your title deeds, IBI property tax receipts and deductible invoices (home improvements, legal costs) to maximize the net money you take home on signing day.",
    cta_btn: "Chat on WhatsApp with Juan Pedro Quesada",
    wa_prompt_senior: "I would like to verify the 100% Capital Gains Tax exemption for over-65s with your team.",
    wa_prompt_nonres: "I am a non-resident seller and would like to arrange the 3% retention and Form 210.",
    wa_prompt_general: "I would like to review these numbers with your team to prepare the sale."
  }
};

const AppState = {
  currentStep: 1,
  totalSteps: 4,
  currentLang: localStorage.getItem('quesada_lang') || 'es',
  webhookUrl: localStorage.getItem('quesada_webhook_url') || '',
  agentPhone: localStorage.getItem('quesada_agent_phone') || '+34689894231',
  calcResult: null
};

document.addEventListener('DOMContentLoaded', () => {
  const webhookInput = document.getElementById('webhook-url-input');
  const agentPhoneInput = document.getElementById('agent-phone-input');
  if (webhookInput) webhookInput.value = AppState.webhookUrl;
  if (agentPhoneInput) agentPhoneInput.value = AppState.agentPhone;

  setLanguage(AppState.currentLang);
  initFormHandler();
});

/**
 * Cambiador de Idioma Dinámico (ES / EN)
 */
function setLanguage(lang) {
  if (!I18N[lang]) lang = 'es';
  AppState.currentLang = lang;
  localStorage.setItem('quesada_lang', lang);

  // Actualizar botones de idioma en header
  const btnEs = document.getElementById('lang-btn-es');
  const btnEn = document.getElementById('lang-btn-en');
  if (lang === 'es') {
    btnEs.className = "px-2 sm:px-2.5 py-1 rounded-md transition-all bg-white text-quesada shadow-sm flex items-center gap-1 font-bold";
    btnEn.className = "px-2 sm:px-2.5 py-1 rounded-md transition-all text-slate-500 hover:text-slate-800 flex items-center gap-1 font-normal";
  } else {
    btnEn.className = "px-2 sm:px-2.5 py-1 rounded-md transition-all bg-white text-quesada shadow-sm flex items-center gap-1 font-bold";
    btnEs.className = "px-2 sm:px-2.5 py-1 rounded-md transition-all text-slate-500 hover:text-slate-800 flex items-center gap-1 font-normal";
  }

  const t = I18N[lang];

  // Traducir todos los elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Traducir Hero Title
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.innerHTML = t.hero_title;

  // Traducir Placeholders
  const cityInput = document.getElementById('property_city');
  if (cityInput) cityInput.placeholder = t.placeholder_city;

  const nameInput = document.getElementById('lead_name');
  if (nameInput) nameInput.placeholder = t.placeholder_name;

  const phoneInput = document.getElementById('lead_phone');
  if (phoneInput) phoneInput.placeholder = t.placeholder_phone;

  const emailInput = document.getElementById('lead_email');
  if (emailInput) emailInput.placeholder = t.placeholder_email;

  const docsInput = document.getElementById('docs-fixed-input');
  if (docsInput) docsInput.value = t.val_docs;

  // Actualizar barra de progreso con el texto del paso actual
  updateProgress(AppState.currentStep);

  // Si ya se mostraron resultados, refrescar los textos de resultados
  if (AppState.calcResult) {
    refreshResultsText(AppState.calcResult);
  }
}

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
      alert(AppState.currentLang === 'en' 
        ? 'Please provide a valid sale price, purchase price and municipality.' 
        : 'Por favor, indica un precio de venta, precio de compra y municipio válidos.');
      return;
    }
  }
  nextStep(targetStep);
}

function updateProgress(stepNumber) {
  const progressBar = document.getElementById('progress-bar');
  const stepLabel = document.getElementById('step-label');
  const progressPercentage = document.getElementById('progress-percentage');

  const t = I18N[AppState.currentLang] || I18N.es;
  const percentage = Math.round((stepNumber / AppState.totalSteps) * 100);

  progressBar.style.width = `${percentage}%`;
  progressPercentage.textContent = `${percentage}% ${t.completed_txt}`;
  stepLabel.textContent = t.step_labels[stepNumber - 1];
}

function initFormHandler() {
  const form = document.getElementById('lead-funnel-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const t = I18N[AppState.currentLang] || I18N.es;
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="animate-spin inline-block mr-2">⏳</span> ${t.loading_title}`;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 1. Ejecutar el Motor de Cálculo Fiscal
    const financialReport = calculateNetProceeds(data);

    // 2. Ejecutar el Lead Scoring
    const scoring = calculateSellerLeadScoring(data, financialReport);

    const payload = {
      agency: "Quesada Inmobiliaria",
      source: "Calculadora Fiscal Santa Pola / Costa Blanca",
      language: AppState.currentLang,
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

  // 2. Gastos de Documentación (CEE, Cédula de 2ª ocupación y Nota Simple)
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
    mortgageCancellationCosts = mortgageDebt > 0 ? 950 : 0;
  }
  const totalMortgageOutflow = mortgageDebt + mortgageCancellationCosts;

  // 5. Cálculo de Ganancia Patrimonial
  const netTransmissionValue = salePrice - totalAgencyFee - estimatedPlusvalia - docCosts;
  const pastAcquisitionExpenses = purchasePrice * 0.10;
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
    nonResidentRetention3 = Math.round(salePrice * 0.03);
    finalTaxAmount = Math.round(rawCapitalGain * 0.19);
  } else {
    if (isOver65 && isHabitual) {
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
    tags.push("Vendedor No Residente (Retención 3%)");
  }

  let category = 'B';
  let label = 'Lead Templado (Cualificado)';

  if (score >= 65) {
    category = 'A';
    label = 'Lead Prioridad Alta 🔥';
  } else if (score < 40) {
    category = 'C';
    label = 'Lead Informativo';
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

    refreshResultsText(payload);
    if (window.lucide) lucide.createIcons();
  }, 1200);
}

function refreshResultsText(payload) {
  const t = I18N[AppState.currentLang] || I18N.es;
  const rep = payload.financial_breakdown;

  // Alerta Senior
  if (rep.is_senior_exempt) {
    document.getElementById('senior-exemption-alert').classList.remove('hidden');
    document.getElementById('senior-desc-p').innerHTML = t.senior_desc_p(formatCurrency(rep.senior_savings));
    document.getElementById('tag-irpf-state').textContent = t.tag_irpf_state_exempt;
  } else {
    document.getElementById('senior-exemption-alert').classList.add('hidden');
    document.getElementById('tag-irpf-state').textContent = t.tag_irpf_state_normal;
  }

  // Alerta No Residente
  if (rep.is_non_resident) {
    document.getElementById('non-resident-alert').classList.remove('hidden');
    document.getElementById('non-res-desc-p').innerHTML = t.non_res_desc_p(formatCurrency(rep.non_resident_retention_3));
  } else {
    document.getElementById('non-resident-alert').classList.add('hidden');
  }

  // Tarjeta Principal
  document.getElementById('res-net-proceeds').textContent = formatCurrency(rep.net_proceeds);
  document.getElementById('res-net-caption').innerHTML = t.res_net_caption(formatCurrency(rep.sale_price));

  // Desglose
  document.getElementById('detail-gross').textContent = formatCurrency(rep.sale_price);
  document.getElementById('detail-mortgage').textContent = rep.total_mortgage_outflow > 0 ? `- ${formatCurrency(rep.total_mortgage_outflow)}` : '0 €';
  document.getElementById('detail-irpf').textContent = rep.irpf_tax_amount > 0 ? `- ${formatCurrency(rep.irpf_tax_amount)}` : (AppState.currentLang === 'en' ? '0 € (Exempt)' : '0 € (Exento)');
  document.getElementById('detail-plusvalia').textContent = `- ${formatCurrency(rep.plusvalia_municipal)}`;
  document.getElementById('detail-agency').textContent = rep.agency_fee_total > 0 ? `- ${formatCurrency(rep.agency_fee_total)}` : '0 €';
  document.getElementById('detail-total-net').textContent = formatCurrency(rep.net_proceeds);

  renderCustomAction(payload);
}

function renderCustomAction(payload) {
  const box = document.getElementById('action-box');
  const t = I18N[AppState.currentLang] || I18N.es;
  const rep = payload.financial_breakdown;
  const lead = payload.lead;
  const city = payload.property_financials.city;

  const netFormatted = formatCurrency(rep.net_proceeds);
  const grossFormatted = formatCurrency(rep.sale_price);

  let waText = "";
  if (AppState.currentLang === 'en') {
    waText = `Hello Juan Pedro, my name is ${lead.name}. I just used the tax calculator at Quesada Inmobiliaria for my property in ${city} (Sale: ${grossFormatted} | Estimated Net: ${netFormatted}). `;
    if (rep.is_senior_exempt) {
      waText += t.wa_prompt_senior;
    } else if (rep.is_non_resident) {
      waText += t.wa_prompt_nonres;
    } else {
      waText += t.wa_prompt_general;
    }
  } else {
    waText = `Hola Juan Pedro, soy ${lead.name}. Acabo de realizar la simulación fiscal en Quesada Inmobiliaria para mi vivienda en ${city} (Venta: ${grossFormatted} | Neto estimado: ${netFormatted}). `;
    if (rep.is_senior_exempt) {
      waText += t.wa_prompt_senior;
    } else if (rep.is_non_resident) {
      waText += t.wa_prompt_nonres;
    } else {
      waText += t.wa_prompt_general;
    }
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
        <h4 class="font-extrabold text-slate-900 text-sm sm:text-base">${t.cta_title}</h4>
        <p class="text-xs text-slate-600 mt-1">
          ${t.cta_desc}
        </p>
      </div>
    </div>
    <div class="pt-2">
      <a href="${waUrl}" target="_blank" class="w-full py-3.5 bg-quesada hover:bg-quesada-dark text-white font-bold text-center rounded-xl text-xs sm:text-sm shadow-md shadow-quesada/20 flex items-center justify-center gap-2 transition">
        <i data-lucide="message-circle" class="w-4 h-4"></i> ${t.cta_btn}
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

  alert(AppState.currentLang === 'en' 
    ? 'Quesada Inmobiliaria settings saved successfully.' 
    : 'Configuración de Quesada Inmobiliaria guardada correctamente.');
  toggleConfigModal();
}
