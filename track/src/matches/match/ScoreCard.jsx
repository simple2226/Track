import { useOutletContext } from 'react-router-dom';

export default function ScoreCard() {
    const data = useOutletContext()
    const stats = data.innings[data.innings.first.active ? 'first' : 'second'].current.stats
    const batting = data.innings[data.innings.first.active ? 'first' : 'second'].current[data.innings[data.innings.first.active ? 'first' : 'second'].batting].players
    const bowling = data.innings[data.innings.first.active ? 'first' : 'second'].current[data.innings[data.innings.first.active ? 'first' : 'second'].bowling].players
    return (
        <div className={`font-[100] outline-none text-[#3b3b3b] p-3 w-full h-full`}>
            <h1 className='py-2 text-center 700:text-left text-[.9rem] 700:text-[1.5rem] font-robotoSans'>{data.tossWon} won the toss and chose to {data.tossDecision.replace('ing', '')} first. Below is the match's last ball's score</h1>
            <div className={`flex flex-col px-3 700:px-5 w-full border ${true ? 'border-[#bbbbbb]' : 'border-[#999999]'} rounded-lg`}>
                <div className={`px-1 700:px-3 py-5 flex flex-col gap-y-1 border-b ${true ? 'border-b-[#d8d8d8]' : 'border-b-[#3d3d3d]'}`}>
                    <h1 className={`font-robotoSans text-[.8rem]`}>&nbsp;Overall Score {data.innings.first.active ? '' : `( Target → ${data.innings.first.current.stats.runs + 1} )`}</h1>
                    <h1 className={`font-robotoSans leading-none text-[5.5rem]`}>{`${stats.runs}-${stats.wickets}`}</h1>
                    <h1 className={`font-robotoSans leading-none text-[2rem] text-[#797979]`}>{`(${Math.floor(stats.balls / 6)}${stats.balls % 6 ? `.${stats.balls % 6}` : ''})`}</h1>
                </div>
                <div className={`py-5 flex flex-col items-center w-full gap-x-5 border-b ${true ? 'border-b-[#d8d8d8]' : 'border-b-[#3d3d3d]'}`}>
                    <div className={`my-2 p-3 px-0 700:px-3 flex flex-col justify-between w-full border ${true ? 'border-[#bbbbbb]' : 'border-[#999999]'} rounded-md`}>
                        <div className={`text-[.8rem] 700:text-[1rem] flex flex-col px-3`}>
                            {data.menOnStrike === 'double' ?
                                <>
                                <div className={`pb-3 flex justify-between font-bold`}>
                                    {(() => {
                                        let retVal = null 
                                        batting.forEach(player => {
                                            if(player.status.isBatting && player.status.onStrike) retVal = {
                                                name: player.status.name,
                                                runs: player.batting.runs_scored,
                                                balls: player.batting.balls_played
                                            }
                                        });
                                        if(retVal === null) {
                                            retVal = {
                                                name: '( ? ? ? ) ',
                                                runs: '--',
                                                balls: '--'
                                            }
                                        }
                                        return (
                                            <>
                                            <h1 className={`font-robotoSans ${true ? 'text-black' : 'text-white'}`}>{`${retVal.name}*`}</h1>
                                            <h1 className={`font-robotoSans text-[#797979]`}>{`${retVal.runs}(${retVal.balls})`}</h1>
                                            </>
                                        )
                                    })()}
                                </div>
                                <div className={`w-full border-b ${true ? 'border-b-[#d8d8d8]' : 'border-b-[#3d3d3d]'}`}></div>
                                <div className={`pt-3 flex justify-between`}>
                                    {(() => {
                                        let retVal = null 
                                        batting.forEach(player => {
                                            if(player.status.isBatting && !player.status.onStrike) retVal = {
                                                name: player.status.name,
                                                runs: player.batting.runs_scored,
                                                balls: player.batting.balls_played
                                            }
                                        });
                                        if(retVal === null) {
                                            retVal = {
                                                name: '( ? ? ? ) ',
                                                runs: '--',
                                                balls: '--'
                                            }
                                        }
                                        return (
                                            <>
                                                <h1 className={`font-robotoSans`}>{`${retVal.name}`}</h1>
                                                <h1 className={`font-robotoSans text-[#797979]`}>{`${retVal.runs}(${retVal.balls})`}</h1>
                                            </>
                                        )
                                    })()}
                                </div>
                                </>
                                :
                                <div className={`flex justify-between font-bold`}>
                                    {(() => {
                                        let retVal = null 
                                        batting.forEach(player => {
                                            if(player.status.isBatting) retVal = {
                                                name: player.status.name,
                                                runs: player.batting.runs_scored,
                                                balls: player.batting.balls_played
                                            }
                                        });
                                        if(retVal === null) {
                                            retVal = {
                                                name: '( ? ? ? ) ',
                                                runs: '--',
                                                balls: '--'
                                            }
                                        }
                                        return (
                                            <>
                                            <h1 className={`font-robotoSans ${true ? 'text-black' : 'text-white'}`}>{`${retVal.name}*`}</h1>
                                            <h1 className={`font-robotoSans text-[#797979]`}>{`${retVal.runs}(${retVal.balls})`}</h1>
                                            </>
                                        )
                                    })()}
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`text-[.8rem] 700:text-[1rem] my-2 p-3 700:px-6 flex justify-between w-full border ${true ? 'border-[#bbbbbb]' : 'border-[#999999]'} rounded-md`}>
                        {(() => {
                            let retVal = null 
                            bowling.forEach(player => {
                                if(player.status.isBowling) retVal = {
                                    name: player.status.name,
                                    runs: player.bowling.runs_conceded,
                                    wickets: player.bowling.wickets_taken,
                                    balls: player.bowling.balls_bowled
                                }
                            })
                            if(retVal === null) retVal = {
                                name: '( ? ? ? ) ',
                                runs: '--',
                                wickets: '--',
                                balls: '--'
                            }
                            return (
                                <>
                                    <h1 className={`font-robotoSans`}>{retVal.name}</h1>
                                    <div className={`flex gap-x-2`}>
                                        <h1 className={`font-robotoSans text-[#797979]`}>{`${retVal.wickets} - ${retVal.runs}`}</h1>
                                        {retVal.balls !== '--' ?
                                            <h1 className={`font-robotoSans text-[#797979]`}>{`(${Math.floor(retVal.balls / 6)}${retVal.balls % 6 ? `.${retVal.balls % 6}` : ''})`}</h1>
                                            :
                                            <h1 className={`font-robotoSans text-[#797979]`}>--.--</h1>
                                        }
                                    </div>
                                </>
                            )
                        })()}
                    </div>
                </div>
                <div className={`font-semibold 700:font-normal px-2 py-5 text-[.8rem] 700:text-[1rem] flex flex-col gap-y-3 font-robotoSans`}>
                    {[
                        {label: 'Innings Number', value:`${data.innings.first.active ? '#1' : '#2'}`},

                        ...(data.innings.first.active ? [] : [
                            {label: 'Runs Remaining', value:`${data.innings.first.current.stats.runs - data.innings.second.current.stats.runs + 1}`},
                            {label: 'Balls Remaining', value:`${data.numOvers * 6 - data.innings.second.current.stats.balls}`}
                        ]),

                        {label: 'Current Run Rate (CRR)', value:`${stats.crr.toFixed(2)}`},

                        ...(data.innings.first.active ? [] : [
                            {label: 'Required Run Rate (RRR)', value:`${isNaN((data.innings.first.current.stats.runs - data.innings.second.current.stats.runs) / (data.numOvers * 6 - data.innings.second.current.stats.balls) * 6) ? 0 : ((data.innings.first.current.stats.runs - data.innings.second.current.stats.runs) / (data.numOvers * 6 - data.innings.second.current.stats.balls) * 6).toFixed(2)}`}
                        ]),

                        {label: 'Boundaries (4s)', value:`${stats.fours}`},
                        {label: 'Sixes (6s)', value:`${stats.sixes}`},
                        {label: 'Wides', value:`${stats.extras.wides}`},
                        {label: 'Byes', value:`${stats.extras.byes}`},
                        {label: 'No-balls', value:`${stats.extras.noBalls}`}
                    ].map(({label, value}) => (
                        <div key={label} className={`flex items-center justify-between`}>
                            <h1 className={`font-robotoSans font-[100]`}>{label}</h1>
                            <h1 className={`font-robotoSans text-[#797979]`}>{value}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}