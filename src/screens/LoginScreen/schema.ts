import * as yup from 'yup';

export const schema = yup.object({
  phone: yup
    .string()
    .required('Phone number is required.')
    .min(5, 'Phone number length must be longer than 5 digits.'),
});

export type SchemaType = yup.TypeOf<typeof schema>;
