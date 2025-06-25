const Account_Schema = require('../model/account_model')

const getFollowing = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await Account_Schema.findById(userId)
        if (!user) {
            res.status(404).json({message : "user not found"})
        }
        else {
            const followingAccounts = await Account_Schema.find({ _id: { $in: user.following } }, {_id: true, showName: true})
            res.status(200).json(followingAccounts)
        }
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = getFollowing