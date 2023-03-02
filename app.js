const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


const loginRoute = require("./routes/auth");
const changepassword = require("./routes/changepassword");


app.use('/users', loginRoute);
app.use('/users', changepassword);

app.listen(3000, function () {
    console.log("port is active now!!");
});
