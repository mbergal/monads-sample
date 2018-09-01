function identityDemo() {
  var result = new Identity(1).bind(value =>
    new Identity(2).bind(value2 => new Identity(value + value2))
  );

  console.log(result);

  // Identity { value: 3 }
}

class Identity<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }

  bind<U>(f: ((T) => Identity<U>)): Identity<U> {
    return f(this.value);
  }

  toString() {
    return `Identity(${this.value})`;
  }
}

identityDemo();
