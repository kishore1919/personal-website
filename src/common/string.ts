const isBlank = (value: string) =>
    value.split('').filter((c) => ' ' === c).length === value.length;

const isEmpty = (s: string) => !s;

export { isBlank, isEmpty };
