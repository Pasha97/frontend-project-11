import { setLocale, string } from 'yup'

setLocale({
  mixed: {
    notOneOf: 'messages.errors.duplicate',
    required: 'messages.errors.required',
  },
  string: {
    url: 'messages.errors.invalidUrl',
  },
})

export const validate = (value, rssList) => {
  const validateURl = string().url().trim().required().notOneOf(rssList)

  return validateURl.validate(value)
    .then(() => ({ isValid: true, error: '' }))
    .catch(err => ({ isValid: false, error: err.message }))
}
