const net = require("net")
const readline = require('readline');

const client = net.connect(8080, () => {
    console.log(`Connection stabilished`)
})

const argsv = process.argv;

const argclientName = argsv.find(x => x.includes("-name="))

if (argclientName == undefined) {
    throw "Invalid argv: client name should be passed as -name:<name>";
}

const clientName = argclientName.substring(6)

client.on("data", (data) => console.log(`Client ${clientName} received ${data.toString()}`))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
    client.write(input)
});