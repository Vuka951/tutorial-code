const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ');
        const user = jwt.verify(token[1], 'superScretthing');
        if (token[0] === 'Bearer' && user) {
            // Also it is comman that if the user is verified, you put the decoded data from the token into req.user to be used later in the code if needed
            // Example:
            // req.user = user;
            next()
        }
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            res.sendStatus(401).json('JWT Invalid!');
        } else {
            res.sendStatus(401).json('Somethings not right!');
        }
    }
}

module.exports = auth;
