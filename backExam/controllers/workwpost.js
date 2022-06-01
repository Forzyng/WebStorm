const posts = require('../models/user-post')



exports.getAllPosts = async function (request, response) {
    console.log(request.user)
    if(!request.user) {
        return response.status(401)
            .json({ message: 'Not authorized' })
    }

    posts.find({},
        function (err, all) {
            if(err) {
                console.error(err)
                return err
            }
            response.json(all)
        }
    )
}

exports.updatePostById = async function (request, response) {
    console.log(request.user)
    if(!request.user) {
        return response.status(401)
            .json({ message: 'Not authorized' })
    }

    const id = request.body.id
    const description = request.body.description
    const photo = request.body.photo
    const ingredients = request.body.ingredients
    const steps = request.body.steps

    posts.findOneAndUpdate(
        { _id: id },
        {$set:{description: description, photo: photo, ingredients: ingredients, steps: steps, updated_at: Date.now()}},
        {new: true},
        function (err, post) {
        if (err){
            console.log(err)
            return response.status(500).json({code: 500, message: 'There was an error updating the post', error: err})
        }
        else{
            console.log("Updated post : ", post);
            response.status(200).json({code: 200, message: 'Post updated', updatedPost: post})
        }
    });
}

exports.deletePostById = async function (request, response) {
    console.log(request.user)
    if(!request.user) {
        return response.status(401)
            .json({ message: 'Not authorized' })
    }

    const id = request.body.id

    posts.findOneAndDelete({ _id: id }, function (err, post) {
        if (err){
            console.log(err)
            return response.status(500).json({code: 500, message: 'There was an error deleting the post', error: err})
        }
        else{
            console.log("Deleted post : ", post);
            response.status(200).json({code: 200, message: 'Post deleted', deletedPost: post})
        }
    });




   // posts.findOneAndDelete({
   //     id: id
  //  })
  //      .exec((err, post) => {
    //        if(err)
   //             return response.status(500).json({code: 500, message: 'There was an error deleting the post', error: err})
   //         response.status(200).json({code: 200, message: 'Post deleted', deletedPost: post})
  //      });
}

exports.getPostByUserId = async function (request, response) {
    console.log(request.user)
    if(!request.user) {
        return response.status(401)
            .json({ message: 'Not authorized' })
    }
    if(!request.body.userID)
    {
        console.log('Smth with user')
        return response.status(401)
            .json({message: 'Smth with User'})
    }
    posts.find({ userID: { $in: request.body.userID } },
        function (err, all) {
            if(err) {
                console.error(err)
                return err
            }
            response.json(all)
        }
    )
}

exports.getPostById = async function (request, response) {

    if (!request.user) {
        return response.status(401)
            .json({message: 'Not authorized'})
    }
    const id = request.body.id
    posts.findOne({_id: id}, function (err, post) {
        if (err) {
            console.error(err)
            return response.status(500).json({message: 'DB Error'})
        }
        // console.log('Get User:')
        // console.log(user)

        if (!post) {
            return response.status(404).json({message: 'User Not Find'})
        }



        return response.status(200).json({
            post: post
        })
    })
}


exports.tryCreatePost = async function (req, res){
    if (!req.user) {
        return res.status(401)
            .json({message: 'Not authorized'})
    }
            const id = req.body.id
            const userID = req.body.userID
            const description = req.body.description
            const ingredients = req.body.ingredients
            const steps = req.body.steps
            const photo = req.body.photo
            const DateTimeNow = Date.now()




            const newPost = new posts()
            newPost.id = id
            newPost.userID = userID
            newPost.description = description
            newPost.ingredients = ingredients
            newPost.steps = steps
            newPost.photo = photo
            newPost.created_at = DateTimeNow

            console.log(newPost)

            newPost.save( function (err) {
                if(err) {
                    console.error(err)
                    return err
                }
                res.status(201).json(newPost)
            })
            // TODO  уйти на другой маршрут, сообщить что все хорошо
}