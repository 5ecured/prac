const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

let players = [
    {
        id: 1,
        name: 'Cristiano Ronaldo',
        club: 'Juventus',
        important: true
    },
    {
        id: 2,
        name: 'Ronaldinho',
        club: 'Barcelona',
        important: false
    },
    {
        id: 3,
        name: 'Fernando Torres',
        club: 'Liverpool',
        important: true
    },
    {
        id: 4,
        name: 'Arjen Robben',
        club: 'Bayern Munich',
        important: false
    },
    {
        id: 5,
        name: 'Maldini',
        club: 'AC Milan',
        important: true
    }
]

const generateId = () => {
    const maxId = players.length > 0 ? Math.max(...players.map(p => p.id)) : 0
    return maxId + 1
}

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>')
})

app.get('/players', (req, res) => {
    res.send(players)
})

app.get('/players/:id', (req, res) => {
    const id = Number(req.params.id)
    const player = players.find(p => p.id === id)
    res.send(player)
})

app.delete('/players/:id', (req, res) => {
    const id = Number(req.params.id)
    players = players.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/players', (req, res) => {
    const body = req.body
    
    if(!body.name || !body.club) {
        return res.status(400).send({
            error: 'Name or club is missing'
        })
    }

    const player = {
        id: generateId(),
        name: body.name,
        club: body.club,
        important: false
    }

    players = players.concat(player)
    res.send(player)
})

app.put('/players/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body

    const newPlayer = {
        id: body.id,
        name: body.name,
        club: body.club,
        important: body.important
    }   

    players = players.map(player => player.id === id ? newPlayer : player)
    res.send(newPlayer)
})

app.patch('/players/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body

    const newPlayer = {...body, important: !body.important}

    players = players.map(player => player.id === id ? newPlayer : player)
    res.send(newPlayer)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})