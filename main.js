document.addEventListener("DOMContentLoaded", function() {
    let input = document.querySelector('.input');
    let buttons = document.querySelectorAll('.btn');
    let clearButton = document.querySelector('.clear');
    let delButton = document.querySelector('.delete');
    let equalButton = document.querySelector('.equals');
    let historyDiv = document.querySelector('.display');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.innerText !== '=' && button.innerText !== 'AC' && button.innerText !== 'Del') {
                input.value += button.innerText;
            }
        });
    });

    clearButton.addEventListener('click', function() {
        input.value = '';
    });

    delButton.addEventListener('click', function() {
        input.value = input.value.slice(0, -1);
    });

    equalButton.addEventListener('click', function() {
        if (input.value !== '' && !isOperator(input.value.slice(-1))) {
            result = calculate(input.value);
            let NewArray = []
            let history = input.value + " = " + result
            NewArray.push(history)
            input.value = result;
            for(let index in NewArray){
                historyDiv.innerHTML += `<p>${NewArray[index]}</p>`
            }
        }
    });

    function isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    function calculate(expression) {
        try {
            let result = new Function('return ' + expression)();
            return result.toString();
        } catch (error) {
            return 'Error';
        }
    }
});