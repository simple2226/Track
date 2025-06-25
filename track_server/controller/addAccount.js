const Account_Schema = require('../model/account_model')
const { hashPassword } = require('../auth/passwordEncryption')


const addAccount = async (req, res) => {
    try {
        const { username, password, age, job, showName } = req.body
        const hashedPassword = await hashPassword(password)
        const alreadyExists = await Account_Schema.find({
            username: { $regex : new RegExp(`^${username.trim()}$`, 'i') }
        })
        if(alreadyExists.length) {
            res.status(409).send({message: "username exists"})
            return
        }
        const response = await Account_Schema.create({
            username: username.trim(),
            password: hashedPassword,
            job: job,
            age: age,
            showName: showName.trim().replace(/\b\w/g, char => char.toUpperCase())
        })
        if(response) {
            res.status(200).json({message: "success"})
        }
    } catch {
        res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports = addAccount