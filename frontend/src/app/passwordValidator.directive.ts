/**
 * Checks if two passwords are identical.
 */

import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const passwordValidatorDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password1 = control.get('password1');
  const password2 = control.get('password2');

  if (password1 == null || password2 == null || password1.value === password2.value) {
    return null;
    }
  return { passwordInvalid: true };
};

@Directive({
  selector: '[appPasswordValid]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return passwordValidatorDirective(control);
  }
}
