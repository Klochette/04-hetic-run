// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"img/muteBlack.svg":[function(require,module,exports) {
module.exports = "/muteBlack.21caa077.svg";
},{}],"img/volumeOnBlack.svg":[function(require,module,exports) {
module.exports = "/volumeOnBlack.f401ab79.svg";
},{}],"js/script.js":[function(require,module,exports) {
//CHANGE SCREEN
function setClick(element, destination, callback) {
  document.querySelector(element).addEventListener("click", function () {
    oxo.screens.loadScreen(destination, callback);
  });
} // AUDIO


var muteIcon = require("../img/muteBlack.svg");

var volumeIcon = require("../img/volumeOnBlack.svg");

var soundIcon;

function mute() {
  var audio = document.querySelector(".audio");

  if (audio.muted == false) {
    audio.muted = true;
    soundIcon.style.backgroundImage = "url('" + muteIcon + "')";
  } else {
    audio.muted = false;
    soundIcon.style.backgroundImage = "url('" + volumeIcon + "')";
  }
} // SCREEN


oxo.screens.loadScreen("home", home);

function home() {
  setClick(".homePage__buttonPlay", "game", game);
  setClick(".homePage__buttonHowToPlay", "howToPlay", howToPlay);
  setClick(".buttonCredits", "credits", credits);
}

function game() {
  var character;
  var speedObj = 4;
  var speedJump = 1.2;
  var intervalObj = 3000;
  var intervalJump = speedJump * 1000;
  var intervalBend = speedJump * 1000;
  var characterPosition = 50;
  var invicible = false;
  var score = 0;
  var audio = document.querySelector(".audio");
  soundIcon = document.querySelector(".soundControlIcon");
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 40) {
      e.preventDefault();
    }
  });
  character = document.getElementById("character"); //  Give the ability of moving to the character

  function jump(character) {
    oxo.inputs.listenKey("up", function () {
      if (!character.classList.contains("jump")) {
        character.classList.add("jump");
        setTimeout(function () {
          character.classList.remove("jump");
        }, intervalJump);
      }
    });
    oxo.inputs.listenKey("down", function () {
      if (!character.classList.contains("bend")) {
        character.classList.add("bend");
        setTimeout(function () {
          character.classList.remove("bend");
        }, intervalBend);
      }
    });
  } //    Create an obstacle like a chair, a table or a coffee dropped on the floor


  function createObstacle() {
    var i;
    var obs;
    i = oxo.utils.getRandomNumber(1, 4);

    if (i === 1) {
      obs = oxo.elements.createElement({
        class: "obstacles obstacles__table obstacles__move",
        obstacle: true,
        appendTo: ".try"
      });
      obs.setAttribute("id", "obstacle");
    } else if (i === 2) {
      obs = oxo.elements.createElement({
        class: "obstacles obstacles__chair obstacles__move",
        obstacle: true,
        appendTo: ".try"
      });
      obs.setAttribute("id", "obstacle");
    } else if (i === 3) {
      obs = oxo.elements.createElement({
        class: "obstacles obstacles__coffee obstacles__move",
        obstacle: true,
        appendTo: ".try"
      });
      obs.setAttribute("id", "obstacle");
    } else if (i === 4) {
      obs = oxo.elements.createElement({
        class: "obstacles obstacles__proj obstacles__move",
        obstacle: true,
        appendTo: ".try"
      });
      obs.setAttribute("id", "obstacle");
    }

    oxo.elements.onCollisionWithElement(character, obs, function () {
      // when the obstacle hits James, GAME OVER
      if (invicible === false) {
        oxo.screens.loadScreen("end", function () {
          clearIntervals();
          end();
        });
        obs.remove();
      }
    });
    oxo.elements.onLeaveScreenOnce( //when the obstacle leaves the screen, the div which contains the obstacle is removed
    obs, function () {
      obs.remove();
    }, true);
    obs.style.animationDuration = speedObj + "s";
    character.style.animationDuration = speedJump + "s";
  } // creates an enemy


  function createEnnemy() {
    var e = oxo.elements.createElement({
      class: "ennemy ennemy__move",
      appendTo: ".try",
      obstacle: true
    }); // increase difficulty

    oxo.elements.onCollisionWithElement(character, e, function () {
      if (speedObj > 1) speedObj -= 0.25; // console.log("object takes " + speedObj + "s to get out");

      if (intervalObj >= 500) intervalObj -= 500; // console.log("object takes " + intervalObj + "ms to come");

      if (speedJump >= 0.45) speedJump = speedJump - 0.05; // console.log("jump is set to " + speedJump);

      if (intervalBend >= 450) intervalBend = intervalBend - 50; // console.log("bend is set to " + intervalBend);

      characterPosition = 50;
      character.style.left = characterPosition + "px";
      oxo.player.addToScore(7500);
      score++;

      if (score == 10) {
        oxo.screens.loadScreen("victory", function () {
          clearIntervals();
          victory();
        });
      }

      e.remove();
    });
  }

  function createBonusWater() {
    var bonus;
    bonus = oxo.elements.createElement({
      class: "bonus bonus__move bonus--water",
      appendTo: ".try",
      obstacle: true
    });
    oxo.elements.onLeaveScreenOnce(bonus, function () {
      bonus.remove();
    }, true);
    oxo.elements.onCollisionWithElement(character, bonus, function () {
      bonus.remove();

      if (characterPosition <= 350) {
        characterPosition += 100;
        character.style.left = characterPosition + "px";
      }
    });
  }

  function createBonusBirdies() {
    var bonus;
    bonus = oxo.elements.createElement({
      class: "bonus bonus__move bonus--birdies",
      appendTo: ".try",
      obstacle: true
    });
    oxo.elements.onLeaveScreenOnce(bonus, function () {
      bonus.remove();
    }, true);
    oxo.elements.onCollisionWithElement(character, bonus, function () {
      bonus.remove();
      invicible = true;
      character.classList.add("invicible");
      setTimeout(function () {
        invicible = false;
        character.classList.remove("invicible");
      }, 5000);
    });
  }

  function setScore() {
    oxo.player.setScore(0);
  }

  function clearIntervals() {
    clearInterval(intervalObstacle);
    clearInterval(intervalEnnemy);
    clearInterval(intervalBonusWater);
    clearInterval(intervalBonusBirdies);
  }

  createEnnemy();
  jump(character);
  var intervalObstacle = setInterval(createObstacle, intervalObj);
  var intervalEnnemy = setInterval(createEnnemy, 30000);
  var intervalBonusWater = setInterval(createBonusWater, 7000);
  var intervalBonusBirdies = setInterval(createBonusBirdies, 20000);
  setScore();
  audio.play();
  soundIcon.addEventListener("click", function () {
    mute();
  });
  setClick(".homePageIcon--gamePage", "home", home);
  setClick(".try__restartIcon", "game", game);
}

function end() {
  setClick(".endGame__buttonRestart", "game", game);
  setClick(".homePageIcon", "home", home);
  document.getElementById("result").innerHTML = "Score : " + oxo.player.getScore() + "$ / 75 000$<br />Level : " + oxo.player.getScore() / 7500 + " / 10"; //récupère l'id du span, et ajoute le texte avec innerHtml
}

function credits() {
  setClick(".homePageIcon", "home", home);
}

function howToPlay() {
  setClick(".homePageIcon", "home", home);
  setClick(".buttonCredits", "credits", credits);
}

function victory() {
  setClick(".victory__buttonRestart", "game", game);
  setClick(".homePageIcon", "home", home);
}
},{"../img/muteBlack.svg":"img/muteBlack.svg","../img/volumeOnBlack.svg":"img/volumeOnBlack.svg"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51177" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map