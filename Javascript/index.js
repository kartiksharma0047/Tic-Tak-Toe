let Page1 = document.querySelector(".Page1")
let Start = document.querySelector(".ball");
let BallShadow = document.querySelector(".shadow");
let RemoveHeading = document.querySelectorAll(".TitleHeading div");
let AddHeading = document.querySelector(".GradientH1");
let BoardLight = document.querySelector(".Board");
let LeftPlayer = document.querySelector(".LeftPlayer");
let RightPlayer = document.querySelector(".RightPlayer");
let CrossPlayer = document.querySelector(".PlayerLeft h1");
let ZeroPlayer = document.querySelector(".PlayerRight h1");
let LeftPlayerDiv = document.querySelector(".LeftPlayer div");
let RightPlayerDiv = document.querySelector(".RightPlayer div");
let Board = document.querySelector(".Board")
let BoardBox = document.querySelectorAll(".BoardBox");
let Page2 = document.querySelector(".Page2");
let PopUp=document.querySelector(".EndPopUp");
let PopUpDiv=document.querySelector(".EndPopUp div");
let playerName=document.querySelector(".EndPopUp div h1");
let HidePlayerWin=document.querySelector(".EndPopUp div h2");
let winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let BoxData = ["", "", "", "", "", "", "", "", ""];
let gameIsOver = false;
let turn;

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        RemoveHeading.forEach((item) => {
            item.classList.add("hidden");
        });
        AddHeading.classList.remove("hidden");
        Start.classList.remove("BounceAnimation");
        Start.classList.add("CenterAnimation");
        Start.classList.add("ballBtn");
        BallShadow.classList.remove("shadowAnimation");
        BallShadow.classList.add("shadowHide");
    }, 4300)
    setTimeout(() => {
        AddHeading.classList.add("no-border");
        AddHeading.classList.remove("GradientH1Animate");
        AddHeading.classList.add("TubeLightGlow");
        Start.onclick = () => {
            Page1.classList.add("hidden");
            Page2.classList.remove("hidden");
            RandomChance();
        }
    }, 6300);

})

function CrossAnimation() {
    BoardLight.classList.add("BoardLightRed");
    BoardLight.classList.remove("BoardLightBlue");
    LeftPlayer.classList.add("LeftPlayerBlink");
    RightPlayer.classList.remove("RightPlayerBlink");
    RightPlayer.style.color = "rgb(8,8,8)";
    CrossPlayer.classList.add("TubeLightLeftBlink");
    ZeroPlayer.classList.remove("TubeLightRightBlink");
    LeftPlayerDiv.classList.add("PlayerLeft");
    RightPlayerDiv.classList.remove("PlayerRight");
    BoardBox.forEach((boxes) => {
        boxes.classList.add("RedBox");
        boxes.classList.remove("BlueBox");
    })
}
function ZeroAnimation() {
    BoardLight.classList.add("BoardLightBlue");
    BoardLight.classList.remove("BoardLightRed");
    LeftPlayer.classList.remove("LeftPlayerBlink");
    RightPlayer.classList.add("RightPlayerBlink");
    LeftPlayer.style.color = "rgb(8,8,8)";
    CrossPlayer.classList.remove("TubeLightLeftBlink");
    ZeroPlayer.classList.add("TubeLightRightBlink");
    LeftPlayerDiv.classList.remove("PlayerLeft");
    RightPlayerDiv.classList.add("PlayerRight");
    BoardBox.forEach((boxes) => {
        boxes.classList.add("BlueBox");
        boxes.classList.remove("RedBox");
    })
}

function RandomChance() {
    turn = Math.round(Math.random() * (2 - 1) + 1);
    let FirstChance = turn;
    if (turn == 1) {
        CrossAnimation();
    } else {
        ZeroAnimation();
    }
    BoxClicking(FirstChance);
}

function RoundWon() {
    let win = false;
    let winningBoxes = [];

    for (let i = 0; i < winArray.length; i++) {
        const condition = winArray[i];
        const cellA = BoxData[condition[0]];
        const cellB = BoxData[condition[1]];
        const cellC = BoxData[condition[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            win = true;
            winningBoxes = condition;
            break;
        }
    }

    if (win) {
        PopUpDisplay()
        gameIsOver = true;
        BoardBox.forEach((box) => {
            box.removeEventListener("click", boxClickHandler);
        });
        Page2.classList.add("Contrast");
        for (let i = 0; i < winningBoxes.length; i++) {
            const index = winningBoxes[i];
            if (turn == 1) {
                playerName.textContent="Blue"
                RightPlayer.style.color = "white";
                BoardBox[index].className = "BoardBox WinBoxBlue";
                PopUpDiv.classList.add("BluePopUp")
            } else {
                playerName.textContent="Red"
                LeftPlayer.style.color = "white";
                BoardBox[index].className = "BoardBox WinBoxRed";
                PopUpDiv.classList.add("RedPopUp")
            }
        }

        if (turn == 1) {
            Board.classList.add("BlueWinBoxBackground");
            Board.classList.remove("RedWinBoxBackground");
            ZeroAnimation();
        } else {
            Board.classList.add("RedWinBoxBackground");
            Board.classList.remove("BlueWinBoxBackground");
            CrossAnimation();
        }

        removeBlinkClasses();
    } else if (!BoxData.includes('')) {
        BoardLight.classList.remove("BoardLightBlue");
        BoardLight.classList.remove("BoardLightRed");
        CrossPlayer.classList.remove("TubeLightLeftBlink");
        ZeroPlayer.classList.remove("TubeLightRightBlink");
        LeftPlayer.classList.remove("LeftPlayerBlink");
        RightPlayer.classList.remove("RightPlayerBlink");
        LeftPlayerDiv.classList.remove("PlayerLeft");
        RightPlayerDiv.classList.remove("PlayerRight");

        BoardLight.classList.add("BoardLightDraw");
        Board.classList.add("DrawBoxBackground");
        PopUpDiv.classList.add("DrawPopUp")
        playerName.textContent="Draw"
        HidePlayerWin.classList.add("hidden");
        PopUpDisplay()
    }
}

function PopUpDisplay(){
    setTimeout(()=>{
        PopUp.classList.remove("hidden");
        PopUp.classList.add("PopUpAnimation");
    },2000)
}

function removeBlinkClasses() {
    setTimeout(() => {
        CrossPlayer.classList.remove("TubeLightLeftBlink");
        ZeroPlayer.classList.remove("TubeLightRightBlink");
        LeftPlayer.classList.remove("LeftPlayerBlink");
        RightPlayer.classList.remove("RightPlayerBlink");
    }, 0);
}

function boxClickHandler() {
    if (!gameIsOver) {
        let index;
        if (this.textContent == "" && turn == 1) {
            ZeroAnimation();
            this.textContent = "X";
            index = this.getAttribute("cellIndex");
            BoxData[index] = "X";
            turn = 2;
            this.classList.add("RedText");
            RoundWon();
        } else if (this.textContent == "" && turn == 2) {
            CrossAnimation();
            this.textContent = "O";
            index = this.getAttribute("cellIndex");
            BoxData[index] = "O";
            turn = 1;
            this.classList.add("BlueText");
            RoundWon();
        }
    }
}

function BoxClicking(turn) {
    BoardBox.forEach((box) => {
        box.addEventListener("click", boxClickHandler);
    });
}