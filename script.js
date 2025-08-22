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

    let oneRepMax = 0;

    // 3. Calculate 1RM based on the selected formula.
    if (formulaName === 'brzycki') {
        oneRepMax = weight / (1.0278 - (0.0278 * reps));
    } else if (formulaName === 'epley') {
        oneRepMax = weight * (1 + (reps / 30));
    }

    // 4. Display the main 1RM result.
    const resultElement = document.getElementById('result-text');
    resultElement.textContent = `${oneRepMax.toFixed(2)} lbs/kg`;

    // 5. Calculate and display the percentage breakdown.
    generatePercentageTable(oneRepMax);
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
    
    // Clear any previous results
    tableBody.innerHTML = '';

    // Populate the table with new results
    percentageData.forEach(item => {
        const weightForPercent = (oneRepMax * item.percent) / 100;
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.reps}</td>
            <td>${item.percent}%</td>
            <td>${weightForPercent.toFixed(2)}</td>
        `;
        
        tableBody.appendChild(row);
    });

    // Make the table visible
    percentageTable.style.display = 'table';
}
