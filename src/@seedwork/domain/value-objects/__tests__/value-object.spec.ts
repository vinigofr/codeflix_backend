import ValueObject from '../value-object';

class StubValueObject extends ValueObject {
  constructor(readonly id) {
    super(id);
  }
}

describe('ValueObject unit tests', () => {
  it('should set value', () => {
    let vo = new StubValueObject('value');
    expect(vo.value).toEqual('value');

    vo = new StubValueObject({ value: 1 });
    expect(vo.value).toStrictEqual({ value: 1 });
  });
});
