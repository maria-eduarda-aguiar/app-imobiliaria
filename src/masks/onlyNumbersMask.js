export function onlyNumbersMask(value) {
    return value ? value.replace(/\D/g, "") : value;
  }