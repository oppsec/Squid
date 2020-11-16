const gitChecker = async (websiteURL) => {

    console.log('[#] - Git Vulnerability Checker'.gray)
    const gitURL = `${websiteURL}/.git/`
   
    try {
        await got(gitURL)
        console.log('[!] - .git file found'.green)
        console.log(`[*] - URL tested: ${gitURL}`.cyan)
    } catch(error) {
        console.log(`[*] - .git file not found, passing test. - URL tested: ${gitURL}`.cyan)
    }
}

module.exports = gitChecker