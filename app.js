const express = require('express');
const app = express();
const cors = require('cors');
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));




const loginRoute = require("./routes/login");
app.use('/users', loginRoute);

app.listen(3000, function () {
    console.log("port is active now!!");
});
