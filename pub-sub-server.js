const net = require("net")
const pubSub = require("./pub-sub")

const server = net.createServer().listen(8080, () => {
    console.log("Pub server initialized")
})

// regex to treat messages
const regexes = {
    sub: /^sub_(.*?)$/,
    pub: /^pub_(.*?)_(.*?)$/
}

server.on("connection", (socket) => {
    console.log(`A new socket has been connected`)

    socket.on("data", (data) => {
        const msg = data.toString()

        const matchSub = msg.match(regexes.sub)
        if (matchSub && matchSub[1]) {
            const channel = matchSub[1]
            pubSub.subscribe(channel, socket)
            return;
        }

        const matchPub = msg.match(regexes.pub)
        if (matchPub && matchPub[1]) {
            const channel = matchPub[1]
            const message = matchPub[2]
            pubSub.publish(channel, message)
            return;
        }

        console.error(new Error(`Unknown command ${msg}`))

    })
})