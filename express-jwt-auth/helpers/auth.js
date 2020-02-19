const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ');
        const user = jwt.verify(token[1], 'superScretthing');
        if (token[0] === 'Bearer' && user) {
            // Also it is common that if the user is verified, you put the decoded data from the token into req.user to be used later in the code if needed
            // Example:
            // req.user = user;
            next()
        }
    } catch (e) {
        // console.log(e) // Uncomment if needed for debug
        // If the error thrown is related to JWT
        if (e.name === 'JsonWebTokenError') {
            res.status(401).json(e.message);
        // if the authorization header isn't provided
        } else if(e.name === 'TypeError' && e.message === `Cannot read property 'split' of undefined`) {
            res.status(400).json(`Please Provide an Authorization Header that contains a token. Example: 'Bearer example_token'`);
        } else {
            res.status(400).json('Something Broke!');
        }
    }
}

module.exports = auth;