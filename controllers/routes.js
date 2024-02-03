const express = require("express");
const app = express();
const logic = require("./logic");

//test server
app.get('/ping', (req, res) => {
    res.send('pong')
});

//depositMoney ฝากเงิน
app.post('/depositMoney', async (req, res) => {
    try {
        let result = await new logic().depositMoney(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

//withdrawMoney ถอนเงิน
app.post('/withdrawMoney', async (req, res) => {
    try {
        let result = await new logic().withdrawMoney(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

//buyBTC 
app.post('/buyBTC', async (req, res) => {
    try {
        let result = await new logic().buyBTC(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

//sellBTC 
app.post('/sellBTC', async (req, res) => {
    try {
        let result = await new logic().sellBTC(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

//ShowWallet
app.get('/ShowWallet', async (req, res) => {
    try {
        let result = await new logic().ShowWallet(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }

});

module.exports = app;