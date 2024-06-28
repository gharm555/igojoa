/*if (typeof FullCalendar === "undefined") {
	console.error("FullCalendar library is not loaded");
	return;
}*/
console.log("3123123213123");
let calendar;

// 가상의 포인트 내역 데이터
const pointHistory = [
    { date: "2024-06-25", content: "게시글 작성", points: 100 },
    { date: "2024-06-24", content: "댓글 작성", points: 50 },
    { date: "2024-06-27", content: "포인트 사용", points: -200 },
    { date: "2024-06-21", content: "이벤트 참여", points: 500 },
    { date: "2024-06-21", content: "이벤트 참여", points: 500 },
    { date: "2024-06-21", content: "상품 구매", points: -1000 },
    { date: "2024-06-22", content: "리뷰 작성", points: 200 },
    { date: "2024-06-26", content: "출석 체크", points: 10 },
];

// 포인트 내역 탭 버튼에 이벤트 리스너 추가
const pointHistoryTab = document.getElementById("v-pills-messages-tab");
pointHistoryTab.addEventListener("shown.bs.tab", initializeCalendar);
function initializeCalendar() {
    const calendarEl = document.getElementById("calendar");
    if (!calendarEl) {
        console.error("Calendar element not found");
        return;
    }

    if (calendar) {
        calendar.destroy();
    }

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        buttonText: {
            today: "오늘",
        },
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "",
        },
        locale: "ko",
        events: pointHistory.map((item) => ({
            title: `${item.points > 0 ? "+" : ""}${item.points}P`,
            start: item.date,
            allDay: true,
            backgroundColor: item.points > 0 ? "#28a745" : "#dc3545",
            borderColor: item.points > 0 ? "#28a745" : "#dc3545",
        })),
        dateClick: function (info) {
            updatePointHistory(info.date);
        },
        datesSet: function (info) {
            // 달력의 날짜가 변경될 때마다 호출됩니다 (월 변경, Today 버튼 클릭 등)
            updatePointHistory(info.start);
            const todayButton = document.querySelector(".fc-today-button");
            if (todayButton) {
                todayButton.disabled = false;
            }
        },
        height: "auto",
    });

    calendar.render();
    console.log("Calendar rendered");

    // Today 버튼에 대한 커스텀 이벤트 리스너 추가
    const todayButton = document.querySelector(".fc-today-button");
    if (todayButton) {
        todayButton.addEventListener("click", function () {
            const today = new Date();
            calendar.gotoDate(today);
            updatePointHistory(today);
        });
    }

    // 초기 포인트 내역 업데이트 (오늘 날짜)
    updatePointHistory(new Date());
}

function updatePointHistory(date) {
    // 날짜를 로컬 시간 기준 YYYY-MM-DD 형식의 문자열로 변환
    const formattedDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");

    const table = document
        .getElementById("pointHistoryTable")
        .getElementsByTagName("tbody")[0];
    table.innerHTML = ""; // 테이블 초기화

    let earnedPoints = 0;
    let spentPoints = 0;

    pointHistory.forEach((item) => {
        if (item.date === formattedDate) {
            let row = table.insertRow();
            row.insertCell(0).textContent = item.date;
            row.insertCell(1).textContent = item.content;
            row.insertCell(2).textContent = item.points;

            if (item.points > 0) {
                earnedPoints += item.points;
            } else {
                spentPoints += Math.abs(item.points);
            }
        }
    });

    document.getElementById("earnedPoints").textContent = earnedPoints;
    document.getElementById("spentPoints").textContent = spentPoints;

    console.log(`Updating for date: ${formattedDate}`); // 디버깅용 로그
}

// 초기 포인트 내역 업데이트 (오늘 날짜)
const today = new Date();
updatePointHistory(today);

// ------------------- 프로필 사진 업데이트
const profileImage = document.getElementById("profileImage");
const profileImageInput = document.getElementById("profileImageInput");

/*profileImage.addEventListener("click", function() {
	profileImageInput.click();
});*/

profileImageInput.addEventListener("change", function (event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            profileImage.src = e.target.result;
        };

        reader.readAsDataURL(event.target.files[0]);
    }
});

// 내정보수정 -> 전화번호 js
const updateFullPhoneNumber = () => {
    const phone1 = document.getElementById("phone1").value;
    const phone2 = document.getElementById("phone2").value;
    const phone3 = document.getElementById("phone3").value;
    const fullNumber = phone1 + phone2 + phone3;
    document.getElementById("fullPhoneNumber").value = fullNumber;
};

const moveToNext = (current, nextFieldID) => {
    if (current.value.length >= parseInt(current.getAttribute("maxlength"))) {
        const nextField = document.getElementById(nextFieldID);
        if (nextField) {
            nextField.focus();
        }
    }
    updateFullPhoneNumber();
};

const setupPhoneInput = (fieldId, nextFieldId) => {
    const field = document.getElementById(fieldId);
    field.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
        moveToNext(this, nextFieldId);
    });
};

setupPhoneInput("phone1", "phone2");
setupPhoneInput("phone2", "phone3");
setupPhoneInput("phone3", null);

// 프로필 수정 폼 관련
const sidebarNickname = document.querySelector(".sidebar .icon-text .text");
const nicknameInput = document.getElementById("nickName");
const editProfileForm = document.querySelector("#v-pills-profile form");

// 탭 변경 이벤트 리스너 추가
document.querySelectorAll('button[data-bs-toggle="pill"]').forEach((button) => {
    button.addEventListener("shown.bs.tab", function (event) {
        if (event.target.id === "v-pills-profile-tab") {
            fillEditProfileForm();
        }
    });
});

function fillEditProfileForm() {
    // 사이드바의 닉네임을 가져와 폼에 채웁니다
    nicknameInput.value = sidebarNickname.textContent;

    // 다른 필드들도 채웁니다
    const email = document.querySelector(
        "#v-pills-home .card-text:nth-of-type(2)"
    ).textContent;
    const phone = document.querySelector(
        "#v-pills-home .card-text:nth-of-type(3)"
    ).textContent;

    document.getElementById("email").value = email;

    const phoneparts = phone.split("-");
    document.getElementById("phone1").value = phoneparts[0];
    document.getElementById("phone2").value = phoneparts[1];
    document.getElementById("phone3").value = phoneparts[2];

    updateFullPhoneNumber();
}

// 닉네임 입력 필드의 변경을 감지하여 사이드바 업데이트
nicknameInput.addEventListener("input", function () {
    sidebarNickname.textContent = this.value;
});

// 폼 제출 이벤트 처리
editProfileForm.addEventListener("submit", function (e) {
    e.preventDefault(); // 기본 제출 동작 방지

    // 여기에 서버로 데이터를 전송하는 코드를 추가할 수 있습니다
    // 예: fetch() 또는 axios를 사용한 AJAX 요청

    // 성공적으로 업데이트되었다고 가정하고 메시지 표시
    alert("프로필이 성공적으로 업데이트되었습니다.");

    // 사이드바의 닉네임을 업데이트
    sidebarNickname.textContent = nicknameInput.value;
});

// const passwordShowBtn = document.getElementById("passwordShowBtn");
// if (passwordShowBtn) {
//   passwordShowBtn.addEventListener("click", togglePasswordFields);
// }

// let isPasswordVisible = false;

// function togglePasswordFields() {
//   const passwordGroup1 = document.getElementById("passwordGroup1");
//   const passwordGroup2 = document.getElementById("passwordGroup2");
//   const newPassword = document.querySelector("#newPassword");
//   const newPassword1 = document.querySelector("#confirmPassword");

//   if (isPasswordVisible) {
//     // 비밀번호 변경 취소 상태
//     passwordGroup1.classList.add("d-none");
//     passwordGroup2.classList.add("d-none");
//     newPassword.value = "";
//     newPassword1.value = "";

//     passwordShowBtn.textContent = "비밀번호 변경";
//   } else {
//     // 비밀번호 변경 상태
//     passwordGroup1.classList.remove("d-none");
//     passwordGroup2.classList.remove("d-none");
//     passwordShowBtn.textContent = "비밀번호 변경 취소";
//   }

//   isPasswordVisible = !isPasswordVisible;
// }

/* 회원 탈퇴 진짜 할낀교 물어보는 js */
const withdrawalBtn = document.getElementById("withdrawal");
const withdrawalModal = new bootstrap.Modal(
    document.getElementById("withdrawalModal")
);
const confirmWithdrawalBtn = document.getElementById("confirmWithdrawal");

withdrawalBtn.addEventListener("click", function () {
    withdrawalModal.show();
});

confirmWithdrawalBtn.addEventListener("click", function () {
    // 여기에 실제 회원 탈퇴 로직을 구현합니다.
    console.log("회원 탈퇴 진행");
    // 예: 서버에 회원 탈퇴 요청을 보내는 AJAX 호출
    // 성공 시 로그아웃 처리 및 메인 페이지로 리다이렉트
    withdrawalModal.hide();
    alert("회원 탈퇴가 완료되었습니다.");
    // window.location.href = '/logout'; // 로그아웃 처리 및 리다이렉트
});

const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordFeedback = document.getElementById("passwordFeedback");
const confirmPasswordFeedback = document.getElementById(
    "confirmPasswordFeedback"
);
const passwordStrengthBar = document.querySelector(
    "#passwordStrength .progress-bar"
);
const $passwordStrength = document.querySelector("#passwordStrength");

const regex = /^\s+$/;

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@#&!]+/)) strength += 1;

    switch (strength) {
        case 0:
            return { score: 0, message: "", color: "blue" };
        case 1:
            return {
                score: 20,
                message: "비밀번호 강도: 매우 취약",
                color: "red",
            };
        case 2:
            return {
                score: 40,
                message: "비밀번호 강도: 취약",
                color: "orange",
            };
        case 3:
            return {
                score: 60,
                message: "비밀번호 강도: 보통",
                color: "yellow",
            };
        case 4:
            return {
                score: 80,
                message: "비밀번호 강도: 강함",
                color: "lightgreen",
            };
        case 5:
            return {
                score: 100,
                message: "비밀번호 강도: 매우 강함",
                color: "green",
            };
    }
}

newPasswordInput.addEventListener("input", function () {
    const result = checkPasswordStrength(this.value);
    if (this.value === "") {
        $passwordStrength.classList.add("d-none");
    }
    passwordStrengthBar.style.width = `${result.score}%`;
    passwordStrengthBar.style.backgroundColor = result.color;
    passwordFeedback.textContent = ` ${result.message}`;
    passwordFeedback.style.color = result.color;

    // 비밀번호 확인 필드와 일치 여부 확인
    if (confirmPasswordInput.value) {
        checkPasswordMatch();
    }
});

function checkPasswordMatch() {
    if (newPasswordInput.value === confirmPasswordInput.value) {
        confirmPasswordFeedback.textContent = "비밀번호가 일치합니다.";
        confirmPasswordFeedback.style.color = "green";
    } else {
        confirmPasswordFeedback.textContent = "비밀번호가 일치하지 않습니다.";
        confirmPasswordFeedback.style.color = "red";
    }
}

confirmPasswordInput.addEventListener("input", checkPasswordMatch);

// 비밀번호 변경 버튼 클릭 시 비밀번호 필드 토글 - copy
const $passwordShowBtn = document.querySelector("#passwordShowBtn");
$passwordShowBtn.addEventListener("click", function () {
    console.log("비밀번호 변경 버튼 작동함");
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
        newPasswordInput.value = "";
        confirmPasswordInput.value = "";
        passwordFeedback.textContent = "";
        confirmPasswordFeedback.textContent = "";
        passwordStrengthBar.style.width = "0%";
    }
});

// 회원수정 중복확인 js
const form = document.getElementById("editProfileForm");
const emailInput = document.getElementById("email");
const phone1Input = document.getElementById("phone1");
const phone2Input = document.getElementById("phone2");
const phone3Input = document.getElementById("phone3");
const nickNameFeedback = document.getElementById("nickNameFeedback");
const emailFeedback = document.getElementById("emailFeedback");
const phoneFeedback = document.getElementById("phoneFeedback");

let debounceTimers = {};

function debounce(func, delay, field) {
    clearTimeout(debounceTimers[field]);
    debounceTimers[field] = setTimeout(func, delay);
}

function validateField(field, value, feedbackElement) {
    // 실제 구현에서는 이 부분을 서버로의 AJAX 요청으로 대체해야 합니다
    fetch(`/api/validate-${field}?value=${encodeURIComponent(value)}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.isValid) {
                feedbackElement.textContent = `유효한 ${field}입니다.`;
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent =
                    data.message || `유효하지 않은 ${field}입니다.`;
                feedbackElement.style.color = "red";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            feedbackElement.textContent = `${field} 확인 중 오류가 발생했습니다.`;
            feedbackElement.style.color = "red";
        });
}

nicknameInput.addEventListener("input", function () {
    debounce(
        () => validateField("nickname", this.value, nickNameFeedback),
        500,
        "nickname"
    );
});

emailInput.addEventListener("input", function () {
    debounce(
        () => validateField("email", this.value, emailFeedback),
        500,
        "email"
    );
});

[phone1Input, phone2Input, phone3Input].forEach((input) => {
    input.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
        if (this.value.length === this.maxLength) {
            const next = this.nextElementSibling;
            if (next && next.tagName === "INPUT") {
                next.focus();
            }
        }
        const fullPhone = `${phone1Input.value}-${phone2Input.value}-${phone3Input.value}`;
        debounce(
            () => validateField("phone", fullPhone, phoneFeedback),
            500,
            "phone"
        );
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    // 여기에 폼 제출 로직 추가
    console.log("폼 제출됨");
});
