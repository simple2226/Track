const { default: mongoose } = require('mongoose')
const Account_Schema = require('../model/account_model')
const __id = require('../config/__id')

const follow = async (req, res) => {
    try {
        const my_id = req._id
        const his_id = req.body._id
        if(my_id === his_id) {
            res.status(500).json({message: "Bro you thought you slick? Well, you ain't!"})
        }
        const [my_response, his_response] = await Promise.all([
            Account_Schema.findByIdAndUpdate(
                my_id,
                [{
                    $set: {
                        following: {
                            $cond: {
                                if: {$in: [__id(his_id), "$following"]},
                                then: "$following",
                                else: { $concatArrays: ["$following", [__id(his_id)]]}
                            }
                        },
                        num_following: {
                            $cond: {
                                if: { $in: [__id(his_id), "$following"] },
                                then: "$num_following",
                                else: { $add: ["$num_following", 1] }
                            }
                        }
                    }
                }],
                {new: true}
            ),
            Account_Schema.findByIdAndUpdate(
                his_id,
                [{
                    $set: {
                        followers: {
                            $cond: {
                                if: {$in: [__id(my_id), "$followers"]},
                                then: "$followers",
                                else: { $concatArrays: ["$followers", [__id(my_id)]]}
                            }
                        },
                        num_followers: {
                            $cond: {
                                if: { $in: [__id(my_id), "$followers"] },
                                then: "$num_followers",
                                else: { $add: ["$num_followers", 1] }
                            }
                        }
                    }
                }],
                {new: true}
            ),
        ])
        res.status(200).json({
            his_followers: his_response.followers,
            his_num_followers: his_response.num_followers
        })
    } catch(err) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = follow