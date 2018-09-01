function demoList() {
  console.log(["a", "b"].bind(x => [x, x + "!"]));
}

interface Array<T> {
  bind<U>(f: (T) => Array<U>): Array<U>;
}
Array.prototype.bind = function(f) {
  const r = [];
  this.map(f).forEach(element => {
    element.forEach(v => r.push(v));
  });
  return r;
};

demoList();
