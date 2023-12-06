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
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a;
      };
$jscomp.getGlobal = function (a) {
  a = [
    "object" == typeof globalThis && globalThis,
    a,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) return c;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) return a[b];
  c = a[c];
  return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function (a, b, c, d) {
  b &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(a, b, c, d)
      : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function (a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    if (!(e in c)) return;
    c = c[e];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d &&
    null != b &&
    $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b });
};
$jscomp.polyfillIsolated = function (a, b, c, d) {
  var e = a.split(".");
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < e.length - 1; g++) {
    var f = e[g];
    if (!(f in d)) return;
    d = d[f];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
  b = b(c);
  null != b &&
    (a
      ? $jscomp.defineProperty($jscomp.polyfills, e, {
          configurable: !0,
          writable: !0,
          value: b,
        })
      : b !== c &&
        (void 0 === $jscomp.propertyToPolyfillSymbol[e] &&
          ((c = (1e9 * Math.random()) >>> 0),
          ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE
            ? $jscomp.global.Symbol(e)
            : $jscomp.POLYFILL_PREFIX + c + "$" + e)),
        $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {
          configurable: !0,
          writable: !0,
          value: b,
        })));
};
$jscomp.underscoreProtoCanBeSet = function () {
  var a = { a: !0 },
    b = {};
  try {
    return (b.__proto__ = a), b.a;
  } catch (c) {}
  return !1;
};
$jscomp.setPrototypeOf =
  $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf
    ? Object.setPrototypeOf
    : $jscomp.underscoreProtoCanBeSet()
    ? function (a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
        return a;
      }
    : null;
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function (a) {
  if (!(a instanceof Object))
    throw new TypeError("Iterator result " + a + " is not an object");
};
$jscomp.generator.Context = function () {
  this.isRunning_ = !1;
  this.yieldAllIterator_ = null;
  this.yieldResult = void 0;
  this.nextAddress = 1;
  this.finallyAddress_ = this.catchAddress_ = 0;
  this.finallyContexts_ = this.abruptCompletion_ = null;
};
$jscomp.generator.Context.prototype.start_ = function () {
  if (this.isRunning_) throw new TypeError("Generator is already running");
  this.isRunning_ = !0;
};
$jscomp.generator.Context.prototype.stop_ = function () {
  this.isRunning_ = !1;
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function () {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
$jscomp.generator.Context.prototype.next_ = function (a) {
  this.yieldResult = a;
};
$jscomp.generator.Context.prototype.throw_ = function (a) {
  this.abruptCompletion_ = { exception: a, isException: !0 };
  this.jumpToErrorHandler_();
};
$jscomp.generator.Context.prototype["return"] = function (a) {
  this.abruptCompletion_ = { return: a };
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function (a) {
  this.abruptCompletion_ = { jumpTo: a };
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.yield = function (a, b) {
  this.nextAddress = b;
  return { value: a };
};
$jscomp.generator.Context.prototype.yieldAll = function (a, b) {
  var c = $jscomp.makeIterator(a),
    d = c.next();
  $jscomp.generator.ensureIteratorResultIsObject_(d);
  if (d.done) (this.yieldResult = d.value), (this.nextAddress = b);
  else return (this.yieldAllIterator_ = c), this.yield(d.value, b);
};
$jscomp.generator.Context.prototype.jumpTo = function (a) {
  this.nextAddress = a;
};
$jscomp.generator.Context.prototype.jumpToEnd = function () {
  this.nextAddress = 0;
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function (a, b) {
  this.catchAddress_ = a;
  void 0 != b && (this.finallyAddress_ = b);
};
$jscomp.generator.Context.prototype.setFinallyBlock = function (a) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = a || 0;
};
$jscomp.generator.Context.prototype.leaveTryBlock = function (a, b) {
  this.nextAddress = a;
  this.catchAddress_ = b || 0;
};
$jscomp.generator.Context.prototype.enterCatchBlock = function (a) {
  this.catchAddress_ = a || 0;
  a = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return a;
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function (a, b, c) {
  c
    ? (this.finallyContexts_[c] = this.abruptCompletion_)
    : (this.finallyContexts_ = [this.abruptCompletion_]);
  this.catchAddress_ = a || 0;
  this.finallyAddress_ = b || 0;
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function (a, b) {
  var c = this.finallyContexts_.splice(b || 0)[0];
  if ((c = this.abruptCompletion_ = this.abruptCompletion_ || c)) {
    if (c.isException) return this.jumpToErrorHandler_();
    void 0 != c.jumpTo && this.finallyAddress_ < c.jumpTo
      ? ((this.nextAddress = c.jumpTo), (this.abruptCompletion_ = null))
      : (this.nextAddress = this.finallyAddress_);
  } else this.nextAddress = a;
};
$jscomp.generator.Context.prototype.forIn = function (a) {
  return new $jscomp.generator.Context.PropertyIterator(a);
};
$jscomp.generator.Context.PropertyIterator = function (a) {
  this.object_ = a;
  this.properties_ = [];
  for (var b in a) this.properties_.push(b);
  this.properties_.reverse();
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function () {
  for (; 0 < this.properties_.length; ) {
    var a = this.properties_.pop();
    if (a in this.object_) return a;
  }
  return null;
};
$jscomp.generator.Engine_ = function (a) {
  this.context_ = new $jscomp.generator.Context();
  this.program_ = a;
};
$jscomp.generator.Engine_.prototype.next_ = function (a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_)
    return this.yieldAllStep_(
      this.context_.yieldAllIterator_.next,
      a,
      this.context_.next_
    );
  this.context_.next_(a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.return_ = function (a) {
  this.context_.start_();
  var b = this.context_.yieldAllIterator_;
  if (b)
    return this.yieldAllStep_(
      "return" in b
        ? b["return"]
        : function (c) {
            return { value: c, done: !0 };
          },
      a,
      this.context_["return"]
    );
  this.context_["return"](a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.throw_ = function (a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_)
    return this.yieldAllStep_(
      this.context_.yieldAllIterator_["throw"],
      a,
      this.context_.next_
    );
  this.context_.throw_(a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function (a, b, c) {
  try {
    var d = a.call(this.context_.yieldAllIterator_, b);
    $jscomp.generator.ensureIteratorResultIsObject_(d);
    if (!d.done) return this.context_.stop_(), d;
    var e = d.value;
  } catch (g) {
    return (
      (this.context_.yieldAllIterator_ = null),
      this.context_.throw_(g),
      this.nextStep_()
    );
  }
  this.context_.yieldAllIterator_ = null;
  c.call(this.context_, e);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.nextStep_ = function () {
  for (; this.context_.nextAddress; )
    try {
      var a = this.program_(this.context_);
      if (a) return this.context_.stop_(), { value: a.value, done: !1 };
    } catch (b) {
      (this.context_.yieldResult = void 0), this.context_.throw_(b);
    }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    a = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (a.isException) throw a.exception;
    return { value: a["return"], done: !0 };
  }
  return { value: void 0, done: !0 };
};
$jscomp.generator.Generator_ = function (a) {
  this.next = function (b) {
    return a.next_(b);
  };
  this["throw"] = function (b) {
    return a.throw_(b);
  };
  this["return"] = function (b) {
    return a.return_(b);
  };
  this[Symbol.iterator] = function () {
    return this;
  };
};
$jscomp.generator.createGenerator = function (a, b) {
  var c = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
  $jscomp.setPrototypeOf &&
    a.prototype &&
    $jscomp.setPrototypeOf(c, a.prototype);
  return c;
};
$jscomp.asyncExecutePromiseGenerator = function (a) {
  function b(d) {
    return a.next(d);
  }
  function c(d) {
    return a["throw"](d);
  }
  return new Promise(function (d, e) {
    function g(f) {
      f.done ? d(f.value) : Promise.resolve(f.value).then(b, c).then(g, e);
    }
    g(a.next());
  });
};
$jscomp.asyncExecutePromiseGeneratorFunction = function (a) {
  return $jscomp.asyncExecutePromiseGenerator(a());
};
$jscomp.asyncExecutePromiseGeneratorProgram = function (a) {
  return $jscomp.asyncExecutePromiseGenerator(
    new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a))
  );
};
var SimoneButton = function (a, b, c, d) {
  this.node = document.querySelector(a);
  this.sound = b;
  this.colorClass = c;
  this.highlightedClass = d;
};
SimoneButton.prototype.playSound = function () {
  new Audio(this.sound).play();
};
SimoneButton.prototype.lightUp = function () {
  this.node.className = this.highlightedClass;
};
SimoneButton.prototype.lightDown = function () {
  this.node.className = this.colorClass;
};
SimoneButton.prototype.getNode = function () {
  return this.node;
};
SimoneButton.prototype.getColor = function () {
  return this.colorClass;
};
var DELAY = 400,
  START_SEQ_LEN = 12,
  SimoneGame = function (a, b, c) {
    var d = this;
    this.api = c;
    this.patternLen = b;
    this.buttons = a;
    this.user = [];
    this.solution = [];
    this.currentIdx = 0;
    this.currentRound = 1;
    a = {};
    b = $jscomp.makeIterator(Object.keys(this.buttons));
    for (
      c = b.next();
      !c.done;
      a = {
        $jscomp$loop$prop$button$6: a.$jscomp$loop$prop$button$6,
        $jscomp$loop$prop$color$5: a.$jscomp$loop$prop$color$5,
        $jscomp$loop$prop$node$7: a.$jscomp$loop$prop$node$7,
      },
        c = b.next()
    )
      (a.$jscomp$loop$prop$color$5 = c.value),
        (a.$jscomp$loop$prop$button$6 =
          this.buttons[a.$jscomp$loop$prop$color$5]),
        (a.$jscomp$loop$prop$node$7 = a.$jscomp$loop$prop$button$6.getNode()),
        a.$jscomp$loop$prop$node$7.addEventListener(
          "mousedown",
          (function (e) {
            return function () {
              e.$jscomp$loop$prop$button$6.lightUp();
            };
          })(a)
        ),
        a.$jscomp$loop$prop$node$7.addEventListener(
          "mouseup",
          (function (e) {
            return function () {
              e.$jscomp$loop$prop$button$6.lightDown();
              e.$jscomp$loop$prop$button$6.playSound();
              d.user.push(e.$jscomp$loop$prop$color$5);
              d.checkGameStatus();
            };
          })(a)
        ),
        a.$jscomp$loop$prop$node$7.addEventListener(
          "mouseout",
          (function (e) {
            return function () {
              e.$jscomp$loop$prop$button$6.lightDown();
            };
          })(a)
        ),
        a.$jscomp$loop$prop$node$7.addEventListener(
          "mouseover",
          (function (e) {
            return function () {
              e.$jscomp$loop$prop$node$7.classList.add("hover");
            };
          })(a)
        );
  };
SimoneGame.prototype.play = function () {
  var a = this,
    b,
    c,
    d,
    e,
    g;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function (f) {
    switch (f.nextAddress) {
      case 1:
        return (
          f.setCatchFinallyBlocks(2),
          f.yield(axios.get(a.api + "?cmd=start"), 4)
        );
      case 4:
        b = f.yieldResult;
        c = b.data.sequence;
        a.playSequence(c, 0, START_SEQ_LEN, 0.3 * DELAY);
        f.leaveTryBlock(3);
        break;
      case 2:
        (d = f.enterCatchBlock()), console.log("ERROR: " + d);
      case 3:
        return (
          f.setCatchFinallyBlocks(5),
          f.yield(
            axios.get(a.api + ("?cmd=getSolution&rounds=" + a.patternLen)),
            7
          )
        );
      case 7:
        e = f.yieldResult;
        a.solution = e.data.key;
        f.leaveTryBlock(6);
        break;
      case 5:
        (g = f.enterCatchBlock()), console.log("ERROR: " + g);
      case 6:
        return f.yield(
          new Promise(function (h) {
            return setTimeout(h, 4e3);
          }),
          8
        );
      case 8:
        a.playSequence(a.solution, 0, a.currentRound, DELAY), f.jumpToEnd();
    }
  });
};
SimoneGame.prototype.playSequence = function (a, b, c, d) {
  var e = this,
    g,
    f;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function (h) {
    switch (h.nextAddress) {
      case 1:
        return h.yield(
          new Promise(function (k) {
            return setTimeout(k, d);
          }),
          2
        );
      case 2:
        g = b;
      case 3:
        if (!(g < c)) {
          h.jumpTo(0);
          break;
        }
        return h.yield(
          new Promise(function (k) {
            return setTimeout(k, d);
          }),
          6
        );
      case 6:
        return (
          (f = e.buttons[a[g]]),
          f.lightUp(),
          f.playSound(),
          h.yield(
            new Promise(function (k) {
              return setTimeout(k, d);
            }),
            7
          )
        );
      case 7:
        f.lightDown(), g++, h.jumpTo(3);
    }
  });
};
SimoneGame.prototype.checkGameStatus = function () {
  var a = this,
    b;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function (c) {
    switch (c.nextAddress) {
      case 1:
        b = document.querySelector("#status");
        if (a.currentIdx >= a.currentRound || a.currentRound > a.patternLen) {
          b.innerHTML = "Game over!";
          c.jumpTo(0);
          break;
        }
        if (!a.checkCorrectness())
          return (
            (document.querySelector("body").style.backgroundColor = "hotpink"),
            (b.innerHTML = "Incorrect! You lose!"),
            new Audio("sounds/wrong.wav").play(),
            c.yield(
              new Promise(function (d) {
                return setTimeout(d, DELAY);
              }),
              8
            )
          );
        a.currentIdx++;
        if (
          !(a.currentIdx == a.currentRound && a.currentRound < a.patternLen)
        ) {
          a.currentIdx < a.currentRound
            ? (b.innerHTML =
                "So far so good! " +
                (a.currentRound - a.currentIdx) +
                " more to go!")
            : a.currentRound == a.patternLen &&
              ((document.querySelector("body").style.backgroundColor =
                "DeepSkyBlue"),
              new Audio("sounds/win.mp3").play(),
              (b.innerHTML = "Yay you win!"));
          c.jumpTo(0);
          break;
        }
        new Audio("sounds/nextRound.wav").play();
        a.user = [];
        a.currentIdx = 0;
        a.currentRound++;
        b.innerHTML = "Good job! Prepare for next round.";
        return c.yield(
          new Promise(function (d) {
            return setTimeout(d, 2 * DELAY);
          }),
          6
        );
      case 6:
        return (
          (b.innerHTML = "Round " + a.currentRound + " of " + a.patternLen),
          c.yield(
            new Promise(function (d) {
              return setTimeout(d, 2 * DELAY);
            }),
            7
          )
        );
      case 7:
        a.playSequence(a.solution, 0, a.currentRound, DELAY);
        c.jumpTo(0);
        break;
      case 8:
        new Audio("sounds/lose.wav").play(),
          (a.currentIdx = a.currentRound),
          c.jumpToEnd();
    }
  });
};
SimoneGame.prototype.checkCorrectness = function () {
  return this.user[this.currentIdx] == this.solution[this.currentIdx];
};
var play = document.querySelector("#play");
play.addEventListener("click", function () {
  var a = {};
  a.R = new SimoneButton("#redSq", "sounds/red.wav", "red", "lightred");
  a.B = new SimoneButton("#blueSq", "sounds/blue.wav", "blue", "lightblue");
  a.G = new SimoneButton("#greenSq", "sounds/green.wav", "green", "lightgreen");
  a.Y = new SimoneButton(
    "#yellowSq",
    "sounds/yellow.wav",
    "yellow",
    "lightyellow"
  );
  var b = parseInt(document.querySelector("#rounds").value, 10);
  b || (b = 10);
  new SimoneGame(
    a,
    b,
    "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/"
  ).play();
});
