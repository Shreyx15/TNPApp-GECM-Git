const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(express.json());


const loginRoute = require("./routes/login");
app.use('/users', loginRoute);

app.listen(3000, function () {
    console.log("port is active now!!");
});
