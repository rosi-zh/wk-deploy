import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { matchPasswords } from './match-passwords';

@Directive({
  selector: '[appMatchPasswords]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordsDirective,
    multi: true
  }]
})
export class MatchPasswordsDirective implements Validator, OnChanges {
  @Input() appMatchPasswords: string | undefined;
  
  validator: ValidatorFn = () => null;

  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const repassChange = changes['appMatchPasswords'];

    if (repassChange) {
      this.validator = matchPasswords(repassChange.currentValue);
    }
  }
}
