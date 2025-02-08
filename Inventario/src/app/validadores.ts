import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;
        if (typeof valor === 'string' && valor.includes('@')) {
            return null; // Válido
        }
        return { emailValidator: true }; // No válido
    };
}