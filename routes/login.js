const router = require('express').Router();
const { response } = require('express');
const { Cookie } = require('express-session');
const { rmSync } = require('fs');
const https = require('https');

router.get("/login", function (req, res) {
    res.render('login');
});

router.post("/login", async function (req, res) {
    const data = {
        username: req.body.username,
        password: req.body.password
    };
    const postData = JSON.stringify(data);
    const options = {
        protocol: 'https:',
        hostname: "tnpapp.gecmodasa.ac.in",
        method: "POST",
        path: "/users/login/",
        headers: {
            'Content-Type': 'application/json',
        }

    }

    let cookie = new Array().fill();


    const request = https.request(options, async (response) => {

        cookie.push(response.headers['set-cookie']);
        console.log(cookie[0]);
        res.setHeader('Set-Cookie', await response.headers['set-cookie']);
        res.send('OK');

    });


    // console.log(cookie);


    request.on('error', (err) => {
        console.log(err);
    });

    request.write(postData);
    request.end();
});


router.post('/loginUsingFetch', function (req, res) {
    const data = {
        username: req.body.username,
        password: req.body.password
    };
    const postData = JSON.stringify(data);

    fetch("https://tnpapp.gecmodasa.ac.in/users/login/", {
        method: 'POST',
        body: postData,
        credentials: "include",
        headers: { "Content-type": "application/json" }
    })
        .then(response => console.log(response.status))
        .catch(err => console.log(err))


    res.send("done");
});

router.get("/check", function (req, res) {
    const options = {
        protocol: 'https:',
        hostname: "tnpapp.gecmodasa.ac.in",
        method: "GET",
        path: "/users/me/",
        headers: {
            'Content-Type': 'application/json',
            Cookie: req.headers.cookie
        }

    }

    const request = https.request(options, (response) => {

        console.log(response.statusCode);

        // console.log(req.headers.cookie);
        // res.set('Set-Cookie', );
        response.on('data', function (data) {
            res.send(process.stdout.write(data));
        });
    });


    request.on('error', (err) => {
        console.log(err);
    });

    request.end();


    // fetch("https://tnpapp.gecmodasa.ac.in/users/me/", {
    //     method: 'GET',
    //     headers: {
    //         "Content-type": "application/json",
    //         "Set-Cookie": `${req.header.cookie}`,
    //     }
    // })
    //     .then(response => console.log(response))
    //     .catch(err => console.log(err))

});



router.get("/logout", function (req, res) {
    const options = {
        protocol: 'https:',
        hostname: "tnpapp.gecmodasa.ac.in",
        method: "GET",
        path: "/users/logout/",
        headers: {
            'Content-Type': 'application/json',
            Cookie: req.headers.cookie
        }

    }

    const request = https.request(options, (response) => {

        console.log(response.statusCode);
        res.clearCookie('sessionid');
        res.clearCookie('csrftoken');
        res.send("logged out");


    });


    request.on('error', (err) => {
        console.log(err);
    });



    request.end();
});



module.exports = router;

