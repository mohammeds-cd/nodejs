var aes256 = require('aes256');

var key = 'HJlsie132334';
var plaintext = {
    email: "shop@gmail.com",
    password: "test@123"
};

var encryptedPlainText = aes256.encrypt(key, JSON.stringify(plaintext));
console.log("data", encryptedPlainText);