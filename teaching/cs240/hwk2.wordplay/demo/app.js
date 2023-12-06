var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function (a) {
  return (a.raw = a);
};
$jscomp.createTemplateTagFirstArgWithRaw = function (a, b) {
  a.raw = b;
  return a;
};
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.makeIterator = function (a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.arrayFromIterator = function (a) {
  for (var b, d = []; !(b = a.next()).done; ) d.push(b.value);
  return d;
};
$jscomp.arrayFromIterable = function (a) {
  return a instanceof Array
    ? a
    : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
var MIN_LENGTH = 3,
  MAX_LENGTH = 6,
  dictMap = {},
  possibleRootWords = [],
  descrambledWords = [],
  guessedWords = [];
initialize();
var baseWord =
  possibleRootWords[Math.floor(Math.random() * possibleRootWords.length)];
if (null != baseWord) {
  for (
    var permutations = getPerms(baseWord),
      $jscomp$iter$0 = $jscomp.makeIterator(permutations),
      $jscomp$key$candidate = $jscomp$iter$0.next();
    !$jscomp$key$candidate.done;
    $jscomp$key$candidate = $jscomp$iter$0.next()
  ) {
    var candidate = $jscomp$key$candidate.value;
    dictMap[candidate] && descrambledWords.push(candidate);
  }
  baseWord = shuffle(baseWord);
  var guess = null;
  do {
    for (
      var output = "Available letters: " + baseWord + "\n",
        $jscomp$iter$1 = $jscomp.makeIterator(descrambledWords),
        $jscomp$key$word = $jscomp$iter$1.next();
      !$jscomp$key$word.done;
      $jscomp$key$word = $jscomp$iter$1.next()
    ) {
      var word = $jscomp$key$word.value;
      output =
        -1 < guessedWords.indexOf(word)
          ? output + (word + "\n")
          : output + ("- ".repeat(word.length) + "\n");
    }
    console.log(output);
    guess = prompt("Enter a guess: ");
    null != guess &&
      (guess.length < MIN_LENGTH
        ? "*" == guess
          ? ((baseWord = shuffle(baseWord)), alert("Shuffling root word..."))
          : alert("Guess is too short!")
        : guess.length > MAX_LENGTH
        ? alert("Guess is too long!")
        : -1 < guessedWords.indexOf(guess)
        ? alert("Already guessed " + guess + "!")
        : -1 < descrambledWords.indexOf(guess)
        ? (alert("Correct! " + guess), guessedWords.push(guess))
        : alert(guess + " is not a word!"));
    console.clear();
  } while (null != guess && guessedWords.length < descrambledWords.length);
  var key =
      "You answered " +
      guessedWords.length +
      " out of " +
      descrambledWords.length +
      "!\n\n",
    $jscomp$iter$2 = $jscomp.makeIterator(descrambledWords);
  for (
    $jscomp$key$word = $jscomp$iter$2.next();
    !$jscomp$key$word.done;
    $jscomp$key$word = $jscomp$iter$2.next()
  ) {
    var word$5 = $jscomp$key$word.value;
    key += word$5 + "\n";
  }
  console.log(key);
}
function initialize() {
  for (
    var a = $jscomp.makeIterator(dictionary), b = a.next();
    !b.done;
    b = a.next()
  )
    (b = b.value),
      b.length >= MIN_LENGTH &&
        b.length <= MAX_LENGTH &&
        ((dictMap[b] = !0),
        b.length == MAX_LENGTH && possibleRootWords.push(b));
}
function shuffle(a) {
  for (var b = 0; b < a.length; b++) {
    var d = b,
      e = Math.floor(Math.random() * a.length);
    a = a.split("");
    var c = a[d];
    a[d] = a[e];
    a[e] = c;
    a = a.join("");
  }
  return a;
}
function getPerms(a) {
  if (0 == a.length) return new Set().add("");
  var b = a[0];
  a = getPerms(a.substring(1));
  for (
    var d = new Set(), e = $jscomp.makeIterator(a.values()), c = e.next();
    !c.done;
    c = e.next()
  ) {
    c = c.value;
    for (var f = 0; f <= c.length; f++) {
      var g = c.substring(-1, f),
        h = c.substring(f);
      d.add(g + b + h);
    }
  }
  return new Set(
    [].concat($jscomp.arrayFromIterable(a), $jscomp.arrayFromIterable(d))
  );
}
