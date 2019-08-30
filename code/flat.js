// [2, [3, 5, 6], [3, [1, [2]]]];

function flat(array) {
  return array.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? flat(cur) : cur),
    []
  );
}
