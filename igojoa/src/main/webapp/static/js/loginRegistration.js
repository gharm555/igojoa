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

const $UsersId = document.querySelector("#UsersId");
const $password = document.querySelector("#password");
const $email = document.querySelector("#email");
const $phoneNumber = document.querySelector("#phoneNumber");
const $nickName = document.querySelector("#nickName");
const $fileInput = document.querySelector("#profile-input");
const $registerBtn = document.querySelector("#registerBtn");
const $registerForm = document.querySelector("#registerForm");

$registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  register();
});

function register() {
  const formData = new FormData($registerForm);
  const UsersData = {
    UsersId: $UsersId.value,
    password: $password.value,
    email: $email.value,
    phoneNumber: $phoneNumber.value,
    nickName: $nickName.value,
  };
  if (
    !UsersData.UsersId ||
    !UsersData.password ||
    !UsersData.email ||
    !UsersData.phoneNumber ||
    !UsersData.nickName
  ) {
    //TODO: alert 창 모달로 바꾸기
    alert("모든 항목을 입력해주세요.");
    return;
  }
  formData.append("Users", JSON.stringify(UsersData));
  formData.append("file", $fileInput.files[0]);

  axios
    .post("./register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      //TODO: alert 창 모달로 바꾸기
      alert("회원가입 성공");
      $UsersId.value = "";
      $password.value = "";
      $email.value = "";
      $phoneNumber.value = "";
      $nickName.value = "";
      $body.classList.remove("slide");
    })
    .catch((err) => {
      console.log(err);
      //TODO: alert 창 모달로 바꾸기
      alert("회원가입 실패");
      $UsersId.value = "";
      $password.value = "";
      $email.value = "";
      $phoneNumber.value = "";
      $nickName.value = "";
    });
}
