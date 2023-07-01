import ValidatorRules from '../validator-rules';
import ValidationError from '../../errors/validation-errors';

type Values = {
  value: any;
  property: string;
};

type Properties = Values & {
  rule?: keyof ValidatorRules;
  error?: ValidationError;
  params?: any[];
};

function assertField({
  value,
  property,
  rule,
  error,
  params = [],
}: Properties) {
  const assertion = () => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];

    method.apply(validator, params);
  };

  if (error) {
    expect(assertion).toThrow(error);
  } else {
    expect(assertion).not.toThrowError();
  }
}

describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  test('required validation rule with throw error', () => {
    const arrange: Values[] = [
      { property: 'field', value: null },
      { property: 'field', value: undefined },
      { property: 'field', value: '' },
    ];

    arrange.forEach(({ value, property }) => {
      assertField({
        value,
        property,
        rule: 'required',
        error: new ValidationError('The field "field" is required'),
      });
    });
  });

  test('required validation rule without error', () => {
    const arrange: Values[] = [
      { value: 'vinicius', property: 'name' },
      { value: 23, property: 'age' },
      { value: 'Brazil', property: 'country' },
      { value: 0, property: 'max_errors_expected' },
    ];
    arrange.forEach(({ property, value }) => {
      assertField({ value, property, rule: 'required' });
    });
  });

  test('string validation rule with throw error', () => {
    const arrange: Values[] = [
      { value: {}, property: 'string' },
      { value: 123, property: 'string' },
      { value: Number, property: 'string' },
    ];
    arrange.forEach(({ property, value }) => {
      assertField({
        value,
        property,
        rule: 'string',
        error: new ValidationError(`The field "${property}" must be a string`),
      });
    });
  });

  test('string validation rule without error', () => {
    const arrange: Values[] = [
      { value: 'vinicius', property: 'name' },
      { value: 'Brazil', property: 'country' },
    ];

    arrange.forEach(({ property, value }) => {
      assertField({ value, property, rule: 'string' });
    });
  });

  test('maxLength validation quantity rule', () => {
    let arrange: Properties[] = [{ value: 'aaaaaa', property: 'field' }];
    const error = new ValidationError(
      'The field "field" must be less or equal than 5 characters'
    );

    arrange.forEach((i) => {
      assertField({
        value: i.value,
        property: i.property,
        rule: 'maxLength',
        error,
        params: [5],
      });
    });

    arrange = [{ value: 'aaaaa', property: 'field' }];
    arrange.forEach((i) => {
      assertField({
        value: i.value,
        property: i.property,
        rule: 'maxLength',
        params: [5],
      });
    });
  });

  test('boolean validation without errors', () => {
    let arrange: Properties[] = [
      { value: false, property: 'boolean' },
      { value: true, property: 'boolean' },
    ];

    arrange.forEach((i) => {
      assertField({
        value: i.value,
        property: i.property,
        rule: 'boolean',
      });
    });
  });

  test('boolean validation with errors', () => {
    let arrange: Properties[] = [
      { value: '', property: 'boolean' },
      { value: 'abc', property: 'boolean' },
      { value: 123, property: 'boolean' },
      { value: {}, property: 'boolean' },
    ];
    const error = new ValidationError('The field "boolean" must be a boolean');

    arrange.forEach((i) => {
      assertField({
        value: i.value,
        property: i.property,
        rule: 'boolean',
        error,
      });
    });
  });

  // Testes para combinações dos métodos: required(), string(), boolean(), maxLength()

  test('Deve lançar um erro quando o valor não é um booleano', () => {
    expect(() => {
      ValidatorRules.values('Texto longo demais', 'campo13').maxLength(5);
    }).toThrow('The field "campo13" must be less or equal than 5 characters');

    expect(() => {
      ValidatorRules.values('Textooooo', 'campo14').maxLength(5).required();
    }).toThrow('The field "campo14" must be less or equal than 5 characters');

    expect(() => {
      ValidatorRules.values('Texto curto', 'campo15').maxLength(5).string();
    }).toThrow('The field "campo15" must be less or equal than 5 characters');

    expect(() => {
      ValidatorRules.values('Texto médio', 'campo16').boolean();
    }).toThrow('The field "campo16" must be a boolean');
    expect(() => {
      ValidatorRules.values(123, 'campo5').string();
    }).toThrow('The field "campo5" must be a string');

    expect(() => {
      ValidatorRules.values(true, 'campo6').string().required();
    }).toThrow('The field "campo6" must be a string');

    expect(() => {
      ValidatorRules.values('', 'campo7').string().boolean();
    }).toThrow('The field "campo7" must be a boolean');

    expect(() => {
      ValidatorRules.values({}, 'campo8').string().maxLength(10);
    }).toThrow('The field "campo8" must be a string');

    expect(() => {
      ValidatorRules.values(undefined, 'campo1').required();
    }).toThrow('The field "campo1" is required');

    expect(() => {
      ValidatorRules.values({}, 'campo2').string().required();
    }).toThrow('The field "campo2" must be a string');

    expect(() => {
      ValidatorRules.values('true', 'campo3').required().boolean();
    }).toThrow('The field "campo3" must be a boolean');
    expect(() => {
      ValidatorRules.values('Texto', 'campo9').boolean();
    }).toThrow('The field "campo9" must be a boolean');

    expect(() => {
      ValidatorRules.values({}, 'campo10').boolean().required();
    }).toThrow('The field "campo10" must be a boolean');

    expect(() => {
      ValidatorRules.values(0, 'campo11').boolean().string();
    }).toThrow('The field "campo11" must be a boolean');

    expect(() => {
      ValidatorRules.values('false', 'campo12').boolean().maxLength(10);
    }).toThrow('The field "campo12" must be a boolean');
  });

  test('should not throw error with valid validations', () => {
    expect(() => {
      ValidatorRules.values('valor', 'campo1').required();
      ValidatorRules.values('texto', 'campo2').required().string();
      ValidatorRules.values(true, 'campo3').required().boolean();
      ValidatorRules.values('Texto', 'campo4').required().maxLength(10);
      ValidatorRules.values('Texto', 'campo5').string();
      ValidatorRules.values('Exemplo', 'campo6').string().required();
      ValidatorRules.values('Outro texto', 'campo7').string();
      ValidatorRules.values('Curto', 'campo8').string().maxLength(10);
      ValidatorRules.values(false, 'campo9').boolean();
      ValidatorRules.values(true, 'campo10').boolean().required();
      ValidatorRules.values(false, 'campo11').boolean();
      ValidatorRules.values('123456789', 'campo12').maxLength(10);
      ValidatorRules.values('Texto', 'campo13').maxLength(10);
      ValidatorRules.values('Curto', 'campo14').maxLength(10).required();
      ValidatorRules.values('Outro', 'campo15').maxLength(10).string();
      ValidatorRules.values('Texto médio', 'campo16').maxLength(20);
    }).not.toThrow();
  });
});
