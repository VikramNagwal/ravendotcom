import mongoose, {Schema, Document} from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser extends Document {
    email: string,
    password: string,
    username: string,
    isVerified: boolean,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    emailVerificationToken: string,
    emailVerificationTokenExpiry: Date,
}

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        max: [255, "Email is too long"]
    },

    password: {
        type: String,
        required: true
    },
     
    isVerified: {
        type: Boolean,
        default: false
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    emailVerificationToken: String,
    emailVerificationTokenExpiry: Date,
}, {timestamps: true})

// methods and pre
userSchema.pre<IUser>('save', function(this: IUser,next) {
if(!this.isModified('password')) return next()
   
    try {
        const salt = bcrypt.genSaltSync(20)
        const hashedPassword = bcrypt.hashSync(this.password, salt);

        this.password = hashedPassword
        return next()
    } catch (error) {
        return console.log("Error hashing password: ", error)
    }
 });

userSchema.methods.comparePassword = function(enteredPassword: string) {
    return bcrypt.compareSync(enteredPassword, this.password)
}

export const User = mongoose.models.users || mongoose.model('users', userSchema)