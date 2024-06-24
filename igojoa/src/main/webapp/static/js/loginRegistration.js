const $signinBtn = document.querySelector(".signinBtn");
const $signupBtn = document.querySelector(".signupBtn");
const $body = document.querySelector("body");

$signupBtn.onclick = function () {
  $body.classList.add("slide");
};
$signinBtn.onclick = function () {
  $body.classList.remove("slide");
};

function previewImage(event) {
  const input = event.target;
  const reader = new FileReader();

  reader.onload = function () {
    const dataURL = reader.result;
    const img = document.querySelector("#register-profileimg");
    img.src = dataURL;
  };

  reader.readAsDataURL(input.files[0]);
}



