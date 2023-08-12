import { ValidatorFn } from "@angular/forms";


export function matchPasswords(password: string): ValidatorFn {
    
    return (control) => {
        return control.value === '' || password === control.value 
        ? null 
        : { matchPasswords: true}
    }
}