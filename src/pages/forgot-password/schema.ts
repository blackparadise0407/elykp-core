import { SchemaOf, object, string } from 'yup';

export interface ForgotPasswordForm {
  email: string;
}

export const forgotPasswordSchema: SchemaOf<ForgotPasswordForm> = object({
  email: string()
    .email('validation.invalid_email')
    .required('validation.please_enter_email'),
});
