const display = document.getElementById("display");
const digitButtons = document.querySelectorAll('.button-digit');
const operatorButtons = document.querySelectorAll('.button-operate');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

// Event Listeners
clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', evaluate);

digitButtons.forEach(button => {
    console.log("insdide event listener digits")
    button.addEventListener('click', () => appendNumber(button.value));
});

operatorButtons.forEach(button => {
     console.log("insdide event listener operate")
    button.addEventListener('click', () => setOperator(button.value));
});

function appendNumber(number) {
    console.log("inside appendNumber");
    
    if (display.value === '0' || shouldResetDisplay) {
        resetDisplayScreen();
    }
    // Prevent multiple decimal points
    if (number === '.' && display.value.includes('.')) return;
    display.value += number;
}

function resetDisplayScreen() {
    display.value = '';
    shouldResetDisplay = false;
}

function clear() {
    display.value = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;
}

function setOperator(operator) {
    // If an operator is already chosen, evaluate the expression first
    if (currentOperator !== null) {
        evaluate();
    }
    firstNumber = display.value;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === '/' && display.value === '0') {
        alert("You can't divide by 0!");
        clear();
        return;
    }
    secondNumber = display.value;
    const result = operate(currentOperator, firstNumber, secondNumber);
    display.value = roundResult(result);
    currentOperator = null;
    shouldResetDisplay = true;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) return null; // Should be caught by evaluate()
            return a / b;
        default:
            return null;
    }
}


// *******************************************************


//const display = document.getElementById("display");

// let number1 = '';
// let number2 = '';
// let currentOperator = '';
// let resetDisplay = false;

    
// function appendDisplay(input) {
//     if(display.value === '0' || resetDisplay){
//         display.value = input;
//         resetDisplay = false;
//     } else{
//         display.value += input;
//     }
// }

// function clearDisplay() {
//     display.value = '';

// }

// function calculator(){
//     if (currentOperator && firstNumber && display.value) {
//         secondNumber = display.value;
//         const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
//         display.value = result;
//         firstNumber = result.toString();
//         currentOperator = '';
//         secondNumber = '';
//         shouldResetDisplay = true;
//     }
// }

// function operate(operator, num1, num2){
//     switch(operator){
//         case '+':
//             return num1 + num2;
//         case '-':
//             return num1 - num2;
//         case '*':
//             return num1 * num2;
//         case '/':
//             if (num2 === 0) {
//                 return 'Error: Div by 0';
//             }
//             return num1 / num2;
//         default:
//             return null;
//     }
// }

// function handleOperator(operator) {
//     if (currentOperator && secondNumber) {
//         firstNumber = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
//         display.value = firstNumber;
//     } else {
//         firstNumber = display.value;
//     }
//     currentOperator = operator;
//     secondNumber = '';
//     shouldResetDisplay = true;
// }