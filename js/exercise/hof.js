const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce(function (total, item) {
    return total + item;
}, 5);

console.log(sum);