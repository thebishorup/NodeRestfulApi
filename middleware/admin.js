function admin(req, res, next) {
    //401 -- access denied
    //403 -- forbidden
    if (!req.user.isAdmin) return res.status(403).send('Access denied');

    next();
}

module.exports = admin;