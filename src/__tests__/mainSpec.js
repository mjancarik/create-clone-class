import createCloneClass from '../main';
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
});
