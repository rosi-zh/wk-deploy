import { ValidatorFn } from "@angular/forms";


export function emailValidator(): ValidatorFn {
    const regExp = /^[A-Za-z0-9]+[\._A-Za-z0-9-]+@([A-Za-z0-9]+[-\.]?[A-Za-z0-9]+)+(\.[A-Za-z0-9]+[-\.]?[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    return (control) => {
        return control.value === '' || regExp.test(control.value)
        ? null
        : { emailValidator: true };
    }
}