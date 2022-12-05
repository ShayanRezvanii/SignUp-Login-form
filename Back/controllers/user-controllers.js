const bcrypt = require('bcrypt');
const userService = require('../services/users-services');


exports.register = (req , res , next) => {
    const {password} = req.body;
    const salt = bcrypt.genSaltSync(10);

    req.body.password = bcrypt.hashSync(password , salt);

    userService.register (req.body , (error,result) =>{
        if(error) {
            return next(error);
        }
        return res.status(200).send({
            message : "Success" ,
            data: result
        })
    })
}


exports.login = (req , res , next) => {
    const {username , password } = req.body;

    userService.login({username , password} , (error,result) => {
        if(error) {
            return next (error)
        }
        return res.status(200).send({
            message: "Success" ,
            data : result 
        })
    } )
}

exports.userProfie = (req ,res , next) => {
    return res.status(200).json({message : 'Authorized User !'})
}