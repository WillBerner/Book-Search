// Import User model and authorization
const { AuthenticationError } = require('apollo-server-express');
const { User } = require(`../models`);
const { signToken } = require('../utils/auth');

// Create necessary queries and mutations as declared in typeDefs
const resolvers = { 

    // Create single query for getting a particular User
    Query: {
        me: async (parent, args, context) => {

            if (context.user) {
                const userInfo = await User.findOne({_id: context.user._id})
                    .select('-password')
                    .populate('books');

                    return userInfo;
            }

            throw new AuthenticationError("Error: user not logged in");

        }
    },

    // Create mutations for registering, logging in, saving a book, and removing a book.
    Mutation: {

        addUser: async (parent, args) => {
            
            // Attempt to register a new user and give them authorization via a JWT
            try {

                // Try to add the user to the database
                const user = await User.create(args)

                // If a user is successfully registered, go ahead and log them in
                const token = signToken(user);

                // Return our Auth object as declared in typeDefs 
                return { token, user };
                
            } catch (error) {

                // Log any errors (bad args, database down, etc)
                console.log(error)
            }
        }

    }


}