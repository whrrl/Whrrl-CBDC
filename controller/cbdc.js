const Web3 = require("web3");
const tokenABI = require("../utils/tokenABI.json");

const adminAddress = process.env.SIGNER_ADDRESS;
const adminPrivateKey = process.env.SIGNER_PRIV_KEY;
const cbdcTokenAddress = process.env.CBDC_ADDRESS;
const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.RPC_URL),
);
const tokenContract = new web3.eth.Contract(tokenABI, cbdcTokenAddress);

exports.mintCBDC = async (req, res, next) => {
        try {
            console.log("%c Line:15 🍆 req.body", "color:#465975", req.body);
            const amount = web3.utils.toWei(`${req.body.amountToSend}`, "ether");

            const account =
                web3.eth.accounts.privateKeyToAccount(`${adminPrivateKey}`);

            var tx = {
                from: adminAddress,
                to: cbdcTokenAddress,
                gasLimit: web3.utils.toHex(70000),
                gasPrice: 0,
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
}

exports.transferCBDC = async (req, res, next) => {
    try {
        console.log("%c Line:15 🍆 req.body", "color:#465975", req.body);
        const amount = web3.utils.toWei(`${req.body.amountToSend}`, "ether");

        const account =
            web3.eth.accounts.privateKeyToAccount(`${req.body.userPrivateKey}`);

        var tx = {
            from: req.body.userAdderss,
            to: cbdcTokenAddress,
            gasLimit: web3.utils.toHex(70000),
            gasPrice: 0,
            data: tokenContract.methods
                .transfer(req.body.bankAddress, amount)
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
}

exports.burnCBDC = async (req, res, next) => {
    try {
        const amount = web3.utils.toWei(`${req.body.amountToSend}`, "ether");

        const account =
            web3.eth.accounts.privateKeyToAccount(`${adminPrivateKey}`);

        var tx = {
            from: adminAddress,
            to: cbdcTokenAddress,
            gasLimit: web3.utils.toHex(70000),
            gasPrice: 0,
            data: tokenContract.methods
                .burn(amount)
                .encodeABI(),
        };

        account.signTransaction(tx).then(async (signed) => {
            const transactions = await web3.eth.sendSignedTransaction(
                signed.rawTransaction,
            );
            res.status(200).json({ status: true, message: "CBDC Burned", data: transactions });
        });
    } catch (error) {
        console.log(
            "%c 🍧 error: ",
            "font-size:20px;background-color: #FFDD4D;color:#fff;",
            error,
        );
        res.status(500).json({ status: false, message: "Someting went wrong", data: error });
    }
}