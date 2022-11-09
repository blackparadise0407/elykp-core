import { SchemaOf, object, string } from 'yup';

export interface LoginForm {
  email: string;
  password: string;
}

export const loginSchema: SchemaOf<LoginForm> = object({
  email: string()
    .email('validation.invalid_email')
    .required('validation.please_enter_email'),
  password: string().required('validation.please_enter_password'),
});
