import { deepFreeze } from '../utils/object';

export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }
  get value(): Value {
    return this._value;
  }

  toString = () => {
    const value = this.value;
    const isNotObject = typeof value !== 'object';
    const isNull = value === null;

    if (isNotObject || isNull) {
      try {
        return value.toString();
      } catch (error) {
        return value + '';
      }
    }

    const valueStr = value.toString();
    return valueStr === '[object Object]'
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
