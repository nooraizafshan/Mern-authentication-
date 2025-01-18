const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Usermodel = require("./Model/User");


const app = express();
app.use(express.json());
app.use(cors(
    {
    origin:['http://localhost:5173'],
    methods: ['Get','Post'],
    credentials:true
    }
));
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/Employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

const verifyUser=(req,res,next) => {
    const token=req.cookie.token;
    if(!token){
        return res.json('Token is required')
    }
    else{
        jwt.verify(token,'jwt-secret-key',(err,decoded)=>{
            if(error){
                return res.json('Token is invalid')
            }
            else{
                if(decoded.role === 'Admin')
                {
                    next()
                }
                else{
                    return res.json('not admin')
                }
            }
        })
    }
}

app.get('/Dasshboard',verifyUser,(req,res)=>{
    res.json('Success')
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            Usermodel.create({ name, email, password: hash })
                .then(user => res.json({ status: 'success' }))
                .catch(err => res.json({ status: 'error', error: err }));
        })
        .catch(err => res.json({ status: 'error', error: err }));
});

app.post('/login',(req,res)=>{
    const {email, password} = req.body;
    Usermodel.findOne({email})
       .then(user => {
            if(user){
                    bcrypt.compare(password,user.password,(err,response)=>{
                        if(response){
                            const token = jwt.sign({email: user.email, role:user.role},'jwt-secret-key',{expiresIn: '1h'});
                            res.cookie('token', token)
                            return res.json({ status: 'success',role:user.role})
                        }else{
                            res.json({status: 'error', error: 'Password is incorrect'});
                        }
                    })
            }else{

            }
        })
    })

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
