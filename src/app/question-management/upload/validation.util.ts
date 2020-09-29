/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */
export class ValidationUtil {
  static isEmpty(value: string) {
    if (value === null) {
      return false;
    } else if (value === '') {
      return false;
    } else if (value === undefined) {
      return false;
    } else if (new RegExp(/^\s+$/).test(value)) {
      return false;
    } else {
      return true;
    }
  }

  static isValidateEmail(value: string) {
    if (/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/.test(value)) {
      return true;
    } else {
      return false;
    }
  }
}
