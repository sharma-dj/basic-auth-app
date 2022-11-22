const router = require('express').Router();
const User = require('../models/users.model');

router.route('/').get((req,res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error:'+err));
});

router.route('/:email').get((req,res) => {
	User.findOne({'email':req.params.email})
		.then(user => res.json(user))
		.catch(err => res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const newuser = new User({'uname':name,'email':email,'password':password});
	
	newuser.save()
		 .then(() => res.json('user added'))
		 .catch(err => res.status(400).json('Error:'+err));
});

module.exports = router;