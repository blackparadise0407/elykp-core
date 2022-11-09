import { SchemaOf, object, string, ref } from 'yup';

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerSchema: SchemaOf<RegisterForm> = object({
  username: string()
    .required('validation.please_enter_username')
    .min(3, 'validation.username_min_3')
    .matches(/^[a-zA-Z0-9_.]+$/, 'validation.username_pattern'),
  email: string()
    .email('validation.invalid_email')
    .required('validation.please_enter_email'),
  password: string().required('validation.please_enter_password'),
  confirmPassword: string()
    .oneOf([ref('password')], 'validation.passwords_do_not_match')
    .required('validation.please_enter_confirm_password'),
});
