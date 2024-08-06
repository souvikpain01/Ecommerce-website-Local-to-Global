import user from '../model/user.js'
import express from 'express';
const server = express();
import bodyParser from 'body-parser';
server.use(express.json());
server.use(bodyParser.json());

// const CreateUser=
export async function createUser(req,res){
    console.log(req.body);
    try {
        // Check if both email and password are provided in the request body
        if (!req.body.email || !req.body.password) {
            return res.status(400).send("Email and password are required.");
        }

        const userData = new user({
            email: req.body.email,
            password: req.body.password,
         
        });
        await userData.save(); 
        console.log("User created");
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

}
export async function fetchUser(req,res){
    if(req.body){
        res.json(await user.find({}));
    }
    else if(req.body.email){
        res.json(await find({email:req.body.email}))
    }

}

export function greet(){
    console.log("hello baby");
}

// export CreateUser;
// export fetchUser();
