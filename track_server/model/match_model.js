const mongoose = require('mongoose')

const Player_Schema = new mongoose.Schema({
    status: {
        registered: {type: Boolean, required: true},
        _id: {type: String, required: true},
        name: {type: String, required: true},
        job: {type: String, required: true},
        isBatting: {type: Boolean, default: false},
        isBowling: {type: Boolean, default: false},
        isTaken: {type: String, default: ''},
        onStrike: {type: Boolean, default: false},
    },
    batting: {
        runs_scored: {type: Number, default: 0},
        balls_played: {type: Number, default: 0},
        strike_rate: {type: Number, default: 0},
        total_fours: {type: Number, default: 0},
        total_sixes: {type: Number, default: 0}
    },
    bowling: {
        wickets_taken: {type: Number, default: 0},
        runs_conceded: {type: Number, default: 0},
        fours_conceded: {type: Number, default: 0},
        sixes_conceded: {type: Number, default: 0},
        balls_bowled: {type: Number, default: 0},
        maiden_overs_bowled: {type: Number, default: 0},
        dot_balls_bowled: {type: Number, default: 0},
        strike_rate: {type: Number, default: 0},
        economy_rate: {type: Number, default: 0}
    }
}, { _id: false })

const Innings_1_Schema = new mongoose.Schema({
    team1: {
        name: {type: String, required: true, maxLength: 50},
        numPlayers: {type: Number, required: true},
        players: {type: [Player_Schema], required: true}
    },
    team2: {
        name: {type: String, required: true, maxLength: 50},
        numPlayers: {type: Number, required: true},
        players: {type: [Player_Schema], required: true}
    },
    stats: {
        runs: {type: Number, default: 0},
        balls: {type: Number, default: 0},
        wickets: {type: Number, default: 0},
        crr: {type: Number, default: 0},
        fours: {type: Number, default: 0},
        sixes: {type: Number, default: 0},
        extras: {
            wides: {type: Number, default: 0},
            byes: {type: Number, default: 0},
            noBalls: {type: Number, default: 0}
        }
    }
}, { _id: false })

const Innings_2_Schema = new mongoose.Schema({
    team1: {
        name: {type: String, required: true, maxLength: 50},
        numPlayers: {type: Number, required: true},
        players: {type: [Player_Schema], required: true}
    },
    team2: {
        name: {type: String, required: true, maxLength: 50},
        numPlayers: {type: Number, required: true},
        players: {type: [Player_Schema], required: true}
    },
    stats: {
        runs: {type: Number, default: 0},
        balls: {type: Number, default: 0},
        wickets: {type: Number, default: 0},
        crr: {type: Number, default: 0},
        fours: {type: Number, default: 0},
        sixes: {type: Number, default: 0},
        extras: {
            wides: {type: Number, default: 0},
            byes: {type: Number, default: 0},
            noBalls: {type: Number, default: 0}
        }
    }
}, { _id: false })

const Match_Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        default: "Unknown",
        maxLength: 100
    },
    heldBy: {
        type: String,
        required: true
    },
    team1: {type: String, required: true},
    team2: {type: String, required: true},
    numOvers: {
        type: Number,
        required: true
    },
    tossWon: {
        type: String,
        required: true
    },
    tossDecision: {
        type: String,
        required: true
    },
    menOnStrike: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    innings: {
        first: {
            batting: {type: String, required: true},
            bowling: {type: String, required: true},
            active: {type: Boolean, default: true},
            overs: [],
            runs_balls: [new mongoose.Schema({
                runs: {type: Number, default: 0},
                balls: {type: Number, default: 0}
            }, {_id: false})],
            current: {type: Innings_1_Schema, required: true},
        },
        second: {
            batting: {type: String, required: true},
            bowling: {type: String, required: true},
            active: {type: Boolean, default: false},
            overs: [],
            runs_balls: [new mongoose.Schema({
                runs: {type: Number, default: 0},
                balls: {type: Number, default: 0}
            }, {_id: false})],
            current: {type: Innings_2_Schema, required: true},
        }
    },
    partnerShips: [{
        player1_name: {type: String, required: true},
        player2_name: {type: String, required: true},
        runs: {type: Number, required: true},
        balls: {type: Number, required: true}
    }],
    winTeam: {
        type: String,
        default: ''
    },
    LooseTeam: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Match', Match_Schema)