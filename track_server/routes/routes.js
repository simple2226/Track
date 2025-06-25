const express = require('express')
const router = express.Router()

// middlewares
const authentication = require('../middleware/authentication')
const authorisation = require('../middleware/authorisation')

// controllers
const getAccount = require('../controller/getAccount')
const addAccount = require('../controller/addAccount')
const addMatch = require('../controller/addMatch')
const getMatch = require('../controller/getMatch')
const updateAccount = require('../controller/updateAccount')
const getFollowers = require('../controller/getFollowers')
const getFollowing = require('../controller/getFollowing')
const login = require('../controller/login')
const addRegisteredPlayer = require('../controller/addRegisteredPlayer')
const follow = require('../controller/follow')
const unfollow = require('../controller/unfollow')
const logout = require('../controller/logout')
const getMatchesHistory = require('../controller/getMatchesHistory')
const deleteMatchFromHistory = require('../controller/deleteMatchFromHistory')
const updateMatch = require('../controller/updateMatch')
const searchAccounts = require('../controller/searchAccounts')
const searchMatches = require('../controller/searchMatches')

// {unauthorised / public}
router.post('/accounts/add', addAccount)
router.get('/accounts/:id', getAccount)
router.get('/accounts/search/:str', searchAccounts)
router.get('/accounts/followers/:id', getFollowers)
router.get('/accounts/following/:id', getFollowing)
router.get('/matches/search/:str', searchMatches)


// {authorised / user-only}
router.post('/auth/login', authentication, login)
router.post('/auth/verify', authorisation, login)
router.post('/auth/logout', authorisation, logout)
router.post('/auth/follow', authorisation, follow)
router.post('/auth/unfollow', authorisation, unfollow)
router.post('/auth/add-registered-player', authentication, addRegisteredPlayer)
router.post('/auth/create-match', authorisation, addMatch)
router.post('/auth/matches-history', authorisation, getMatchesHistory)
router.post('/auth/matches/:id', authorisation, getMatch)
router.delete('/auth/delete-match-from-history/:matchId', authorisation, deleteMatchFromHistory)
router.put('/auth/update-account/:userId', authorisation, updateAccount)
router.put('/auth/update-match/:matchId', authorisation, updateMatch)

module.exports = router