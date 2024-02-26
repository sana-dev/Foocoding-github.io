import { defineRoute, router } from './utils/define-route.js'

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

defineRoute('GET', '/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(users))
});

defineRoute('GET', '/users/:id', (req, res) => {
    const userId = req.params.id
    const user = users.find(user => user.id === parseInt(userId))
    if (!user) {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify({ message: 'User not found' }))
        return
    }

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(user))
})

defineRoute('POST', '/users', (req, res) => {
   // const { name, email } = req.body
    if (!req.body.name || !req.body.email) {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 400
        res.end(JSON.stringify({ message: 'Name and email are required' }))
        return
    }

    const newUser = {
        id: users.length + 1,
       ...req.body
    }
    users.push(newUser)

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 201
    res.end(JSON.stringify(newUser))
})

defineRoute('PATCH', '/users/:id', (req, res) => {
    const userId = req.params.id
    const userIndex = users.findIndex(user => user.id === parseInt(userId))
    if (userIndex === -1) {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify({ message: 'User not found' }))
        return
    }

    const { name, email } = req.body
    if (name) {
        users[userIndex].name = name
    }
    if (email) {
        users[userIndex].email = email
    }

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(users[userIndex]))
})

defineRoute('DELETE', '/users/:id', (req, res) => {
    const userId = req.params.id
    const userIndex = users.findIndex(user => user.id === parseInt(userId))
    if (userIndex === -1) {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify({ message: 'User not found' }))
        return
    }

    users.splice(userIndex, 1)

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 204
    res.end()
})

export default router
