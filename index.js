// Dependecies
const colors = require('colors')
const prompt = require('prompt-sync')()
const got = require('got')
const fs = require('fs')

const gitChecker = require('./Controller/gitchecker')
const wpChecker = require('./Controller/wpchecker')


const Main = () => {
    console.clear()
    const ascii = fs.readFileSync('./View/ascii.txt', 'utf-8')
    console.log(ascii.toString().rainbow);
    websiteConnection()
}


const websiteConnection = async () => {
    console.log('[#] - Website URL'.gray)
    const websiteURL = prompt('[#] - Type the website URL ~> (https://example.com) '.cyan);

    try {
        await got(websiteURL)
        console.log('\n[!] - Connection estabilished. Starting SQUID party!\n'.rainbow);
        checkersManager(websiteURL)
    } catch (error) {
        console.log('\n[*] - Connection failure, please verify your URL.'.red);
    }
}

const checkersManager = async (websiteURL) => {
    await gitChecker(websiteURL)
    await wpChecker(websiteURL)
}


Main()