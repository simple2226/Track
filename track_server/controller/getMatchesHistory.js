const Account_Schema = require("../model/account_model");

const getMatchesHistory = async (req, res) => {
    const userId = req._id
    try {
        const account = await Account_Schema.findById(userId).populate('matches_history', 'name location date isCompleted')
        res.status(200).json(account.matches_history)
    } catch {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = getMatchesHistory