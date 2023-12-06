// paths to emojis
const emojiImgs = {
  happy: "figures/grinning-face.png",
  sad: "figures/crying-face.png",
  shocked: "figures/shocked-face.png",
  hangry: "figures/hangry-face.png",
  scared: "figures/scared-face.png",
};

/**
 * Main
 */
doMood();

/**
 * Make a fake web request to get David's current mood. Upon receiving
 * failures, the function should retry up to 3 times.
 */
async function doMood() {
  let attempts = 0;
  while (attempts < 3) {
    try {
      let result = await fakeMoodRequest();
      let img = document.createElement("img");
      img.src = emojiImgs[result];
      img.alt = result;

      let div = document.querySelector("#imgPlaceholder");
      div.innerHTML = "";
      div.appendChild(img);
      attempts = 3; // don't attempt again
    } catch (error) {
      attempts++;
      if (attempts == 3) {
        let div = document.querySelector("#imgPlaceholder");
        div.innerHTML = error;
      }
    }
  }
}

// Instead of doMood(), the code below will attempt 3 times too,
// but it's really ugly!
// getDavidsMood()
//   .then(function (resultFromThread) {
//     let img = document.createElement("img");
//     img.src = emojiImgs[resultFromThread];
//     img.alt = resultFromThread;

//     let div = document.querySelector("#imgPlaceholder");
//     div.appendChild(img);
//   })
//   .catch(function (errorMessageFromThread) {
//     console.log("second attempt");
//     getDavidsMood()
//       .then(function (resultFromThread) {
//         let img = document.createElement("img");
//         img.src = emojiImgs[resultFromThread];
//         img.alt = resultFromThread;

//         let div = document.querySelector("#imgPlaceholder");
//         div.appendChild(img);
//       })
//       .catch(function (errorMessageFromThread) {
//         console.log("third attempt");
//         getDavidsMood()
//           .then(function (resultFromThread) {
//             let img = document.createElement("img");
//             img.src = emojiImgs[resultFromThread];
//             img.alt = resultFromThread;

//             let div = document.querySelector("#imgPlaceholder");
//             div.appendChild(img);
//           })
//           .catch(function (errorMessageFromThread) {
//             let div = document.querySelector("#imgPlaceholder");
//             div.innerHTML = errorMessageFromThread;
//           });
//       });
//   });

/**
 * This function will simulate fetching David's current Mood from the internet
 * There will be a random delay up to 3 seconds, followed by an (fake) "attempt"
 * to fetch David's mood. In this "attempt", there is a 20% chance that it rejects
 * with the message "unavailable". If it successfully fetches, then one of
 * ["hangry", "sad", "shocked", "happy", "scared"] will be resolved.
 *
 * @returns a Promise object that encapsulates this data fetch
 */
function fakeMoodRequest() {
  return new Promise(function (resolve, reject) {
    let delay = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      // this is the code that runs after the delay
      if (Math.random() < 0.2) {
        reject("service unavailable");
      } else {
        const moods = ["hangry", "sad", "shocked", "happy", "scared"];
        resolve(moods[Math.floor(Math.random() * moods.length)]);
      }
    }, delay);
  });
}
