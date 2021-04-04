const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 6,
        max : 15
    },
    password : {
        type : String,
        required : true
    },
    address: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    numTx: {
        type: Number,
        default: 0
    },
    sentTx: {
        type: Array,
        default: []
    },
    recievedTx: {
        type: Array,
        default: []
    },
    posts : [{type : mongoose.Schema.Types.ObjectId, ref: 'Score'}]
});

UserSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    });
}

module.exports = mongoose.model('User',UserSchema);