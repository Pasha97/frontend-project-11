import { STATUS, TEXT_CLASS, VALIDATE_CLASS } from "./constants";

export const initView = (elements, state, i18n) => {
    const { input, message } = elements

    const render = () => {
        message.classList.remove(TEXT_CLASS[STATUS.VALIDATE], TEXT_CLASS[STATUS.INVALIDATE]);
        input.classList.remove(VALIDATE_CLASS[STATUS.VALIDATE], VALIDATE_CLASS[STATUS.INVALIDATE]);

        if (state.status === STATUS.VALIDATE) {
            input.classList.add(VALIDATE_CLASS[STATUS.VALIDATE]);
            message.classList.add(TEXT_CLASS[STATUS.VALIDATE]);
        } else {
            input.classList.add(VALIDATE_CLASS[STATUS.INVALIDATE]);
            message.classList.add(TEXT_CLASS[STATUS.INVALIDATE]);
        }

        message.textContent = i18n.t(state.message);
    }

    return render
}