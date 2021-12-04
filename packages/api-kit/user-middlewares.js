"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function populateUser(req, res, next) {
    try {
        req.user = req.headers.user ? JSON.parse(req.headers.user) : null;
        next();
    }
    catch (e) {
        res.status(400).json({ code: "INVALID_USER" }).end();
    }
}
function verifyUser(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.status(401).end();
    }
}
module.exports = {
    populateUser: populateUser,
    verifyUser: verifyUser,
};
