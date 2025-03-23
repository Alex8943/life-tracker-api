import express from 'express';
import Users  from '../other_services/model/seqModel'

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await getUsers();
    res.json(users);
})

export const getUsers = async () => {
    
    try{
        const users = await Users.findAll();
        if(users.length === 0){
            return "No users found";
        };
        console.log("Users found!")
        return users;
    }catch(error){
        console.log("There is an error fetching users ", error);
    }
    
}

export default router;