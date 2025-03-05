import { fetchUserData } from '../utils/fetchUserData.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const JWT_SECRET = 'your_secret_key'; 


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        try {

            const user = await fetchUserData(username);

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials1' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials2' });
            }

            const token = jwt.sign({ user_id: user.user_id, user_name: user.user_name }, JWT_SECRET, {
                expiresIn: '1h', 
            });

            return res.status(200).json({ user });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {

        return res.status(405).json({ error: 'Method not allowed' });
    }
}
