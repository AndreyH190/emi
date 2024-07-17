import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(value: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const error = control.value === value;
        return error ? { nameError: { value: control.value } } : null;
    };
}