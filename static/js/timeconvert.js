  function timeConvert(time) {
    let unix_timestamp = time;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    if (hours > 12) {
      hours = hours - 12;
      var night = true;
    } else {
      var night = false;
    }
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // Will display time in HH:MM:SS format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // Add AM/PM to end of string
    if (night)
      formattedTime = formattedTime + ' PM';
    else
      formattedTime = formattedTime + ' AM';

    // console.log(formattedTime);
    return formattedTime;
  }