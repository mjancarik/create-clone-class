import { createCloneClass } from '../main';
import createClasses from './createClasses';

describe('method createCloneClass', () => {
  it('should not throw error during creating clone class', () => {
    const { A, B, C, D } = createClasses();

    expect(() => {
      createCloneClass(A);
      createCloneClass(B);
      createCloneClass(C);
      createCloneClass(D);
    }).not.toThrow();
  });

  it('should clone parent methods', () => {
    const { C } = createClasses();

    const CloneC = createCloneClass(C);
    const c = new CloneC('C');
    Reflect.getPrototypeOf(C.prototype).method = () => 'not C';

    expect(c.method()).toEqual('C');
  });

  it('should clone own methods', () => {
    const { D } = createClasses();

    const CloneD = createCloneClass(D);
    D.prototype.method = () => 'not D';

    const d = new CloneD();

    expect(d.method()).toEqual('D');
  });

  it('should create clone multiple times for same ClassConstructor', () => {
    const { B } = createClasses();

    const CloneB = createCloneClass(B);
    const CloneB2 = createCloneClass(B);

    B.prototype.method = () => 'not B';

    const b = new CloneB('A');
    const b2 = new CloneB2('A');

    expect(b.superMethod()).toEqual('A');
    expect(b.method()).toEqual('B A');
    expect(b2.method()).toEqual('B A');
  });

  it('should resolve right instanceof for cloned class', () => {
    const { A, B } = createClasses();

    const CloneB = createCloneClass(B);

    B.prototype.method = () => 'not B';

    const b = new CloneB('A');
    const bb = new B('A');

    expect(b instanceof B).toEqual(true);
    expect(b instanceof A).toEqual(true);
    expect(bb instanceof CloneB).toEqual(true);
    expect(bb instanceof B).toEqual(true);
    expect(bb instanceof A).toEqual(true);
  });
});
