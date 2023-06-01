const { User } = require('../../models') 

const signUp = async (req, res) => {
    console.log('signUp', req.body)
    try{
        const user = await User.findOne({
            where: {email: req.body.email}
        })
        console.log('singUpuser', user)
        if(user) {
            res.status(400).json({
                message: 'This account already exist.'
            })
            return
        }
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)    
    }
    catch(err) {
        res.status(500).json({
            message: 'Error creating user.'
        })
    }     
} 

const logIn = async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        })
        if(!user) {
            res.status(400).json({
                message: 'No account registered with this email.'
            })
            return
        }
        
        const passwordCheck = user.checkPassword(req.body.password) 
        if(!passwordCheck) {
            res.status(403).json({
                message: 'Incorrect password.'
            })
            return
        }
        res.status(201).json(user)    
    }
    catch(err) {
        res.status(500).json({
            message: 'Error login in.'
        })
    }
}



module.exports = { signUp, logIn }