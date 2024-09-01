/*
Here in this project we will make use of JWT to check for Authentication and see if it works or not.
Here we will first require all the necessary packages.
We will install all the dependencies like npm i express jsonwebtoken
Then we will make two functions setUser and getUser each having work of setting an authentication and then reteriving back the user from the authenticated data.
For that we will use jwt.sign() function to sign a particular user with a certain email ID.
Then we will check that is that signature a valid jwt signature?
For that we will again pass that token from getUser function and use jwt.verify() function to see if actual details are returned or not.
We will see out required output on the console and we will use ThunderClient/Postman to make GET request with an email in JSON format. 
*/
const express = require ('express');
const secret="This is a secret key!";
const app = express();
const PORT = 3000;
const jwt=require('jsonwebtoken');

//Middleware to support JSON data
app.use(express.json({extended:true}));

//Function to sign an email of a user
function setUser(user){
    //Signing the provided email
    const token=jwt.sign({
        email:user.email
    }, secret);
    console.log("token:",token);
    return token;
}

//Function to get the user from the token generated in the above function
function getUser(token){
    //If no token is passed then return null
    if(!token) return null;
    //If it's a verified token then returns true
    return jwt.verify(token, secret);
}

//Making a GET request gateway
app.get('/',(req,res)=>{
    //Assigning the whole data in the body to user
    const user=req.body;
    console.log("user:",user);
    
    //Checking if request has an email field or not?[an empty requerst contains {}]
    if(!user.email) return res.json({
        "msg":"No email provided!"
    });

    //If email is found then signing the user using jwt.sign() function
    const token=setUser(user);

    //Assigning that token as a cookie in the response with name ID
    res.cookie("ID",token);

    //Retriving user details using signed token
    const userDetails=getUser(token);
    console.log("userDetails:",userDetails);
    
    //Validating if token assigned or not or if it returns same email or not
    if(!userDetails) return res.status(400).json({
        "msg": "Error while loading jwt"
    });

    //If everything is passed then we will display correct values with token
    return res.status(200).json({
        "msg": "Authentication successful"
    })
});

//Starting server on the given port
app.listen(PORT, ()=>{console.log("Server running on port:",PORT);});