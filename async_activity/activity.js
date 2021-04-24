function word_count(phrase) {
  phrase = phrase.replace("_"," ");
  var words = phrase.match(/(\w+-\w+|\w+-|\w+)/g);
  var currWord = "";

  return words.reduce(function count(counts, word) {
    currWord = word.toLowerCase();

    if (counts[currWord]) {
      counts[currWord] += 1;
    } else {
      counts[currWord] = 1;
    }
    return counts;
  }, {});
}

module.exports = word_count;
