const replacePresentWithNow = (strings: ReadonlyArray<string>) =>
    strings.map((string) => string.replace('Present', 'Now'));

export { replacePresentWithNow };
