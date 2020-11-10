// Dependecies
const colors = require('colors')
const prompt = require('prompt-sync')()
const got = require('got')
const fs = require('fs')


const Main = () => {
    console.clear()
    const ascii = fs.readFileSync('./View/ascii.txt', 'utf-8')
    console.log(ascii.toString().rainbow);
    websiteConnection()
}


const websiteConnection = async () => {
    console.log('[#] - Website URL'.gray)
    const websiteURL = prompt('[#] - Insert the website URL ~> ');

    try {
        await got(websiteURL)
        console.log('\n[!] - Connection estabilished. Starting SQUID party!!11\n'.rainbow);
        gitChecker(websiteURL)
    } catch (error) {
        console.log('\n[*] - Connection failure, please verify your URL.'.red);
    }
}


const gitChecker = async (websiteURL) => {

    console.log('[#] - Git Vulnerability Checker'.gray)
    const gitURL = `${websiteURL}/.git/`
   
    try {
        await got(gitURL)
        console.log('[!] - .git file found'.green)
        console.log(`[*] - URL tested: ${gitURL}`.cyan)
        wordpressChecker(websiteURL)
    } catch(error) {
        console.log(`[*] - .git file not found, passing test. - URL tested: ${gitURL}`.cyan)
        wordpressChecker(websiteURL)
    }

    

}


const wordpressChecker = async (websiteURL) => {

    console.log('\n[#] - Wordpress Vulnerability Checker'.gray)
    const checkRobots = `${websiteURL}/robots.txt`

    const request = await got(checkRobots)

    if(request.body.includes('/wp-admin')) {
        console.log('[!] - Wordpress directory found inside robots.txt'.green); 
    } else {
        console.log('[*] - Wordpress directory not found inside robots.txt, passing test'.cyan)
    }
       
    getWordpressInfo(websiteURL)

}


const getWordpressInfo = async (websiteURL) => {
    console.log('[*] - Trying to get information from Wordpress\n'.yellow)

    const wordpressURLs = [
        `${websiteURL}/wordpress/readme.html`, `${websiteURL}/wordpress/xmlrpc.php`,
        `${websiteURL}/wordpress/license.txt`, `${websiteURL}/readme.html`,
        `${websiteURL}/wp-config-sample.php`
    ]

    const URLs = wordpressURLs.map(url => url).toString()

    try {
        const response = await got(URLs)
        console.log(`[!] - Interesting URL found: ${response.url}`.green)
        websiteInformation(websiteURL)
    } catch (error) {
        console.log("[*] - Couldn't get any wordpress information sorry.".red)
        websiteInformation(websiteURL)
    }

}


Main()