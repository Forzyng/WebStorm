const fs = require('fs');
const path = require('path');
const users = require('../models/user');

exports.updateAvatar = async function (request, response) {
    console.log('Update Avatar')
    if(!request.user) {
        console.log('No User')
        return response.status(403)
            .json({ message: 'Not authorized' })
    }

    let upFile = request.body.filename
    console.log(upFile)

    let fromFile = path.join(__dirname, '../public/uploads/', upFile)
    let toFile = path.join(__dirname, '../public/store/avatars/', upFile)

    fs.rename(fromFile,toFile, async function (err) {
        if (err) {
            console.log(err)
            return response.status(422)
                .json(err)
        }

        console.log(request.user._id)

        try {
            await users.findOneAndUpdate({_id: request.user._id},
                {avatar: upFile, updated_at: Date.now()}
            )
            return response.status(201).json({avatarUrl: upFile})
        } catch (e) {
            return response.status(422).json(e)
        }
    })
}
