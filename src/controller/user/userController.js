const responseBuilder = require("../../helper/responseBuilder");
var path = require("path");
var jsonPath = path.join(__dirname, "..", "..", "docs", "users.json");
const jsonFile = require('../../helper/jsonFile');


function signUp(request, response) {
    let users = jsonFile.getJsonFile(jsonPath);
    let newUser = request.body;
    let userExists = false;
    for (const user of users) {
        if (user.email === newUser.email) {
            userExists = true;
            break;
        }
    }
    if (userExists) {
        response.send(responseBuilder.buildFailureResponse("User with email already exists!"));
    } else {
        Object.assign(newUser, { verifiedEmail: false, active: false });
        users.push(newUser);
        jsonFile.writeJsonFile(jsonPath, users);
        return response.send(
            responseBuilder.buildSucessResponse({ user: "User registered,please login" })
        );
    }
}



function login(request, response) {
    let users = jsonFile.getJsonFile(jsonPath);
    let loginDetails = request.body;
    let loggedInUser = users.find((user) => {
        if ((loginDetails.email && user.email === loginDetails.email) || (loginDetails.phoneNumber && user.phoneNumber === loginDetails.phoneNumber)) {
            return true;
        }
        return false;
    });
    if (loggedInUser) {
        if (loggedInUser.password === loginDetails.password) {
            delete loggedInUser.password;
            return response.send(
                responseBuilder.buildSucessResponse({ user: loggedInUser })
            );
        } else {
            response.send(responseBuilder.buildFailureResponse("Incorrect password"));
        }
    } else {
        response.send(responseBuilder.buildFailureResponse("User with email or  phone number doesnt exist!"));
    }
}


function getActiveUsers(request, response) {
    let users = jsonFile.getJsonFile(jsonPath);
    let filteredUsers = users.filter((user) => {
        if (user.active) {
            return true;
        }
        return false;
    });
    return response.send(
        responseBuilder.buildSucessResponse({ users: filteredUsers })
    );
}

function getVerfiedUsers(request, response) {
    let users = jsonFile.getJsonFile(jsonPath);
    let filteredUsers = users.filter((user) => {
        if (user.verifiedEmail) {
            return true;
        }
        return false;
    });
    return response.send(
        responseBuilder.buildSucessResponse({ users: filteredUsers })
    );
}


module.exports = { signUp, login, getActiveUsers, getVerfiedUsers };