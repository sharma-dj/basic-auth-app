import User from '../models/users.model.js'

const register = async (req,res) => {
    try {
        const {name,email,password} = req.body
        const user = await User.create({name,email,password})
        const token = user.createJWT()
        res.status(201).json({user:{name:user.name,email:user.email},token})
    } catch(err) {
        res.status(500).json({msg:err})
    }
    /*
        const {name,email,password} = req.body
        const newuser = new User({name,email,password});
	    newuser.save()
		 .then(() => res.json({msg:'user added',data:{name,email,password}}))
		 .catch(err => res.status(400).json(err));
    */
    //res.send('register')
}

const login = async (req,res) => {
    try {
        const {email,password} = req.body
        if (!email || !password) {
            res.status(500).json({msg:'Please provide both email and password'})
        }
        const user = await User.findOne({email}).select('+password')
        if (!user) {
            res.status(500).json({msg:'Invalid credentials'})
        }
        const isMatch = user.comparePassword(password)
        if(!isMatch) {
            res.status(500).json({msg:'Invalid credentials'})
        }
        const token = user.createJWT()
        user.password = undefined
        res.status(201).json({user,token})
    } catch(err) {
        res.status(500).json({msg:err})
    }
}

export {register,login}