import express from 'express';
import Users from '../other_services/model/seqModel'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/auth/signup', async (req, res) => {
    try{

        const {name, email, password} = req.body;
        const user = await signupUser(name, email, password);
        res.json(user);

    }catch(error){
        console.log("There is an error signing up ", error);
    }
})

export async function signupUser(name: string, email: string, password: string) {
    try {
        const user = await Users.findOne({where: {email}});
        
        if(user){ 
            throw new Error("User already exists");
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            name, 
            email, 
            password: hashPassword
        });

        return newUser;
    } catch (error) {
        console.log("Error creating user: ", error);
    }
}


router.post("/auth/login", async (req, res) => {
    try {
        const result = await loginUser(req.body.email, req.body.password);
        const jwtUser = {
            id: result.id,
            name: result.name,
            email: result.email
        };
        
        
        let resultWithToken: any = {"authToken": jwt.sign({ user: jwtUser }, "secret"), "user": jwtUser};

        res.status(200).json(resultWithToken);

        console.log("User: ", jwtUser.name, " Logged in successfully");

        return resultWithToken;
    
    }catch(error){
        console.log("There is an error logging in ", error);

    }
}); 

export async function loginUser(email: string, password: string) {
    try {
        
        const excistingUser = await Users.findOne({where: {email}});
        if(!excistingUser){
            throw new Error("User does not exist");
        }

        const isPasswordCorrect = await bcrypt.compare(password, excistingUser.password);
        if(!isPasswordCorrect){
            throw new Error("Password is incorrect");
        }

        const user: any = await Users.findOne({
            where: {email},
            attributes: ['id', 'name', 'email'],
        
        });

        const userData = user.get();
        console.log("User data: ", userData);

        return userData;
    } catch (error) {
        console.log("Error logging in: ", error);
    }
}

export default router;