
let button = document.querySelector(".button");
button.addEventListener('click', function () {
    let currencyType = document.querySelector('input[name="currency-type-field"]').value;
    let uahQuantity = document.querySelector('input[name="uah-field"]').value;
    let outputField = document.querySelector('input[name="output-field"]');
    let coefficients = document.querySelectorAll('.currency-exchanger__field_field-coefficient');
    let output = calculate(currencyType, uahQuantity, coefficients);
    if (output === 'error' || !isFinite(output)) {
        document.querySelector('.currency-exchanger__error-output').innerHTML = 'Error';
    } else {
        console.log(output);
        outputField.value = output.toFixed(2);
    }
})

function calculate(currencyType, uahQuantity, coefficients) {

    switch (currencyType.toLowerCase()) {
        case 'usd':
            return uahQuantity / coefficients[0].value;

        case 'eur':
            return uahQuantity / coefficients[1].value;

        case 'gbp':
            return uahQuantity / coefficients[2].value;

        default:
            return 'error';

    }
}

