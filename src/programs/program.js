function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function wait(time, data) {
  setTimeout(() => {
    console.log(data);
  }, time);
}

function squareOfNumber(number) {
  return number * number;
}

module.exports = {
  add,
  sub,
  wait,
  squareOfNumber
};
