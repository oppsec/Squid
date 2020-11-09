// Dependecies
const colors = require('colors')
const prompt = require('prompt-sync')()
const got = require('got')
const fs = require('fs')


const Main = () => {
    console.clear()
    const ascii = fs.readFileSync('./View/ascii.txt', 'utf-8')
    console.log(ascii.toString().rainbow);
    websiteResponsable()
}


const websiteResponsable = async () => {
    console.log('[#] - Website URL'.gray)
    const websiteURL = prompt('[#] - Insert the website URL ~> ');

    try {
        await got(websiteURL)
        console.log('\n[!] - Connection estabilished. Starting SQUID party!!11\n'.rainbow);
        gitVulnChecker(websiteURL)
    } catch (error) {
        console.log('\n[*] - Connection failure, please verify your URL.'.red);
    }
}


const gitVulnChecker = async (websiteURL) => {

    console.log('[#] - Git Vulnerability Finder'.gray)
    const gitURL = websiteURL + '/.git/'
   
    try {
        await got(gitURL)
        console.log('[!] - .git file found'.green)
        console.log(`[*] - URL tested: ${gitURL}`.cyan)
    } catch(error) {
        return console.log(`[*] - .git file not found, passing test. - URL tested: ${gitURL}`.cyan)
    }

}

Main()