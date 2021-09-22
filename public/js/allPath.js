import { readdirSync, lstatSync, createWriteStream } from 'fs';
import { resolve } from 'path';

const readAllPath = () => {
    const directoryName = '.';
    const allFilesCache = storeAllPath(readdirSync(directoryName), directoryName);
    writeToFile(allFilesCache);
};

const storeAllPath = (fileNames, directoryName) => {
    return fileNames.map((file) => {
        if (!file.includes('.git') && file !== 'node_modules' && file !== 'build' && file !== 'test') {
            const filePath = directoryName + '/' + file;
            if (lstatSync(resolve(directoryName, file)).isDirectory()) {
                return storeAllPath(readdirSync(filePath), filePath);
            } else {
                return filePath.substring(2);
            }
        }
        return '/';
    });
};

const mapFileToString = (file) => {
    if (Array.isArray(file)) {
        return file.map(files => {
            return Array.isArray(files) ? mapFileToString(files) : `'${files}',\n`
        }).join('')
    } else {
        return `'${file}',\n`;
    }
};

const writeToFile = (allFilesCache) => {
    const file = createWriteStream('public/files/cache.txt');
    file.write(allFilesCache.map((file) => mapFileToString(file)).join(''));
    file.end();
};

readAllPath();