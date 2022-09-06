const express = require('express')
const fs = require('fs')
const server = express()

server.use(express.static('web'))

server.use(express.urlencoded({ extended: true }))

server.post("/login", (req, res) => {
    console.log(req.body.password)
    res.sendFile(__dirname + '/web/index.html')
    let data = JSON.parse(fs.readFileSync('info.json', 'utf-8'))
    console.log(data.password);
    if (req.body.email === data.email && req.body.password === data.password) {
        console.log('rätt email');
    } else {
        console.log('fel email');
    }

});
server.listen(3000, (err) => {
    if (err) console.log(err)
    console.log('connect');
})

server.post('/signup', (req, res) => {
    let data = fs.writeFileSync('info.json', JSON.stringify(req.body))
    res.sendFile(__dirname + '/web/login.html');
})
