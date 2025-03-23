import express from 'express';
import cors from 'cors';
import { users } from './data/users.js';

const app = express();
const port = 3000;

app.use(cors());

app.get('/users', (req, res) => {
    try {
        // create a query parameter q that will filter the users by name
        const searchTerm = req.query.q || '';
        // create a query parameter limit that will limit the number of users returned
        const limit = req.query.limit || '';
        let filteredUsers = users;

        // If the q query parameter is provided, the response should include only the users whose
        // name includes the value of the q query parameter.
        if (searchTerm) {
            filteredUsers = users.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // If the limit query parameter is provided, the response should include only the first n users, 
        // where n is the value of the limit query parameter.
        if (limit) {
            filteredUsers = filteredUsers.slice(0, limit);
        }

        res.status(200).send(filteredUsers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
