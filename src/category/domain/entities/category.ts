import { v4 as uuid } from 'uuid';

export type CategoryProps = {
  name: string;
  is_active?: boolean;
  created_at?: Date;
  description?: string;
};

export class Category {
  public readonly id: string;

  constructor(public readonly props: CategoryProps, id?: string) {
    this.id = id || uuid();
    this.description = this.props.description ?? null;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
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
}
