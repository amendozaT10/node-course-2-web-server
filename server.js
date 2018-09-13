const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + `\n`, (err) => {
        if (err) {
            console.log("Could not log to server.log");
        }
    });

    next();
});

// app.use((req, res, next) => {
//     // res.render('about.hbs')
//     res.render('maintenance.hbs')
// })

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get("/", (request, response) => {
    response.render('homepage.hbs', {
        pageTitle: "Home page",
        welcomeMessage: "Welcome to the site"
    })
});

app.get("/about", (req, res) => {
    // res.send("about");
    res.render('about.hbs', {
        pageTitle: "About page"
    })
});

app.get("/bad", (req, res) => {
    res.send({error: "Unable to send message"})
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});