export default function createCloneClass(ClassConstructor) {
  let CloneClassConstructor = createEmptyClass(ClassConstructor);

  clonePrototypeChain(ClassConstructor, CloneClassConstructor);

  return CloneClassConstructor;
}

function createEmptyClass(ClassConstructor) {
  class EmptyClass extends ClassConstructor {}

  Reflect.defineProperty(EmptyClass, 'name', { value: ClassConstructor.name });

  return EmptyClass;
}

function clonePrototypeChain(OriginalClassConstructor, CloneClassConstructor) {
  let originalPrototype = OriginalClassConstructor.prototype;

  while (
    originalPrototype &&
    originalPrototype !== Function.prototype &&
    originalPrototype !== Object.prototype
  ) {
    Object.entries(Object.getOwnPropertyDescriptors(originalPrototype)).forEach(
      ([property, descriptor]) => {
        Reflect.defineProperty(
          CloneClassConstructor.prototype,
          property,
          descriptor
        );
      }
    );

    OriginalClassConstructor = Reflect.getPrototypeOf(OriginalClassConstructor);
    originalPrototype = OriginalClassConstructor.prototype;
    CloneClassConstructor = Reflect.getPrototypeOf(CloneClassConstructor);
  }
}
