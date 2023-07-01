import ValidationError from '../../../@seedwork/errors/validation-errors';
import { Category } from './category';

describe('Category Integration Tests', () => {
  describe('create method', () => {
    test('should be a invalid category when creating', () => {
      expect(() => new Category({ name: null as any })).toThrow(
        new ValidationError('The field "name" is required')
      );

      expect(() => new Category({ name: '' })).toThrow(
        new ValidationError('The field "name" is required')
      );

      expect(() => new Category({ name: 5 as any })).toThrow(
        new ValidationError('The field "name" must be a string')
      );

      expect(() => new Category({ name: 't'.repeat(256) })).toThrow(
        new ValidationError(
          'The field "name" must be less or equal than 255 characters'
        )
      );

      expect(
        () => new Category({ name: 'name', description: 5 as any })
      ).toThrow(
        new ValidationError('The field "description" must be a string')
      );

      expect(() => new Category({ name: 'name', is_active: 5 as any })).toThrow(
        new ValidationError('The field "is_active" must be a boolean')
      );
    });
  });

  describe('update method', () => {
    test('should be a invalid category when updating name property', () => {
      const category = new Category({ name: 'name' });
      expect(() =>
        category.update({
          description: null,
          name: null,
        } as any)
      ).toThrow(new ValidationError('The field "name" is required'));

      expect(() =>
        category.update({
          description: null,
          name: 't'.repeat(256),
        } as any)
      ).toThrow(
        new ValidationError(
          'The field "name" must be less or equal than 255 characters'
        )
      );

      expect(() =>
        category.update({
          description: null,
          name: '',
        } as any)
      ).toThrow(new ValidationError('The field "name" is required'));

      expect(() =>
        category.update({
          description: null,
          name: 5,
        } as any)
      ).toThrow(new ValidationError('The field "name" must be a string'));
    });

    test('should be a invalid category when updating description property', () => {
      const category = new Category({ name: 'name' });

      expect(() =>
        category.update({
          description: 5,
          name: 'some name',
        } as any)
      ).toThrow(
        new ValidationError('The field "description" must be a string')
      );
    });
  });

  describe('create category correctly', () => {
    const arr = [
      {
        is_active: true,
        name: 'Ação',
        description: 'Filmes repletos de aventura e emoção.',
      },
      {
        is_active: false,
        name: 'Comédia',
        description: 'Filmes divertidos que fazem você rir.',
      },
      {
        is_active: true,
        name: 'Drama',
        description: 'Filmes que exploram as emoções humanas.',
      },
    ];

    test('not to throw error when creating', () => {
      expect(() => {
        arr.forEach((cat) => {
          new Category(cat);
        });
      }).not.toThrowError();
    });

    test('not to throw error when updating', () => {
      const category = new Category({ name: 'some name' });

      expect(() => {
        arr.forEach((cat) => {
          category.update(cat);
        });
      }).not.toThrowError();
    });
  });
});
