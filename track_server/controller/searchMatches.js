const { default: mongoose } = require('mongoose')
const Match_Schema = require('../model/match_model')

const searchMatches = async (req, res) => {
    const str = req.params.str

    const query = mongoose.Types.ObjectId.isValid(str)
    ? { _id: new mongoose.Types.ObjectId(str) }
    : {$or: [
        {name: {$regex: str, $options: 'i'}},
        {location: {$regex: str, $options: 'i'}}
    ]}

    try {
        const searchedMatches = await Match_Schema.find(
            query,
            {_id: true, name: true, location: true, date: true, isCompleted: true}
        )
        res.status(200).json(searchedMatches.filter(match => match.isCompleted))
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = searchMatches