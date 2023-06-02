const homePage = (req, res) => {
    res.render('homepage')
}

const signUp = (req, res) => {
    res.render('signup')
}


module.exports = { homePage, signUp }