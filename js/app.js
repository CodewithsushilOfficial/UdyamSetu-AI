/**
 * UDYAMSETU AI — APPLICATION CORE
 * "From Business Idea to Financing Readiness"
 * Vanilla JavaScript Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize Application Modules
  App.init();
});

const App = (() => {
  /* ========================================================================
     1. MOCK DATA STORE (Easily replaceable with Backend REST/GraphQL APIs)
     ======================================================================== */
  const state = {
    user: {
      name: "Ramesh Yadav",
      role: "Rural Entrepreneur",
      location: "Sadar, Varanasi, Uttar Pradesh",
      state: "Uttar Pradesh",
      district: "Varanasi",
      block: "Sadar",
      margin: 100000,
      activeBusiness: "Dairy Farming"
    },

    businessIdeas: [
      {
        id: "dairy",
        name: "Dairy Farming",
        category: "Milk Production",
        demand: "High Demand",
        suitability: "Suitable",
        investment: "Medium",
        probability: 85,
        defaultCost: 1000000,
        margin: 100000,
        image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&q=80",
        description: "10 Indigenous / HF Cross breed milch cattle unit with automated milking parlor and direct milk cooperative tie-up in Sadar block.",
        dailyYield: "120 - 150 Litres/day",
        roi: "22% - 28%",
        subsidies: "NABARD DEDS / PMEGP (up to 33% capital subsidy for OBC/General in rural UP)"
      },
      {
        id: "veggie",
        name: "Vegetable Processing",
        category: "Unit",
        demand: "Good Return",
        suitability: "Medium Investment",
        investment: "Medium",
        probability: 78,
        defaultCost: 650000,
        margin: 65000,
        image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=400&q=80",
        description: "Dehydration, paste packaging & pickle processing for excess tomato, peas and chillies grown across Varanasi agricultural belt.",
        dailyYield: "250 kg processed output/day",
        roi: "24% - 30%",
        subsidies: "PMFME scheme providing 35% credit-linked capital subsidy"
      },
      {
        id: "retail",
        name: "Rural Retail Store",
        category: "General Store",
        demand: "Stable Demand",
        suitability: "Low Investment",
        investment: "Low",
        probability: 72,
        defaultCost: 350000,
        margin: 35000,
        image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80",
        description: "Modernized rural kirana and agri-inputs retail counter with digital UPI checkout and doorstep livestock feed supplies.",
        dailyYield: "Daily Footfall: 60 - 90 customers",
        roi: "18% - 22%",
        subsidies: "MUDRA Shishu / Kishore Loan scheme with zero collateral"
      }
    ],

    schemes: [
      {
        id: "pmegp",
        code: "PMEGP",
        name: "Prime Minister's Employment Generation Programme",
        agency: "KVIC / MSME (Central)",
        maxLoan: 2500000,
        subsidyPct: "25% - 35%",
        interest: "7.0% - 8.5%",
        eligibility: "Rural entrepreneurs with minimum 8th class pass for projects above ₹10 Lakhs.",
        benefits: "Capital subsidy credited upfront into beneficiary bank account with 3-year lock-in."
      },
      {
        id: "nabard",
        code: "NABARD Dairy",
        name: "Dairy Entrepreneurship Development Scheme (DEDS)",
        agency: "NABARD & Dept. of Animal Husbandry (Central)",
        maxLoan: 1000000,
        subsidyPct: "25% (33.3% for SC/ST)",
        interest: "6.5% - 7.5%",
        eligibility: "Farmers, individual entrepreneurs, and self-help groups in rural areas.",
        benefits: "Concessional refinancing with back-ended capital subsidy on commercial milch cattle units."
      },
      {
        id: "pmfme",
        code: "PMFME",
        name: "PM Formalisation of Micro Food Processing Enterprises",
        agency: "Ministry of Food Processing (MoFPI)",
        maxLoan: 1000000,
        subsidyPct: "35% (Max ₹10 Lakh)",
        interest: "7.5% - 8.5%",
        eligibility: "Existing or prospective micro food processors adhering to One District One Product (ODOP).",
        benefits: "Seed capital support + handholding for FSSAI registration and marketing branding."
      }
    ],

    marketCommodities: {
      tomato: {
        name: "Tomato",
        price: "₹ 18/kg",
        demand: "High",
        competition: "Low",
        trendChange: "+38% since Jan",
        points: [15, 17, 20, 18, 20, 23, 25, 27]
      },
      milk: {
        name: "Cow Milk",
        price: "₹ 48/L",
        demand: "Very High",
        competition: "Low",
        trendChange: "+12% since Jan",
        points: [42, 43, 44, 45, 45, 46, 47, 48]
      },
      potato: {
        name: "Potato",
        price: "₹ 14/kg",
        demand: "Moderate",
        competition: "Medium",
        trendChange: "+8% since Jan",
        points: [11, 12, 12, 13, 13, 14, 14, 14]
      },
      mustard: {
        name: "Mustard Oil",
        price: "₹ 135/L",
        demand: "High",
        competition: "Medium",
        trendChange: "+15% since Jan",
        points: [120, 122, 125, 126, 128, 130, 132, 135]
      }
    },

    aiKnowledgeBase: {
      "Which business is best in my area?": 
        "In **Sadar, Varanasi**, hyper-local market intelligence highlights **Dairy Farming (Milk Production)** as the #1 opportunity with an **85% feasibility score**. Local sweet makers and city hotels have an estimated unmet demand of ~1,400 litres daily. Secondary strong options include **Vegetable Processing** and **Rural Agri-Retail**.",
      
      "How much loan can I get?": 
        "Based on your ₹1,00,000 equity margin contribution (10%), you are immediately eligible for a **₹9,00,000 Term Loan** (90% project cost) under PMEGP or NABARD DEDS. Under PMEGP, rural candidates can also claim up to **35% capital subsidy** (₹3,50,000) reduction in their liability.",
      
      "Show me schemes for dairy farming": 
        "The prime schemes for you are:\n1. **NABARD DEDS**: Loan up to ₹10,00,000 for 10 milch cows with 25%-33.3% subsidy.\n2. **PMEGP**: Loan up to ₹25 Lakhs with 35% subsidy in rural UP.\n3. **Kisan Credit Card (Animal Husbandry)**: Working capital up to ₹2,00,000 @ 4% subsidized interest rate.",
      
      "What is the market demand for vegetables?": 
        "The current wholesale demand in the Varanasi - Harahua belt is **High**. Fresh Tomato averages ₹18/kg with steady upward momentum (+38%). Post-harvest vegetable dehydrating or puree processing captures 25-30% higher margins during seasonal gluts.",
      
      "Give me a detailed business plan": 
        "I have generated your business plan outline for **Dairy Farming**:\n• **Total Project Cost:** ₹10,00,000 (Shed + 10 HF cows + milking setup)\n• **Your Margin (10%):** ₹1,00,000\n• **Bank Loan (90%):** ₹9,00,000\n• **Monthly EMI:** ₹17,660 @ 6.5% p.a.\n• **Break-even:** Month 7.\nClick **'Generate Feasibility Report'** on your dashboard to download the complete 4-page PDF blueprint!"
    }
  };

  /* ========================================================================
     2. FINANCIAL CALCULATION ENGINE
     Official Problem Statement Parameters & Logic:
     - marginPercentage = 10%
     - projectCost = margin / 0.10
     - loanAmount = projectCost * 0.90
     - Micro Finance: projectCost <= 140000 (Rate 6.5%, Tenure 3 yrs, Moratorium 3 mos)
     - Term Loan: projectCost <= 5000000 (Rate demo 6.5%, Tenure 5 yrs, Moratorium 6 mos)
     ======================================================================== */
  function calculateFinancing(margin) {
    const marginAmount = parseFloat(margin) || 100000;
    const marginPercentage = 0.10; // 10%
    const projectCost = Math.round(marginAmount / marginPercentage);
    const loanAmount = Math.round(projectCost * 0.90);

    let scheme = "";
    let annualInterestRate = 6.5; // Demo baseline rate
    let tenureYears = 5;
    let moratoriumMonths = 6;

    if (projectCost <= 140000) {
      scheme = "Micro Finance Scheme";
      annualInterestRate = 6.5;
      tenureYears = 3;
      moratoriumMonths = 3;
    } else if (projectCost <= 5000000) {
      scheme = "Term Loan Scheme (NABARD / PMEGP Supported)";
      annualInterestRate = 6.5;
      tenureYears = 5;
      moratoriumMonths = 6;
    } else {
      scheme = "Outside configured scheme range";
      annualInterestRate = 9.5;
      tenureYears = 7;
      moratoriumMonths = 12;
    }

    // Monthly EMI Calculation Formula:
    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const P = loanAmount;
    const r = (annualInterestRate / 100) / 12;
    const n = tenureYears * 12;

    let monthlyEmi = 0;
    if (r > 0 && n > 0) {
      const powFactor = Math.pow(1 + r, n);
      monthlyEmi = Math.round((P * r * powFactor) / (powFactor - 1));
    }

    return {
      marginAmount,
      marginPercentage: 10,
      loanPercentage: 90,
      projectCost,
      loanAmount,
      annualInterestRate,
      tenureYears,
      moratoriumMonths,
      monthlyEmi,
      scheme
    };
  }

  function formatCurrencyINR(amount) {
    if (amount === undefined || amount === null) return "₹ 0";
    return "₹ " + Number(amount).toLocaleString('en-IN');
  }

  /* ========================================================================
     3. DOM CONTROLLER & EVENT LISTENERS
     ======================================================================== */
  function initDOM() {
    setupSidebarNavigation();
    setupFinancialSlider();
    setupCommoditySelector();
    setupAIAdvisorChat();
    setupModals();
    setupSearchAutocomplete();
    setupDropdowns();
    setupMobileDrawer();
    setupInteractiveCards();
  }

  // 3.1 Sidebar Navigation
  function setupSidebarNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const navTarget = link.getAttribute('data-nav');
        handleNavSelection(navTarget);

        // Auto close mobile drawer if open
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebarBackdrop');
        if (sidebar && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
          backdrop.classList.remove('active');
        }
      });
    });

    const contactSupportBtn = document.getElementById('contactSupportBtn');
    if (contactSupportBtn) {
      contactSupportBtn.addEventListener('click', () => {
        showToast("Connecting to Varanasi Rural Support Desk (+91-542-2500xxx)...");
      });
    }
  }

  function handleNavSelection(target) {
    switch (target) {
      case 'dashboard':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'ideas':
        document.getElementById('businessIdeasContainer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case 'market':
        document.getElementById('mapContainer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case 'calculator':
        document.getElementById('marginRangeInput')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('marginRangeInput')?.focus();
        break;
      case 'schemes':
        document.getElementById('schemesList')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case 'advisor':
        document.getElementById('aiChatInput')?.focus();
        break;
      case 'reports':
        openReportModal();
        break;
      case 'notifications':
        toggleNotifyPopup();
        break;
      default:
        showToast(`Navigated to ${target.charAt(0).toUpperCase() + target.slice(1)}`);
        break;
    }
  }

  // 3.2 Financial Slider & Calculator Engine
  function setupFinancialSlider() {
    const slider = document.getElementById('marginRangeInput');
    if (!slider) return;

    slider.addEventListener('input', (e) => {
      const marginVal = parseInt(e.target.value, 10);
      updateFinancialDashboard(marginVal);
    });

    // Initial render with ₹1,00,000 margin
    updateFinancialDashboard(100000);
  }

  function updateFinancialDashboard(marginVal) {
    const calc = calculateFinancing(marginVal);

    // Update Slider Displays
    const sliderDisplay = document.getElementById('sliderCurrentDisplay');
    if (sliderDisplay) sliderDisplay.textContent = formatCurrencyINR(calc.marginAmount);

    // Update Financial Metric Cards
    const dispProjectCost = document.getElementById('dispProjectCost');
    const dispMarginVal = document.getElementById('dispMarginVal');
    const dispLoanVal = document.getElementById('dispLoanVal');
    const dispMarginPct = document.getElementById('dispMarginPct');
    const dispLoanPct = document.getElementById('dispLoanPct');

    if (dispProjectCost) dispProjectCost.textContent = formatCurrencyINR(calc.projectCost);
    if (dispMarginVal) dispMarginVal.textContent = formatCurrencyINR(calc.marginAmount);
    if (dispLoanVal) dispLoanVal.textContent = formatCurrencyINR(calc.loanAmount);
    if (dispMarginPct) dispMarginPct.textContent = calc.marginPercentage;
    if (dispLoanPct) dispLoanPct.textContent = calc.loanPercentage;

    // Update Terms Strip
    const dispInterestRate = document.getElementById('dispInterestRate');
    const dispTenure = document.getElementById('dispTenure');
    const dispMoratorium = document.getElementById('dispMoratorium');
    const dispMonthlyEmi = document.getElementById('dispMonthlyEmi');
    const routingSchemeName = document.getElementById('routingSchemeName');

    if (dispInterestRate) dispInterestRate.textContent = `${calc.annualInterestRate}%`;
    if (dispTenure) dispTenure.textContent = `${calc.tenureYears} Years`;
    if (dispMoratorium) dispMoratorium.textContent = `${calc.moratoriumMonths} Months`;
    if (dispMonthlyEmi) dispMonthlyEmi.textContent = formatCurrencyINR(calc.monthlyEmi);
    if (routingSchemeName) routingSchemeName.textContent = calc.scheme;

    // Also update Top KPI card for eligible loan
    const kpiLoan = document.getElementById('kpiLoanAmount');
    if (kpiLoan) kpiLoan.textContent = formatCurrencyINR(calc.loanAmount);

    // Update Report values if modal is open
    const repStatCost = document.getElementById('repStatCost');
    const repStatMargin = document.getElementById('repStatMargin');
    const repStatLoan = document.getElementById('repStatLoan');
    const repStatEmi = document.getElementById('repStatEmi');
    const reportRecommendedScheme = document.getElementById('reportRecommendedScheme');

    if (repStatCost) repStatCost.textContent = formatCurrencyINR(calc.projectCost);
    if (repStatMargin) repStatMargin.textContent = formatCurrencyINR(calc.marginAmount);
    if (repStatLoan) repStatLoan.textContent = formatCurrencyINR(calc.loanAmount);
    if (repStatEmi) repStatEmi.textContent = formatCurrencyINR(calc.monthlyEmi);
    if (reportRecommendedScheme) reportRecommendedScheme.textContent = calc.scheme;
  }

  // 3.3 Commodity Selector & SVG Line Chart
  function setupCommoditySelector() {
    const select = document.getElementById('commoditySelect');
    if (!select) return;

    select.addEventListener('change', (e) => {
      const commodityKey = e.target.value;
      const data = state.marketCommodities[commodityKey];
      if (!data) return;

      // Update Pill Cards
      const avgPrice = document.getElementById('marketAvgPrice');
      const demandLvl = document.getElementById('marketDemandLevel');
      const compLvl = document.getElementById('marketCompetitionLevel');

      if (avgPrice) avgPrice.textContent = data.price;
      if (demandLvl) demandLvl.textContent = data.demand;
      if (compLvl) compLvl.textContent = data.competition;

      // Redraw SVG Chart Path
      renderMarketChart(data.points);
      showToast(`Market rates updated for ${data.name} (Varanasi Mandi)`);
    });
  }

  function renderMarketChart(points) {
    const xCoords = [50, 105, 160, 215, 270, 325, 380, 435];
    const minVal = 0;
    const maxVal = Math.max(...points) * 1.15;
    const topY = 15;
    const botY = 105;

    // Map value to Y pixel
    function getY(val) {
      const pct = (val - minVal) / (maxVal - minVal);
      return Math.round(botY - (pct * (botY - topY)));
    }

    let linePathD = "";
    let areaPathD = `M ${xCoords[0]} ${getY(points[0])}`;

    points.forEach((pt, idx) => {
      const x = xCoords[idx];
      const y = getY(pt);
      if (idx === 0) {
        linePathD += `M ${x} ${y}`;
      } else {
        linePathD += ` L ${x} ${y}`;
        areaPathD += ` L ${x} ${y}`;
      }
    });

    areaPathD += ` L ${xCoords[xCoords.length - 1]} ${botY} L ${xCoords[0]} ${botY} Z`;

    const chartLine = document.getElementById('chartLinePath');
    const chartArea = document.getElementById('chartAreaPath');
    const pointsGroup = document.getElementById('chartPointsGroup');

    if (chartLine) chartLine.setAttribute('d', linePathD);
    if (chartArea) chartArea.setAttribute('d', areaPathD);

    if (pointsGroup) {
      let circlesHtml = "";
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
      points.forEach((pt, idx) => {
        const x = xCoords[idx];
        const y = getY(pt);
        circlesHtml += `<circle cx="${x}" cy="${y}" r="4" fill="#087F4E" stroke="#FFFFFF" stroke-width="2" data-val="₹${pt}" data-mo="${months[idx]}"/>`;
      });
      pointsGroup.innerHTML = circlesHtml;
    }
  }

  // 3.4 AI Business Advisor Interactive Chat
  function setupAIAdvisorChat() {
    const chatForm = document.getElementById('aiChatForm');
    const chatInput = document.getElementById('aiChatInput');
    const chatThread = document.getElementById('aiChatThread');
    const typingIndicator = document.getElementById('aiTypingIndicator');
    const promptChips = document.querySelectorAll('.prompt-chip-btn');

    // Handle Click on Suggested Questions
    promptChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const question = chip.getAttribute('data-question');
        sendUserMessage(question);
      });
    });

    // Handle Form Submit
    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        sendUserMessage(text);
        chatInput.value = "";
      });
    }

    function sendUserMessage(text) {
      appendChatMessage('user', text);
      showTypingIndicator(true);

      setTimeout(() => {
        showTypingIndicator(false);
        const reply = generateAIResponse(text);
        appendChatMessage('ai', reply);
      }, 700);
    }

    function appendChatMessage(sender, text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${sender}-msg`;

      if (sender === 'ai') {
        msgDiv.innerHTML = `
          <div class="msg-avatar-ai">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 8a4 4 0 0 1 8 0v2H8V8zM5 14h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z"/></svg>
          </div>
          <div class="msg-bubble">${formatMarkdownText(text)}</div>
        `;
      } else {
        msgDiv.innerHTML = `
          <div class="msg-bubble">${escapeHTML(text)}</div>
        `;
      }

      chatThread.appendChild(msgDiv);
      chatThread.scrollTop = chatThread.scrollHeight;
    }

    function showTypingIndicator(show) {
      if (!typingIndicator) return;
      typingIndicator.style.display = show ? 'flex' : 'none';
      if (show) {
        chatThread.appendChild(typingIndicator);
        chatThread.scrollTop = chatThread.scrollHeight;
      }
    }

    function generateAIResponse(userQuery) {
      // Direct Match from pre-trained knowledge base
      if (state.aiKnowledgeBase[userQuery]) {
        return state.aiKnowledgeBase[userQuery];
      }

      const q = userQuery.toLowerCase();
      if (q.includes("loan") || q.includes("finance") || q.includes("emi") || q.includes("money") || q.includes("margin")) {
        return `Under current guidelines for **Sadar Block, Varanasi**, your eligible loan entitlement is **₹9,00,000** for a ₹10,00,000 dairy or agro-processing unit. The interest rate is concessional at **6.5% - 8.0%** with a **6-month moratorium period**.`;
      }

      if (q.includes("dairy") || q.includes("cow") || q.includes("milk")) {
        return `Dairy farming in Varanasi has an 85% success probability. We suggest starting with **10 high-yielding cows (Murrah or Sahiwal)**. You can benefit from **NABARD DEDS** providing 25%-33% capital subsidy.`;
      }

      if (q.includes("scheme") || q.includes("subsidy") || q.includes("pmegp") || q.includes("pmfme")) {
        return `Top 3 recommended schemes for you:\n1. **PMEGP**: Up to 35% capital subsidy for rural micro enterprises.\n2. **PMFME**: 35% credit-linked grant for food processing.\n3. **NABARD DEDS**: Specialized concessional credit for livestock assets.`;
      }

      return `That is a vital consideration for rural ventures in Varanasi. Based on local cluster data, your location has strong logistics connectivity to urban mandis. I recommend running our **Financial Calculator** or downloading your **Feasibility Report** to present directly to your local bank manager.`;
    }
  }

  // 3.5 Modals Implementation
  function setupModals() {
    // 1. Feasibility Report Modal
    const reportModal = document.getElementById('reportModal');
    const heroReportBtn = document.getElementById('heroGenerateReportBtn');
    const viewFinDetailsBtn = document.getElementById('viewFinancialDetailsBtn');
    const closeReportModal = document.getElementById('closeReportModal');
    const closeReportModalBtn = document.getElementById('closeReportModalBtn');
    const downloadReportPdfBtn = document.getElementById('downloadReportPdfBtn');
    const printReportBtn = document.getElementById('printReportBtn');

    if (heroReportBtn) heroReportBtn.addEventListener('click', openReportModal);
    if (viewFinDetailsBtn) viewFinDetailsBtn.addEventListener('click', openReportModal);
    if (closeReportModal) closeReportModal.addEventListener('click', closeReport);
    if (closeReportModalBtn) closeReportModalBtn.addEventListener('click', closeReport);

    if (downloadReportPdfBtn) {
      downloadReportPdfBtn.addEventListener('click', () => {
        showToast("Generating official PDF document... Printing dialog opening.");
        setTimeout(() => { window.print(); }, 400);
      });
    }

    if (printReportBtn) {
      printReportBtn.addEventListener('click', () => { window.print(); });
    }

    // 2. Edit Location Modal
    const locationModal = document.getElementById('locationModal');
    const editLocationBtn = document.getElementById('editLocationBtn');
    const locationSelectBtn = document.getElementById('locationSelectBtn');
    const closeLocationModal = document.getElementById('closeLocationModal');
    const cancelLocationModalBtn = document.getElementById('cancelLocationModalBtn');
    const saveLocationBtn = document.getElementById('saveLocationBtn');

    if (editLocationBtn) editLocationBtn.addEventListener('click', () => openLocationModal());
    if (locationSelectBtn) locationSelectBtn.addEventListener('click', () => openLocationModal());
    if (closeLocationModal) closeLocationModal.addEventListener('click', closeLocation);
    if (cancelLocationModalBtn) cancelLocationModalBtn.addEventListener('click', closeLocation);

    if (saveLocationBtn) {
      saveLocationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const block = document.getElementById('blockSelect').value;
        const dist = document.getElementById('districtSelect').value;
        const stateName = document.getElementById('stateSelect').selectedOptions[0].text;

        state.user.block = block;
        state.user.district = dist;
        state.user.location = `${block}, ${dist}, ${stateName}`;

        document.getElementById('headerLocationText').textContent = `${block}, ${dist}, UP`;
        document.getElementById('locationCardSubtitle').textContent = state.user.location;
        document.getElementById('reportLocationVal').textContent = state.user.location;

        closeLocation();
        showToast(`Market intelligence recalculated for ${block}, ${dist}`);
      });
    }

    // 3. Idea Detail Modal
    const ideaDetailModal = document.getElementById('ideaDetailModal');
    const closeIdeaModal = document.getElementById('closeIdeaModal');
    const closeIdeaModalBtn = document.getElementById('closeIdeaModalBtn');
    const selectIdeaForCalcBtn = document.getElementById('selectIdeaForCalcBtn');

    if (closeIdeaModal) closeIdeaModal.addEventListener('click', () => ideaDetailModal.classList.remove('open'));
    if (closeIdeaModalBtn) closeIdeaModalBtn.addEventListener('click', () => ideaDetailModal.classList.remove('open'));

    if (selectIdeaForCalcBtn) {
      selectIdeaForCalcBtn.addEventListener('click', () => {
        ideaDetailModal.classList.remove('open');
        document.getElementById('marginRangeInput')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`Loaded financing parameters for ${state.user.activeBusiness}`);
      });
    }

    // Close on backdrop click
    [reportModal, locationModal, ideaDetailModal].forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });
  }

  function openReportModal() {
    const modal = document.getElementById('reportModal');
    if (modal) modal.classList.add('open');
  }

  function closeReport() {
    const modal = document.getElementById('reportModal');
    if (modal) modal.classList.remove('open');
  }

  function openLocationModal() {
    const modal = document.getElementById('locationModal');
    if (modal) modal.classList.add('open');
  }

  function closeLocation() {
    const modal = document.getElementById('locationModal');
    if (modal) modal.classList.remove('open');
  }

  // 3.6 Search Autocomplete & Quick Filter
  function setupSearchAutocomplete() {
    const searchInput = document.getElementById('globalSearchInput');
    const dropdown = document.getElementById('searchAutocomplete');
    if (!searchInput || !dropdown) return;

    const searchableItems = [
      { title: "Dairy Farming (Milk Production)", type: "Business Idea", tag: "85% Potential", action: () => openIdeaModal('dairy') },
      { title: "Vegetable Processing Unit", type: "Business Idea", tag: "78% Potential", action: () => openIdeaModal('veggie') },
      { title: "Rural Retail & Kirana Store", type: "Business Idea", tag: "72% Potential", action: () => openIdeaModal('retail') },
      { title: "PMEGP (Up to ₹25 Lakhs loan)", type: "Govt Scheme", tag: "35% Subsidy", action: () => showSchemeModal('pmegp') },
      { title: "NABARD Dairy Entrepreneurship", type: "Govt Scheme", tag: "Concessional", action: () => showSchemeModal('nabard') },
      { title: "PMFME Food Processing Scheme", type: "Govt Scheme", tag: "Central", action: () => showSchemeModal('pmfme') },
      { title: "Tomato Wholesale Mandi Rates", type: "Market Price", tag: "₹18/kg", action: () => setCommodity('tomato') },
      { title: "Cow Milk Market Rates", type: "Market Price", tag: "₹48/L", action: () => setCommodity('milk') }
    ];

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        dropdown.classList.remove('open');
        dropdown.innerHTML = "";
        return;
      }

      const matches = searchableItems.filter(item => 
        item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        dropdown.innerHTML = `<div class="search-result-item text-muted">No exact matching record found. Press Enter to ask AI Advisor.</div>`;
      } else {
        dropdown.innerHTML = matches.map((m, idx) => `
          <div class="search-result-item" data-index="${idx}">
            <i data-lucide="arrow-right" class="inline-icon-sm text-green"></i>
            <span>${escapeHTML(m.title)}</span>
            <span class="search-result-tag bg-green-soft text-green">${m.tag}</span>
          </div>
        `).join('');

        if (window.lucide) window.lucide.createIcons();

        dropdown.querySelectorAll('.search-result-item').forEach((elem, i) => {
          elem.addEventListener('click', () => {
            dropdown.classList.remove('open');
            searchInput.value = "";
            matches[i].action();
          });
        });
      }

      dropdown.classList.add('open');
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  function setCommodity(key) {
    const sel = document.getElementById('commoditySelect');
    if (sel) {
      sel.value = key;
      sel.dispatchEvent(new Event('change'));
      sel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // 3.7 Dropdowns (Language, User, Notifications)
  function setupDropdowns() {
    // Language Dropdown
    const langBtn = document.getElementById('languageBtn');
    const langMenu = document.getElementById('langMenu');
    const currentLangLabel = document.getElementById('currentLangLabel');

    if (langBtn && langMenu) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('open');
      });

      langMenu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const lang = item.getAttribute('data-lang');
          currentLangLabel.textContent = item.querySelector('span').textContent;
          langMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          langMenu.classList.remove('open');
          showToast(`Language set to ${currentLangLabel.textContent}`);
        });
      });
    }

    // User Profile Dropdown
    const userBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');

    if (userBtn && userMenu) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('open');
      });
    }

    // Notification Dropdown
    const notifyBtn = document.getElementById('notifyBellBtn');
    const notifyPopup = document.getElementById('notifyPopup');
    const markAllReadBtn = document.getElementById('markAllReadBtn');

    if (notifyBtn && notifyPopup) {
      notifyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifyPopup.classList.toggle('open');
      });

      if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
          document.querySelectorAll('.notify-dot').forEach(d => {
            d.classList.remove('unread');
            d.classList.add('read');
          });
          const badge = document.querySelector('.notify-badge');
          if (badge) badge.style.display = 'none';
          showToast("All notifications marked as read.");
        });
      }
    }

    // Close all open menus when clicking elsewhere
    document.addEventListener('click', () => {
      if (langMenu) langMenu.classList.remove('open');
      if (userMenu) userMenu.classList.remove('open');
      if (notifyPopup) notifyPopup.classList.remove('open');
    });
  }

  function toggleNotifyPopup() {
    const notifyPopup = document.getElementById('notifyPopup');
    if (notifyPopup) notifyPopup.classList.toggle('open');
  }

  // 3.8 Mobile Hamburger Drawer
  function setupMobileDrawer() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (mobileMenuBtn && sidebar && backdrop) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('active');
      });

      const closeDrawer = () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('active');
      };

      if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeDrawer);
      backdrop.addEventListener('click', closeDrawer);
    }
  }

  // 3.9 Interactive Cards & Click Handlers
  function setupInteractiveCards() {
    // Business Cards Click
    document.querySelectorAll('.business-card').forEach(card => {
      card.addEventListener('click', () => {
        const ideaId = card.getAttribute('data-idea-id');
        openIdeaModal(ideaId);
      });
    });

    // Government Scheme Items Click
    document.querySelectorAll('.scheme-item').forEach(item => {
      item.addEventListener('click', () => {
        const schemeId = item.getAttribute('data-scheme-id');
        showSchemeModal(schemeId);
      });
    });

    // Next Steps Checklist Click
    document.querySelectorAll('.step-item').forEach(item => {
      item.addEventListener('click', () => {
        const step = item.getAttribute('data-step');
        handleNextStepAction(step);
      });
    });

    // Hero Explore Ideas Button
    const heroExploreBtn = document.getElementById('heroExploreIdeasBtn');
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener('click', () => {
        document.getElementById('businessIdeasContainer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    // KPI Schemes Card
    const kpiSchemesCard = document.getElementById('kpiSchemesCard');
    if (kpiSchemesCard) {
      kpiSchemesCard.addEventListener('click', () => {
        document.getElementById('schemesList')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  function openIdeaModal(ideaId) {
    const idea = state.businessIdeas.find(b => b.id === ideaId) || state.businessIdeas[0];
    state.user.activeBusiness = idea.name;

    const modal = document.getElementById('ideaDetailModal');
    const content = document.getElementById('ideaModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display:flex; gap:16px; align-items:flex-start; margin-bottom:16px;">
        <img src="${idea.image}" alt="${idea.name}" style="width:120px; height:80px; object-fit:cover; border-radius:8px;">
        <div>
          <h3 style="font-size:16px; font-weight:800; color:#0F172A;">${idea.name}</h3>
          <p style="font-size:12px; color:#6B7280; margin-top:2px;">${idea.description}</p>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; font-size:12px; margin-bottom:14px;">
        <div style="background:#F8FAFC; padding:10px; border-radius:6px; border:1px solid #E5E7EB;">
          <strong style="display:block; color:#475569;">Daily Capacity / Footfall:</strong>
          <span>${idea.dailyYield}</span>
        </div>
        <div style="background:#F8FAFC; padding:10px; border-radius:6px; border:1px solid #E5E7EB;">
          <strong style="display:block; color:#475569;">Expected ROI:</strong>
          <span style="color:#087F4E; font-weight:700;">${idea.roi}</span>
        </div>
      </div>
      <div style="background:#F0FDF4; border:1px solid #DCFCE7; padding:12px; border-radius:8px; font-size:12px; color:#14532D;">
        <strong>Recommended Subsidy Pipeline:</strong>
        <p style="margin-top:2px;">${idea.subsidies}</p>
      </div>
    `;

    modal.classList.add('open');
  }

  function showSchemeModal(schemeId) {
    const scheme = state.schemes.find(s => s.id === schemeId) || state.schemes[0];
    showToast(`Viewing details for ${scheme.code} (${scheme.agency})`);
    openReportModal();
  }

  function handleNextStepAction(step) {
    switch (step) {
      case '1':
        showToast("Opening Step 1: Detailed Enterprise Assessment Questionnaire...");
        openIdeaModal('dairy');
        break;
      case '2':
        showToast("Opening Step 2: Comparing PMEGP vs NABARD DEDS subsidy slabs...");
        document.getElementById('schemesList')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case '3':
        showToast("Opening Step 3: Financial Cashflow & Working Capital Planner...");
        document.getElementById('marginRangeInput')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case '4':
        openReportModal();
        break;
      case '5':
        showToast("Opening Step 5: Preparing Udyam Registration & Loan Application Kit...");
        break;
    }
  }

  // 3.10 Toast Notification Utility
  function showToast(message, duration = 3200) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${escapeHTML(message)}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ========================================================================
     4. STRING & MARKDOWN HELPERS
     ======================================================================== */
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function formatMarkdownText(text) {
    // Converts basic bold **text** and bullet items into clean HTML
    let formatted = escapeHTML(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n• (.*?)(?=\n|$)/g, '<br>• $1');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
  }

  return {
    init: initDOM,
    calculateFinancing,
    showToast
  };
})();
