abstract class Result<A, E> {
  abstract bind<B, E>(f: ((A) => Result<B, E>)): Result<B, E>;
  abstract toString(): string;
}

export class Ok<A, E> extends Result<A, E> {
  value: A;
  constructor(value: A) {
    super();
    this.value = value;
  }

  bind<B, E>(f: ((A) => Result<B, E>)): Result<B, E> {
    return f(this.value);
  }

  toString() {
    return `Ok(${this.value})`;
  }
}

class Error<A, E> extends Result<A, E> {
  value: E;
  constructor(value: E) {
    super();
    this.value = value;
  }

  bind<B, E>(f: ((A) => Result<B, E>)): Result<B, E> {
    return new Error(this.value);
  }

  toString() {
    return `Error(${this.value})`;
  }
}

class FetchError {}

function main() {
  console.log(
    fetchSuccess("someurl").bind(v => {
      return new Ok(v);
    })
  );

  console.log(
    fetchFailure("someurl").bind(v => {
      return new Ok(v);
    })
  );
}

function fetchFailure(url: string): Result<string, FetchError> {
  return new Error(new FetchError());
}

function fetchSuccess(url: string): Result<string, FetchError> {
  return new Ok("abc");
}

main();
