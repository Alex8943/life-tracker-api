import express from 'express';
import Users from '../other_services/model/seqModel'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/signup', async (req, res) => {
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

export default router;