// Server
let express = require('express');
let app = express();

// Cors
let cors = require('cors')
app.use(cors())

// Disk - file operations
let path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// File Loader
const multer  = require("multer");
app.use(multer({dest:"uploads"}).single("img"))

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


// Cookie
let cookieParser = require('cookie-parser');
app.use(cookieParser());


// Logger
let logger = require('morgan');
app.use(logger('dev'));


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let mediaHelper = require('./routes/helpers/media-converter')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/helpers/converter', mediaHelper);


//JWT
let auth = require('./controllers/auth')
app.use(auth.middlewareAuth)
app.post ('/api/auth', auth.authByLogin)
app.post('/api/tryCreateUser', auth.tryCreateUser)


let workwpost = require('./controllers/workwpost')
app.get('/api/getAllPosts', workwpost.getAllPosts)
app.post ('/api/getPostById', workwpost.getPostById)
app.post('/api/tryCreatePost', workwpost.tryCreatePost)
app.post('/api/tryUpdatePostById', workwpost.updatePostById)
app.post('api/tryDeletePostById', workwpost.deletePostById)

let mongoose = require('mongoose')
const users = require("./models/user");
const Token = require("./models/token");
let connectionString = "mongodb+srv://forzyng:879qweRTY@cluster0.8qvpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      console.log("DB Error")
      console.log(err)
    }
)

app.get('/user/verify/:id/:token', async (req, res) => {
    try {
        const user = await users.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");

        const token = await Token.findOne({
            userId: req.params.id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");

        //await users.updateOne({ _id: user._id, isVerify: true });

        await users.findOneAndUpdate(
            { _id: req.params.id },
            {$set:{updated_at: Date.now(), isVerify: true}},
            {new: true},
            function (err, curus) {
                if (err){
                    console.log(err)
                    return res.status(500).json({code: 500, message: 'There was an error verifing user', error: err})
                }
                else{
                    console.log("Updated user : ", curus);

                }
            });


        await Token.findByIdAndRemove(token._id);
        return res.redirect('http://localhost:8080/login');
        //res.send("email verified sucessfully");
    } catch (error) {
        console.log(error)
        return res.redirect('http://localhost:8080/login');
        //res.status(400).send("An error occured while sending email");
    }

    //return res.redirect('http://localhost:3001/login');
});

module.exports = app;

