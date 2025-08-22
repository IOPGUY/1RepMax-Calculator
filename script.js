/**
 * Rounds a number to the nearest 5.
 * @param {number} num The number to round.
 * @returns {number} The number rounded to the nearest 5.
 */
function roundToNearestFive(num) {
    return Math.round(num / 5) * 5;
}

/**
 * Calculates the estimated 1-Rep Max (1RM) and percentage breakdown.
 * @param {string} formulaName - The name of the formula to use ('brzycki' or 'epley').
 */
function calculate1RM(formulaName) {
    // 1. Get user input.
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);

    // 2. Validate the input.
    if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0) {
        alert("Please enter valid numbers for weight and repetitions.");
        return;
    }
    
    if (reps > 12) {
        alert("Calculations are most accurate for 12 reps or fewer.");
    }

    let oneRepMaxRaw = 0;

    // 3. Calculate 1RM based on the selected formula.
    if (formulaName === 'brzycki') {
        oneRepMaxRaw = weight / (1.0278 - (0.0278 * reps));
    } else if (formulaName === 'epley') {
        oneRepMaxRaw = weight * (1 + (reps / 30));
    }
    
    // **NEW**: Round the final 1RM to the nearest 5.
    const oneRepMaxRounded = roundToNearestFive(oneRepMaxRaw);

    // 4. Display the main 1RM result.
    const resultElement = document.getElementById('result-text');
    resultElement.textContent = `${oneRepMaxRounded} lbs/kg`;

    // 5. Calculate and display the percentage breakdown using the rounded 1RM.
    generatePercentageTable(oneRepMaxRounded);
}

/**
 * Generates and displays the weight percentage table based on the 1RM.
 * @param {number} oneRepMax - The calculated 1-Rep Max.
 */
function generatePercentageTable(oneRepMax) {
    const percentageData = [
        { reps: 1, percent: 100 },
        { reps: 2, percent: 95 },
        { reps: 4, percent: 90 },
        { reps: 6, percent: 85 },
        { reps: 8, percent: 80 },
        { reps: 10, percent: 75 },
        { reps: 12, percent: 70 },
        { reps: 16, percent: 65 },
        { reps: 20, percent: 60 },
        { reps: 24, percent: 55 },
        { reps: 30, percent: 50 }
    ];

    const tableBody = document.getElementById('percentage-body');
    const percentageTable = document.getElementById('percentage-table');
    
    tableBody.innerHTML = '';

    percentageData.forEach(item => {
        const weightForPercent = (oneRepMax * item.percent) / 100;
        
        // **NEW**: Round the percentage weight to the nearest 5.
        const roundedWeight = roundToNearestFive(weightForPercent);
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.reps}</td>
            <td>${item.percent}%</td>
            <td>${roundedWeight}</td>
        `;
        
        tableBody.appendChild(row);
    });

    percentageTable.style.display = 'table';
}
