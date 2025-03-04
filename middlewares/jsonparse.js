export function jsonParser(req, res, next) {
    try {
        if (req.is('application/json')) {
            req.body = JSON.parse(req.body);
        }
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON' });
    }
}
