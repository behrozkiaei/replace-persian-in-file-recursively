const express = require('express')
var glob = require("glob")
const fs = require('fs');
const readline = require('readline');
var bodyParser = require('body-parser')

const app = express()
const port = 3000
app.use(
        express.urlencoded({
            extended: true
        })
    )
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.post('/', async(req, res) => {
    const { username, password, target, replacement } = req.body;
    let replace = false;
    if (username != "bashir" || password != "sadkljadfkljslfjdskl") {
        res.status(200).json({
            response: false
        })
    } else {

        glob("./test/**/**.js", null, function(er, files) {

            for (someFile of files) {

                // console.log(someFile)
                fs.readFile(someFile, 'utf8', function(err, data) {
                    // if (err) {
                    //     return console.log(err);
                    // }
                    if (data) {
                        replace = data.includes(target)
                        var result = data.replace(target, replacement);

                        fs.writeFile(someFile, result, 'utf8', function(err) {
                            if (err) return console.log(err);
                        });

                        res.status(200).json({
                            response: data.includes(target),
                        })

                    } else {
                        res.status(200).json({
                            response: false,
                        })
                    }
                });
            }
        });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})