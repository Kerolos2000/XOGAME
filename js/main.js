let lightDarkMode = document.querySelector(".lightDarkMode");
lightDarkMode.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    lightDarkMode.innerText = "Light Mode";
    localStorage.setItem("mode", "Dark");
  } else {
    document.body.classList.add("light");
    lightDarkMode.innerText = "Dark Mode";
    localStorage.setItem("mode", "light");
  }
});
function x(mode) {
  localStorage.setItem("mode", `${mode}`);
  if (localStorage.getItem("mode") == "light") {
    document.body.classList.add("light");
    lightDarkMode.innerText = "Dark Mode";
  } else {
    document.body.classList.remove("light");
    lightDarkMode.innerText = "Light Mode";
  }
}
if (localStorage.getItem("mode") != null) {
  x(localStorage.getItem("mode"));
}

let dash1 = document.querySelector("#main .dash1 h2");
let dash2 = document.querySelector("#main .dash2");
let squares = document.querySelectorAll("#main button");
let currentPlayer = "X";

function sweet() {
  (async () => {
    const { value: formValues } = await Swal.fire({
      title: "Players Names",
      html:
        '<input id="swal-input1" placeholder="player 1 name" class="swal2-input">' +
        '<input id="swal-input2" placeholder="player 2 name" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        p1 = document.getElementById("swal-input1").value || "player 1";
        p2 = document.getElementById("swal-input2").value || "player 2";
        dash2.innerHTML = `<h3><span>${p1}</span> win 0 , <span>${p2}</span> win 0</h3>`;
      },
    });
  })();
}

let Xplayer = 0;
let Oplayer = 0;
let obj = {};
let arr = [];
let p1;
let p2;

if (localStorage.getItem("winner") != null) {
  obj = JSON.parse(localStorage.getItem("winner"));
  Xplayer = obj.X;
  Oplayer = obj.O;
  (p1 = obj.p1),
    (p2 = obj.p2),
    (dash2.innerHTML = `<h3><span>${obj.p1}</span> win ${obj.X} , <span>${obj.p2}</span> win ${obj.O}</h3>`);
} else {
  sweet();
}

let startNewGame = document.querySelector(".startNewGame");
startNewGame.addEventListener("click", () => {
  localStorage.clear();
  sweet();
  Xplayer = 0;
  Oplayer = 0;
});

squares.forEach((square) => {
  dash1.innerHTML = `Next player is ${currentPlayer}`;
  square.addEventListener("click", () => {
    square.innerHTML = currentPlayer;
    if (currentPlayer == "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    dash1.innerHTML = `Next player is ${currentPlayer}`;

    winner(squares[0], squares[1], squares[2]);
    winner(squares[3], squares[4], squares[5]);
    winner(squares[6], squares[7], squares[8]);

    winner(squares[0], squares[3], squares[6]);
    winner(squares[1], squares[4], squares[7]);
    winner(squares[2], squares[5], squares[8]);

    winner(squares[0], squares[4], squares[8]);
    winner(squares[2], squares[4], squares[6]);
  });
});

function winner(s1, s2, s3) {
  if (
    s1.innerHTML == s2.innerHTML &&
    s2.innerHTML == s3.innerHTML &&
    s1.innerHTML != ""
  ) {
    s1.classList.add("winner");
    s2.classList.add("winner");
    s3.classList.add("winner");
    squares.forEach((square) => {
      square.setAttribute("disabled", "");
    });

    setTimeout(() => {
      s1.classList.remove("winner");
      s2.classList.remove("winner");
      s3.classList.remove("winner");
      squares.forEach((square) => {
        square.innerHTML = "";
        square.removeAttribute("disabled");
      });
      dash1.innerHTML = `Next player is ${currentPlayer}`;
    }, 3000);

    if (currentPlayer == "O") {
      Xplayer++;
      dash1.innerHTML = `player X is winner`;
    } else {
      Oplayer++;
      dash1.innerHTML = `player O is winner`;
    }

    obj = {
      X: Xplayer,
      O: Oplayer,
      p1: p1,
      p2: p2,
    };
    localStorage.setItem("winner", JSON.stringify(obj));
    dash2.innerHTML = `<h3><span>${obj.p1}</span> win ${obj.X} , <span>${obj.p2}</span> win ${obj.O}</h3>`;
  }
}
