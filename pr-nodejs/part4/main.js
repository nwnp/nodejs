const { sleep } = require("@pa12/jin-test-pkg");
const { firstPkg } = require("@pa12/jin-test-pkg");

async function main() {
  console.log("before sleep");
  await sleep(1000);
  console.log("after sleep");
  await sleep(1000);
  console.log(firstPkg());
}

main();
