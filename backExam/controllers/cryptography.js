const Config = require('../config')
const crypto = require('crypto')
const algorithm = Config.key.algorithm;
const privateKey = Config.key.privateKey;

const iv = crypto.randomBytes(16);
let salt = crypto.randomBytes(64);


function decrypt(password, encryptedData){
    const key = crypto.scryptSync(password.toString(), salt, 32); //генерация ключа

    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText =
        Buffer.from(text.encryptedData, 'hex');

    // Creating Decipher
    let decipher = crypto.createDecipheriv(
        'aes-256-cbc', Buffer.from(key), iv);

    // Updating encrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // returns data after decryption
    return decrypted.toString();
;

    console.log(decryptedData); //Any data
    return decryptedData;
}
function encrypt(password){
    const key = crypto.scryptSync(privateKey, salt, 32); //генерация ключа
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(password.toString());
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    console.log(encrypted.toString('hex'));

  //  return { iv: iv.toString('hex'),
    //    encryptedData: encrypted.toString('hex') }
    return encrypted.toString('hex');
}


exports.decrypt = (password, encryptedData) => {
    return decrypt(password, encryptedData);
};

exports.encrypt = (password) => {
    return encrypt(password);
};





 //генерация вектора инициализации



