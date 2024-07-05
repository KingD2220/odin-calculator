let operand1 = '0';
let operand2 = '';
let operator = '';
let lastInput = '';
let equation = '';
let solution = '0';

const MAX_LENGTH = 16;

let equationDisplay = document.querySelector('.equation');
let resultDisplay = document.querySelector('.result');

//Basic operations
const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    return a / b;
}

const operate = function(operand1, operator, operand2) {
    let result;
    let converted1 = Number(operand1);
    let converted2 = Number(operand2);
    console.log(converted2);
    switch(operator) {
        case '+':
            result = add(converted1, converted2);
            break;
        case '-':
            result = subtract(converted1, converted2);
            break;
        case '×':
            result = multiply(converted1, converted2);
            break;
        case '÷':
            if (converted2 === 0) {
                result = 'ERROR';
                break;
            }
            result = divide(converted1, converted2);
            break;
    }

    return result;
}

//Display functions
const displayEquation = function(equation) {
    equationDisplay.textContent = equation;
}

const displayResult = function(result) {
    resultDisplay.textContent = result;
}


//Button functions
let button = document.querySelector('.button-container');
button.addEventListener('click', (e) => {
    let target = e.target;

    switch(target.className) {
        case 'operator':
            if (operand2 !== '') { //calculate the current equation of which the result will become the operand of a new equation
                solution = operate(operand1, operator, operand2);
                operand1 = solution;
                operand2 = '';
            }
            if (equation.length === MAX_LENGTH) {
                alert("Equation is too long");
                break;
            }
            operator = target.textContent;
            break;

        case 'digit':
            if (lastInput === '=' && operand2 != '') {
                reset();
            }
            if (equation.length === MAX_LENGTH) {
                alert("Equation is too long");
                break;
            }
            if (operand1 === '0' && operator === '') {
                operand1 = target.textContent;
            }
            else if (operator === '') {
                operand1 += target.textContent;
            }
            else {
                operand2 += target.textContent;
            }
            break;

        case '.':
            if (lastInput === '=') {
                reset();
                operand1 = solution + '.';
            }
            else if (lastInput === '.') {
                break;
            }
            else if (operator !== '') {
                operand2 === '' ? operand2 = '0.' : operand2 += '.';
            }
            else {
                operand1 += '.';
            }
            break;

        case 'equals':
            if (operand2 !== '')
            solution = operate(operand1, operator, operand2);
            break;

        case 'clear':
            reset();
            solution = '0';
            break;

        case 'delete':
            if (operand2 !== '') {
                operand2 = operand2.slice(0, -1);
            }
            else if (operator !== '') {
                operator = '';
            }
            else if (operand1 !== '0') {
                operand1 = operand1.slice(0, -1);
            }
    }

    lastInput = target.textContent;

    equation = operand1 + ' ' + operator + ' ' + operand2;
    displayEquation(equation);

    //Round solution if it is too long
    if (solution.toString().length > 15) {
        solution = solution.toFixed(5);
    }
    displayResult(solution);
});

//Resets calculation values to default except for solution
const reset = function() {
    operand1 = '0';
    operand2 = '';
    operator = '';
    lastInput = '';
}
