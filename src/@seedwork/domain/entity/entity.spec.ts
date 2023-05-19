import UniqueEntityId from '../value-objects/unique-entity-id';
import Entity from './entity';
import { validate as uuidValidade } from 'uuid';
class StubEntity extends Entity<{ prop1: string; prop2: number }> {}
describe('Entity Unit Tests', () => {
  it('it should set props and id', () => {
    const obj = { prop1: 'vinicius', prop2: 23 };

    const entity = new StubEntity(obj);
    expect(entity.props).toStrictEqual(obj);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.uniqueEntityId.id).not.toBeNull();
    expect(uuidValidade(entity.id)).toBeTruthy();
  });

  it('should accept a valid UUID', () => {
    const obj = { prop1: 'vinicius', prop2: 23 };

    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(obj, uniqueEntityId);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  });

  it('should be converted entity to JS object', () => {
    const obj = { prop1: 'vinicius', prop2: 23 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(obj, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({ id: entity.id, ...entity.props });
  });
});
