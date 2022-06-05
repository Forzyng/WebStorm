let crypto = require('crypto')
const tokenKey = '1a2b-3c4d-5e6f-7g8h'
//
const bcrypt = require("bcrypt");
const saltRounds = 16;
//
const users = require('../models/user')
const Token = require("../models/token");
const sendEmail = require("../helpers/emailSend/email");
const Config = require('../config')

exports.middlewareAuth = function (req, response, next) {
    // console.log(req.headers.authorization)
    if (req.headers.authorization) {
        // console.log('Get Token')
        // console.log(req.headers.authorization)
        let tokenParts = req.headers.authorization
            .split('.')
        //.split('.')
        let signature = crypto
            .createHmac('SHA256', tokenKey)
            .update(`${tokenParts[0]}.${tokenParts[1]}`)
            .digest('base64')

        // console.log('in Auth')
        // console.log(JSON.parse(
        //     Buffer.from(tokenParts[1], 'base64').toString(
        //         'utf8'
        //     )))
        // console.log(tokenParts[0])
        // console.log(tokenParts[1])
        // console.log('Signature:')
        // console.log(signature)
        // console.log(tokenParts[2])

        if (signature === tokenParts[2])
            req.user = JSON.parse(
                Buffer.from(tokenParts[1], 'base64').toString(
                    'utf8'
                )
            )
        return next()
    }
    // req.user = {name: 'Guest'}
    // console.log('Next')
    return next()
}
//todo НЕ ТЯГАТЬ ЮЗЕРАЙДИ
exports.updateUserPrivacyById = async function (request, response) {
    console.log(request.user)
    const user = request.user
    if(!request.user) {
        return response.status(401)
            .json({ message: 'Not authorized' })
    }

    const id = user._id
    const password = user.password
    const email = user.email
    let hashedPassword

   // bcrypt
       // .compare(password, user.password)
      //  .then(res => {
       //     console.log(res);
       // })
       // .catch(err => {
       //     console.error(err.message)
       //     return res.status(403).json({ message: 'Invalid password or username' })
       // });

    bcrypt
        .hash(password, saltRounds)
        .then(hash => {
            console.log(`Hash: ${hash}`);
            hashedPassword = hash
            // Store hash in your password DB.
        })
        .catch(err => {
            console.error(err.message)
            return response.status(500).json({ message: 'Bcrypt Error' })
        });

    users.findOneAndUpdate(
        { _id: id },
        {$set:{updated_at: Date.now(), email: email, password: hashedPassword}},
        {new: true},
        function (err, useru) {
            if (err){
                console.log(err)
                return response.status(500).json({code: 500, message: 'There was an error updating the post', error: err})
            }
            else{
                console.log("Updated User : ", useru);
                response.status(200).json({code: 200, message: 'USer updated', updatedUser: useru})
            }
        });
}

exports.updateUserById = async function (request, response) {
    console.log(request.user)
    const user = request.user
    if(!request.user) {
        return response.status(401)
            .json({ message: 'Not authorized' })
    }

    const id = user.id
    const avatar = user.avatar
    const description = user.description

    users.findOneAndUpdate(
        { _id: id },
        {$set:{updated_at: Date.now(), avatar: avatar, description: description}},
        {new: true},
        function (err, user) {
            if (err){
                console.log(err)
                return response.status(500).json({code: 500, message: 'There was an error updating the user', error: err})
            }
            else{
                console.log("Updated user : ", user);
                response.status(200).json({code: 200, message: 'User updated', updatedPost: user})
            }
        });
}

exports.deleteUserById = async function (request, response) {
    console.log(request.user)
    const user = request.user
    if(!request.user) {
        return response.status(401)
            .json({ message: 'Not authorized' })
    }

    const id = user.id

    users.findOneAndDelete({ id: id }, function (err, user) {
        if (err){
            console.log(err)
            return response.status(500).json({code: 500, message: 'There was an error deleting the user', error: err})
        }
        else{
            console.log("Deleted user : ", user);
            response.status(200).json({code: 200, message: 'Post deleted', deletedPost: user})
        }
    });


}

exports.authByLogin = async function (req, res){
    console.log('authByLogin')


    const email = req.body.email
    const password = req.body.password

    if(email.length <= 5 )
        return res.status(403).json({ message: 'email must be more than 5 symbols' })
    if(password.length <= 5 )
        return res.status(403).json({ message: 'password must be more than 5 symbols' })

    users.findOne( {$or: [{email: email}, {login: email}]},
        function(err, user) {
            if (err) {
                console.error(err)
                return res.status(500).json({ message: 'DB Error' })
            }

            if(!user) {
                return res.status(404).json({ message: 'User Not Find' })
            }

            bcrypt
                .compare(password, user.password)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.error(err.message)
                    return res.status(403).json({ message: 'Invalid password or username' })
                });



            user.password = null // Обнулим пароль

            let head = Buffer.from(
                JSON.stringify({ alg: 'HS256', typ: 'jwt' })
            ).toString('base64')
            // todo: Может не всего пользователя
            let body = Buffer.from(JSON.stringify(user)).toString(
                'base64'
            )
            let signature = crypto
                .createHmac('SHA256', tokenKey)
                .update(`${head}.${body}`)
                .digest('base64')

            // console.log('head body:')
            // console.log(`${head}.${body}`)
            // console.log('Get User:')
            // console.log(user)
            // console.log('Send Token:')
            // console.log(`${head}.${body}.${signature}`)
            return res.status(200).json({
                user: user,
                token: `${head}.${body}.${signature}`,
            })

        })

    //return res.status(403).json({ message: 'Invalid password or username' })
}

exports.tryCreateUser = async function (req, res ){
    console.log('tryCreateUser')
    const email = req.body.email
    const login = req.body.login
    const password = req.body.password
    //const email = 'fozzynice@gmail.com'
     //const login = 'Login'
    // const password = '123'

    users.findOne( {email: email},
        function(err, user) {
            if (err) {
                console.error(err)
                return res.status(500).json({message: 'DB Error'})
            }

            if (user) {
                return res.status(409).json({message: 'User Exist'})
            }
        })

    users.findOne( {login: login},
        function(err, user) {
            if (err) {
                console.error(err)
                return res.status(500).json({message: 'DB Error'})
            }

            if (user) {
                return res.status(409).json({message: 'Login Exist'})
            }
        })

    const newUser = new users()
    newUser.login = login
    newUser.email = email

    bcrypt
        .hash(password, saltRounds)
        .then(async hash => {
            console.log(`Hash: ${hash}`);
            newUser.password = hash
            console.log(newUser)


            let curuser = await new users({
                login: newUser.login,
                email: newUser.email,
                password: newUser.password
            }).save();

            //newUser.save( async function (err) {
            //    if (err) {
            //         console.error(err)
            //        return err
            //     }


            try {
                let token = await new Token({
                    userId: curuser._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();

                const message = `${Config.sender.base_url}/user/verify/${curuser.id}/${token.token}`;
                await sendEmail(curuser.email, "Verify Email", message, 'emailConfirmation');

                //res.send("An Email sent to your account please verify");
            } catch (error) {
                res.status(400).send("An error occurred while sending email");
            }
            // Store hash in your password DB.
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.error(err.message)
            return res.status(500).json({ message: 'Bcrypt Error' })
        });









}



