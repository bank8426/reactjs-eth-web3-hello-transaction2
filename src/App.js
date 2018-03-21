import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

class App extends Component {

  render () {
    //Step #0 — Connect to the Geth
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    console.log(web3.eth.accounts)
    console.log(web3.eth.blockNumber)

    //Step #1 — Generate a New Address 
    //but i already create my account
    var myAccount = "0x8a1f87a4b160782d8e2e41cc6e3f451139397668";
    //console.log(myAccount)

    //Step #2 — Wait for Payment
    //transaction from faucet
    var myPaymentTransaction = "0xee6beb4ba04e577dc4c41f5f3a61049bc4cab0ab40d5b50a6be06c8d04f1c814"
    //console.log(myPayment);

    //Step #3 — Get the Transaction from the Latest Block
    var latestBlock = web3.eth.getBlock("latest");
    //console.log(latestBlock)
    latestBlock.then(function(latestBlockResult) {
      console.log(latestBlockResult) 

      //Step #4 — Gather Confirmations
      var transaction = web3.eth.getTransaction(myPaymentTransaction)

      transaction.then(function(transactionResult){
        //let check that there are more than 5 confirmation block
        if ((1971979/*web3.eth.blockNumber*/  - transactionResult.blockNumber ) > 5) {
          console.log("confirm transaction") 
          //confirm transaction
          var myExternalAccount = "0x80984aa70c22bf90df0a11d39bb08e755eaed660";

          //Step #5 — Transfering Funds to an External Wallet
          //we need to unlock account first
          //unlockAccount methed require account, passphrase(text that you put when create account), and the number of seconds after which the account will be locked again
          var unlockExternalAccount = web3.eth.personal.unlockAccount(myExternalAccount, 'testpassphrase', 3)
          unlockExternalAccount.then(function(unlockExternalAccountResult){
            console.log(unlockExternalAccountResult);

            var unlockMyAccount = web3.eth.personal.unlockAccount(myAccount, 'testpassphrase', 3)
            unlockMyAccount.then(function(unlockMyAccountResult){
              console.log(unlockMyAccountResult);

              //create a new transaction object 
              var transactionObject = {
                from: myAccount,
                to: myExternalAccount,
                value: transaction.value
              }

              /*calculate value of transfer - the calculated fee that is required to send the transaction. 
              The fee is calculated by the formula GasPrice * RequiredGas.*/
              web3.eth.estimateGas(transactionObject, function(error, gas) {
                web3.eth.getGasPrice(function (error, gasPrice) {
                  var gasPrice = Number(gasPrice);
                  var transactionFee = gasPrice * gas;
                  console.log(transactionFee);
                  //send all ethereum
                  transactionObject.value = (80000000000000/*transactionObject.value*/ - transactionFee);


                  //send transaction
                  var sendTransaction = web3.eth.sendTransaction(transactionObject);
                  sendTransaction.then(function (sendTransactionResult) {
                    console.log(sendTransactionResult);
                    console.log("sendcomplete");
                  })
                })
              });
            })
          });
        }
      })

    })




    return (
      <div>
        
      </div>
    )
  }
}

export default App;
