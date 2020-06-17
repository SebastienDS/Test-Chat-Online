const express = require('express')
const socket = require('socket.io')
const app = express()
const port = 8000
const address = "localhost"

app.use(express.static('public'))

const server = app.listen(port, address, () => {
    console.log(`Server listening at http://${address}:${port}`)
})

const io = socket(server)

io.sockets.on('connection', (socket) => {
    console.log(`[+] ${socket.id}`)
    socket.broadcast.emit("login")

    socket.on('disconnect', () => {
        console.log(`[-] ${socket.id}`)
        socket.broadcast.emit("logout")

    })

    socket.on("message", (data) => {
        socket.broadcast.emit("message", data)
    })
})
