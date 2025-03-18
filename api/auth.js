import { fetchUserData } from '../utils/fetchUserData.js';
import { registerUser } from "../utils/registerUser.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'your_secret_key';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { action } = req.query; 

    if (!action) {
        return res.status(400).json({ message: 'Missing action' });
    }

    try {
        if (action === 'login') {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Missing username or password' });
            }

            const user = await fetchUserData(username);

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials1' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials2' });
            }

            const token = jwt.sign(
                { user_id: user.user_id, user_name: user.user_name },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ user, token });
        }

        if (action === 'register') {
            const { email, regword, regname } = req.body;

            if (!email || !regword || !regname) {
                return res.status(400).json({ success: false, message: 'Missing email or password' });
            }

            const result = await registerUser(email, regword, regname);

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(200).json(result);
        }

        return res.status(400).json({ message: 'Invalid action' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
