import { REQUEST_STATUS, STATUS, TEXT_CLASS, VALIDATE_CLASS } from '../constants'

const renderForm = (elements, state, i18n) => {
  const { input, message, submit } = elements

  message.classList.remove(TEXT_CLASS[STATUS.VALIDATE], TEXT_CLASS[STATUS.INVALIDATE])
  input.classList.remove(VALIDATE_CLASS[STATUS.VALIDATE], VALIDATE_CLASS[STATUS.INVALIDATE])

  input.disabled = false
  submit.disabled = false

  if (state.form.status === STATUS.VALIDATE) {
    input.classList.add(VALIDATE_CLASS[STATUS.VALIDATE])
    message.classList.add(TEXT_CLASS[STATUS.VALIDATE])
  }
  else {
    input.classList.add(VALIDATE_CLASS[STATUS.INVALIDATE])
    message.classList.add(TEXT_CLASS[STATUS.INVALIDATE])
  }

  if (state.request.status === REQUEST_STATUS.SUCCESS) {
    input.value = ''
    input.focus()
    input.classList.remove(VALIDATE_CLASS[STATUS.VALIDATE])
  }

  if (state.request.status === REQUEST_STATUS.LOADING) {
    input.disabled = true
    submit.disabled = true
  }

  message.textContent = i18n.t(state.form.message)
}

export default renderForm
