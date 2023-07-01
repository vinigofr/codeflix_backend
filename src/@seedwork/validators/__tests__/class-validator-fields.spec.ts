import { ClassValidatorFields } from '../class-validator-fields';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('Class Validator Fields Unit Tests', () => {
  it('should initialize errors and validatedData with null', () => {
    const validatorFields = new StubClassValidatorFields();

    expect(validatorFields.errors).toBeNull();
    expect(validatorFields.validatedData).toBeNull();
  });

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: { isRequired: 'some error' },
      },
    ]);

    expect(spyValidateSync).not.toHaveBeenCalled();
    expect(new StubClassValidatorFields().validate({})).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(spyValidateSync).toHaveBeenCalledWith({});
  });
});
