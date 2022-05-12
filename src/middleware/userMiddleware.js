const responseBuilder = require("../helper/responseBuilder");
const encryption = require('../helper/encryption');
const aes256 = require('aes256');
var key = 'HJlsie132334';


function signUpValidator(req, res, next) {
    let body = req.body;
    if (Boolean(body.name) && Boolean(body.phoneNumber) && Boolean(body.email) && Boolean(body.password)) {
        if (validateName(body.name) && validatePhoneNo(body.phoneNumber) && validateEmail(body.email)) {
            if (validatePassword(body.password)) {
                next();
            } else {
                return res.send(responseBuilder.buildFailureResponse("Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter!"));
            }
        } else {
            return res.send(responseBuilder.buildFailureResponse("Request has invalid fields!"));
        }
    } else {
        return res.send(responseBuilder.buildFailureResponse("Request has mandatory fields missing!"));
    }
}

function decrypt(req, res, next) {
    var decryptedData = aes256.decrypt(key, req.body.data);
    req.body = JSON.parse(decryptedData);
    next();
}


function checkAdminRole(req, res, next) {
    let body = req.body;
    if (!body.authToken) {
        return res.send(responseBuilder.buildFailureResponse("Authentication token missing!"));
    } else {
        let data = encryption.decrypt(body.authToken);
        let timeDiff = data.exp - Date.now();
        if (timeDiff < 0) {
            return res.send(responseBuilder.buildFailureResponse("Token expired!"));
        } else {
            Object.assign(req.body, data);
            next();
        }
    }
}

function decrypt(req, res, next) {
    var decryptedData = aes256.decrypt(key, req.body.data);
    req.body = JSON.parse(decryptedData);
    next();
}

function validateName(name) {
    if (name[0].toUpperCase() === name[0]) {
        return true;
    } else {
        return false;
    }
}

function validatePhoneNo(phoneNo) {
    var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    if (mob_regex.test(phoneNo)) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {
    var passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (passwordFormat.test(password)) {
        return true;
    } else {
        return false;
    }
}

module.exports = { signUpValidator, checkAdminRole, decrypt };