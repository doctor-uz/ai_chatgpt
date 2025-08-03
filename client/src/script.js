import bot from "../assets/bot.svg";
import user from "../assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

//Three dot loader function
function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

//Function to display the chat message
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

//Function to generate a unique ID for each chat message
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

//chatStripe function to create chat message elements
function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi && "ai"}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? bot : user}" alt="${isAi ? "bot" : "user"}" />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
  `;
}

//Event listener for form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  //User chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  //Bot chat stripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  // //Fetch response from server
  // const response = await fetch("https://codex-ai.onrender.com/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     prompt: data.get("prompt"),
  //   }),
  // });

  // clearInterval(loadInterval);
  // messageDiv.innerHTML = "";

  // if (response.ok) {
  //   const data = await response.json();
  //   const parsedData = data.bot.trim();

  //   typeText(messageDiv, parsedData);
  // } else {
  //   const err = await response.text();
  //   messageDiv.innerHTML = "Something went wrong";
  //   alert(err);
  // }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
