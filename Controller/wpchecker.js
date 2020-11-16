const got = require('got')
const colors = require('colors')

const wpChecker = async (websiteURL) => {

    console.log('\n[#] - Wordpress Vulnerability Checker'.gray)
    const checkRobots = `${websiteURL}/robots.txt`

    try {
        const response = await got(checkRobots)
        
        if(response.statusCode == 200) {
            console.log('[!] - Robots.txt found'.green)
            getWordpressInfo(response)
        } else {
            console.log('- Robots.txt not found, passing test.'.cyan)
        }

    } catch (HTTPError) {
        console.log(`[x] - Error: ${HTTPError}`.red)
    }

}

const getWordpressInfo = async (response) => {
    console.log('[*] - Checking robots.txt URLs\n'.yellow)

    const wordpressURLs = [
        '/wp-admin/',    '/wp-login.php',
        '/wp-includes/', '/wp-content/plugins/',
        '/xmlrpc.php',   '/wp-admin/admin-ajax.php'
    ]

    const robotsContent = response.body
    const robotsResult = wordpressURLs.filter(url => robotsContent.includes(url))

    if(robotsResult.length > 0) {
        console.log(`[!] - Interesting directories found ~> ${robotsResult}`.green)
    } else {
        console.log('[*] - Nothing interesting found.'.red)
    }


}

module.exports = wpChecker, getWordpressInfo
