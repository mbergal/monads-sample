type Config = { url: string };

function g(): Reader<Config, string> {
  return new Reader(config => config.url + "?aaa");
}

function f(): Reader<Config, string> {
  return g().bind(v => new Reader(() => v + "&bbb"));
}

function main() {
  const config: Config = { url: "http://news.ycombinator.com" };
  console.log(f().run(config));
}

class Reader<C, A> {
  k: (C) => A;
  constructor(k: (C) => A) {
    this.k = k;
  }
  run(c: C): A {
    return this.k(c);
  }

  bind<U>(f: (T) => Reader<C, U>): Reader<C, U> {
    return new Reader(c => f(this.k(c)).run(c));
  }
}

main();
