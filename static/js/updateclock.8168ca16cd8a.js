function updateClock() {
    var now = new Date(),
      months = ['January', 'February', '...'];
    var hours = now.getHours();
    var mins = now.getMinutes();
    var secs = now.getSeconds();
    if (mins < 10) { mins = "0" + mins; }
    if (secs < 10) { secs = "0" + secs; }
    if (hours > 12) {
      hours = hours - 12;
      time = hours + ':' + mins + ':' + secs;
      time = [time, "PM"].join(' ');
    } else {
      time = hours + ':' + mins + ':' + secs;
      time = [time, "AM"].join(' ');
    }
    date = now.toString().substr(0, 16);

    document.getElementById('time').innerHTML = [date, time].join('');
    document.getElementById('time').style.color = "white";
    document.getElementById('time').style.color = "white";
    document.getElementById('time').style.fontSize = "20px";
    document.getElementById('time').style.textShadow = "2px 2px rgba(50, 50, 70, 0.5)";

    setTimeout(updateClock, 1000);
  }
  updateClock(); // initial call