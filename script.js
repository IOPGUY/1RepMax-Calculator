/**
 * Calculates the estimated 1-Rep Max (1RM) based on the provided formula.
 * @param {string} formulaName - The name of the formula to use ('brzycki' or 'epley').
 */
function calculate1RM(formulaName) {
    // 1. Get user input from the HTML elements.
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);

    // 2. Validate the input to make sure numbers were entered.
    if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0) {
        alert("Please enter valid numbers for weight and repetitions.");
        return;
    }
    
    // Reps over 12 can lead to inaccurate 1RM estimations.
    if (reps > 12) {
        alert("Calculations are most accurate for 12 reps or fewer.");
    }

    let oneRepMax = 0;

    // 3. Calculate the 1RM based on the selected formula.
    if (formulaName === 'brzycki') {
        // Brzycki formula: Weight / (1.0278 - (0.0278 * Reps))
        oneRepMax = weight / (1.0278 - (0.0278 * reps));
    } else if (formulaName === 'epley') {
        // Epley formula: Weight * (1 + (Reps / 30))
        oneRepMax = weight * (1 + (reps / 30));
    }

    // 4. Display the result on the page.
    const resultElement = document.getElementById('result-text');
    // Round the result to two decimal places for cleanliness.
    resultElement.textContent = `${oneRepMax.toFixed(2)} lbs/kg`;
}