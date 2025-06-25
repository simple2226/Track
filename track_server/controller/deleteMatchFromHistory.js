const __id = require('../config/__id')
const Account_Schema = require('../model/account_model')
const Match_Schema = require('../model/match_model')

const deleteMatchFromHistory = async (req, res) => {
    const _id = req._id
    const { matchId } = req.params
    try {
        const user = await Account_Schema.findById(_id)
        user.matches_history = user.matches_history.filter(id => id.toString() !== matchId)
        await user.save()

        const match = await Match_Schema.findById(matchId)
        if(match.isCompleted) {
            let needToDeleteMatch = true
            for(const player of match.innings.first.current.team1.players) {
                if(player.status.registered) {
                    needToDeleteMatch = false
                    break
                }
            }
            if(needToDeleteMatch) {
                for(const player of match.innings.first.current.team2.players) {
                    if(player.status.registered) {
                        needToDeleteMatch = false
                        break
                    }
                }
            }
            if(needToDeleteMatch) {
                await Match_Schema.findByIdAndDelete(matchId)
            }
        } else {
            await Match_Schema.findByIdAndDelete(matchId)
        }

        res.status(200).json({ message: "Match deleted successfully" })
    } catch {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = deleteMatchFromHistory