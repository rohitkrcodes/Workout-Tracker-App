const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next)=>{

    //verify user is authenticated
    const {authorization} = req.headers

    // if no authorization in header
    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    // verify signature
    const token = authorization.split(" ")[1]

    try {
        const { id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id:id}).select('_id')
        next()
    } catch (error) {
        res.status(401).json({error: "Request is not authorized"})
    }

}

module.exports = requireAuth