import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id';
import Entity from '../../../@seedwork/domain/entity/entity';
import CategoryValidatorFactory from './validators/category.validator';

export type CategoryProps = {
  name: string;
  is_active?: boolean;
  created_at?: Date;
  description?: string;
};

export class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description ?? null;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
    Category.validate(props);
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get created_at() {
    return this.props.created_at;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set description(value: string) {
    this.props.description = value;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value;
  }

  static validate(data: CategoryProps) {
    const validator = CategoryValidatorFactory.create();
    validator.validate(data);
  }

  update({ name, description }: { name: string; description: string }): void {
    Category.validate({ name, description });
    this.props.description = description;
    this.props.name = name;
  }

  activate(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }
}
