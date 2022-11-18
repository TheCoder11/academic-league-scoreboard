const express = require("express"), http = require("http");
const cors = require("cors");

const hostname = 'localhost';
const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

const state = {
    team1: {
        name: "",
        scores: 0,
        actions: []
    },
    team2: {
        name: "",
        scores: 0,
        actions: []
    },
    secondsLeft: 0,
    playing: false
}

function gameLoop () {
    if (state.playing) {
        if (state.secondsLeft > 0) {
            state.secondsLeft -= 1;
        }
    }
}

app.get("/status", (req, res) => {
    res.statusCode = 200;
    res.send(state);
    res.end();
});

app.post("/addaction", (req, res) => {
    console.log(req.body);
    let previousState = state;
    if (req.body.team === 1) {
        state.team1.scores += req.body.points;
        state.team1.actions.push(req.body.points);
    } else if (req.body.team === 2) {
        state.team2.scores += req.body.points;
        state.team2.actions.push(req.body.points);
    }
    res.statusCode = 200;
    res.send(state);
    res.end();
});

app.post("/toggletime", (req, res) => {
    state.playing = req.body.state;

    res.statusCode = 200;
    res.end();
});

app.post("/newgame", (req, res) => {
    if (!req.body.minutes) {
        state.secondsLeft = 35 * 60;
    } else {
        state.secondsLeft = req.body.minutes * 60;
    }

    if (!req.body.team1name) {
        state.team1.name = "Team 1";
    } else {
        state.team1.name = req.body.team1name;
    }

    if (!req.body.team2name) {
        state.team2.name = "Team 2";
    } else {
        state.team2.name = req.body.team2name;
    }

    setInterval(gameLoop, 1000);
    res.statusCode = 200;
    res.send(state);
    res.end();
});

const sample_server = http.createServer(app);

sample_server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
