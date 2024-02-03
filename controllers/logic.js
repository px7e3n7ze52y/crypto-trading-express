var DBmoney = require("../models/moneyDB.json"); //import model
var DBbtc = require("../models/btcDB.json"); //import model

const fs = require("fs"); // for writing file => save data

const moneyDB = DBmoney; 
const btcDB = DBbtc;


class logic {
    depositMoney(req) {
        var FunctionName = "[depositMoney]";
        console.log("InPut" ,req)
        let moneyDeposit = req.moneyDeposit;
        let formatMoney;
        let currentMoney = 0;
        let FloatMoneyDeposit = parseFloat(moneyDeposit)
        
        let msg; //object for respond
        let data; //data for insert to DBmoney

        try {
            // check input money
            if (moneyDeposit < 0 ) {
                return "กรุณาใส่จำนวนเงินให้ถูกต้องด้วยค่ะ"

            }
            //convert string to float
            formatMoney = parseFloat(FloatMoneyDeposit.toFixed(2))
            
            //เพิ่มเงินที่ฝากเข้าไปในเงินปัจจุบัน
            moneyDB[0].currentMoney += formatMoney
            
            data = {
                //Data to json
                moneyDeposit: formatMoney
            };
            
            moneyDB.push(data);

            //Convert Value to JSON
            let jsonString = JSON.stringify(moneyDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/moneyDB.json", jsonString, (err) => {
                if (err) throw err;
                console.log('JSON File Created!');
            });

            msg = {
                StatusCode: 200,
                moneyDeposit: moneyDeposit
              };
            console.log("successful deposit")
            return msg;
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`,
            };

            console.log(messageError);
            return messageError;
        }
    }

    withdrawMoney(req) {
        var FunctionName = "[withdrawMoney]";
        console.log("InPut" ,req)
        let moneyWithdrawal = req.moneyWithdrawal
        let FloatMoneyWithdrawal = parseFloat(moneyWithdrawal)

        let msg; //object for respond
        let data; //data for insert to DBmoney

        try {
            // check input moneyWithdrawal
            if(FloatMoneyWithdrawal > moneyDB[0].currentMoney ) {
                return "จำนวนเงินไม่เพียงพอค่ะ"
            } 
            //เอาเงินออกจากเงินปัจจุบัน
            moneyDB[0].currentMoney -= FloatMoneyWithdrawal         
            
            //Data to json
            data = {
                moneyWithdrawal : FloatMoneyWithdrawal
            };
            moneyDB.push(data);

            //Convert Value to JSON
            let jsonString = JSON.stringify(moneyDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/moneyDB.json", jsonString, (err) => {
                if (err) throw err;
                console.log('JSON File Created!');
            });

            msg = {
                StatusCode: 200,
                moneyWithdrawal : FloatMoneyWithdrawal
                
              };
            console.log("successful withdrawal")
            return msg;
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`,
            };

            console.log(messageError);
            return messageError;
        }
    }

    buyBTC(req) {
        var FunctionName = "[buyBTC]";
        console.log("InPut" ,req)
        let numBuyBTC = req.numBuyBTC
        let FloatNumBuyBTC = parseFloat(numBuyBTC)
        let deductMoney;

        let msg; //object for respond
        let data; //data for insert to DBbtc
        let dataDeductMoney;

        try {
            // check input numBuyBTC
            if (FloatNumBuyBTC < 0.000001 ) {
                return "กรุณาใส่จำนวน BTC ให้ถูกต้องด้วยค่ะ"
            }

            // check currentMoney
            if(FloatNumBuyBTC*1000 > moneyDB[0].currentMoney ) {
                return "จำนวนเงินไม่เพียงพอค่ะ"
            }
            //เพิ่มจำนวนเหรียญ btc
            btcDB[0].currentBTC += FloatNumBuyBTC
            let deductMoney = moneyDB[0].currentMoney -= FloatNumBuyBTC*1000
            
            //Data to json
            data = {
                numBuyBTC : FloatNumBuyBTC
            };
            btcDB.push(data);

            //Convert Value to JSON
            let jsonString = JSON.stringify(btcDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/btcDB.json", jsonString, (err) => {
                if (err) throw err;
                console.log('JSON File Created!');
            });

            dataDeductMoney = {
                currentMoney : deductMoney
            };
            moneyDB.push(dataDeductMoney);
            
            //Convert Value to JSON
            let jsonDeductMoney = JSON.stringify(moneyDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/moneyDB.json", jsonDeductMoney, (err) => {
                if (err) throw err;
                console.log('JSON File Created!');
            });

            msg = {
                StatusCode: 200,
                numBuyBTC : FloatNumBuyBTC
                
              };
            console.log("buying BTC successful")
            return msg;

            
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`,
            };

            console.log(messageError);
            return messageError;
        }
    }

    sellBTC(req) {
        var FunctionName = "[sellBTC]";
        console.log("InPut" ,req)
        let numSellBTC = req.numSellBTC
        let FloatNumSellBTC = parseFloat(numSellBTC)
        let addMoney;

        let msg; //object for respond
        let data; //data for insert to DBbtc
        let dataAddMoney;

        try {
            // check input numSellBTC
            if (FloatNumSellBTC < 0.000001 ) {
                return "กรุณาใส่จำนวน BTC ให้ถูกต้องด้วยค่ะ"
            }
            // check currentBtc
            if(FloatNumSellBTC > btcDB[0].currentBTC ) {
                return "จำนวนเหรียญ BTC ไม่เพียงพอสำหรับการขายค่ะ"
            }
            //นำจำนวนเหรียญ BTC ที่ขายออกไป
            btcDB[0].currentBTC -= FloatNumSellBTC
            let addMoney = moneyDB[0].currentMoney += FloatNumSellBTC*1000
     
            //Data to json
            data = {
                numSellBTC : FloatNumSellBTC
            };
            btcDB.push(data);

            //Convert Value to JSON
            let jsonString = JSON.stringify(btcDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/btcDB.json", jsonString, (err) => {
                if (err) throw err;
                console.log('JSON File Created!');
            });

            dataAddMoney = {
                currentMoney : addMoney
            };
            moneyDB.push(dataAddMoney);
            
            //Convert Value to JSON
            let jsonAddMoney = JSON.stringify(moneyDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/moneyDB.json", jsonAddMoney, (err) => {
                if (err) throw err;
                console.log('JSON File Created!');
            });

            msg = {
                StatusCode: 200,
                numSellBTC : FloatNumSellBTC
              };
            console.log("selling BTC successful")
            return msg;

        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`,
            };

            console.log(messageError);
            return messageError;
        }
    }

    ShowWallet(req) {
        var FunctionName = "[ShowWallet]";
        
        let msg; //object for respond

        try {
            msg = {
                StatusCode: 200,
                currentBTC : btcDB[0].currentBTC,
                currentMoney : moneyDB[0].currentMoney 
              };
            return msg;
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`,
            };

            console.log(messageError);
            return messageError;
        }
    }

}
module.exports = logic;