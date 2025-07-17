import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isValidCPF } from 'src/utils/isValidCpf';

@ValidatorConstraint({ async: false })
export class IsCPFValidConstraint implements ValidatorConstraintInterface {
  validate(cpf: any, args: ValidationArguments) {
    return typeof cpf === 'string' && isValidCPF(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF inválido';
  }
}

export function IsCPFValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFValidConstraint,
    });
  };
}
