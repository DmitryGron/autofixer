import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username required'],
		min: [2, 'Username too short'],
    	max: 32,
	},
	email: {
		type: String,
		required: [true, 'Email required'],
		validate: {
			validator: function (email) {
				return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
			},
			message: props => `${props.value} is not a valid email`
		}
	},
	password: {
		type: String,
		required: [true, 'Password required'],
		min: [6, 'Password too weak'],
    	max: 32,
	},
	phone: {
		type: String,
		validate: {
		  validator: function(phone) {
			return /\d{3}-\d{2}-\d{3}/.test(phone);
		  },
		  message: props => `${props.value} is not a valid phone number`
		},
		required: [true, 'User phone number required']
	  },
	  isAdmin: {
		type: Boolean,
		default: false,
	},
});

userSchema.methods.generateAuthToken = function() {
	return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.jwt.key, {
		expiresIn: process.env.NODE_ENV == 'development' ? '20m' : '20m',
	});
};

const register = mongoose.model('user', userSchema, 'users');
module.exports = register;
