const router = require("express").Router();
const User = require("../db/models/user");
const { z } = require("zod");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

const userValidateSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string()
})

router.post("/signup", async(req,res) => {
    try {
        const { username,email,password } = req.body;
        const userValidate = userValidateSchema.safeParse(req.body);
        if(!userValidate.success){
            return res.status(400).json({ message: "Invalid inputs/please provide username of length more than 3 " })
        }else{
            const existingUser = await User.findOne({username});
            const existingEmail = await User.findOne({email})
            if(existingUser){
                return res.status(400).json({ message: "Username already exists"});
            }else if(existingEmail){
                return res.status(400).json({ message: "Email already exists"});
            }else{
                const hashedPassword = await bcrypt.hash(password,10)
                await User.create({
                    username,
                    email,
                    password: hashedPassword
                });
                return res.status(201).json({ msg: "User successfully created"});
            }
        }
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", Error:error});
    }
})

router.post("/signin", async(req,res)=>{
    const { username,password } = req.body;
    const existingUser = await User.findOne({username});
    if(!existingUser){
        return res.status(400).json({ message: "Invalid credentials"});
    }
    bcrypt.compare(password, existingUser.password, (err,data)=>{
        if (data) {
            const token = jwt.sign({username},JWT_SECRET,{expiresIn:"2d"})
            return res.status(200).json({id:existingUser._id, token: token})
        } else {
            return res.status(400).json({ message: "Invalid credentials"});
        }
    })
})

module.exports = router