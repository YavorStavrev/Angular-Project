const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const themeSchema = new mongoose.Schema({
    themeName: {
        type: String,
        required: true
    },
    subscribers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],
    workout: [{  // New field to store the workout details
        exercise: {
            type: String, // The name of the exercise
            required: true
        },
        sets: {
            type: String, // The sets and reps for the exercise
            required: true
        }
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Theme', themeSchema);
