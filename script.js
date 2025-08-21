const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".button-digit");
const operatorButtons = document.querySelectorAll(".button-operate");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const backspaceButton = document.getElementById("backspace");
let decimal = document.getElementById("decimals");


let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;


clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", evaluate);
backspaceButton.addEventListener("click", backspace)

digitButtons.forEach((number) => {
    console.log("insdide event listener digits");
    number.addEventListener("click", () => appendNumber(number.value));
});

operatorButtons.forEach((operator) => {
    console.log("insdide event listener operate");
    operator.addEventListener("click", () => setOperator(operator.value));
});

function appendNumber(number) {
    console.log("inside appendNumber");

    if (display.value === "0" || shouldResetDisplay) {
        resetDisplayScreen();
    }

    if (number === "." && display.value.includes(".")) {
        return decimal.disabled = true;
    }

    display.value += number;
}

function resetDisplayScreen() {
    display.value = "";
    shouldResetDisplay = false;
    decimal.disabled = false;
}

function clear() {
    display.value = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = false;
    decimal.disabled = false;

}

function setOperator(operator) {

    if (currentOperator !== null) {
        evaluate();
        console.log("Inside if in setOperator");
    }
    console.log("Inside setOperator");

    firstNumber = display.value;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;

    if (currentOperator === "/" && display.value === "0") {
        alert("You can't divide by 0!");
        clear();
        return;
    }
    console.log("Inside in Evaluate  -------------");
    console.log('First ' + firstNumber);

    console.log('currentOperator ' + currentOperator);
    console.log('resetDisplay ' + shouldResetDisplay);

    secondNumber = display.value;
    console.log('Second ' + secondNumber);
    const result = operate(currentOperator, firstNumber, secondNumber);
    display.value = roundResult(result);
    currentOperator = null;
    shouldResetDisplay = true;
    decimal.disabled = false;

    console.log('result ' + result);
}

function roundResult(number) {
    return Math.round(number * 10) / 10;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) return null;
            return a / b;
        default:
            return null;
    }
}

function backspace() {
    let splitNumbers = display.value.split("");
    splitNumbers.pop();
    splitNumbers = Number(splitNumbers.join(''));
    display.value = splitNumbers;
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (/[0-9]/.test(key)) {

        appendNumber(key);

    } else if (key === '.') {

        appendNumber(key);

    } else if (key === '+' || key === '-' || key === '*' || key === '/') {

        setOperator(key);

    } else if (key === 'Enter' || key === '=') {

        evaluate();

    } else if (key === 'Backspace') {

        backspace();

    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        
        clear();
    }
});

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
