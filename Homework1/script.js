let input = document.querySelector('input[name="number-input"]');
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        taskManager(this.value)
    })
})
function filter_input(e, regexp) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var isIE = document.all;

    if (target.tagName.toUpperCase() == 'INPUT') {
        var code = isIE ? e.keyCode : e.which;
        if (code < 32 || e.ctrlKey || e.altKey) return true;

        var char = String.fromCharCode(code);
        if (!regexp.test(char)) return false;
    }
    return true;
}

function taskManager(value) {
    if (value.match(/[0-9%.\/*\-+\(\)]/)) {
        input.value = input.value + value;
    }
    else if (value.match(/=/)) {
        if (input.value != '') {
            input.value = math.evaluate(input.value);
        }
    }
    else if (value === 'CE') {
        input.value = '';
        //trimmed = input.value.substring(0, input.value.length - 1);
        // input.value = input.value.substring(0, input.value.length - 1);
    }
    else {
        input.value = error;
    }

}
function backspace() {
    trimmed = input.value.substring(0, input.value.length - 1);
    console.log(trimmed);
    input.value = input.value.substring(0, input.value.length - 1);
}