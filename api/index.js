const express = require("express")
const app = express()

app.get("/get-test", (req, res) => {
    res.send(
        [
            {
                id: 1,
                name: "john"
            },
            {
                id:2,
                name: "jane"
            }
        ]
    );
})

const port = process.env.PORT || 9000
app.listen(port, () => {console.log("listening on port " + port)});
