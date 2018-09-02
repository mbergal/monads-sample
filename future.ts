function fetch(url: string): Future<string> {
  return Future.of("content of cnn.com");
}

function demoFutures() {
  return fetch("http://cnn.com").bind(content => {
    console.log(content);
    return Future.of(content);
  });
}

class Future<T> {
  value: Promise<T>;
  public static of<U>(v: U): Future<U> {
    return new Future(Promise.resolve(v));
  }
  private constructor(value: Promise<T>) {
    this.value = value;
  }

  bind<U>(f: (T) => Future<U>): Future<U> {
    return new Future(this.value.then(x => f(x).value));
  }
}

demoFutures();
