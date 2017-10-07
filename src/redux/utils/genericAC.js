import { SUCCESS, START, FAIL } from './constants';


export function genericAC(code = '', suffix = '', payload = {}) {
  return { type: code + suffix, payload };
}

export function genericStartAC(code = '', payload = {}) {
  return genericAC(code, START, payload);
}

export function genericSuccessAC(code = '', payload = {}) {
  return genericAC(code, SUCCESS, payload);
}

export function genericFailAC(code = '', payload = {}) {
  return genericAC(code, FAIL, payload);
}
