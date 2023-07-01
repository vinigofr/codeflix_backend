import { type } from 'os';
import ValidationError from '../errors/validation-errors';

export default class ValidationRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidationRules(value, property);
  }

  required(): Omit<this, 'required'> {
    if (this.value === null || this.value === '' || this.value === undefined) {
      throw new ValidationError(`The field "${this.property}" is required`);
    }
    return this;
  }

  string(): Omit<this, 'string'> {
    if (!isEmpty(this.value) && typeof this.value !== 'string') {
      throw new ValidationError(
        `The field "${this.property}" must be a string`
      );
    }
    return this;
  }

  maxLength(max: number): Omit<this, 'maxLength'> {
    if (!isEmpty(this.value) && this.value.length > max) {
      throw new ValidationError(
        `The field "${this.property}" must be less or equal than ${max} characters`
      );
    }
    return this;
  }

  boolean(): Omit<this, 'boolean'> {
    if (!isEmpty(this.value) && typeof this.value !== 'boolean') {
      throw new ValidationError(
        `The field "${this.property}" must be a boolean`
      );
    }
    return this;
  }
}

export function isEmpty(value: any): boolean {
  return value === undefined || value === null;
}
