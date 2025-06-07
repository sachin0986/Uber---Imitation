const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Full name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    socketId:{
        type: String,
    },

});


userSchema.methods.genenrateAuthToken = function() {
    const token = jwt.sign({_id: this.id }, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    console.log(isMatch);
    return isMatch;
}

userSchema.statics.hashPassword = async function(password) {
    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass);
    return hashPass;
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;