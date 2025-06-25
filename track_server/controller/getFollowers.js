const Account_Schema = require('../model/account_model')

const getFollowers = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await Account_Schema.findById(userId)
        if (!user) {
            res.status(404).json({message : "user not found"})
        }
        else {
            const followersAccounts = await Account_Schema.find({ _id: { $in: user.followers } }, {_id: true, showName: true})
            res.status(200).json(followersAccounts)
        }
    } catch {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = getFollowers