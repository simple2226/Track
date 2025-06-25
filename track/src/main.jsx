import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import HomeBaseLayout from './home/HomeBaseLayout.jsx'
import Login from './home/login/Login.jsx'
import Signup from './home/signup/Signup.jsx'
import Intro from './home/Intro.jsx/Intro.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import MatchesHistory from './dashboard/matchesHistory/MatchesHistory.jsx'
import Match_Interface from './dashboard/match_Interface/Match_Interface.jsx'
import TrackScore from './dashboard/match_Interface/trackScore/TrackScore.jsx'
import D_ScoreCard from './dashboard/match_Interface/D_scorecard/D_ScoreCard.jsx'
import D_Overs from './dashboard/match_Interface/D_overs/D_Overs.jsx'
import D_Squads from './dashboard/match_Interface/D_squads/D_Squads.jsx'
import D_nothing from './dashboard/match_Interface/D_nothing/D_nothing.jsx'
import Account from './accounts/Account.jsx'
import Account_Home from './accounts/Account_Home/Account_Home.jsx'
import Followers from './accounts/followers/Followers.jsx'
import Following from './accounts/following/Following.jsx'
import Account_MatchesHistory from './accounts/account_Matches_History/Account_MatchesHistory.jsx'
import Account_Settings from './accounts/account_Settings/Account_Settings.jsx'
import CreateNewMatch from './dashboard/CreateNewMatch/CreateNewMatch.jsx'
import None from './dashboard/None.jsx'
import { Provider } from 'react-redux'
import { Store } from './redux/Store.js'
import Player from './people/Player/Player.jsx'
import Player_Home from './people/Player/Player_Home.jsx'
import Player_Followers from './people/Player/Player_Followers.jsx'
import Player_Following from './people/Player/Player_Following.jsx'
import Player_MatchesPlayed from './people/Player/Player_MatchesPlayed.jsx'
import Search from './people/Search/Search.jsx'
import Match from './matches/match/Match.jsx'
import ScoreCard from './matches/match/ScoreCard.jsx'
import Overs from './matches/match/Overs.jsx'
import Squads from './matches/match/Squads.jsx'
import SearchMatch from './matches/search/SearchMatch.jsx'
import Page404 from './Page404.jsx'
import Sample from './Sample.jsx'
import Chats from './accounts/account_chats/Chats.jsx'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '',
        element: <HomeBaseLayout/>,
        children: [
          {
            path: '',
            element: <Intro/>
          },
          {
            path: 'login',
            element: <Login/>
          },
          {
            path: 'signup',
            element: <Signup/>
          },
        ]
      },
      
      {
        path: '/account',
        element: <Account/>,
        children: [
          {
            path: '',
            element: <Navigate to='me'/>
          },
          {
            path: 'me',
            element: <Account_Home/>
          },
          {
            path: 'chats',
            element: <Chats/>
          },
          {
            path: 'followers',
            element: <Followers/>
          },
          {
            path: 'following',
            element: <Following/>
          },
          {
            path: 'matches-played',
            element: <Account_MatchesHistory/>
          },
          {
            path: 'settings',
            element: <Account_Settings/>
          },
        ]
      },
      {
        path: '/dashboard',
        element: <Dashboard/>,
        children: [
          {
            path: '',
            element: <None/>
          },
          {
            path: 'matches-history',
            element: <MatchesHistory/>,
          },
          {
            path: 'match-id/:matchId',
            element: <Match_Interface/>,
            children: [
              {
                path: '',
                element: <D_nothing/>
              },
              {
                path: 'track-Score',
                element: <TrackScore/>
              },
              {
                path: 'score-card',
                element: <D_ScoreCard/>
              },
              {
                path: 'overs-history',
                element: <D_Overs/>
              },
              {
                path: 'squads-info',
                element: <D_Squads/>
              }
            ]
          },
          {
            path: 'create-new-match',
            element: <CreateNewMatch/>
          }
        ]
      },
      {
        path: 'people/search',
        element: <Search/>,
      },
      {
        path: 'people/id/:id',
        element: <Player/>,
        children: [
          {
            path: '',
            element: <Player_Home/>
          },
          {
            path: 'followers',
            element: <Player_Followers/>
          },
          {
            path: 'following',
            element: <Player_Following/>
          },
          {
            path: 'matches-played',
            element: <Player_MatchesPlayed/>
          }
        ]
      },
      {
        path: 'matches/search',
        element: <SearchMatch/>,
      },
      {
        path: 'match/:matchId',
        element: <Match/>,
        children: [
          {
            path: 'scorecard',
            element: <ScoreCard/>
          },
          {
            path: 'overs',
            element: <Overs/>
          },
          {
            path: 'squads',
            element: <Squads/>
          }
        ]
      },
      {
        path: 'sample',
        element: <Sample/>
      },
      {
        path: '*',
        element: <Page404/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={Router}/>
  </Provider>,
)
