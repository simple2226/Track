const Account_Schema = require('../model/account_model')

const addRegisteredPlayer = async (req, res) => {
    try {
        const _id = req._id
        const response = await Account_Schema.findById(_id, {
            _id: true,
            showName: true,
            job: true
        })
        res.status(200).json({_id: response._id, showName: response.showName, job: response.job})
    } catch {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = addRegisteredPlayer