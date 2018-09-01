function maybeDemo() {
  type Address = {
    street: string;
    zipcode: Maybe<string>;
  };
  type Person = {
    address: Maybe<Address>;
  };

  console.log(
    new Just({
      address: new Just({
        street: "Some Street",
        zipcode: new Just("12345")
      })
    })
      .bind(x => x.address)
      .bind(x => x.zipcode)
  );

  console.log(
    new Just({
      address: new Nothing()
    })
      .bind(x => x.address)
      .bind(x => x.zipcode)
  );

  // Just { value: '12345' }
  // Nothing {}
}

abstract class Maybe<T> {
  abstract bind<U>(f: ((T) => Maybe<U>)): Maybe<U>;
  abstract toString(): string;
}

class Just<T> extends Maybe<T> {
  value: T;
  constructor(value: T) {
    super();
    this.value = value;
  }

  bind<U>(f: ((T) => Maybe<U>)): Maybe<U> {
    return f(this.value);
  }

  toString() {
    return `Just(${this.value})`;
  }
}

class Nothing<T> extends Maybe<T> {
  bind<U>(f: ((T) => Maybe<U>)): Maybe<U> {
    return new Nothing();
  }

  toString() {
    return `Nothing()`;
  }
}

maybeDemo();
