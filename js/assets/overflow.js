const format = function(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + "MB";
};

const print = function() {
  const memo = process.memoryUsage();
  console.log(
    `heapTotal: ${format(memo.heapTotal)}, heapUsed: ${format(memo.heapUsed)}`
  );
};

function local() {
  let localArr = [];
  for (let index = 0; index < 5; index++) {
    localArr.push(new Array(20 * 1024 * 1024));
    print();
  }
}

local();

let globalArr = [];
setInterval(() => {
  globalArr.push(new Array(20 * 1024 * 1024));
  print();
}, 100);
