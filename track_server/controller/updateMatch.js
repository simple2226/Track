const Match_Schema = require('../model/match_model')
const Account_Schema = require('../model/account_model')
const __id = require('../config/__id')

const updateMatch = async (req, res) => {
    try {
        const player_id = req._id
        const match_id = req.params.matchId
        const data = req.body.data
        const response = await Match_Schema.findByIdAndUpdate(
            match_id, data,
            { new: true, overwrite: true }
        )

        if(!response) {
            return res.status(404).json({ message: 'Match not found' })
        }

        if(response.heldBy !== player_id) {
            return res.status(401).json({ message : 'You are not allowed to make any changes to the matches held by another user'})
        }

        if(response.isCompleted) {
            // helper constants
            const stats = response.innings.second.current.stats
            const first_batting = response.innings.first.batting
            const team1_batting = response.innings[first_batting === 'team1' ? 'first' : 'second'].current.team1.players
            const team1_bowling = response.innings[first_batting === 'team1' ? 'second' : 'first'].current.team1.players
            const team2_batting = response.innings[first_batting === 'team2' ? 'first' : 'second'].current.team2.players
            const team2_bowling = response.innings[first_batting === 'team2' ? 'second' : 'first'].current.team2.players

            for(const i of [1, 2]) {
                for(const player of (i === 1 ? team1_batting : team2_batting)) {
                    if(player.status.registered) {

                        // the user who was playing this match
                        const account = await Account_Schema.findById(player.status._id)
                        if(!account) continue;
                        const acc_basic = account.career_stats.basic
                        const acc_batting = account.career_stats.batting
                        const acc_bowling = account.career_stats.bowling

                        // the registered user's local match stats
                        const batting = (i === 1 ? team1_batting : team2_batting).filter(pl => pl.status.name === player.status.name)[0].batting
                        const batting_status = (i === 1 ? team1_batting : team2_batting).filter(pl => pl.status.name === player.status.name)[0].status
                        const bowling = (i === 1 ? team1_bowling : team2_bowling).filter(pl => pl.status.name === player.status.name)[0].bowling
                        
                        
                        //            updating the users global/career stats
                        //                              |
                        //                              |
                        //                              |
                        //                              |
                        //                              V
                        

                        // ---------------------------basics--------------------------- //
                        account.matches_played.push(__id(match_id))
                        const result = (() => {
                            if(stats.runs === response.innings.first.current.stats.runs) {
                                return 'draw'
                            } else if(stats.runs > response.innings.first.current.stats.runs) {
                                if(response.innings.second.batting === `team${i}`) return 'won'
                                else return 'lost'
                            } else {
                                if(response.innings.second.batting === `team${i}`) return 'lost'
                                else return 'won'
                            }
                        })()
                        acc_basic.matches_played += 1
                        acc_basic.matches_won += (result === 'won')
                        acc_basic.matches_lost += (result === 'lost')
                        acc_basic.matches_draw += (result === 'draw')


                        // ---------------------------batting--------------------------- //
                        acc_batting.runs_scored += batting.runs_scored,
                        acc_batting.balls_played += batting.balls_played,
                        acc_batting.strike_rate += batting.strike_rate
                        if(response.innings.second.batting === `team${i}`) {
                            acc_batting.chasing_average.runs += batting.runs_scored,
                            acc_batting.chasing_average.wickets += batting_status.isTaken.length !== 0
                        }
                        acc_batting.not_outs += batting_status.isTaken.length === 0
                        acc_batting.total_fours += batting.total_fours
                        acc_batting.total_sixes += batting.total_sixes
                        acc_batting.total_halfCenturies += batting.runs_scored >= 50 && batting.runs_scored < 100
                        acc_batting.total_centuries += batting.runs_scored >= 100 && batting.runs_scored < 200
                        acc_batting.total_double_centuries += batting.runs_scored >= 200 && batting.runs_scored < 300
                        acc_batting.total_ducks += batting.runs_scored === 0
                        if(
                            acc_batting.best_batting_figure.runs === 0 &&
                            acc_batting.best_batting_figure.balls === 0
                        ) {
                            acc_batting.best_batting_figure.runs = batting.runs_scored
                            acc_batting.best_batting_figure.balls = batting.balls_played

                        } else if(batting.runs_scored > acc_batting.best_batting_figure.runs) {

                            acc_batting.best_batting_figure.runs = batting.runs_scored
                            acc_batting.best_batting_figure.balls = batting.balls_played

                        } else if(batting.runs_scored === acc_batting.best_batting_figure.runs &&
                        batting.balls_played < acc_batting.best_batting_figure.balls) {

                            acc_batting.best_batting_figure.runs = batting.runs_scored
                            acc_batting.best_batting_figure.balls = batting.balls_played

                        }


                        // ---------------------------bowling--------------------------- //
                        acc_bowling.wickets_taken += bowling.wickets_taken
                        acc_bowling.runs_conceded += bowling.runs_conceded
                        acc_bowling.fours_conceded += bowling.fours_conceded
                        acc_bowling.sixes_conceded += bowling.sixes_conceded
                        acc_bowling.balls_bowled += bowling.balls_bowled
                        acc_bowling.dot_balls_bowled += bowling.dot_balls_bowled
                        acc_bowling.strike_rate += bowling.strike_rate
                        acc_bowling.economy_rate += bowling.economy_rate
                        acc_bowling.three_wicket_hauls += bowling.wickets_taken >= 3 && bowling.wickets_taken < 5
                        acc_bowling.five_wicket_hauls += bowling.wickets_taken >= 5
                        if(
                            acc_bowling.best_bowling_figure.wickets === 0 &&
                            acc_bowling.best_bowling_figure.runs === 0
                        ) {
                            acc_bowling.best_bowling_figure.wickets = bowling.wickets_taken
                            acc_bowling.best_bowling_figure.runs = bowling.runs_conceded

                        } else if(bowling.wickets_taken > acc_bowling.best_bowling_figure.wickets) {

                            acc_bowling.best_bowling_figure.wickets = bowling.wickets_taken
                            acc_bowling.best_bowling_figure.runs = bowling.runs_conceded

                        } else if(bowling.wickets_taken === acc_bowling.best_bowling_figure.wickets &&
                        bowling.runs_conceded < acc_bowling.best_bowling_figure.runs) {

                            acc_bowling.best_bowling_figure.wickets = bowling.wickets_taken
                            acc_bowling.best_bowling_figure.runs = bowling.runs_conceded

                        }


                        // ---------------------------update user's account--------------------------- //
                        await account.save()
                    }
                }
            }
        }

        res.status(200).json({ message: 'Match updated successfully' })

    } catch {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = updateMatch