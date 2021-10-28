// Import User model and authorization
const { AuthenticationError } = require('apollo-server-express');
const { User } = require(`../models`);
const { signToken } = require('../utils/auth');

// Create necessary queries and mutations as declared in typeDefs
const resolvers = {

    // Create single query for getting a particular User
    Query: {
        me: async (parent, args, context) => {

            // Use context to determine whether user is authenticated
            if (context.user) {

                // If they are authenticated, send back their data with their saved books
                const userInfo = await User.findOne({ _id: context.user._id })
                    .select('-password')
                    .populate('books');

                return userInfo;
            }

            // If the context doesn't have a user, the user is not logged in
            throw new AuthenticationError("Error: user not logged in");

        }
    },

    // Create mutations for registering, logging in, saving a book, and removing a book.
    Mutation: {

        // Register a new user to the website
        addUser: async (parent, args) => {

            // Attempt to register a new user and give them authorization via a JWT
            try {

                // Try to add the user to the database
                const user = await User.create(args)

                console.log(user);

                // If a user is successfully registered, go ahead and log them in
                const token = signToken(user);

                // Return our Auth object as declared in typeDefs 
                return { token, user };

            } catch (error) {

                // Log any errors (bad args, database down, etc)
                console.log(error)
            }
        },

        // Log a user into the website
        login: async (parent, { email, password }) => {

            // First, attempt to find the user by their email
            const user = await User.findOne({ email });

            // If no users exist, give an error
            if (!user) {
                throw new AuthenticationError("Error: Incorrect email or password.");
            }

            // Then, if an email is found, check the password
            const validPassword = await user.isCorrectPassword(password);

            // If the user didn't provide the correct password, give the same error
            if (!validPassword) {
                throw new AuthenticationError("Error: Incorrect email or password.");
            }

            // If the user provided the correct email and password, log them in by signing and giving them a JWT
            const token = signToken(user);

            // Return our Auth object as declared in typeDefs 
            return { token, user }

        },

        // Save a book to the user's account
        saveBook: async (parent, args, context) => {

            console.log(args);
            console.log(context);

            // Use context to determine whether user is authenticated
            if (context.user) {

                // Find the user who is adding a book based on the context passed
                const updatedUser = await User.findOneAndUpdate(

                    // Add the book from the input to the user's savedBooks array
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.input } },
                    { new: true, runValidators: true }

                );

                // Return the user with an updated savedBooks array
                return updatedUser;
            }

            // If the context doesn't have a user, the user is not logged in
            throw new AuthenticationError("You need to be logged in!");
        },

        // Remove a book from the user's saved books
        removeBook: async (parent, args, context) => {

            // Use context to determine whether user is authenticated
            if (context.user) {

                // Find the user who is removing a book based on the context passed
                const updatedUser = await User.findOneAndUpdate(

                    // Remove a book based on its ID from the user's savedBooks array
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );

                // Return the user with an updated savedBooks array
                return updatedUser;
            }

            // If the context doesn't have a user, the user is not logged in
            throw new AuthenticationError("Please login in!");
        },
    },
}

module.exports = resolvers;