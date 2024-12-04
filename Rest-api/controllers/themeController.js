const { themeModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { themeName, postText, workout } = req.body; // Include 'workout' from request body
    const { _id: userId } = req.user;  // Getting user ID from req.user

    // Create a new theme
    themeModel.create({ 
        themeName, 
        userId, 
        subscribers: [userId],
        workout: workout // Make sure this workout data is passed along to the theme document
    })
    .then(theme => {
        // Call the newPost function to create the post associated with the new theme
        newPost(postText, userId, theme._id)
            .then(([_, updatedTheme]) => {
                // Send back the updated theme with the post data
                res.status(200).json(updatedTheme);
            })
            .catch(next);  // If error occurs in creating post, pass it to next error handler
    })
    .catch(next);  // If error occurs in creating theme, pass it to next error handler
}



function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

function updateWorkout(req, res, next) {
    const { themeId } = req.params;  // Get theme ID from the request params
    const { workout } = req.body;    // Get the updated workout data from the request body

    themeModel.findByIdAndUpdate(themeId, { workout }, { new: true })
        .then(updatedTheme => {
            if (!updatedTheme) {
                return res.status(404).json({ message: 'Theme not found' });
            }
            res.status(200).json(updatedTheme);
        })
        .catch(next);
}

function deleteTheme(req, res, next) {
    const { themeId } = req.params;
    const { _id: userId } = req.user;

    console.log(`User ID: ${userId} is attempting to delete theme with ID: ${themeId}`);

    themeModel.findOneAndDelete({ _id: themeId, userId })
        .then(deletedTheme => {
            if (deletedTheme) {
                console.log(`Theme deleted successfully: ${deletedTheme}`);

                // Remove the theme from users' subscriptions
                userModel.updateMany(
                    { subscriptions: themeId },
                    { $pull: { subscriptions: themeId } }
                ).catch(next);

                res.status(200).json({ message: 'Theme deleted successfully' });
            } else {
                console.log('Theme not found or user is not authorized to delete it');
                res.status(404).json({ message: 'Theme not found or you are not authorized to delete it' });
            }
        })
        .catch(err => {
            console.error('Error deleting theme:', err);
            next(err);  // Pass the error to the global error handler
        });
}


module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    deleteTheme,
    updateWorkout
}
