function factorial(n, acc = 1) {
    acc = acc * n;
    n--;
    if (n <= 1) {
        return acc;

    }
    return factorial(n, acc);
}
console.log(factorial(9));

function factorial1(n) {
    let acc = 1;
    function mult() {
        if (n <= 1) {
            return acc;
        };
        acc = acc * n;
        n--;
        //console.log(acc);
        return mult();
    }
    return mult();
}
console.log(factorial1(9));