const fs = require('fs');
const path = require('path');

function sendPhoto(fileName) {
    try {
        const filePath = path.join(__dirname, fileName);
        const data = fs.readFileSync(filePath);
        return data.toString('base64');
    } catch (error) {
        console.error('Error reading the image file:', error.message);
        return ''; // Return empty string on error
    }
}

function sendPdf(fileName) {
    try {
        const filePath = path.join(__dirname, fileName);
        const data = fs.readFileSync(filePath);
        return data.toString('base64');
    } catch (error) {
        console.error('Error reading the PDF file:', error.message);
        return ''; // Return empty string on error
    }
}
module.exports={sendPhoto,sendPdf};