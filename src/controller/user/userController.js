const router = require("express").Router();
const responseBuilder = require("../../helper/responseBuilder");
var path = require("path");
var jsonPath = path.join(__dirname, "..", "..", "docs", "users.json");
const jsonFile = require('../../helper/jsonFile');


router.post("/signup", (request, response) => {
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
});


router.post("/login", (request, response) => {
    let users = jsonFile.getJsonFile(jsonPath);
    let loginDetails = request.body;
    let loggedInUser = users.filter((user) => {
        if ((loginDetails.email && user.email === loginDetails.email) || (loginDetails.phoneNumber && user.phoneNumber === loginDetails.phoneNumber)) {
            return true;
        }
        return false;
    })[0];
    if (loggedInUser) {
        if (loggedInUser.password === loginDetails.password) {
            return response.send(
                responseBuilder.buildSucessResponse({ user: "Logged in" })
            );
        } else {
            response.send(responseBuilder.buildFailureResponse("Incorrect password"));
        }
    } else {
        response.send(responseBuilder.buildFailureResponse("User with email or  phone number doesnt exist!"));
    }
});


router.get("/getActiveUsers", (request, response) => {
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
});


router.get("/getVerfiedUsers", (request, response) => {
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
});

module.exports = router;