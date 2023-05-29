const replacePresentWithNow = (strings: ReadonlyArray<string>) =>
    strings.map((string) => string.replace('Present', 'Now'));

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export { capitalize, replacePresentWithNow };
