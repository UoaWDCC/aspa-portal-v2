import mongoose from "mongoose";

interface User {
    name: string;
    email: string;
    university: string;
    studentId?: number;
    skillLevel: string;
    eventsAttended: number;
}

const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    university: { type: String, required: true },
    studentId: Number,
    skillLevel: { type: String, required: true },
    eventsAttended: { type: Number, required: true },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
