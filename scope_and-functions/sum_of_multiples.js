function sumOfMultiples(number, factors) {
    let sum = 0;
    for (let i = 0; i < number; i++) {
        for (let j = 0; j < factors.length; j++) {
            if (i % factors[j] === 0) {
                sum += i;
                break;
            }
        }
    }
    return sum;
}

module.exports = sumOfMultiples;