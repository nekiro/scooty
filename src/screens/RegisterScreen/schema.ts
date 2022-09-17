import * as yup from 'yup';

export const schema = yup.object({
  phone: yup
    .string()
    .required('Phone number is required.')
    .min(5, 'Phone number length must be longer than 5 digits.'),
  name: yup
    .string()
    .required('Name is required.')
    .min(5)
    .matches(/^[A-Za-z]+$/, 'Name must only contain alphabets.'),
  surname: yup
    .string()
    .required('Surname is required.')
    .min(5)
    .matches(/^[A-Za-z]+$/, 'Surname must only contain alphabets.'),
  birthday: yup.string().required('Birthday is required.'),
});

export type SchemaType = yup.TypeOf<typeof schema>;
