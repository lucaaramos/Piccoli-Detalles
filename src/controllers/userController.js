import User from "../models/User.js"

export const getUsers = async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        console.error("Error al obtener los usuarios", error)
        res.status(500).json({error: "Error del servidor"})
    }
};

export const createUsers = async(req, res) => {
    try{
        const {name, last_name, email, password} = req.body;

        if(!name || !last_name || !email || !password) {
            console.log("error faltan campos")
            res.status(400).json({
                error:"faltan datos"
            })
        }
        const newUser = new User({
            name,
            last_name,
            email,
            password
        })
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    }catch(error){
        res.status(500).json({error: "Error server"})
    }
};

