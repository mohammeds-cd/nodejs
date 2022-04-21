function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function wait(time,data) {
  setTimeout(() => {
    console.log(data);
  }, time);
}

module.exports = {
  add,
  sub,
  wait
};
