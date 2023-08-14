function timeStamp(seconds, willBeString, precision) {
  // convert seconds to timestamp
  let min, sec;

  if (precision[0]) {
    min = ((seconds % 3600) / 60).toFixed(3).toString();
  } else {
    min = Math.floor((seconds % 3600) / 60).toString();
  }

  if (precision[1]) {
    sec = ((seconds % 3600) % 60).toFixed(3).toString();
  } else {
    sec = Math.floor((seconds % 3600) % 60).toString();
  }

  const timeStamp = {};

  // set the prefix 0 if min or sec has one digit
  min.length < 2 ? (timeStamp.minute = "0" + min) : (timeStamp.minute = min);
  sec.length < 2 ? (timeStamp.second = "0" + sec) : (timeStamp.second = sec);

  //   return timeStamp if it exist
  let minStr =
    Number(timeStamp.minute) === 0 ? null : timeStamp.minute + " min";
  let secStr =
    Number(timeStamp.second) === 0 ? null : timeStamp.second + " sec";

  if (willBeString) {
    if (minStr && secStr) {
      return `${minStr} : ${secStr}`;
    }
    if (minStr && !secStr) {
      return `${minStr}`;
    }
    if (!minStr && secStr) {
      return `${secStr}`;
    }
  } else {
    return timeStamp;
  }
}

export default timeStamp;
