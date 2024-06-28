// 비밀번호 변수 --------->
const $passwordShowBtn = document.querySelector("#passwordShowBtn");
const $newPasswordInput = document.querySelector("#newPassword");
const $confirmPasswordInput = document.querySelector("#confirmPassword");
const $passwordFeedback = document.querySelector("#passwordFeedback");
const $confirmPasswordFeedback = document.querySelector(
    "#confirmPasswordFeedback"
);
const $passwordStrength = document.querySelector("#passwordStrength");
// <---------- 비밀번호 변수

// 정보수정 변수 ---------->
const $form = document.querySelector("#editProfileForm");
const $emailInput = document.querySelector("#email");
const $phone1Input = document.querySelector("#phone1");
const $phone2Input = document.querySelector("#phone2");
const $phone3Input = document.querySelector("#phone3");
const $nickName = document.querySelector("#nickName");
const $nickNameFeedback = document.querySelector("#nickNameFeedback");
const $emailFeedback = document.querySelector("#emailFeedback");
const $phoneFeedback = document.querySelector("#phoneFeedback");
const $updateBtn = document.querySelector("#updateBtn");
// <--------- 정보수정 변수

// 비밀번호 변경 버튼 클릭 시 비밀번호 필드 토글
$passwordShowBtn.addEventListener("click", function () {
    const $passwordGroup1 = document.querySelector("#passwordGroup1");
    const $passwordGroup2 = document.querySelector("#passwordGroup2");

    if ($passwordGroup1.classList.contains("d-none")) {
        $passwordGroup1.classList.remove("d-none");
        $passwordGroup2.classList.remove("d-none");
        this.textContent = "비밀번호 변경 취소";
    } else {
        $passwordGroup1.classList.add("d-none");
        $passwordGroup2.classList.add("d-none");
        this.textContent = "비밀번호 변경";
        // 필드 초기화
        $newPasswordInput.value = "";
        $confirmPasswordInput.value = "";
        $passwordFeedback.textContent = "";
        $confirmPasswordFeedback.textContent = "";
    }
});

// 비밀번호 검증 & 일치 여부 확인
$newPasswordInput.addEventListener("input", function () {
    const result = checkPasswordStrength(this.value);
    $passwordFeedback.textContent = result.message;
    $passwordFeedback.style.color = result.color;

    if (this.value === "") {
        $passwordStrength.classList.add("d-none");
    } else {
        $passwordStrength.classList.remove("d-none");
    }

    checkPasswordMatch();
});

$confirmPasswordInput.addEventListener("input", checkPasswordMatch);

// 비밀번호 검증
function checkPasswordStrength(password) {
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;

    if (hasNumber && isLongEnough) {
        return {
            score: 100,
            message: "유효한 비밀번호입니다",
            color: "green",
        };
    } else {
        return {
            score: 0,
            message: "8자리 이상, 숫자가 포함된 비밀번호로 해주세요",
            color: "red",
        };
    }
}

// 비밀번호 일치 여부 확인
function checkPasswordMatch() {
    if (
        $newPasswordInput.value === $confirmPasswordInput.value &&
        $newPasswordInput.value !== ""
    ) {
        $confirmPasswordFeedback.textContent = "비밀번호가 일치합니다.";
        $confirmPasswordFeedback.style.color = "green";
    } else if ($confirmPasswordInput.value === "") {
        $confirmPasswordFeedback.textContent = "";
    } else {
        $confirmPasswordFeedback.textContent = "비밀번호가 일치하지 않습니다.";
        $confirmPasswordFeedback.style.color = "red";
    }
}

// 사용자 정보 수정(닉네임)
$nickName.addEventListener("input", function () {
    const nickNameValue = $nickName.value;

    axios
        .post("/checkNickname", {
            nickname: nickNameValue,
        })
        .then((response) => {
            const data = response.data;
            if (data.exists) {
                $nickNameFeedback.textContent = "이미 존재하는 닉네임 입니다";
                $submitButton.disabled = true;
            } else {
                $nickNameFeedback.textContent = "사용 가능한 닉네임입니다";
                $submitButton.disabled = false;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
