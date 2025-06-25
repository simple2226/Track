const Account_Schema = require('../model/account_model')
const Match_Schema = require('../model/match_model')

const addMatch = async (req, res) => {
    try {
        const _id = req._id
        const {
            name,
            team1,
            team2,
            numOvers,
            tossWon,
            tossDecision,
            batting,
            bowling,
            menOnStrike,
            location,
            heldBy,
            preset
        } = req.body
        const response = await Match_Schema.create({
            name: name,
            team1: team1.name,
            team2: team2.name,
            innings: {
                first : {
                    batting: batting,
                    bowling: bowling,
                    overs: [],
                    runs_balls: [],
                    current: {
                        team1: team1,
                        team2: team2
                    },
                },
                second: {
                    batting: bowling,
                    bowling: batting,
                    overs: [],
                    runs_balls: [],
                    current: {
                        team1: team1,
                        team2: team2
                    },
                }
            },
            numOvers: numOvers,
            tossWon: tossWon,
            tossDecision: tossDecision,
            menOnStrike: menOnStrike,
            location: location,
            heldBy: heldBy
        })
        if(response) {
            await Account_Schema.findByIdAndUpdate(
                _id,
                { $addToSet: { matches_history: response._id } }
            )
            if(preset) {
                await Account_Schema.findByIdAndUpdate(
                    _id,
                    { $addToSet: { presets: preset } }
                )
            }
            res.status(200).json({message: 'match added successfully'})
        }
    } catch(err) {
        console.log(err)
        res.status(500).send({message: 'Internal Server Error'})
    }
}

module.exports = addMatch