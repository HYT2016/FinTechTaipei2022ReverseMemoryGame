


// 0920 try to fetch local server data
(function() {
    fetch('http://localhost:5000')
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        if (json.type === "img") {
            qrCode = document.getElementsByClassName("qrcode")[0];
            qrCode.src = json.content;
        }
        else if (json.type == "text") {
            message = document.getElementsByClassName("message")[0];
            message.innerText = json.content;
        }
    });
})();

//todo: exceed 400 times not define