import { STATUS } from "./core";

export const TEXT_CLASS = {
    [STATUS.VALIDATE]: 'text-success',
    [STATUS.INVALIDATE]: 'text-danger',
}

export const VALIDATE_CLASS = {
    [STATUS.VALIDATE]: 'is-valid',
    [STATUS.INVALIDATE]: 'is-invalid',
}