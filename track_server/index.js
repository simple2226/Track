const dbConnect = require('./config/database')
const cookieParser = require('cookie-parser')
const { createServer } = require('node:http')
const { Server } = require('socket.io')

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cookieParser())
app.use(express.json({ limit: '1mb' }))
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'https://track-app-pi.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

const Routes = require('./routes/routes')
app.use('/api', Routes)

dbConnect()

const server = createServer(app)
const io = new Server(server, {
    cors: {
        // origin: 'https://track-app-pi.vercel.app',
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
    transports: ['websocket']
})

const account_model = require('./model/account_model')
const chat_model = require('./model/chat_model')

io.on('connection', (socket) => {
    console.log('connected')
/*1*/
    socket.on('register', async (_id) => {
        if(!_id) {
            console.error('didnt receive id (null)')
            return
        }
        const user = await account_model.findById(_id)
        user.socketId = socket.id
        await user.save()
        const chatList = await chat_model.find({_id: { $in: user.chats }}).lean()
        io.to(socket.id).emit('receive chatlist', chatList.map(item => {
            const {messages, ...rest} = item
            return {...rest, message: messages.length ? messages[messages.length - 1] : null}
        }))
    })

/*2*/
    socket.on('request messages', async ({chat_id, my_id}) => {
        const chat = await chat_model.findById(chat_id)
        if(chat.userA._id === my_id) {
            chat.userA.checked = true
        } else {
            chat.userB.checked = true
        }
        await chat.save()

        const user = await account_model.findById(my_id)
        const chatList = await chat_model.find({_id: { $in: user.chats }}).lean()
        socket.emit('receive chatlist', chatList.map(item => {
            const {messages, ...rest} = item
            return {...rest, message: messages.length ? messages[messages.length - 1] : null}
        }))

        socket.emit('get messages', chat)
    })

/*3*/
    socket.on('send message', async ({sender_id, receiver_id, chat_id, message}) => {
        const from = await account_model.findById(sender_id)
        const to = await account_model.findById(receiver_id)
        if(to) {

            const chat = await chat_model.findById(chat_id)
            chat.messages.push({
                sender: sender_id,
                text: message,
            })
            if(chat.userA._id === receiver_id) {
                chat.userA.checked = false
            } else {
                chat.userB.checked = false
            }
            chat.lastUpdated = Date.now()
            await chat.save()

            const from_chatList = await chat_model.find({_id: { $in: from.chats }}).lean()
            io.to(from.socketId).emit('receive message', {message: chat.messages[chat.messages.length - 1], chatList: from_chatList.map(item => {
                const {messages, ...rest} = item
                return {...rest, message: messages.length ? messages[messages.length - 1] : null}
            })})
            
            if(to.socketId) {
                const to_chatList = await chat_model.find({_id: { $in: to.chats }}).lean()
                io.to(to.socketId).emit('receive message', {message: chat.messages[chat.messages.length - 1], chatList: to_chatList.map(item => {
                    const {messages, ...rest} = item
                    return {...rest, message: messages.length ? messages[messages.length - 1] : null}
                })})
            }

        }
    })

    socket.on('message checked', async ({chat_id, receiver_id}) => {
        const chat = await chat_model.findById(chat_id)
        if(chat.userA._id === receiver_id) {
            chat.userA.checked = true
        } else {
            chat.userB.checked = true
        }
        await chat.save()
    })
    
/*4*/
    socket.on('disconnect', async () => {
        await account_model.findOneAndUpdate({ socketId: socket.id }, { socketId: null })
    })
})


app.get('/api', (req, res) => {
    res.json({
        nothing: 'here'
    })
})

server.listen(PORT, () => console.log(`app listening on port ${PORT}`))