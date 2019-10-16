import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password1 = control.get('password1');
  const password2 = control.get('password2');

  return password1 && password2 && (password1.value === password2.value) ? { 'passwordValid': true } : null;
};

@Directive({
  selector: '[appPasswordValid]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return passwordValidator(control);
  }
}
