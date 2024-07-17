// 알림 모달 요소
const $alertModal = new bootstrap.Modal(document.getElementById("alertModal"));
const $alertModalBody = document.getElementById("alertModalBody");

// 알림 모달 표시 함수
function showAlert(message) {
  $alertModalBody.textContent = message;
  $alertModal.show();
}

// 로그인 & 회원가입 전환 버튼
const $signinBtn = document.querySelector(".signinBtn");
const $signupBtn = document.querySelector(".signupBtn");
const $body = document.querySelector("body");

// 메시지 요소들
const $loginCheckMessage = document.querySelector("#login-check-message");
const $registerCheckMessage = document.querySelector("#register-check-message");
const $$registerMessage = document.querySelectorAll(".invalid-feedback");

// 로그인 폼 요소들
const $loginForm = document.querySelector("#loginForm");
const $loginId = document.querySelector("#loginId");
const $loginPassword = document.querySelector("#loginPassword");

// 회원가입 폼 요소들
const $userId = document.querySelector("#userId");
const $password = document.querySelector("#password");
const $passwordConfirm = document.querySelector("#password-confirm");
const $email = document.querySelector("#email");
const $phone1 = document.querySelector("#phone1");
const $phone2 = document.querySelector("#phone2");
const $phone3 = document.querySelector("#phone3");
const $nickName = document.querySelector("#nickName");
const $profileLabel = document.querySelector("#profile-input");
const $profileImg = document.querySelector("#register-profileimg");
const $registerForm = document.querySelector("#registerForm");
const $registerBtn = document.querySelector("#registerBtn");

// 로그인&회원가입 폼 전환
$signupBtn.onclick = function () {
  $body.classList.add("slide");
  clearText();
};

$signinBtn.onclick = function () {
  $body.classList.remove("slide");
  clearText();
};

// 로그인&회원가입 폼 입력값 및 메시지 초기화
function clearText() {
  // Clear messages
  $loginCheckMessage.style.display = "none";
  $$registerMessage.forEach((message) => {
    message.style.display = "none";
  });
  $registerCheckMessage.style.display = "none";

  $userId.value = "";
  $password.value = "";
  $passwordConfirm.value = "";
  $email.value = "";
  $nickName.value = "";
  $phone1.value = "";
  $phone2.value = "";
  $phone3.value = "";
  $profileImg.src = defaultImageUrl;

  $loginId.value = "";
  $loginPassword.value = "";
}

// 프로필 사진 등록
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

// 로그인버튼 이벤트 리스너
$loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});

// 로그인 처리
function login() {
  $loginCheckMessage.style.display = "none";

  if (!$loginId.value) {
    $loginCheckMessage.textContent = "아이디를 입력해주세요";
    $loginCheckMessage.style.display = "block";
    return;
  }

  if (!$loginPassword.value) {
    $loginCheckMessage.textContent = "비밀번호를 입력해주세요";
    $loginCheckMessage.style.display = "block";
    return;
  }

  // URL 쿼리 파라미터 읽어오는 역할
  const target = new URLSearchParams(window.location.search).get("target") || "";

  axios
    .post("./login", null, {
      params: {
        userId: $loginId.value,
        password: $loginPassword.value,
        target: target,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      if (response.data.success) {
        console.log(response.data.pointsMessage);

        if (response.data.target) {
          window.location.href = response.data.target;
        } else {
          window.location.href = contextPath + "/";
        }
      } else {
        $loginCheckMessage.innerHTML =
          "아이디 또는 비밀번호를 잘못 입력했습니다.<br>입력하신 내용을 다시 확인해주세요.";
        $loginCheckMessage.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("로그인 오류:", error);
      showAlert("로그인 처리 중 오류가 발생했습니다.");
    });
}

// 회원가입 버튼 이벤트 리스너
$registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  register();
});

// 회원가입 처리
function register() {
  let valid = true;

  $$registerMessage.forEach((message) => {
    if (message.style.display === "block") {
      valid = false;
    }
  });

  if (!valid) {
    $registerCheckMessage.textContent = "입력정보를 확인해주세요";
    $registerCheckMessage.style.display = "block";
    return;
  }

  const formData = new FormData($registerForm);
  const userData = {
    userId: $userId.value,
    password: $password.value,
    email: $email.value,
    phoneNumber: $phone1.value + $phone2.value + $phone3.value,
    nickName: $nickName.value,
  };

  if (!userData.userId || !userData.password || !userData.email || !userData.phoneNumber || !userData.nickName) {
    $registerCheckMessage.textContent = "입력정보를 확인해주세요";
    $registerCheckMessage.style.display = "block";

    return;
  }
  formData.append("user", JSON.stringify(userData));
  formData.append("file", $profileLabel.files[0]);

  axios
    .post("./register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      showAlert("회원가입 성공");
      clearText();
      $body.classList.remove("slide");
    })
    .catch((err) => {
      console.log(err);
      showAlert("회원가입 실패");
      clearText();
    });
}

// 회원가입 중복, 유효성 검사
function validateInput(type, value) {
  let $messageElement = null;
  let errorMessage = "";
  let uri = "";

  
  const hasWhitespace = /\s/.test(value);
  
  if (hasWhitespace) {
    errorMessage = "공백이 포함되어서는 안됩니다.";
  }
  
  if (value === "") {
    errorMessage = "";
  }
  
  switch (type) {
    case "userId":
      const userId = value.trim();
      $messageElement = document.querySelector("#id-check-message");
      if (!errorMessage) {
        uri = `./checkUserId?userId=${userId}`;
        axios
          .get(uri)
          .then((response) => {
            if (!response.data) {
              errorMessage = "이미 존재하는 아이디 입니다";
            }
            displayValidationMessage($messageElement, errorMessage);
          })
          .catch((error) => console.log(error));
      } else {
        displayValidationMessage($messageElement, errorMessage);
      }
      break;
    case "password":
      $messageElement = document.querySelector("#password-check-message");
      const passwordPattern = /^(?=.*[0-9]).{8,11}$/;
      if (!passwordPattern.test(value.trim())) {
        errorMessage = "8자리 이상 12자리 미만, 숫자가 포함된 비밀번호로 해주세요.";
      }
      displayValidationMessage($messageElement, errorMessage);
      break;
    case "password-confirm":
      $messageElement = document.querySelector("#password-confirm-check-message");
      const password = document.querySelector("#password").value.trim();
      if (value !== password) {
        errorMessage = "비밀번호가 일치하지 않습니다.";
      }
      displayValidationMessage($messageElement, errorMessage);
      break;
    case "nickName":
      const nickName = value.trim();
      $messageElement = document.querySelector("#nickname-check-message");
      if (!errorMessage) {
        uri = `./checkNickName?nickName=${nickName}`;
        axios
          .get(uri)
          .then((response) => {
            if (!response.data) {
              errorMessage = "이미 존재하는 닉네임 입니다";
            }
            displayValidationMessage($messageElement, errorMessage);
          })
          .catch((error) => console.log(error));
      } else {
        displayValidationMessage($messageElement, errorMessage);
      }
      break;
    case "email":
      $messageElement = document.querySelector("#email-check-message");
      const email = value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errorMessage = "유효하지 않은 이메일입니다.";
        displayValidationMessage($messageElement, errorMessage);
      } else if (!errorMessage) {
        uri = `./checkEmail?email=${email}`;
        axios
          .get(uri)
          .then((response) => {
            if (!response.data) {
              errorMessage = "이미 존재하는 이메일 입니다";
            }
            displayValidationMessage($messageElement, errorMessage);
          })
          .catch((error) => console.log(error));
      } else {
        displayValidationMessage($messageElement, errorMessage);
      }
      break;
    case "phone":
      $messageElement = document.querySelector("#phone-check-message");
      const phonePattern = /^[0-9]{3,4}$/;
      const phone1 = document.querySelector("#phone1").value.trim();
      const phone2 = document.querySelector("#phone2").value.trim();
      const phone3 = document.querySelector("#phone3").value.trim();

      // 모든 필드가 비어있으면 메시지를 표시하지 않음
      if (phone1 === "" && phone2 === "" && phone3 === "") {
        displayValidationMessage($messageElement, "");
        return;
      }

      // 하나라도 비어있으면 오류 메시지 표시
      if (phone1 === "" || phone2 === "" || phone3 === "") {
        errorMessage = "전화번호를 모두 입력해주세요.";
        displayValidationMessage($messageElement, errorMessage);
        return;
      }

      if (!phonePattern.test(phone1) || !phonePattern.test(phone2) || !phonePattern.test(phone3)) {
        errorMessage = "유효하지 않은 전화번호입니다.";
        displayValidationMessage($messageElement, errorMessage);
      } else if (!errorMessage) {
        uri = `./checkPhoneNumber?phone1=${phone1}&phone2=${phone2}&phone3=${phone3}`;
        axios
          .get(uri)
          .then((response) => {
            if (!response.data) {
              errorMessage = "이미 존재하는 전화번호 입니다";
            }
            displayValidationMessage($messageElement, errorMessage);
          })
          .catch((error) => console.log(error));
      } else {
        displayValidationMessage($messageElement, errorMessage);
      }
      break;
  }
  // 입력창 메시지 초기화
  if (value === "") {
    displayValidationMessage($messageElement, "");
  }
}
// 입력창 메시지 초기화 기능
function displayValidationMessage(element, message) {
  if (message === "") {
    element.style.display = "none";
  } else {
    element.textContent = message;
    element.style.display = "block";
  }
}

// 회원가입 메시지 초기화
document.querySelectorAll("#registerForm input").forEach((input) => {
  input.addEventListener("input", () => {
    $registerCheckMessage.style.display = "none";

    // 전화번호 입력 필드인 경우
    if (input.id === "phone1" || input.id === "phone2" || input.id === "phone3") {
      const $phoneCheckMessage = document.querySelector("#phone-check-message");
      $phoneCheckMessage.style.display = "none";
    }
  });
});

// 전화번호 입력 필드에 대한 개별 이벤트 리스너 추가
const phoneInputs = [
  document.querySelector("#phone1"),
  document.querySelector("#phone2"),
  document.querySelector("#phone3"),
];

phoneInputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateInput("phone", input.value);
  });
});

// 아이디 찾기 요소
const $verifyUserIdBtn = document.querySelector("#verifyUserIdBtn");
const $findUserIdModal = document.querySelector("#findUserIdModal");
const $findUserIdModalLabel = document.querySelector("#findUserIdModalLabel");
const $findUserIdMessage = document.querySelector("#findUserIdMessage");
const $findUserIdModalContent = $findUserIdModal.querySelector("#findUserIdModalBody");
const findUserIdOriginalModalContent = $findUserIdModalContent.innerHTML;
const $findUserIdModalFooter = $findUserIdModal.querySelector("#findUserIdModalFooter");
// 모달이 열릴 때 폼을 표시
$findUserIdModal.addEventListener("show.bs.modal", showFindUserIdForm);

// 아이디 찾기
function findUserId() {
  const $findEmail = document.querySelector("#emailForFindUserId");
  const $findNickName = document.querySelector("#nickNameForFindUserId");
  const $findUserIdMessage = document.querySelector("#findUserIdMessage");

  axios
    .post("./findUserId", null, {
      params: {
        email: $findEmail.value,
        nickName: $findNickName.value,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data === "입력하신 정보를 확인해 주세요.") {
        $findUserIdMessage.textContent = "본인인증을 실패했습니다";
        $findUserIdMessage.style.display = "block";
      } else {
        showFoundUserId(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.data) {
        $findUserIdMessage.textContent = err.response.data;
      } else {
        $findUserIdMessage.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
      }
      $findUserIdMessage.style.display = "block";
    });
}

// 아이디 찾기 모달 생성
function showFindUserIdForm() {
  $findUserIdModalContent.innerHTML = `
    <input type="email" name="email" id="emailForFindUserId" class="form-control" placeholder="이메일을 입력해 주세요" />
    <input type="text" name="nickName" id="nickNameForFindUserId" class="form-control mt-2" placeholder="닉네임을 입력해 주세요" />
    <label id="findUserIdMessage" class="invalid-feedback" style="display: none"></label>
  `;
  $findUserIdModalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
    <button type="button" id="verifyUserIdBtn" class="btn btn-primary" disabled>확인</button>
  `;

  const $emailForFindUserId = document.querySelector("#emailForFindUserId");
  const $nickNameForFindUserId = document.querySelector("#nickNameForFindUserId");
  const $findUserIdMessage = document.querySelector("#findUserIdMessage");

  // 입력창이 비어있을때 확인창 비활성화
  function validateFindUserIdForm() {
    if ($emailForFindUserId.value !== "" && $nickNameForFindUserId.value !== "") {
      document.getElementById("verifyUserIdBtn").disabled = false;
    } else {
      document.getElementById("verifyUserIdBtn").disabled = true;
    }
  }

  // 입력시 메시지 숨김
  $emailForFindUserId.addEventListener("input", () => {
    validateFindUserIdForm();
    $findUserIdMessage.style.display = "none"; // Hide the message on input change
  });
  $nickNameForFindUserId.addEventListener("input", () => {
    validateFindUserIdForm();
    $findUserIdMessage.style.display = "none"; // Hide the message on input change
  });

  // 확인 버튼에 이벤트 리스너 추가
  document.getElementById("verifyUserIdBtn").addEventListener("click", findUserId);
}

// 아이디 찾기 결과 모달
function showFoundUserId(userId) {
  const $emailForFindUserId = document.querySelector("#emailForFindUserId");
  const $nickNameForFindUserId = document.querySelector("#nickNameForFindUserId");
  const $findUserIdMessage = document.querySelector("#findUserIdMessage");
  if ($emailForFindUserId.value === "" || $nickNameForFindUserId.value === "") {
    $findUserIdMessage.textContent = "";
  }

  $findUserIdModalContent.innerHTML = `
    <h3 class="text-center">회원님의 아이디는</h3>
    <p class="text-center font-weight-bold">${userId} 입니다.</p>
  `;
  $findUserIdModalFooter.innerHTML = `
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
  `;
}
// 모달이 닫힐 때 원래 내용으로 복원
$findUserIdModal.addEventListener("hidden.bs.modal", function () {
  $findUserIdModalContent.innerHTML = findUserIdOriginalModalContent;
  $findUserIdMessage.style.display = "none";
});

// 비밀번호 찾기
const $findPasswordBtn = document.querySelector("#findPasswordBtn");
const $findPasswordModal = document.querySelector("#findPasswordModal");
const $findPasswordModalLabel = document.querySelector("#findPasswordModalLabel");
const $findPasswordModalContent = document.querySelector("#findPasswordModalBody");
const findPasswordOriginalModalContent = $findPasswordModalContent.innerHTML;
const $findPasswordModalFooter = document.querySelector("#findPasswordModalFooter");
const $findPasswordMessage = document.querySelector("#findPasswordMessage");
const $findPasswordForm = document.querySelector("#findPasswordForm");
const $findPasswordUserId = document.querySelector("#userIdForFindPassword");
const $findPasswordEmail = document.querySelector("#emailForFindPassword");
const $findPasswordNickName = document.querySelector("#nickNameForFindPassword");
const $verifyPasswordBtn = document.querySelector("#verifyPasswordBtn");
$findPasswordModal.addEventListener("show.bs.modal", showFindPasswordForm);

// 모달이 열릴 때 폼을 표시
$findPasswordModal.addEventListener("show.bs.modal", showFindPasswordForm);

function showFindPasswordForm() {
  $findPasswordModalContent.innerHTML = `
    <input type="text" name="userId" id="userIdForFindPassword" class="form-control" placeholder="아이디를 입력해 주세요" />
    <input type="email" name="email" id="emailForFindPassword" class="form-control mt-2" placeholder="이메일을 입력해 주세요" />
    <input type="text" name="nickName" id="nickNameForFindPassword" class="form-control mt-2" placeholder="닉네임을 입력해 주세요" />
    <label id="findPasswordMessage" class="invalid-feedback" style="display: none"></label>
  `;
  $findPasswordModalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
    <button type="button" id="verifyPasswordBtn" class="btn btn-primary" disabled>확인</button>
  `;

  const $findPasswordUserId = document.querySelector("#userIdForFindPassword");
  const $findPasswordEmail = document.querySelector("#emailForFindPassword");
  const $findPasswordNickName = document.querySelector("#nickNameForFindPassword");
  const $findPasswordMessage = document.querySelector("#findPasswordMessage");

  function validateFindUserPasswordForm() {
    if ($findPasswordUserId.value !== "" && $findPasswordEmail.value !== "" && $findPasswordNickName.value !== "") {
      document.querySelector("#verifyPasswordBtn").disabled = false;
    } else {
      document.querySelector("#verifyPasswordBtn").disabled = true;
    }
  }

  $findPasswordUserId.addEventListener("input", () => {
    validateFindUserPasswordForm();
    $findPasswordMessage.style.display = "none"; // Hide the message on input change
  });
  $findPasswordEmail.addEventListener("input", () => {
    validateFindUserPasswordForm();
    $findPasswordMessage.style.display = "none"; // Hide the message on input change
  });
  $findPasswordNickName.addEventListener("input", () => {
    validateFindUserPasswordForm();
    $findPasswordMessage.style.display = "none"; // Hide the message on input change
  });

  // 확인 버튼에 이벤트 리스너 추가
  document.getElementById("verifyPasswordBtn").addEventListener("click", verifyUserForPasswordReset);
}

function verifyUserForPasswordReset() {
  const $findUserId = document.querySelector("#userIdForFindPassword");
  const $findEmail = document.querySelector("#emailForFindPassword");
  const $findNickName = document.querySelector("#nickNameForFindPassword");
  const $findPasswordMessage = document.querySelector("#findPasswordMessage");

  axios
    .post("./verifyUser", null, {
      params: {
        userId: $findUserId.value,
        email: $findEmail.value,
        nickName: $findNickName.value,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data === true) {
        showPasswordResetForm($findUserId.value);
      } else {
        $findPasswordMessage.textContent = "본인인증을 실패했습니다.";
        $findPasswordMessage.style.display = "block";
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.data) {
        $findPasswordMessage.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
      } else {
        $findPasswordMessage.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
      }
      $findPasswordMessage.style.display = "block";
    });
}

function showPasswordResetForm(userId) {
  $findPasswordModalContent.innerHTML = `
    <input type="password" name="newPassword" id="newPassword" class="form-control" placeholder="새 비밀번호를 입력해 주세요" />
    <label id="resetPasswordInvalidMessage" class="invalid-feedback" style="display: none"></label>
    <input type="password" name="confirmNewPassword" id="confirmNewPassword" class="form-control mt-2" placeholder="새 비밀번호를 다시 입력해 주세요" />
    <label id="resetPasswordConfirmMessage" class="invalid-feedback" style="display: none"></label>
  `;
  $findPasswordModalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
    <button type="button" id="resetPasswordBtn" class="btn btn-primary">비밀번호 변경</button>
  `;

  // 비밀번호 변경 버튼에 이벤트 리스너 추가
  document.getElementById("resetPasswordBtn").addEventListener("click", () => resetPassword(userId));
}

function resetPassword(userId) {
  const $newPassword = document.querySelector("#newPassword");
  const $confirmNewPassword = document.querySelector("#confirmNewPassword");
  const $resetPasswordInvalidMessage = document.querySelector("#resetPasswordInvalidMessage");
  const $resetPasswordConfirmMessage = document.querySelector("#resetPasswordConfirmMessage");
  const passwordPattern = /^(?=.*[0-9]).{8,11}$/; // 여기 바꾼거임 07-12오전

  let valid = true;

  $resetPasswordInvalidMessage.style.display = "none";
  $resetPasswordConfirmMessage.style.display = "none";

  if (!passwordPattern.test($newPassword.value)) {
    $resetPasswordInvalidMessage.textContent = "8자리 이상 12자리 미만, 숫자가 포함된 비밀번호로 해주세요"; // 메시지 바꾼거임 07-12
    $resetPasswordInvalidMessage.style.display = "block";
    valid = false;
  }

  if ($newPassword.value !== $confirmNewPassword.value) {
    $resetPasswordConfirmMessage.textContent = "비밀번호가 일치하지 않습니다.";
    $resetPasswordConfirmMessage.style.display = "block";
    valid = false;
  }

  if (!valid) {
    return;
  }

  axios
    .post("./updatePassword", null, {
      params: {
        userId: userId,
        password: $newPassword.value,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      showAlert("비밀번호가 성공적으로 변경되었습니다.");
      $findPasswordModal.querySelector('[data-bs-dismiss="modal"]').click();
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        $resetPasswordInvalidMessage.textContent = err.response.data;
      } else {
        $resetPasswordInvalidMessage.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
      }
      $resetPasswordInvalidMessage.style.display = "block";
    });
}

$findPasswordModal.addEventListener("hidden.bs.modal", function () {
  $findPasswordModalContent.innerHTML = findPasswordOriginalModalContent;
  $findPasswordMessage.style.display = "none";
});

// Hide the register check message when the user starts typing
document.querySelectorAll("#registerForm input").forEach((input) => {
  input.addEventListener("input", () => {
    $registerCheckMessage.style.display = "none";
  });
});

// Hide the login check message when the user starts typing
document.querySelectorAll("#loginForm input").forEach((input) => {
  input.addEventListener("input", () => {
    $loginCheckMessage.style.display = "none";
  });
});
// 반응형 로그인창
document.addEventListener("DOMContentLoaded", function () {
  const $signinForm = document.querySelector(".signinform");
  const $signupForm = document.querySelector(".signupform");

  function createSwitchFormButton(text, buttonText) {
    const container = document.createElement("div");
    container.classList.add("switch-form-container");

    const switchText = document.createElement("span");
    switchText.textContent = text;
    switchText.classList.add("switch-form-text");

    const switchBtn = document.createElement("button");
    switchBtn.textContent = buttonText;
    switchBtn.classList.add("switch-form-btn");

    container.appendChild(switchText);
    container.appendChild(switchBtn);

    return { container, switchBtn };
  }

  const { container: signupContainer, switchBtn: switchToSignup } = createSwitchFormButton(
    "계정이 없으신가요?",
    "회원가입"
  );
  const { container: signinContainer, switchBtn: switchToSignin } = createSwitchFormButton(
    "계정이 이미 있으신가요?",
    "로그인"
  );

  function toggleForm() {
    $signinForm.classList.toggle("active");
    $signupForm.classList.toggle("active");
    clearText();
  }

  switchToSignup.addEventListener("click", toggleForm);
  switchToSignin.addEventListener("click", toggleForm);

  function updateFormLayout() {
    if (window.innerWidth <= 390 || window.innerWidth <= 420) {
      if (!$signinForm.contains(signupContainer)) {
        $signinForm.appendChild(signupContainer);
        $signupForm.appendChild(signinContainer);
      }
      // 현재 활성화된 레이아웃 상태를 유지
      if (!$signinForm.classList.contains("active") && !$signupForm.classList.contains("active")) {
        $signinForm.classList.add("active");
        $signupForm.classList.remove("active");
      }
    } else {
      signupContainer.remove();
      signinContainer.remove();
      // 현재 활성화된 레이아웃 상태를 유지
      if ($signinForm.classList.contains("active") || $signupForm.classList.contains("active")) {
        $signinForm.classList.remove("active");
        $signupForm.classList.remove("active");
      }
    }
  }

  updateFormLayout();
  window.addEventListener("resize", updateFormLayout);
});
