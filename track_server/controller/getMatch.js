const Match_Schema = require('../model/match_model')

const getMatch = async (req, res) => {
    try {
        const user_id = req._id
        const id = req.params.id
        const response = await Match_Schema.findById(id)
        if(response) {
            if(response.isCompleted) {
                res.status(200).json(response)
            } else if(response.heldBy === user_id) {
                res.status(200).json(response)
            } else {
                return res.status(401).json({ message : 'You are not allowed to make any changes to the matches held by another user'})
            }
        } else {
            res.status(404).json({message: "Match Not Found"})
        }
    } catch(err) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = getMatch