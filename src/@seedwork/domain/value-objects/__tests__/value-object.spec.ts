import ValueObject from '../value-object';

class StubValueObject extends ValueObject {}

describe('ValueObject unit tests', () => {
  it('should set value', () => {
    let vo = new StubValueObject('value');
    expect(vo.value).toEqual('value');

    vo = new StubValueObject({ value: 1 });
    expect(vo.value).toStrictEqual({ value: 1 });
  });

  it('should convert correctly', () => {
    let vo = new StubValueObject(null);
    expect(vo + '').toEqual('null');

    vo = new StubValueObject(undefined);
    expect(vo + '').toEqual('undefined');

    vo = new StubValueObject({});
    expect(vo + '').toEqual('{}');

    vo = new StubValueObject(123);
    expect(vo + '').toEqual('123');

    vo = new StubValueObject(true);
    expect(vo + '').toEqual('true');

    vo = new StubValueObject(false);
    expect(vo + '').toEqual('false');

    const date = new Date();
    vo = new StubValueObject(date);
    expect(vo + '').toBe(date.toString());
  });

  test('instance of check', () => {
    const obj = new StubValueObject({
      c: { d: { e: { value_not_change: new Date() } } },
    });

    expect(obj.value.c.d.e.value_not_change).toBeInstanceOf(Date);
  });
});
