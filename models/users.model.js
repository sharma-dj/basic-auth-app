import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const Schema = mongoose.Schema

const userSchema = new Schema({
	name:{
		type: String, 
		required: [true,"Please enter your name"],
		minlength:4,
		maxlength:25,
		trim:true
	},
	email:{
		type: String, 
		required: [true,"Please enter your email"],
		validate: {
			validator:validator.isEmail,
			message:'Please provide a valid email'
		},
		unique:true
	},
	password:{
		type: String, 
		required: [true,"Please enter your password"],
		minlength:6,
		select:false
	}
},{ 
	timestamps:true
});

userSchema.pre('save', async function() {
	const saltRounds = 10
	this.password = await bcrypt.hashSync(this.password, saltRounds);
});

userSchema.methods.createJWT = function() {
	return jwt.sign({userID:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(user_password) {
	const isMatch = await bcrypt.compare(user_password, this.password);
	return isMatch;
}

const User = mongoose.model('User',userSchema);

export default User