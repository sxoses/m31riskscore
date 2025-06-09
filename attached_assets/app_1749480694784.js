// Application data
const configurations = {
  "Conservative VC": {"team": 30, "technology": 15, "market": 25, "blockchain": 10, "business": 15, "risk": 5},
  "Growth-Focused VC": {"team": 20, "technology": 25, "market": 30, "blockchain": 5, "business": 15, "risk": 5},
  "Blockchain-First VC": {"team": 20, "technology": 30, "market": 15, "blockchain": 25, "business": 8, "risk": 2},
  "Early-Stage VC": {"team": 35, "technology": 20, "market": 20, "blockchain": 5, "business": 15, "risk": 5},
  "Strategic Corporate VC": {"team": 25, "technology": 20, "market": 25, "blockchain": 10, "business": 15, "risk": 5}
};

const categories = {
  "team": {
    "name": "Team",
    "subcategories": ["Team Experience", "Track Record", "Technical Expertise", "Team Cohesion"]
  },
  "technology": {
    "name": "Technology", 
    "subcategories": ["Innovation", "Scalability", "Security", "Technical Feasibility"]
  },
  "market": {
    "name": "Market Opportunity",
    "subcategories": ["Market Size", "Market Growth", "Competitive Landscape", "Customer Fit"]
  },
  "blockchain": {
    "name": "Blockchain Factors",
    "subcategories": ["Decentralization Value", "Tokenomics", "Network Effects", "Regulatory Compliance"]
  },
  "business": {
    "name": "Business Model",
    "subcategories": ["Revenue Model", "Customer Acquisition", "Partnerships", "Traction"]
  },
  "risk": {
    "name": "Risk & Exit",
    "subcategories": ["Market Risk", "Technology Risk", "Exit Potential", "Regulatory Risk"]
  }
};

const sampleCompanies = {
  "TechCorp": {
    "team": [4, 3, 5, 4],
    "technology": [4, 3, 4, 4], 
    "market": [5, 4, 3, 4],
    "blockchain": [4, 3, 4, 3],
    "business": [3, 2, 3, 3],
    "risk": [3, 2, 4, 3]
  },
  "BlockchainCo": {
    "team": [5, 4, 4, 5],
    "technology": [5, 4, 5, 4],
    "market": [3, 3, 4, 3],
    "blockchain": [5, 5, 4, 4],
    "business": [2, 2, 2, 2],
    "risk": [2, 3, 3, 2]
  },
  "GrowthStart": {
    "team": [3, 3, 3, 4],
    "technology": [3, 4, 3, 3],
    "market": [5, 5, 2, 5],
    "blockchain": [2, 2, 3, 4],
    "business": [4, 4, 4, 3],
    "risk": [4, 3, 4, 3]
  }
};

// Global state
let currentConfig = "Conservative VC";
let currentCompany = "TechCorp";
let companyScores = {};
let updateTimer = null;

// Initialize company scores from sample data
function initializeCompanyScores() {
  companyScores = JSON.parse(JSON.stringify(sampleCompanies));
}

// DOM elements
const configSelect = document.getElementById('configSelect');
const companySelect = document.getElementById('companySelect');
const currentWeightsDiv = document.getElementById('currentWeights');
const totalScoreElement = document.getElementById('totalScore');
const recommendationElement = document.getElementById('recommendation');
const comparisonTableBody = document.getElementById('comparisonTableBody');

// Calculate category score (average of subcategory scores)
function calculateCategoryScore(categoryScores) {
  if (!categoryScores || categoryScores.length === 0) return 0;
  const sum = categoryScores.reduce((acc, score) => acc + score, 0);
  return sum / categoryScores.length;
}

// Calculate weighted score for a category
function calculateWeightedScore(categoryScore, weight) {
  return (categoryScore * weight) / 100;
}

// Get recommendation based on total score
function getRecommendation(totalScore) {
  if (totalScore >= 4.0) {
    return { text: "Strong Buy", class: "status--success" };
  } else if (totalScore >= 3.0) {
    return { text: "Consider Investment", class: "status--warning" };
  } else if (totalScore >= 2.0) {
    return { text: "Hold", class: "status--info" };
  } else {
    return { text: "Pass", class: "status--error" };
  }
}

// Update weight display
function updateWeightDisplay() {
  const config = configurations[currentConfig];
  const weightItems = Object.keys(config).map(category => {
    const categoryName = categories[category].name;
    return `
      <div class="weight-item">
        <span class="weight-label">${categoryName}</span>
        <span class="weight-value">${config[category]}%</span>
      </div>
    `;
  }).join('');
  
  currentWeightsDiv.innerHTML = weightItems;
  
  // Update category weight displays
  Object.keys(config).forEach(category => {
    const weightElement = document.getElementById(`${category}Weight`);
    if (weightElement) {
      weightElement.textContent = `${config[category]}%`;
    }
  });
}

// Update scores display with optimized animation
function updateScoresDisplay() {
  const config = configurations[currentConfig];
  const companyData = companyScores[currentCompany];
  let totalWeightedScore = 0;
  
  // Batch DOM updates to improve performance
  requestAnimationFrame(() => {
    Object.keys(companyData).forEach(category => {
      const categoryScore = calculateCategoryScore(companyData[category]);
      const weight = config[category];
      const weightedScore = calculateWeightedScore(categoryScore, weight);
      
      // Update category score display
      const scoreElement = document.getElementById(`${category}Score`);
      const weightedScoreElement = document.getElementById(`${category}WeightedScore`);
      
      if (scoreElement) {
        scoreElement.textContent = categoryScore.toFixed(1);
        // Apply and remove the animation class with a slight delay between elements
        scoreElement.classList.add('score-updated');
        setTimeout(() => scoreElement.classList.remove('score-updated'), 300);
      }
      
      if (weightedScoreElement) {
        weightedScoreElement.textContent = weightedScore.toFixed(2);
      }
      
      totalWeightedScore += weightedScore;
    });
    
    // Update total score with a small delay for visual effect
    setTimeout(() => {
      const totalScore = (totalWeightedScore / 5) * 100; // Convert to 0-100 scale
      totalScoreElement.textContent = totalScore.toFixed(1);
      totalScoreElement.classList.add('score-updated');
      setTimeout(() => totalScoreElement.classList.remove('score-updated'), 300);
      
      // Update recommendation
      const recommendation = getRecommendation(totalWeightedScore);
      recommendationElement.innerHTML = `<span class="status ${recommendation.class}">${recommendation.text}</span>`;
    }, 50);
  });
}

// Load company data into form inputs
function loadCompanyData() {
  const companyData = companyScores[currentCompany];
  
  // Use requestAnimationFrame for smoother UI updates
  requestAnimationFrame(() => {
    Object.keys(companyData).forEach(category => {
      companyData[category].forEach((score, index) => {
        const input = document.querySelector(`[data-category="${category}"][data-index="${index}"]`);
        if (input) {
          input.value = score;
        }
      });
    });
    
    updateScoresDisplay();
  });
}

// Save current form data to company scores
function saveCurrentScores() {
  const companyData = {};
  
  Object.keys(categories).forEach(category => {
    companyData[category] = [];
    for (let i = 0; i < 4; i++) {
      const input = document.querySelector(`[data-category="${category}"][data-index="${i}"]`);
      if (input) {
        companyData[category].push(parseInt(input.value) || 0);
      }
    }
  });
  
  companyScores[currentCompany] = companyData;
}

// Calculate total score for a company with given configuration
function calculateCompanyTotal(companyName, configName) {
  const config = configurations[configName];
  const companyData = companyScores[companyName];
  let totalWeightedScore = 0;
  
  Object.keys(companyData).forEach(category => {
    const categoryScore = calculateCategoryScore(companyData[category]);
    const weight = config[category];
    const weightedScore = calculateWeightedScore(categoryScore, weight);
    totalWeightedScore += weightedScore;
  });
  
  return (totalWeightedScore / 5) * 100; // Convert to 0-100 scale
}

// Update comparison table with improved styling and highlighting
function updateComparisonTable() {
  const tableBody = comparisonTableBody;
  
  // Batch DOM updates
  requestAnimationFrame(() => {
    const rows = Object.keys(companyScores).map(companyName => {
      const totalScore = calculateCompanyTotal(companyName, currentConfig);
      const recommendation = getRecommendation(totalScore / 20); // Convert back to 0-5 scale for recommendation
      
      // Highlight current company row with a more subtle highlight
      const isCurrentCompany = companyName === currentCompany;
      const rowHighlight = isCurrentCompany ? 'style="background-color: var(--color-secondary); font-weight: var(--font-weight-semibold);"' : '';
      
      return `
        <tr ${rowHighlight}>
          <td class="company-name">${companyName}</td>
          <td class="score-cell">${totalScore.toFixed(1)}</td>
          <td><span class="status ${recommendation.class}">${recommendation.text}</span></td>
        </tr>
      `;
    }).join('');
    
    tableBody.innerHTML = rows;
  });
}

// Debounce function to improve performance of frequent updates
function debounce(func, wait) {
  return function(...args) {
    clearTimeout(updateTimer);
    updateTimer = setTimeout(() => func.apply(this, args), wait);
  };
}

// Event handlers
function handleConfigChange() {
  currentConfig = configSelect.value;
  
  // Apply loading state to indicate change is happening
  document.body.classList.add('loading');
  
  // Process the updates with a slight delay to improve perceived performance
  setTimeout(() => {
    updateWeightDisplay();
    updateScoresDisplay();
    updateComparisonTable();
    document.body.classList.remove('loading');
  }, 50);
}

function handleCompanyChange() {
  saveCurrentScores(); // Save current scores before switching
  currentCompany = companySelect.value;
  
  // Apply loading state briefly
  document.body.classList.add('loading');
  
  setTimeout(() => {
    loadCompanyData();
    updateComparisonTable();
    document.body.classList.remove('loading');
  }, 50);
}

// Debounced version of score change handler for better performance
const debouncedScoreUpdate = debounce(() => {
  updateScoresDisplay();
  updateComparisonTable();
}, 100);

function handleScoreChange(event) {
  const category = event.target.dataset.category;
  const index = parseInt(event.target.dataset.index);
  const value = parseInt(event.target.value) || 0;
  
  // Update the scores in memory
  if (!companyScores[currentCompany][category]) {
    companyScores[currentCompany][category] = [0, 0, 0, 0];
  }
  companyScores[currentCompany][category][index] = value;
  
  // Use the debounced update function for better UI responsiveness
  debouncedScoreUpdate();
}

// Initialize the application
function initializeApp() {
  initializeCompanyScores();
  
  // Set up event listeners
  configSelect.addEventListener('change', handleConfigChange);
  companySelect.addEventListener('change', handleCompanyChange);
  
  // Add event listeners to all score inputs with improved event handling
  const scoreInputs = document.querySelectorAll('.score-input');
  scoreInputs.forEach(input => {
    input.addEventListener('change', handleScoreChange);
    // Also listen for input events for more immediate feedback
    input.addEventListener('input', handleScoreChange);
  });
  
  // Initial setup
  updateWeightDisplay();
  loadCompanyData();
  updateComparisonTable();
  
  // Add a small delay before removing any initial loading state
  setTimeout(() => {
    document.body.classList.remove('loading');
  }, 300);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);