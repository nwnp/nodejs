function firstPkg() {
  return "My First Package";
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

module.exports = {
  firstPkg,
  sleep,
};
