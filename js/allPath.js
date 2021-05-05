const fs = require('fs')
const path = require('path')
const allFilesCache = []

readAllPath()

function readAllPath() {
    const directoryName = '.'
    const fileNames = fs.readdirSync(directoryName)
    storeAllPath(fileNames, directoryName)
    writeToFile()
}

function storeAllPath(fileNames, directoryName) {
    const len = fileNames.length
    for (let i = 0; i < len; i++) {
        const file = fileNames[i]
        const filePath = directoryName + '/' + file
        fs.lstatSync(path.resolve(directoryName, file)).isDirectory()
        ? storeAllPath(fs.readdirSync(filePath), filePath)
        : allFilesCache.push(filePath)
    }
}

function writeToFile() {
    const file = fs.createWriteStream('./files/cache.txt')
    const len = allFilesCache.length
    for (let i = 0; i < len; i++) {
        const path = allFilesCache[i].substring(2);
        console.log(path)
        file.write("'" + path + "',\n")
    }
    file.end()
} 