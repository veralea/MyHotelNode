import mongoose, {Schema} from 'mongoose';
const roomSchema = new Schema(
    {
        number: String, 
        status: String, 
        floor: String, 
        guestName: String, 
        dateEntry: Date, 
        dateExit: Date
    },
    {
        timestamps: true
    }
);

const room = mongoose.model('room', roomSchema );

export default room;


