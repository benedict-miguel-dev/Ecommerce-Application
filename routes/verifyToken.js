const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        /* Get the token from the header */
        const token = authHeader.split(" ")[1];
        /* Verify the token that was passed, 
            err = An error has occured
            user = JWT PAYLOAD
        */
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(401).json("Invalid token")
            } else {
                /* Set the req.user as the payload from the Token and return */
                req.user = user
                next()
            }
        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    /*  verifyToken returns the payload and copies it as req.user */
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}
const verifyTokenAndAdmin = (req, res, next) => {
    /*  verifyToken returns the payload and copies it as req.user */
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }