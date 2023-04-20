// Model: https://tonejs.github.io/examples/stepSequencer

import classNames from "https://cdn.skypack.dev/classnames/bind";
import * as Tone from "https://cdn.skypack.dev/tone";

const makeAudios = (audios) => {
    return audios.map((audio) =>
        // Caching, otherwise keeps downloading every restart
        new Tone.Player(`./Audios/${audio}?_=${Date.now()}`).toDestination()
    );
};

const makeGrid = (audios) => {
    const consoles = [];
    for (const audio of audios) {
        const console = [];
        for (let i = 0; i < NUMBUTTONS; i++) {
            console.push({
                audio: audio,
                isActive: false,
            });
        }
        consoles.push(console);
    }
    return consoles;
};

const NUMBUTTONS = 12;
const bpm = document.querySelector("#bpm");
const audios = makeAudios([
    "Clap.ogg",
    "ClosedHat.ogg",
    "OpenHat.ogg",
    "Snare.ogg",
    "Kick.ogg",
    "c.mp3",
]);
const grid = makeGrid(audios);

let beatCount = 0;
let playing = false;
let started = false;

const configLoop = () => {
    const beatButtons = document.querySelectorAll(".beatMarker");
    const repeat = (time) => {
        grid.forEach((console) => {
            let beat = console[beatCount];
            if (beat["isActive"]) {
                Tone.loaded().then(() => {
                    // delay sound to sync w light
                    beat["audio"].start();
                });
            }
        });
        beatButtons.forEach((beatButton) =>
            beatButton.classList.remove("marker-is-active")
        );
        beatButtons[beatCount].classList.add("marker-is-active");
        beatCount = (beatCount + 1) % NUMBUTTONS;
        Tone.Transport.bpm.value = bpm.value;
    };
    Tone.Transport.scheduleRepeat(repeat, "8n");
};

const makeSequencer = () => {
    const sequencer = document.getElementById("sequencer");
    const beatMarkersSpan = document.createElement("span");
    beatMarkersSpan.id = "beatMarkers";

    for (let i = 0; i < NUMBUTTONS; i++) {
        const beatButton = document.createElement("input");
        beatButton.type = "button";
        beatButton.className = "beatMarker";
        beatMarkersSpan.appendChild(beatButton);
    }

    grid.forEach((console, consoleIndex) => {
        const consoleDiv = document.createElement("div");
        consoleDiv.id = `consoleIndex${consoleIndex + 1}`;
        consoleDiv.className = "console";

        console.forEach((beat, beatIndex) => {
            const button = document.createElement("button");
            button.className = "beatButton";
            // console 3, beat 4 saved as B34
            button.id = `B${consoleIndex + 1}${beatIndex + 1}`;
            button.addEventListener("click", function (e) {
                handleBeatClick(consoleIndex, beatIndex, e);
            });
            consoleDiv.appendChild(button);
        });
        sequencer.prepend(beatMarkersSpan);
        sequencer.appendChild(consoleDiv);
    });
};

const handleBeatClick = (clickedRowIndex, clickedBeatIndex, e) => {
    grid.forEach((console, consoleIndex) => {
        console.forEach((beat, beatIndex) => {
            if (
                clickedRowIndex === consoleIndex &&
                clickedBeatIndex === beatIndex
            ) {
                beat["isActive"] = !beat["isActive"];
                e.target.className = classNames(
                    "beatButton",
                    {"button-is-active": !!beat["isActive"]},
                    {"button-not-active": !beat["isActive"]}
                );
            }
        });
    });
};

const configPlayButton = () => {
    const button = document.getElementById("playButton");
    button.addEventListener("click", (e) => {
        if (!started) {
            Tone.start();
            Tone.getDestination().volume.rampTo(10, 0.001);
            configLoop();
            started = true;
        }
        if (playing) {
            e.target.innerText = "Play";
            button.id = "playButton";
            Tone.Transport.stop();
            playing = false;
        } else {
            e.target.innerText = "Stop";
            button.id = "playButtonON";
            Tone.Transport.start();
            playing = true;
        }
    });
};

// Reading Button Numbers from site
let prevState = "000000000000";
const buttonNumbers = document.querySelector("#buttonNumbers");
const readButtonNumbers = (buttonNumbersString) => {
    buttonNumbers.value = buttonNumbersString;
    buttonNumbers.value
        .split("")
        .forEach((buttonActivated, buttonActivatedIndex) => {
            const beat = grid[0][buttonActivatedIndex];
            // Latching mechanism, since we have a button but require behaviour of a switch
            // Eg. 11011 activates 11011, but 11011 again deactivates all to get 00000
            if (
                Number(buttonActivated) <
                Number(prevState[buttonActivatedIndex])
            ) {
                beat["isActive"] = !beat["isActive"];
                document.querySelector(
                    `#B1${buttonActivatedIndex + 1}`
                ).className = classNames(
                    "beatButton",
                    {"button-is-active": !!beat["isActive"]},
                    {"button-not-active": !beat["isActive"]}
                );
            }
        });
};

const getCurrentBeatString = (consoleIndex) => {
    let currentBeatString = "";
    grid[consoleIndex].forEach((beat) => {
        currentBeatString += beat["isActive"] ? "1" : "0";
    });
    return currentBeatString;
};

const getCurrentBeatMarkerString = () => {
    let currentBeatMarkerString = "";
    document.querySelectorAll(".beatMarker").forEach((beatMarker) => {
        currentBeatMarkerString += beatMarker.classList.contains(
            "marker-is-active"
        )
            ? "2"
            : "0";
    });
    return currentBeatMarkerString;
};

const calculateVolume = (currentBeatMarkerString) => {
    let volumeOutput = 0;
    let currentBeatMarkerIndex = currentBeatMarkerString.indexOf("2");
    // Think of kernel as [[3,3,3,3,3,3],[10,10,10,10,10,10],[3,3,3,3,3,3]]

    for (let i = 0; i < 6; i++) {
        [...getCurrentBeatString(i)].forEach(
            (currentBeat, currentBeatIndex) => {
                if (currentBeatMarkerIndex < 1) {
                    currentBeatMarkerIndex = NUMBUTTONS;
                }
                if (currentBeat === "1") {
                    if (
                        currentBeatIndex ===
                            (currentBeatMarkerIndex - 1) % NUMBUTTONS ||
                        currentBeatIndex ===
                            (currentBeatMarkerIndex + 1) % NUMBUTTONS
                    ) {
                        volumeOutput += 3;
                    } else if (
                        currentBeatIndex ===
                        currentBeatMarkerIndex % NUMBUTTONS
                    ) {
                        volumeOutput += 10;
                    }
                }
            }
        );
    }
    return volumeOutput;
};

window.addEventListener("DOMContentLoaded", () => {
    configPlayButton();
    makeSequencer();

    // NEED TO CHANGE IP
    const websocketClient = new WebSocket("ws://192.168.137.234/buttons");
    console.log("HIII");
    // wait for website connection to fully load
    websocketClient.onopen = () => {
        console.log("JS CLIENT CONNECTED");

        // RECEIVES buttonNumbersString here
        websocketClient.onmessage = (msg) => {
            readButtonNumbers(msg["data"]);
            prevState = msg["data"];
            console.log(`RECEIVING ${msg["data"]}`);
        };

        // SENDS current beat (buttons state) here
        // send 12 characters + 2 volume number
        setInterval(() => {
            const currentBeatString = getCurrentBeatString(0);
            const currentBeatMarkerString = getCurrentBeatMarkerString();
            let combinedString = "";
            // add up currentBeatString and currentBeatMarkerString character wise to create a new string
            for (let i = 0; i < currentBeatString.length; i++) {
                combinedString += String(
                    Number(currentBeatString[i]) +
                        Number(currentBeatMarkerString[i])
                );
            }
            combinedString += String(calculateVolume(currentBeatMarkerString));
            console.log(`SENDING ${combinedString}`);
            websocketClient.send(combinedString);
            // 100ms for getCurrentBeatMarkerString
        }, 50);
    };
});
