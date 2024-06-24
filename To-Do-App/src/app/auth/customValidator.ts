import { AbstractControl } from "@angular/forms";


export class CustomValidator{

    static usernameValidator(control: AbstractControl){
        let username = control.value;
        if(!username) return null;
        username = username.trim();

        if(username.length > 50) return {maxLengthExceeded: true}
        return null;
      }


    static passwordValidator(control: AbstractControl){
        let password = control.value;

        if(!password) return null;
        password = password.trim();

        if(password.length < 8) return {minLengthRequired: true}
        // if(/[A-Z]/.test(password)) return {requiredUpperCase: true}
        // if(/[a-z]/.test(password)) return {requiredLowerCase: true}
        // if(/[0-9]/.test(password)) return {requiredNumber: true}
        // if(/[!@#$%^&*(),.?":{}|<>]/.test(password)) return {requiredNumber: true}
    
        return null;
      }

}