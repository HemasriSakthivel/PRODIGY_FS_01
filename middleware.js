const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized' });
        }

        try {
            const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { userId, role };

            if (roles.length && !roles.includes(role)) {
                return res.status(403).send({ error: 'Forbidden' });
            }

            next();
        } catch (error) {
            res.status(401).send({ error: 'Unauthorized' });
        }
    };
};

module.exports = auth;
