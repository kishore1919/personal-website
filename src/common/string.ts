const isBlank = (s: string) =>
    s.split('').filter((c) => ' ' === c).length === s.length;

const isEmpty = (s: string) => !s;

export { isBlank, isEmpty };
