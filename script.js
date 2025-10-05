// Ring size conversion table
const ringSizeChart = [
    { us: '3', uk: 'F', eu: 44, circumference: 44.2, diameter: 14.1 },
    { us: '3.5', uk: 'G', eu: 45, circumference: 45.5, diameter: 14.5 },
    { us: '4', uk: 'H', eu: 46, circumference: 46.8, diameter: 14.9 },
    { us: '4.5', uk: 'I', eu: 47, circumference: 48.0, diameter: 15.3 },
    { us: '5', uk: 'J', eu: 49, circumference: 49.3, diameter: 15.7 },
    { us: '5.5', uk: 'K', eu: 50, circumference: 50.6, diameter: 16.1 },
    { us: '6', uk: 'L', eu: 51, circumference: 51.9, diameter: 16.5 },
    { us: '6.5', uk: 'M', eu: 52, circumference: 53.1, diameter: 16.9 },
    { us: '7', uk: 'N', eu: 54, circumference: 54.4, diameter: 17.3 },
    { us: '7.5', uk: 'O', eu: 55, circumference: 55.7, diameter: 17.7 },
    { us: '8', uk: 'P', eu: 56, circumference: 57.0, diameter: 18.1 },
    { us: '8.5', uk: 'Q', eu: 57, circumference: 58.3, diameter: 18.5 },
    { us: '9', uk: 'R', eu: 59, circumference: 59.5, diameter: 18.9 },
    { us: '9.5', uk: 'S', eu: 60, circumference: 60.8, diameter: 19.4 },
    { us: '10', uk: 'T', eu: 61, circumference: 62.1, diameter: 19.8 },
    { us: '10.5', uk: 'U', eu: 62, circumference: 63.4, diameter: 20.2 },
    { us: '11', uk: 'V', eu: 64, circumference: 64.6, diameter: 20.6 },
    { us: '11.5', uk: 'W', eu: 65, circumference: 65.9, diameter: 21.0 },
    { us: '12', uk: 'X', eu: 66, circumference: 67.2, diameter: 21.4 },
    { us: '12.5', uk: 'Y', eu: 67, circumference: 68.5, diameter: 21.8 },
    { us: '13', uk: 'Z', eu: 68, circumference: 69.7, diameter: 22.2 },
    { us: '13.5', uk: 'Z+1', eu: 69, circumference: 71.0, diameter: 22.6 },
    { us: '14', uk: 'Z+2', eu: 70, circumference: 72.3, diameter: 23.0 },
    { us: '14.5', uk: 'Z+3', eu: 71, circumference: 73.5, diameter: 23.4 },
    { us: '15', uk: 'Z+4', eu: 72, circumference: 74.8, diameter: 23.8 },
    { us: '15.5', uk: 'Z+5', eu: 73, circumference: 76.1, diameter: 24.2 },
    { us: '16', uk: 'Z+6', eu: 74, circumference: 77.4, diameter: 24.6 }
];

// Utility functions
function convertCircumferenceToMm(value, unit) {
    switch (unit) {
        case 'mm': return value;
        case 'cm': return value * 10;
        case 'in': return value * 25.4;
        default: return value;
    }
}

function convertDiameterToMm(value, unit) {
    switch (unit) {
        case 'mm': return value;
        case 'cm': return value * 10;
        case 'in': return value * 25.4;
        default: return value;
    }
}

function findRingSizeByCircumference(circumferenceMm) {
    let closestSize = ringSizeChart[0];
    let minDiff = Math.abs(ringSizeChart[0].circumference - circumferenceMm);

    for (const size of ringSizeChart) {
        const diff = Math.abs(size.circumference - circumferenceMm);
        if (diff < minDiff) {
            minDiff = diff;
            closestSize = size;
        }
    }

    return minDiff <= 3 ? closestSize : null;
}

function findRingSizeByDiameter(diameterMm) {
    let closestSize = ringSizeChart[0];
    let minDiff = Math.abs(ringSizeChart[0].diameter - diameterMm);

    for (const size of ringSizeChart) {
        const diff = Math.abs(size.diameter - diameterMm);
        if (diff < minDiff) {
            minDiff = diff;
            closestSize = size;
        }
    }

    return minDiff <= 1.5 ? closestSize : null;
}

function displayResult(result) {
    const resultDisplay = document.getElementById('result-display');
    
    if (!result) {
        resultDisplay.classList.add('hidden');
        return;
    }

    document.getElementById('us-size').textContent = result.us;
    document.getElementById('uk-size').textContent = result.uk;
    document.getElementById('eu-size').textContent = result.eu;
    document.getElementById('result-circumference').textContent = result.circumference.toFixed(1);
    document.getElementById('result-diameter').textContent = result.diameter.toFixed(1);
    
    resultDisplay.classList.remove('hidden');
}

// Method selection
let selectedMethod = null;

document.querySelectorAll('.method-card').forEach(card => {
    card.addEventListener('click', function() {
        const method = this.dataset.method;
        
        // Remove active class from all cards
        document.querySelectorAll('.method-card').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Hide all method components
        document.querySelectorAll('.method-component').forEach(component => {
            component.classList.add('hidden');
        });
        
        // Show selected method component
        document.getElementById(method + '-method').classList.remove('hidden');
        
        selectedMethod = method;
        
        // Clear previous results
        displayResult(null);
    });
});

// String Method
const circumferenceInput = document.getElementById('circumference');
const circumferenceUnit = document.getElementById('circumference-unit');

function handleStringMethod() {
    const value = parseFloat(circumferenceInput.value);
    const unit = circumferenceUnit.value;
    
    if (value && !isNaN(value)) {
        const circumferenceMm = convertCircumferenceToMm(value, unit);
        const result = findRingSizeByCircumference(circumferenceMm);
        displayResult(result);
    } else {
        displayResult(null);
    }
}

circumferenceInput.addEventListener('input', handleStringMethod);
circumferenceUnit.addEventListener('change', handleStringMethod);

// Existing Ring Method
const diameterInput = document.getElementById('diameter');
const diameterUnit = document.getElementById('diameter-unit');

function handleExistingRingMethod() {
    const value = parseFloat(diameterInput.value);
    const unit = diameterUnit.value;
    
    if (value && !isNaN(value)) {
        const diameterMm = convertDiameterToMm(value, unit);
        const result = findRingSizeByDiameter(diameterMm);
        displayResult(result);
    } else {
        displayResult(null);
    }
}

diameterInput.addEventListener('input', handleExistingRingMethod);
diameterUnit.addEventListener('change', handleExistingRingMethod);

// Diameter Slider Method
const diameterSlider = document.getElementById('diameter-slider');
const diameterValue = document.getElementById('diameter-value');
const ringCircle = document.getElementById('ring-circle');

function handleSliderMethod() {
    const diameter = parseFloat(diameterSlider.value);
    diameterValue.textContent = diameter.toFixed(1);
    
    // Update ring circle size with better scaling and constraints
    const circleSize = Math.max(28, Math.min(120, diameter * 3.5));
    ringCircle.style.width = circleSize + 'px';
    ringCircle.style.height = circleSize + 'px';
    
    // Update slider background
    const percentage = ((diameter - 14) / (25 - 14)) * 100;
    diameterSlider.style.background = `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${percentage}%, #e0e7ff ${percentage}%, #e0e7ff 100%)`;
    
    const result = findRingSizeByDiameter(diameter);
    displayResult(result);
}

diameterSlider.addEventListener('input', handleSliderMethod);

// Initialize slider
handleSliderMethod();