const data = (() => {
    const name = 'GervinFungDaXuen-Résumé';
    const files = 'files';
    const pdf = `${files}/${name}.pdf` as const;

    return {
        pdf,
        name,
        files,
    } as const;
})();

export default data;
