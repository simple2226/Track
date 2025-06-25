const mongoose = require('mongoose')

const Account_Schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        maxLength: 200
    },
    age: {
        type: Number,
        required: true
    },
    job: {
        type: String,
        required: true,
    },
    showName: {
        type: String,
        required: true,
        maxLength: 50
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],
    num_followers: {
        type: Number,
        default: 0
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],
    num_following: {
        type: Number,
        default: 0
    },
    career_stats: {
        basic: {
            matches_played: {type: Number, default: 0},
            matches_won: {type: Number, default: 0},
            matches_lost: {type: Number, default: 0},
            matches_draw: {type: Number, default: 0}
        },
        batting: {
            runs_scored: {type: Number, default: 0},
            balls_played: {type: Number, default: 0},
            strike_rate: {type: Number, default: 0},
            chasing_average: {
                runs: {type: Number, default: 0},
                wickets: {type: Number, default: 0}
            },
            not_outs: {type: Number, default: 0},
            total_fours: {type: Number, default: 0},
            total_sixes: {type: Number, default: 0},
            total_halfCenturies: {type: Number, default: 0},
            total_centuries: {type: Number, default: 0},
            total_double_centuries: {type: Number, default: 0},
            total_ducks: {type: Number, default: 0},
            best_batting_figure: {
                runs: {type: Number, default: 0},
                balls: {type: Number, default: 0}
            }
        },
        bowling: {
            wickets_taken: {type: Number, default: 0},
            runs_conceded: {type: Number, default: 0},
            fours_conceded: {type: Number, default: 0},
            sixes_conceded: {type: Number, default: 0},
            balls_bowled: {type: Number, default: 0},
            dot_balls_bowled: {type: Number, default: 0},
            strike_rate: {type: Number, default: 0},
            economy_rate: {type: Number, default: 0},
            three_wicket_hauls: {type: Number, default: 0},
            five_wicket_hauls: {type: Number, default: 0},
            best_bowling_figure: {
                runs: {type: Number, default: 0},
                wickets: {type: Number, default: 0}
            }
        }
    },
    matches_history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }],
    matches_played: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }],
    presets: {
        type: Array,
        default: []
    },
    chats: [String],
    socketId: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Account', Account_Schema)