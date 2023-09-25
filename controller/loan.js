const axios = require("axios");
const web3 = require("web3");
const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.RPC_URL),
);
const adminAddress = process.env.SIGNER_ADDRESS;
const adminPrivateKey = process.env.SIGNER_PRIV_KEY;
const cbdcTokenAddress = process.env.CBDC_ADDRESS;
const tokenContract = new web3.eth.Contract(tokenABI, cbdcTokenAddress);
exports.applyForLoan = (req, res) => {
    
    axios.post(`${process.env.WHRRL_BACKEND_URL}loan_app/loanApplicationOTPMsg91`, req.body)
    .then((response) => {
        res.status(200).json({Sucess : true, data: response})

    })
  
};

exports.approveLoanApplication = (req, res) => {
    axios.post(`${WHRRL_BANK_URL}lapp/approveLoanApplication1`, req.body)
    .then(async (response) => {
        try {
            const amount = web3.utils.toWei(`${req.body.amountToSend}`, "ether");

            const account =
                web3.eth.accounts.privateKeyToAccount(`${adminPrivateKey}`);

            var tx = {
                from: adminAddress,
                to: cbdcTokenAddress,
                gasLimit: web3.utils.toHex(70000),
                gasPrice: web3.utils.toHex(web3.utils.toWei("5", "gwei")),
                data: tokenContract.methods
                    .mint(req.body.bankAddress, amount)
                    .encodeABI(),
            };

            account.signTransaction(tx).then(async (signed) => {
                const transactions = await web3.eth.sendSignedTransaction(
                    signed.rawTransaction,
                );
                res.status(200).json({ status: true, message: "CBDC Minted", data: transactions });
            });
        } catch (error) {
            console.log(
                "%c 🍧 error: ",
                "font-size:20px;background-color: #FFDD4D;color:#fff;",
                error,
            );
            res.status(500).json({ status: false, message: "Someting went wrong", data: error });
        }
        res.status(200).json({Sucess : true, data: response})

    })
}