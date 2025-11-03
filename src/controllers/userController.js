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

export const updateUsers = async(req,res) => {
    try{
        const {id} = req.params;
        const {name, last_name, email, password} = req.body;

        const updateUser = await User.findByIdAndUpdate(
            id,
            {name,last_name, email, password}
        );

        if (!updateUser){
            return res.status(404).json({error: "User not found"})
        }
        res.status(200).json("User updated", updateUser)
    }
    catch(error){
        console.log(error, "Error updating user")
        res.status(500).json({ erorr: "Server error"})
    }
}

export const deleteUser = async(req,res) => {
    try {
        const {id} = req.params;
        
        const deletedUser = await User.findByIdAndDelete(id);
        
        if(!deletedUser){
            console.log("User not found")
            return res.status(404).json({error: "User not found"})
        }

        res.json("User deleted")
    }catch(error){
    console.error("Error deleting user")
    res.status(500).json({error: "Server error"})

    }
}