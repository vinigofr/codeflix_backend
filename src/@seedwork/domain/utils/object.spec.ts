import { deepFreeze } from './object';

describe('Object Unit Tests', () => {
  it('should be immutable', () => {
    const obj = deepFreeze({
      a: 'a',
      b: 'b',
      c: { d: { e: { value_not_change: 'do_not_change' } } },
    });

    expect(() => (obj.c.d.e.value_not_change = 'changed')).toThrow(
      "Cannot assign to read only property 'value_not_change' of object '#<Object>"
    );
  });

  it('should change non-object values', () => {
    let str = deepFreeze('a');
    expect(typeof str).toBe('string');
    expect(str).toBe('a');

    str = 'b';
    expect(typeof str).toBe('string');
    expect(str).toBe('b');
  });
});
