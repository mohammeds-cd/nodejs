const responseBuilder = require("../helper/responseBuilder");


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

module.exports = { signUpValidator };