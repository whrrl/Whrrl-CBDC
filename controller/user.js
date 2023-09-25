const axios = require("axios");
const web3 = require("web3");

exports.createUser = (req, res) => {
    
    axios.post(`${process.env.WHRRL_BACKEND_URL}user/registerUsingOTPMsg91`, req.body)
    .then((response) => {
        res.status(200).json({Sucess : true, data: response})

    })
  
};