const $signinBtn = document.querySelector('.signinBtn');
const $signupBtn = document.querySelector('.signupBtn');
const $body = document.querySelector('body');

$signupBtn.onclick = function () {
  $body.classList.add('slide');
};
$signinBtn.onclick = function () {
  $body.classList.remove('slide');
};

function previewImage(event) {
  const input = event.target;
  const reader = new FileReader();

  reader.onload = function () {
    const dataURL = reader.result;
    const img = document.querySelector('#register-profileimg');
    img.src = dataURL;
  };

  reader.readAsDataURL(input.files[0]);
}

// 로그인 
const $loginBtn = document.querySelector('#loginBtn');


// 회원가입
const $userId = document.querySelector('#userId');
const $password = document.querySelector('#password');
const $email = document.querySelector('#email');
const $phone1 = document.querySelector('#phone1');
const $phone2 = document.querySelector('#phone2');
const $phone3 = document.querySelector('#phone3');
const $nickName = document.querySelector('#nickName');
const $fileInput = document.querySelector('#profile-input');
const $registerBtn = document.querySelector('#registerBtn');
const $registerForm = document.querySelector('#registerForm');


$loginForm.add


$registerForm.addEventListener('submit', function (event) {
  event.preventDefault();
  register();
});


function register() {
  const formData = new FormData($registerForm);
  const userData = {
    userId: $userId.value,
    password: $password.value,
    email: $email.value,
    phoneNumber: $phone1.value + $phone2.value + $phone3.value,
    nickName: $nickName.value,
  };
  console.log(userData);
  if (!userData.userId || !userData.password || !userData.email || !userData.phoneNumber || !userData.nickName) {
    //TODO: alert 창 모달로 바꾸기
    alert('모든 항목을 입력해주세요.');
    return;
  }
  formData.append('user', JSON.stringify(userData));
  formData.append('file', $fileInput.files[0]);

  axios
    .post('./register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res);
      //TODO: alert 창 모달로 바꾸기
      alert('회원가입 성공');
      $userId.value = '';
      $password.value = '';
      $email.value = '';
      $nickName.value = '';
      $phone1.value = '';
      $phone2.value = '';
      $phone3.value = '';
      $body.classList.remove('slide');
    })
    .catch((err) => {
      console.log(err);
      //TODO: alert 창 모달로 바꾸기
      alert('회원가입 실패');
      $userId.value = '';
      $password.value = '';
      $email.value = '';
      $nickName.value = '';
      $phone1.value = '';
      $phone2.value = '';
      $phone3.value = '';
    });
}

// 회원가입 중복, 유효성 검사
function validateInput(type, value) {
  let $messageElement = null;
  let errorMessage = '';
  let uri = '';

  if (value === '') {
    errorMessage = '';
  }

  switch (type) {
    // 아이디 입력값
    case 'userId':
      const userId = value;
      $messageElement = document.querySelector('#id-check-message');
      uri = `./checkUserId?userId=${userId}`;
      axios
        .get(uri)
        .then((response) => {
          console.log(response.data);
          if (!response.data) {
            errorMessage = '이미 존재하는 아이디 입니다';
          }
          displayValidationMessage($messageElement, errorMessage);
        })
        .catch((error) => console.log(error));

      break;
    case 'password':
      $messageElement = document.querySelector('#password-check-message');
      const passwordPattern = /^(?=.*[0-9]).{8,}$/;
      if (!passwordPattern.test(value)) {
        errorMessage = '유효하지 않은 비밀번호 입니다. 8자 이상으로 입력해주세요.';
      }
      displayValidationMessage($messageElement, errorMessage);
      break;
    case 'password-confirm':
      $messageElement = document.querySelector('#password-confirm-check-message');
      const password = document.querySelector('#password').value;
      if (value !== password) {
        errorMessage = '비밀번호가 일치하지 않습니다.';
      }
      displayValidationMessage($messageElement, errorMessage);
      break;
    case 'nickName':
      const nickName = value;
      $messageElement = document.querySelector('#nickname-check-message');
      uri = `./checkNickName?nickName=${nickName}`;
      axios
        .get(uri)
        .then((response) => {
          if (!response.data) {
            errorMessage = '이미 존재하는 닉네임 입니다';
          }
          displayValidationMessage($messageElement, errorMessage);
        })
        .catch((error) => console.log(error));
      break;
    case 'email':
      $messageElement = document.querySelector('#email-check-message');
      const email = value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      uri = `./checkEmail?email=${email}`;
      if (!emailPattern.test(email)) {
        errorMessage = '유효하지 않은 이메일입니다.';
        displayValidationMessage($messageElement, errorMessage);
      } else {
        axios
          .get(uri)
          .then((response) => {
            if (!response.data) {
              errorMessage = '이미 존재하는 이메일 입니다';
            }
            displayValidationMessage($messageElement, errorMessage);
          })
          .catch((error) => console.log(error));
      }
      break;
    case 'phone':
      $messageElement = document.querySelector('#phone-check-message');
      const phonePattern = /^[0-9]{3,4}$/;
      const phone1 = document.querySelector('#phone1').value;
      const phone2 = document.querySelector('#phone2').value;
      const phone3 = document.querySelector('#phone3').value;
      uri = `./checkPhoneNumber?phone1=${phone1}&phone2=${phone2}&phone3=${phone3}`;
      if (!phonePattern.test(phone1) || !phonePattern.test(phone2) || !phonePattern.test(phone3)) {
        errorMessage = '유효하지 않은 전화번호입니다.';
        displayValidationMessage($messageElement, errorMessage);
      } else {
        axios
          .get(uri)
          .then((response) => {
            if (!response.data) {
              errorMessage = '이미 존재하는 전화번호 입니다';
            }
            displayValidationMessage($messageElement, errorMessage);
          })
          .catch((error) => console.log(error));
      }
      break;
  }
  // 메시지 초기화 부분 추가
  if (value === '') {
    displayValidationMessage($messageElement, '');
  }
}

function displayValidationMessage(element, message) {
  if (message === '') {
    element.style.display = 'none';
  } else {
    element.textContent = message;
    element.style.display = 'block';
  }
}

// 로그인

// 아이디 찾기
const $verifyUserIdBtn = document.querySelector('#verifyUserIdBtn');
const $findUserIdModal = document.querySelector('#findUserIdModal');
const $findUserIdModalLabel = document.querySelector('#findUserIdModalLabel');
const $findUserIdMessage = document.querySelector('#findUserIdMessage');
const $findUserIdModalContent = $findUserIdModal.querySelector('#findUserIdModalBody');
const findUserIdOriginalModalContent = $findUserIdModalContent.innerHTML;
const $findUserIdModalFooter = $findUserIdModal.querySelector('#findUserIdModalFooter');
// 모달이 열릴 때 폼을 표시
$findUserIdModal.addEventListener('show.bs.modal', showFindUserIdForm);

function findUserId() {
  const $findEmail = document.querySelector('#emailForFindUserId');
  const $findNickName = document.querySelector('#nickNameForFindUserId');
  const $findUserIdMessage = document.querySelector('#findUserIdMessage');

  axios
    .post('./findUserId', null, {
      params: {
        email: $findEmail.value,
        nickName: $findNickName.value,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => {
      console.log(res);
      showFoundUserId(res.data);
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.data) {
        $findUserIdMessage.textContent = err.response.data;
      } else {
        $findUserIdMessage.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
      }
      $findUserIdMessage.style.display = 'block';
    });
}
function showFindUserIdForm() {
  $findUserIdModalContent.innerHTML = `
    <input type="email" name="email" id="emailForFindUserId" class="form-control" placeholder="이메일을 입력해 주세요" />
    <input type="text" name="nickName" id="nickNameForFindUserId" class="form-control mt-2" placeholder="닉네임을 입력해 주세요" />
    <label id="findUserIdMessage" class="invalid-feedback" style="display: none"></label>
  `;
  $findUserIdModalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
    <button type="button" id="verifyUserIdBtn" class="btn btn-primary">확인</button>
  `;

  // 확인 버튼에 이벤트 리스너 추가
  document.getElementById('verifyUserIdBtn').addEventListener('click', findUserId);
}
function showFoundUserId(userId) {
  $findUserIdModalContent.innerHTML = `
    <h3 class="text-center">회원님의 아이디는</h3>
    <p class="text-center font-weight-bold">${userId} 입니다.</p>
  `;
  $findUserIdModalFooter.innerHTML = `
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
  `;
}
// 모달이 닫힐 때 원래 내용으로 복원
$findUserIdModal.addEventListener('hidden.bs.modal', function () {
  $findUserIdModalContent.innerHTML = findUserIdOriginalModalContent;
  $findUserIdMessage.style.display = 'none';
});
// 비밀번호 찾기
const $findPasswordBtn = document.querySelector('#findPasswordBtn');
const $findPasswordModal = document.querySelector('#findPasswordModal');
const $findPasswordModalLabel = document.querySelector('#findPasswordModalLabel');
const $findPasswordModalContent = $findPasswordModal.querySelector('#findPasswordModalBody');
const findPasswordOriginalModalContent = $findPasswordModalContent.innerHTML;
const $findPasswordModalFooter = $findPasswordModal.querySelector('#findPasswordModalFooter');
const $findPasswordMessage = document.querySelector('#findPasswordMessage');
const $findPasswordForm = document.querySelector('#findPasswordForm');
const $findPasswordUserId = document.querySelector('#userIdForFindPassword');
const $findPasswordEmail = document.querySelector('#emailForFindPassword');
const $findPasswordNickName = document.querySelector('#nickNameForFindPassword');
const $verifyPasswordBtn = document.querySelector('#verifyPasswordBtn');

// 모달이 열릴 때 폼을 표시
$findPasswordModal.addEventListener('show.bs.modal', showFindPasswordForm);

function showFindPasswordForm() {
  $findPasswordModalContent.innerHTML = `
    <input type="text" name="userId" id="userIdForFindPassword" class="form-control" placeholder="아이디를 입력해 주세요" />
    <input type="email" name="email" id="emailForFindPassword" class="form-control mt-2" placeholder="이메일을 입력해 주세요" />
    <input type="text" name="nickName" id="nickNameForFindPassword" class="form-control mt-2" placeholder="닉네임을 입력해 주세요" />
    <label id="findPasswordMessage" class="invalid-feedback" style="display: none"></label>
  `;
  $findPasswordModalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
    <button type="button" id="verifyPasswordBtn" class="btn btn-primary">확인</button>
  `;

  // 확인 버튼에 이벤트 리스너 추가
  document.getElementById('verifyPasswordBtn').addEventListener('click', verifyUserForPasswordReset);
}

function verifyUserForPasswordReset() {
  const $findUserId = document.querySelector('#userIdForFindPassword');
  const $findEmail = document.querySelector('#emailForFindPassword');
  const $findNickName = document.querySelector('#nickNameForFindPassword');
  const $findPasswordMessage = document.querySelector('#findPasswordMessage');

  axios
    .post('./verifyUser', null, {
      params: {
        userId: $findUserId.value,
        email: $findEmail.value,
        nickName: $findNickName.value,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data === true) {
        showPasswordResetForm($findUserId.value);
      } else {
        $findPasswordMessage.textContent = '아이디 또는 이메일 또는 닉네임이 일치하지 않습니다.';
        $findPasswordMessage.style.display = 'block';
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.data) {
        $findPasswordMessage.textContent = err.response.data;
      } else {
        $findPasswordMessage.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
      }
      $findPasswordMessage.style.display = 'block';
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
  document.getElementById('resetPasswordBtn').addEventListener('click', () => resetPassword(userId));
}

function resetPassword(userId) {
  const $newPassword = document.querySelector('#newPassword');
  const $confirmNewPassword = document.querySelector('#confirmNewPassword');
  const $resetPasswordInvalidMessage = document.querySelector('#resetPasswordInvalidMessage');
  const $resetPasswordConfirmMessage = document.querySelector('#resetPasswordConfirmMessage');
  const passwordPattern = /^(?=.*[0-9]).{8,}$/;

  let valid = true;

  // 유효성 검사 초기화
  $resetPasswordInvalidMessage.style.display = 'none';
  $resetPasswordConfirmMessage.style.display = 'none';

  // 비밀번호 유효성 검사
  if (!passwordPattern.test($newPassword.value)) {
    $resetPasswordInvalidMessage.textContent = '유효하지 않은 비밀번호 입니다. 8자 이상으로 입력해주세요.';
    $resetPasswordInvalidMessage.style.display = 'block';
    valid = false;
  }

  // 비밀번호 확인 일치 여부 검사
  if ($newPassword.value !== $confirmNewPassword.value) {
    $resetPasswordConfirmMessage.textContent = '비밀번호가 일치하지 않습니다.';
    $resetPasswordConfirmMessage.style.display = 'block';
    valid = false;
  }

  if (!valid) {
    return; // 유효성 검사를 통과하지 못하면 서버에 요청을 보내지 않음
  }

  axios
    .post('./updatePassword', null, {
      params: {
        userId: userId,
        password: $newPassword.value,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => {
      console.log(res);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      $findPasswordModal.querySelector('[data-bs-dismiss="modal"]').click();
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.data) {
        $resetPasswordInvalidMessage.textContent = err.response.data;
      } else {
        $resetPasswordInvalidMessage.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
      }
      $resetPasswordInvalidMessage.style.display = 'block';
    });
}

// 모달이 닫힐 때 원래 내용으로 복원
$findPasswordModal.addEventListener('hidden.bs.modal', function () {
  $findPasswordModalContent.innerHTML = findPasswordOriginalModalContent;
  $findPasswordMessage.style.display = 'none';
});
