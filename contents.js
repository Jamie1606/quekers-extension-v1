let text = [];

const inputs = document.querySelectorAll("input[type='text'], textarea");
const animationElement = document.createElement("div");
animationElement.classList.add("animation-element");
animationElement.id = "animationElement";

const styleElement = document.createElement("style");
styleElement.textContent = `
  #animationElement {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: green; /* Adjust as needed */
    color: white;
    padding: 5px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out; /* Animation duration and easing */
  }
`;

// Append the style element to the document head
document.head.appendChild(styleElement);

function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function translate(index, value) {
  text[index] = value;
  fetch("http://localhost:3000/api/duck/generateWord", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentence: text[index] }),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      inputs[index].value = result.sentence;
    })
    .catch((error) => {
      console.error(error);
    });
  // inputs[index].value = "HELLO";
}

const debouncedTranslate = debounce((index, value) => translate(index, value));

inputs.forEach((input, index) => {
  input.appendChild(animationElement);
  input.addEventListener("input", (event) => {
    if (event.target.value.trim().length > 0) {
      animationElement.style.opacity = "1";
    } else {
      animationElement.style.opacity = "0";
    }
    debouncedTranslate(index, event.target.value);
  });
});

// chrome.runtime.onMessage.addListener((obj, sender, response) => {
//   const { type } = obj;
//   if (type === "CHANGE TEXT") {
//     inputs.forEach((input) => {
//       input.value = "HELLO WORLD";
//     });
//   }
// });