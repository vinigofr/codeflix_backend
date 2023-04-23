import { Category } from './category';
import { omit } from 'lodash';
import { validate as uuidValidate } from 'uuid';

describe('Category Unit Tests', () => {
  test('constructor test', () => {
    let category = new Category({
      name: 'Fake movie',
      description: 'Some description',
    });

    let props = omit(category.props, 'created_at');
    expect(category.props.created_at).toBeInstanceOf(Date);
    expect(props).toStrictEqual({
      name: 'Fake movie',
      description: 'Some description',
      is_active: true,
    });

    const createdAt = new Date();
    category = new Category({
      name: 'Fake movie',
      created_at: createdAt,
    });
    expect(category.props).toMatchObject({
      name: 'Fake movie',
      created_at: createdAt,
    });
  });

  test('id field', () => {
    const data = [
      { props: { name: 'Fake movie' } },
      { props: { name: 'Fake movie' }, id: null },
      {
        props: { name: 'Fake movie' },
        id: '2519043f-da49-466b-bfb0-26400697e8a3',
      },
    ];

    data.forEach(({ props, id }) => {
      const category = new Category(props, id);
      expect(category.id).toBeDefined();
      expect(uuidValidate(category.id)).toBeTruthy();
    });

    const category = new Category({ name: 'Fake movie' }, 'some_id');
    expect(category.id).toBe('some_id');
    expect(uuidValidate(category.id)).not.toBeTruthy();
  });

  test('getter name', () => {
    const category = new Category({ name: 'Fake movie' });

    expect(category.name).toBe('Fake movie');
  });

  test('getter and setter of description property', () => {
    let category = new Category({ name: 'Fake movie' });
    expect(category.description).toBeNull();

    category = new Category({
      name: 'Fake movie',
      description: 'Some description',
    });
    expect(category.description).toBe('Some description');

    category = new Category({
      name: 'Fake movie',
      description: 'Some description',
    });
    category['description'] = 'Other description';
    expect(category.description).toBe('Other description');
  });

  test('getter and setter of is_active property', () => {
    let category = new Category({ name: 'Fake movie' });
    expect(category.is_active).toBeTruthy();
    category['is_active'] = false;
    expect(category.is_active).toBeFalsy();

    category = new Category({ name: 'Fake movie', is_active: false });
    expect(category.is_active).toBeFalsy();
    category['is_active'] = true;
    expect(category.is_active).toBeTruthy();
  });

  test('getter created_at property', () => {
    const category = new Category({ name: 'Fake movie' });
    expect(category.created_at).toBeInstanceOf(Date);
  });
});
