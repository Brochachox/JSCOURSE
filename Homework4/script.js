//спосіб 1
function factorial(n, acc = 1) {
    acc = acc * n;
    n--;
    console.log(n + ', ' + acc);
    if (n <= 1) {
        return acc;
    }
    return factorial(n, acc);
}
console.log(factorial(4));


//спосіб 2
function factorial(n) {
    let acc = 1;
    function mult() {
        if (n <= 1) {
            return acc;
        };
        acc = acc * n;
        n--;
        return mult();
    }
    return mult();
}
console.log(factorial(5));


//спосіб 3
function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(factorial(5));
