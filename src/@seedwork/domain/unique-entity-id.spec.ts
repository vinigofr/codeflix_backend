import InvalidUuidError from '../../@seedwork/errors/invalid-uuid.error';
import UniqueEntityId from './unique-entity-id';

const spyValidateMethod = () =>
  jest.spyOn(UniqueEntityId.prototype as any, 'validate');

describe('UniqueEntityId Unit Tests', () => {
  const validateSpy = spyValidateMethod();
  beforeEach(() => validateSpy.mockClear());

  it('should throw error when uuid is invalid', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    expect(() => new UniqueEntityId('abc')).toThrow(
      new InvalidUuidError('ID must be a valid UUID')
    );

    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should generate UUID with success', () => {
    const uuid = 'c3ceb9f0-8a9c-4c8b-a7e5-6e7f0d0c5e1b';
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    const generatedUUID = new UniqueEntityId(uuid);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(generatedUUID.id).toBe(uuid);
  });
});
