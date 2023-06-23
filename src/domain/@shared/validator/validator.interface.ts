interface ValidatorInterface<T> {
  validate(entity: T): void;
}

export { ValidatorInterface };
