const listeningChannels = {}
function subscribe(channel, socket) {
    if (!listeningChannels[channel]) {
        listeningChannels[channel] = []
    }
    
    console.log(`Subscribing to channel ${channel}`)
    listeningChannels[channel].push(socket)
}

function publish(channel, message) {
    if (!listeningChannels[channel]) {
        return;
    }

    for (const socket of listeningChannels[channel]) {
        socket.write(message)
    }
}

module.exports = { subscribe, publish }