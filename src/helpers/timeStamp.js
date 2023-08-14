function timeStamp(seconds) {
  // converted seconds to timestamp
  const min = Math.floor((seconds % 3600) / 60).toString();
  const sec = ((seconds % 3600) % 60).toFixed(3).toString();

  const timeStamp = {};

  // set the prefix 0 if min or sec has one digit
  min.length < 2 ? (timeStamp.minute = "0" + min) : (timeStamp.minute = min);
  sec.length < 2 ? (timeStamp.second = "0" + sec) : (timeStamp.second = sec);

  //   return timeStamp if it exist
  let minStr = Number(timeStamp.minute) === 0 ? null : timeStamp.minute + "min";
  let secStr = Number(timeStamp.second) === 0 ? null : timeStamp.second + "sec";

  return `${minStr ? minStr + " :" : ""} ${secStr ? secStr : ""}`;
}

export default timeStamp;
