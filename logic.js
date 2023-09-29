
const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operationButtons = document.querySelectorAll(".operation");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
let displayValue = "";
let result = 0;


digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (display.textContent === "ERROR") {
            display.textContent = "";
        }
        display.textContent += button.textContent;
        displayValue += button.textContent;
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (display.textContent === "ERROR") {
            display.textContent = "";
        }
        display.textContent += ` ${button.textContent} `;
        displayValue += button.textContent;
        operator = button.textContent;
    })
})

equalButton.addEventListener("click", () => {
    arr = displayValue.split(/([+\-x\/])/);
    if (arr[0] === "") {
        arr.splice(0, 3, `${-arr[2]}`)
    }
    arr = arr.filter(char => char!== "");
    for (let i = 1; i<arr.length; i+2) {
        if (/[+\-x\/]/.test(arr[i]) && (!/[+\-x\/][0-9]/.test(arr[i-1])) && (/[+\-x\/]/.test(arr[i-1]) || /[+\-x\/]/.test(arr[i+1]))) {
            result = error();
            break;
        }
        else {
            result = operate (arr[i-1], arr[i], arr[i+1]);
            arr.splice(i-1, 3, result);
        }
        
    }
    if (result === "NaN") {
        result = error();
    } 
    typeof result === "number" ? display.textContent = Math.round(result*100000)/100000 : display.textContent = result;
    result === 0 || result === "ERROR" ? displayValue = "" : displayValue = result;
})

clearButton.addEventListener("click", clear);

function add (n1, n2) {
    return +n1 + +n2;
}

function substract (n1, n2) {
    return +n1 - +n2;
}

function multiply (n1, n2) {
    return +n1 * +n2;
}

function divide (n1, n2) {
    if (+n2 === 0) {
        return error();
    }
    else {
        return +n1 / +n2;
    }
    
}

function error () {
    displayValue = "";
    return "ERROR";
}

function operate (n1, operator, n2) {
    if (operator === "+") {
        return add (n1, n2);
    }
    else if (operator === "-") {
        return substract (n1, n2);
    }
    if (operator === "x") {
        return multiply (n1, n2);
    }
    if (operator === "/") {
        return divide (n1, n2);
    }
}

function clear () {
    displayValue = "";
    display.textContent = "";
    result = 0;
}