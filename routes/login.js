const router = require('express').Router();
const https = require('https');

router.get("/login", function (req, res) {
    res.render('login');
});

router.post("/login", function (req, res) {
    const data = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(data);
    const postData = JSON.stringify(data);
    console.log(postData);
    const options = {
        hostname: "tnpapp.gecmodasa.ac.in",
        method: "POST",
        path: "/users/login/",
        headers: {
            'Content-Type': 'application/json',
        }

    }


    const request = https.request(options, (res) => {
        console.log(res.statusCode);
    });


    request.on('error', (err) => {
        console.log(err);
    });

    request.write(postData);
    request.end();
    res.send("done");
});

module.exports = router;


// module.exports = fetch('https://tnpapp.gecmodasa.ac.in/users/login/')
//     .then(response => response.json())

