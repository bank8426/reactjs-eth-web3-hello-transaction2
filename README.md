This reposity work is follow this two tutorials.

1.https://x-team.com/become-blockchain-developer/ethereum/
2.https://gist.github.com/bneiluj/7c704ac37e07dbafb8e5b7552186f7d3

To learn about Ethereum transaction life cycle.
Assume that there Mr.A have ethereum account.And get payment by Mr.B.
The system has to check first that payment by Mr.B is trustable or not.
by check from number of confirmations(number of blocks after the block that has transaction of the payment  by Mr.B in blockchain)
After we confirm it.Mr.A want to send the payment that he get, to external wallet address.  
This code run on Rinkeby TestNet.

There are 6 steps in this code.
Step #0 — Connect to the Geth 
Step #1 — Generate a New Address (but i use my own account since i already have it. )
Step #2 — Wait for Payment (i get payment by faucet follow https://gist.github.com/bneiluj/7c704ac37e07dbafb8e5b7552186f7d3)
Step #3 — Get the Transaction from the Latest Block
Step #4 — Gather Confirmations
Step #5 — Transfering Funds to an External Wallet

Since , i test and run on Windows some of web3 functions not work correctly.
So some variable may contain comment notation.

![alt text](https://i.imgur.com/8r3X5DX.png)
![alt text](https://i.imgur.com/Oz6xMBt.png)