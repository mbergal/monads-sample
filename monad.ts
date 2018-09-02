interface Monad<T> {
  bind<U>(f: (T) => Monad<U>): Monad<U>;
}
