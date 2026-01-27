import './style.css'
import 'bootstrap'
import onChange from "on-change";

import { initView } from './view'
import { initI18n } from "./i18n";
import { validate } from "./validate";
import { FORM_BTN_SELECTOR, FORM_INPUT_SELECTOR, FORM_MESSAGE_SELECTOR, STATUS } from "./constants";

const rssList = [];
const initialState = {
    value: '',
    status: '',
    message: '',
}

const elements = {
    input: document.querySelector(FORM_INPUT_SELECTOR),
    submit: document.querySelector(FORM_BTN_SELECTOR),
    message: document.querySelector(FORM_MESSAGE_SELECTOR),
}

initI18n().then((i18nInstance) => {
    const state = onChange(initialState, initView(elements, initialState, i18nInstance))

    elements.submit.onclick = (e) => {
        e.preventDefault()

        const url = elements.input.value;

        validate(url, rssList)
            .then(({ isValid, error }) => {
                if (isValid) {
                    state.status = STATUS.VALIDATE;
                    state.message = 'messages.success.add'

                    rssList.push(url)
                } else {
                    state.status = STATUS.INVALIDATE;
                    state.message = error
                }
            })
    }
})

