import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

export function priceValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = control.value > 0;
    return isValid ? null : { 'priceValidator': { value: control.value }};
  };
}

@Directive({
  selector: '[appPriceValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PriceValidatorDirective, multi: true}]
})
export class PriceValidatorDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} | null {
    return priceValidator()(control);
  }

}
