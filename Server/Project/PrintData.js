const fs = require('fs');

function sendCode(fileName) {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        return data; 
    } catch (error) {
        console.error('Error reading the file:', error);
        return ''; 
    }
}


function sendVideo(fileName) {
    try {
        const data = fs.readFileSync(fileName);
        return data.toString('base64'); // Convert binary to Base64
    } catch (error) {
        console.error('Error reading the file:', error);
        return '';
    }
}

function sendPhoto(fileName) {
    try {
        const data = fs.readFileSync(fileName);
        return data.toString('base64'); // Convert binary to Base64
    } catch (error) {
        console.error('Error reading the file:', error);
        return '';
    }
}

module.exports = { sendCode,sendVideo,sendPhoto };
