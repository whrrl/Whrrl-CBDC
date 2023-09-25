require('dotenv').config()
const express = require('express')
const fileUpload = require("express-fileupload");
const cors = require("cors");
var bodyParser = require('body-parser')
const swagger = require('swagger-client')
const userRouter = require('./routes/user')
const cbdcRouter = require('./routes/cbdc')
const app = express()
const port = 3000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());
app.use('/user', userRouter)
app.use('/cbdc', cbdcRouter)

app.get('/', (req, res) => {

    // Insert NEW API calls here
    swagger.http({
        url: "https://api.apixplatform.com/turnkeylenderapi/v1/Customer/AccountSummary",
        method: 'GET',
        query: {},
        headers: {
            "X-Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXguZ2xvYmFsIiwic3ViIjoiYjUyNTIyYWEtMTg0ZS0xMWViLThmZGMtNjc4NWFkMTcwNDYwIiwiYXVkIjoiaHR0cHM6Ly9hcGkuYXBpeC5nbG9iYWwiLCJleHAiOjE2MDgwMzM5MDUsIm5hbWUiOiJBZG1pbiBBZG1pbiIsImVtYWlsIjoibGF1cmVuc2l1cythZG1pbkBicmFuay5hcyJ9.Q2S7fvAWUE3YMQAdTHxQDcsWaArEqKVtYUshKJyMB5aMI9Fu707OfD2sax2sTPJiQz7iflhqP3lmsiHUtyMoyhhx1MBf8GMDyY3kMWWIQ4yrzYo9ONBUEbKUfjJaAkowXu5Nu5d-Cpv4vGJdDPwmImB0csgK1F-1P6gF8vNE6O6ls1-hIwrSa0jbwLGsf3sw4Pmrw2K7wjdzT_qMFsE17xKdfG8dH8k4zndV7Kff9n3nYBMernEGh4befyUAi-9gtpmqeYlqMSvIqViWC2HajdPSzWSyBdqD8SXl4lQJdcDVgqRnq9Yu35bCUsAaN3Tj3GfThvBfHhLYwQhRZRmqWg"
            ,"tkLender_UserAuthToken": "getAccountDetails"
        }

    }).then((response) => {

        //const access_token = "bearer " + response.body.access_token;
        console.log(response);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response.headers,null,3));

    }).catch((err) => {
        console.error(err);
    })

    //res.send('Hello Team, Greetings from TEAM APIX!')
})

app.get('/', (req,res) => {
    res.status(200).json("Server Running");
})

app.use(function (req, res) {
    res.type("text/plain");
    res.status(404);
    res.send({ success: false, message: "404 Not Found" });
});

app.use(function (err, req, res, next) {
    res.type("text/plain");
    res.status(500);
    res.json({ success: false, message: "500 Server Error", data: err.stack });
    next(err);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} ` +
        `and https://dparmar-whr-loans.solutions.apixplatform.com`
    )
})
