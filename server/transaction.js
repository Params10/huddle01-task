const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const cors = require(`cors`);
//Server Optimisation
app.use(bodyParser.json());
app.use(cors());



const Web3 = require("web3");
const EthereumTx = require('ethereumjs-tx').Transaction;
const ethNetwork = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

async function transferFund(toAddress,numberOfTimes) {

  var nonce = await web3.eth.getTransactionCount('0x615683f1b27f6F7fA9F5056d2A36378266A41676');
  let finalSendAmount = numberOfTimes*0.03;
  let details = {
    "to": toAddress,
    "value": web3.utils.toHex(web3.utils.toWei(finalSendAmount.toString(), 'ether')),
    "gas": 4712388,
    "gasPrice": 100000000000,
    "nonce": nonce,
  };

  const transaction = new EthereumTx(details);
  let privKey = Buffer.from('3805af91cb62fb1f2f0496e42dae580dae6569d8433f6ebe0e5978cabdae634a', 'hex');
  transaction.sign(privKey);

  const serializedTransaction = transaction.serialize();

  web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'), (err, hash) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(hash);
    }

  });

}


// (async () => {
//   await transferFund('0x65FA9D7A32cfc52D084a2179395bdd61a416517E');
// })();

app.post('/transactions', async (req, res) => {
  console.log(req.body);
  let timeDifference = req.body.timediff;
  
let multiples = parseInt(timeDifference/30);
console.log("multiples",multiples);
if(multiples>0)
{
  await transferFund(req.body.receiverAddress,multiples);
  console.log("completed",multiples,req.body.receiverAddress); 
}

  res.send("POST Request Called")
})

 app.listen(3001, () => {
  console.log("Up and running! This is our feedback service");
});
