document.addEventListener("DOMContentLoaded", function() {
    let input = document.querySelector('.input');
    let buttons = document.querySelectorAll('.btn');
    let clearButton = document.querySelector('.clear');
    let delButton = document.querySelector('.delete');
    let equalButton = document.querySelector('.equals');
    let historyDiv = document.querySelector('.display');

    // Add event listeners to buttons
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
        evaluateExpression();
    });

    // Function to evaluate the expression
    function evaluateExpression() {
        if (input.value !== '' && !isOperator(input.value.slice(-1))) {
            let result = calculate(input.value);
            let history = input.value + " = " + result;
            input.value = result;
            historyDiv.innerHTML += `<p>${history}</p>`;
        }
    }

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

    // Add event listener for Enter key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default action of Enter key
            evaluateExpression(); // Trigger "=" button functionality
        }
    });
});
