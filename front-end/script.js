(function() {
  "use strict"

  loadTime();
})();

function loadTime() {
  let currentDate = new Date();
  let hh = currentDate.getHours();
  let mm = currentDate.getMinutes();
  let ss = currentDate.getSeconds();
  hh = addPrefix(hh);
  mm = addPrefix(mm);
  ss = addPrefix(ss);
  let digitalTime = `${hh}:${mm}:${ss}`;

  $("#timeLabel").text(digitalTime);
  setTimeout(loadTime, 500);
}

function addPrefix(v) {
  if (v < 10) {
    v = "0" + v;
  };
  return v;
}

async function register(e) {
  e.preventDefault();
  let data = $("#form").serialize() + "&case=register";
  let response = await $.post("../back-end/action.php", data, JSON);
  if (response) {
    window.location.href = "login.html";
  } else {
    alert("Something went wrong, please try again");
  }
}

async function login(e) {
  e.preventDefault();
  let lastLogin = new Date();
  let data = $("#form").serialize() + `&lastLogin=${lastLogin}&case=login`;
  let response = await $.post("../back-end/action.php", data, JSON);
  if (response) {
    let session = { username: `${response}`, lastLogin: `${lastLogin}`};
    localStorage.setItem("sessionStorage", JSON.stringify(session));
    $.post("../back-end/action.php", data, JSON);
    window.location.href = "index.html";
  } else {
    alert("Incorrect username and/or password");
  }
}

$("#helloButton").on("click", function(e) {
    e.preventDefault();
    let text = localStorage.getItem("sessionStorage");
    let session = JSON.parse(text);
    if (session.username) {
      alert(`Hai ${session.username}, waktu login anda ${session.lastLogin}`);
    } else {
      window.location.href = "login.html";
    }
  }
);

$("#registerButton").on("click", function() {
    window.location.href = "register.html";
  }
);

$("#signUpButton").on("click", register);
$("#signInButton").on("click", login);
