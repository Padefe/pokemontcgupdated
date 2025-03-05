import { registerUser } from "../utils/registerUser.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, regword, regname } = req.body;

    if (!email || !regword || !regname) {
        return res.status(400).json({ success: false, message: "Missing email or password" });
    }

    try {
        const result = await registerUser(email, regword, regname);

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
