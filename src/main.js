import './style.css'
import 'bootstrap'
import { string } from 'yup';
import { initView } from './view.js'
import onChange from "on-change";
import { FORM_BTN_SELECTOR, FORM_INPUT_SELECTOR, FORM_MESSAGE_SELECTOR, MESSAGE_TYPE, STATUS } from "./constants";

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

const state = onChange(initialState, initView(elements, initialState))

const validateURl = string().url().required();

const validate = (value) => {
    return validateURl.isValid(value)
        .then(isValid => {
            if (isValid) {
                return { isValid: true, error: '' };
            } else {
                return { isValid: false, error: !value ? MESSAGE_TYPE.ERROR_EMPTY : MESSAGE_TYPE.ERROR };
            }
        })
};

elements.submit.onclick = (e) => {
    e.preventDefault()

    const url = elements.input.value;

    validate(url).then(({ isValid, error }) => {
        if (isValid) {
            state.status = STATUS.VALIDATE;
            state.message = MESSAGE_TYPE.SUCCESS

            rssList.push(url)
        } else {
            state.status = STATUS.INVALIDATE;
            state.message = error
        }
    })
}
