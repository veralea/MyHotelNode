import mongoose from'mongoose';
import'../models/Room';

const Room = mongoose.model('Room');

export function setUpConnection() {
    mongoose.connect('mongodb://localhost:27017/MyHotel');
}

export function listRooms() {
    return Room.find();
}