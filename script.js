function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function saveName() {
    var name = document.getElementById("name").value;
    if (name.trim() === '') {
        alert('Kérlek add meg a nevedet.');
        return;
    }
    setCookie("username", name, 30); // A süti 30 napig lesz érvényes

    // Elrejtjük a név mezőt és a gombot, majd megjelenítjük az üzenet küldését
    document.getElementById("nameDiv").style.display = "none";
    document.getElementById("messageDiv").style.display = "block";
}

function displayMessages() {
    var chatbox = document.getElementById("chatbox");
    $.ajax({
        url: "get_messages.php",
        method: "GET",
        success: function(data) {
            chatbox.innerHTML = data;
        }
    });
}

function sendMessage() {
    var name = getCookie("username");
    var message = document.getElementById("message").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_message.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("name=" + name + "&message=" + message);

    document.getElementById("message").value = '';
}

// Ellenőrizzük, hogy van-e már mentett név a süti-ben
var savedName = getCookie("username");
if (!savedName) {
    // Ha nincs mentett név, megjelenítjük a név mezőt
    document.getElementById("nameDiv").style.display = "block";
} else {
    // Ha van mentett név, megjelenítjük az üzenet küldését
    document.getElementById("messageDiv").style.display = "block";
}

// Frissítjük az üzeneteket 1 mp-ként
setInterval(displayMessages, 1000);
