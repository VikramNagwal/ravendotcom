import mongoose, {Schema} from 'mongoose'

const messageSchema = new Schema({
    subject:{
        type: String,
        required: true,
        max: [1024, "Subject is too long"]
    },
    
    message: {
        type: String,
        required: [true, "Message is required"],
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
     
    isSeen: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export const Message = mongoose.models.messages || mongoose.model('messages', messageSchema)