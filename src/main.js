export function createCloneClass(ClassConstructor) {
  let CloneClassConstructor = createEmptyClass(ClassConstructor);

  // create empty prototype chain from defined class
  let {
    CloneClassConstructor: LastCloneClassConstructor,
  } = addEmptyPrototypeChain(ClassConstructor, CloneClassConstructor);

  // added real prototype chain at the end of prototype due to instanceof
  addRealPrototypeChain(ClassConstructor, LastCloneClassConstructor);

  clonePrototypeChainMethods(ClassConstructor, CloneClassConstructor);

  return CloneClassConstructor;
}

export function debug(ClassConstructor) {
  const iterate = createIterator(ClassConstructor);
  const log = ({ ClassConstructor, prototype }) => {
    console.log(`Class ${ClassConstructor.name}`); // eslint-disable-line no-console

    Object.entries(Object.getOwnPropertyDescriptors(prototype)).forEach(
      ([property]) => {
        console.log(`\tproperty ${property}`); // eslint-disable-line no-console
      }
    );
  };

  return iterate(log);
}

function createEmptyClass(ClassConstructor) {
  class EmptyClass {
    static [Symbol.hasInstance](instance) {
      return instance instanceof ClassConstructor;
    }

    constructor(...rest) {
      return Reflect.construct(this.constructor, rest, EmptyClass);
    }
  }

  Reflect.defineProperty(EmptyClass, 'name', { value: ClassConstructor.name });

  return EmptyClass;
}

function createIterator(ClassConstructor) {
  const prototypeIterator = prototypeGenerator(ClassConstructor);
  const OriginalClassConstructor = ClassConstructor;
  const OriginalPrototype = ClassConstructor.prototype;

  return (action, args) => {
    let result = {};

    for (const iteration of prototypeIterator) {
      result = action({
        ...args,
        ...{ OriginalClassConstructor, OriginalPrototype },
        ...iteration,
        ...result,
      });
    }

    return {
      ...args,
      ...{ OriginalClassConstructor, OriginalPrototype },
      ...result,
    };
  };
}

function* prototypeGenerator(ClassConstructor) {
  let prototype = ClassConstructor.prototype;

  while (
    prototype &&
    prototype !== Function.prototype &&
    prototype !== Object.prototype
  ) {
    yield { prototype, ClassConstructor };

    ClassConstructor = Reflect.getPrototypeOf(ClassConstructor);
    prototype = ClassConstructor.prototype;
  }
}

function addEmptyPrototypeChain(ClassConstructor, CloneClassConstructor) {
  const NextClassConstructor = Reflect.getPrototypeOf(ClassConstructor);
  const OriginalCloneClassConstructor = CloneClassConstructor;
  const iterate = createIterator(NextClassConstructor);

  return iterate(
    ({ ClassConstructor, CloneClassConstructor }) => {
      const EmptyClass = createEmptyClass(ClassConstructor);
      Reflect.setPrototypeOf(CloneClassConstructor, EmptyClass);
      Reflect.setPrototypeOf(
        CloneClassConstructor.prototype,
        EmptyClass.prototype
      );

      CloneClassConstructor = Reflect.getPrototypeOf(CloneClassConstructor);

      return { CloneClassConstructor };
    },
    { CloneClassConstructor, OriginalCloneClassConstructor }
  );
}

function addRealPrototypeChain(ClassConstructor, CloneClassConstructor) {
  const OriginalCloneClassConstructor = CloneClassConstructor;
  const iterate = createIterator(ClassConstructor);

  return iterate(
    ({ ClassConstructor, CloneClassConstructor }) => {
      Reflect.setPrototypeOf(CloneClassConstructor, ClassConstructor);
      Reflect.setPrototypeOf(
        CloneClassConstructor.prototype,
        ClassConstructor.prototype
      );
      CloneClassConstructor = Reflect.getPrototypeOf(CloneClassConstructor);

      return { CloneClassConstructor };
    },
    { CloneClassConstructor, OriginalCloneClassConstructor }
  );
}

function clonePrototypeChainMethods(ClassConstructor, CloneClassConstructor) {
  const OriginalCloneClassConstructor = CloneClassConstructor;
  const iterate = createIterator(ClassConstructor);

  return iterate(
    ({ prototype, CloneClassConstructor }) => {
      Object.entries(Object.getOwnPropertyDescriptors(prototype)).forEach(
        ([property, descriptor]) => {
          Reflect.defineProperty(CloneClassConstructor.prototype, property, {
            ...descriptor,
          });
        }
      );
      CloneClassConstructor = Reflect.getPrototypeOf(CloneClassConstructor);

      return { CloneClassConstructor };
    },
    { CloneClassConstructor, OriginalCloneClassConstructor }
  );
}
