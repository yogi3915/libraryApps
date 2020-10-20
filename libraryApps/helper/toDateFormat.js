function toDateFormat(value) {
    var d = new Date(value);
    var n = d.toDateString();

    return n
  }

module.exports = toDateFormat

//   console.log(toDateFormat("2020-10-20T12:41:22.754Z"));