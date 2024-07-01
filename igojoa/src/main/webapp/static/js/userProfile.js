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
const $nickName = document.querySelector("input#nickName");
const $nickNameFeedback = document.querySelector("#nickNameFeedback");
const $emailInput = document.querySelector("input#email");
const $emailFeedback = document.querySelector("#emailFeedback");
const $phone1Input = document.querySelector("#phone1");
const $phone2Input = document.querySelector("#phone2");
const $phone3Input = document.querySelector("#phone3");
const $phoneFeedback = document.querySelector("#phoneFeedback");
const $updateBtn = document.querySelector("#updateBtn");
const originalValues = {
	nickName: $nickName.value,
	email: $emailInput.value,
	phoneNumber: $phone1Input.value + $phone2Input.value + $phone3Input.value,
};
// <--------- 정보수정 변수

// 공백이 전혀 없어야 하는 경우를 위한 정규식
const noSpaceRegex = /^\S*$/;

// 연속된 공백을 허용하지 않기 위한 정규식
const noConsecutiveSpaceRegex = /^(?!.*\s\s).*$/;

// 비밀번호 변경 버튼 클릭 시 비밀번호 필드 토글
$passwordShowBtn.addEventListener("click", function() {
	const $passwordGroup1 = document.querySelector("#passwordGroup1");
	const $passwordGroup2 = document.querySelector("#passwordGroup2");

	if ($passwordGroup1 && $passwordGroup2) {
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
	}
});

// 비밀번호 검증 & 일치 여부 확인
$newPasswordInput.addEventListener("input", function() {
	const result = checkPasswordStrength(this.value);
	$passwordFeedback.textContent = result.message;
	$passwordFeedback.style.color = result.color;

	if ($passwordStrength) {
		if (this.value === "") {
			$passwordStrength.classList.add("d-none");
		} else {
			$passwordStrength.classList.remove("d-none");
		}
	}

	checkPasswordMatch();
});

$confirmPasswordInput.addEventListener("input", checkPasswordMatch);
$newPasswordInput.addEventListener("input", checkPasswordMatch);

// 비밀번호 검증
function checkPasswordStrength(password) {
	const hasNumber = /\d/.test(password);
	const isLongEnough = password.length >= 8;
	const isTooLong = password.length >= 12;

	if (isLongEnough && !isTooLong && hasNumber) {
		return {
			score: 100,
			message: "유효한 비밀번호입니다",
			color: "green",
		};
	} else if (!isLongEnough && !hasNumber) {
		return {
			score: 0,
			message: "8자리 이상, 숫자가 포함된 비밀번호로 해주세요",
			color: "red",
		};
	} else if (isTooLong) {
		return {
			score: 0,
			message:
				"비밀번호는 12자리 미만, 숫자가 포함된 비밀번호여야 합니다",
			color: "red",
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

// 사용자 닉네임 중복 검사
document
	.querySelector("input#nickName")
	.addEventListener("input", function() {
		const nickName = this.value;
		const uri = `./checkNickName?nickName=${nickName}`;
		const $nickNameFeedback = document.querySelector("#nickNameFeedback");

		axios
			.get(uri)
			.then((response) => {
				if (response.data === true) {
					if (nickName.length >= 12) {
						$nickNameFeedback.textContent =
							"닉네임은 12글자 미만으로 입력해주세요.";
						$nickNameFeedback.style.color = "red";
					} else {
						$nickNameFeedback.textContent = "유효한 정보입니다.";
						$nickNameFeedback.style.color = "green";
					}
				} else {
					$nickNameFeedback.textContent = "유효하지 않은 정보입니다.";
					$nickNameFeedback.style.color = "red";
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				$nickNameFeedback.textContent =
					"오류가 발생했습니다. 다시 시도해 주세요.";
				$nickNameFeedback.style.color = "red";
			});
	});

// 사용자 이메일 중복 검사
document.querySelector("input#email").addEventListener("input", function() {
	const email = this.value;
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	const $emailFeedback = document.querySelector("#emailFeedback");

	if (!emailRegex.test(email)) {
		$emailFeedback.textContent = "유효하지 않은 정보입니다.";
		$emailFeedback.style.color = "red";
		return;
	}

	const uri = `./checkEmail?email=${email}`;

	axios
		.get(uri)
		.then((response) => {
			if (response.data === true) {
				if (email.length >= 20) {
					$emailFeedback.textContent =
						"이메일은 20글자 미만의 경우에만 사용가능합니다.";
					$emailFeedback.style.catch = "red";
				} else {
					$emailFeedback.textContent = "유효한 정보입니다.";
					$emailFeedback.style.color = "green";
				}
			} else {
				$emailFeedback.textContent = "유효하지 않은 정보입니다.";
				$emailFeedback.style.color = "red";
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			$emailFeedback.textContent =
				"오류가 발생했습니다. 다시 시도해 주세요.";
			$emailFeedback.style.color = "red";
		});
});

// 사용자 전화번호 중복 검사
[$phone1Input, $phone2Input, $phone3Input].forEach((input) => {
	input.addEventListener("input", function() {
		// 정규표현식 생성: 숫자만 허용
		const regex = /^[0-9]+$/;

		// 입력값이 숫자로만 구성되었는지 확인
		if (!regex.test(this.value)) {
			alert("전화번호에는 숫자만 입력해 주세요");
			// 입력값 초기화
			this.value = "";
			return;
		}

		// 다음 입력 필드로 자동 포커스 이동
		if (this.value.length === this.maxLength) {
			const next = this.nextElementSibling;
			if (next && next.tagName === "INPUT") {
				next.focus();
			}
		}

		// 전화번호 중복 체크 함수 호출
		checkPhoneNumber();
	});
});

// 사용자 전화번호 중복 검사하는 function
function checkPhoneNumber() {
	const phone1 = $phone1Input.value;
	const phone2 = $phone2Input.value;
	const phone3 = $phone3Input.value;

	if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
		axios
			.get(
				`./checkPhoneNumber?phone1=${phone1}&phone2=${phone2}&phone3=${phone3}`
			)
			.then((response) => {
				if (response.data === true) {
					$phoneFeedback.textContent = "유효한 정보입니다.";
					$phoneFeedback.style.color = "green";
				} else {
					$phoneFeedback.textContent = "유효하지 않은 정보입니다.";
					$phoneFeedback.style.color = "red";
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				$phoneFeedback.textContent =
					"오류가 발생했습니다. 다시 시도해 주세요.";
				$phoneFeedback.style.color = "red";
			});
	}
}

// 정보 수정 버튼 클릭 시 (nickName, email, phoneNumber를 serverside에 POST 방식으로 보낸 후 응답에 따라 성공/실패 alert 띄우기)
// 정보 수정 버튼 클릭 이벤트
$updateBtn.addEventListener("click", function(e) {
	e.preventDefault(); // 기본 form 제출 방지

	// 사용자 입력 데이터 가져오기
	const nickName = $nickName.value;
	const email = $emailInput.value;
	const phone1 = $phone1Input.value;
	const phone2 = $phone2Input.value;
	const phone3 = $phone3Input.value;
	const newPassword = $newPasswordInput.value;

	// 전화번호를 하나의 문자열로 합치기
	const fullPhoneNumber = `${phone1}${phone2}${phone3}`;

	// 서버로 보낼 데이터 객체 생성
	const formData = {
		nickName: nickName,
		email: email,
		phoneNumber: fullPhoneNumber,
		password: newPassword,
	};

	// axios를 사용하여 서버에 POST 요청 보내기
	axios
		.post("./updateProfile", formData)
		.then((response) => {
			// 응답 처리
			if (response.data.success) {
				alert("정보가 성공적으로 업데이트 되었습니다.");
				window.location.href = "./userProfile";
			} else {
				alert("정보 업데이트를 실패했습니다: " + response.data.message);
			}
		})
		.catch((error) => {
			// 에러 처리
			console.error("Error:", error);
			alert("정보 업데이트 중 오류가 발생했습니다.");
		});
});

// 입력 값 변경 감지 함수
function checkForChanges() {


	// 현재 값 가져오기
	const currentValues = {
		nickName: $nickName.value.trim(),
		email: $emailInput.value.trim(),
		phoneNumber: (
			$phone1Input.value +
			$phone2Input.value +
			$phone3Input.value
		).trim(),
	};

	// 경고 메시지 초기화
	$nickNameFeedback.textContent = "";
	$emailFeedback.textContent = "";
	$phoneFeedback.textContent = "";

	// 값 변경 확인 및 공백 검사
	let isChanged = false;
	let isValid = true;
	for (let key in originalValues) {
		if (
			originalValues[key] !== currentValues[key] &&
			currentValues[key] !== ""
		) {
			isChanged = true;
		}

		// 전혀 공백을 허용하지 않는 경우
		if (!noSpaceRegex.test(currentValues[key])) {
			isValid = false;
			document.querySelector(`#${key}Feedback`).textContent =
				"공백이 포함되어서는 안됩니다.";
		}

		// 연속된 공백을 허용하지 않는 경우
		else if (!noConsecutiveSpaceRegex.test(currentValues[key])) {
			isValid = false;
			document.querySelector(`#${key}Feedback`).textContent =
				"공백이 포함되어서는 안됩니다.";
		}
	}

	// "정보 수정" 버튼 활성화 또는 비활성화
	$updateBtn.disabled = !(isChanged && isValid);
}

// 각 입력 필드에 이벤트 리스너 추가
$nickName.addEventListener("input", checkForChanges);
$emailInput.addEventListener("input", checkForChanges);
$phone1Input.addEventListener("input", checkForChanges);
$phone2Input.addEventListener("input", checkForChanges);
$phone3Input.addEventListener("input", checkForChanges);

// 초기 상태에서는 버튼 비활성화
$updateBtn.disabled = true;
