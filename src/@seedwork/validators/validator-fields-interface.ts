export type FieldsErrors = {
  [field: string]: string[];
} | null;

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}
