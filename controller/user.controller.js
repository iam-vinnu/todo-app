import { User } from "../model/user.model.js";
import bcrypt from "bcrypt"


export const register = async (req,res) => {
    try {
        const {fullName , email , password } = req.body;
        if(!fullName || !email || !password){
          return res.status(400).json({
                success: false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email});
        if(user){
           return res.status(400).json({
                success:false,
                message:"Email already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fullName,
            email,
            password : hashedPassword
        });

       return res.status(200).json({
            success : true,
            message : "Account created succesfully"
         });
    } catch (error) {
        console.log(error);  
        
    }
};

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Something is missing",
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.ststus(404).json({message:"Incorrect Email"})
        }

        const checkPassword = await bcrypt.compare(password,user.password);

        if(!checkPassword){
            return res.status(400).json({message:"Incorrect Password"})
        }


        return res.status(200).json({
            success:true,
            message:`Welcome Back ${user.fullName}`
        })
    } catch (error) {
        console.log(error);
        
    }
}
