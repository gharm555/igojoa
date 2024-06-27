document.addEventListener("DOMContentLoaded", function () {
    if (typeof FullCalendar === "undefined") {
        console.error("FullCalendar library is not loaded");
        return;
    }

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
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "",
            },
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

    profileImage.addEventListener("click", function () {
        profileImageInput.click();
    });

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
        if (
            current.value.length >= parseInt(current.getAttribute("maxlength"))
        ) {
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
    document
        .querySelectorAll('button[data-bs-toggle="pill"]')
        .forEach((button) => {
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

    const passwordShowBtn = document.getElementById("passwordShowBtn");
    if (passwordShowBtn) {
        passwordShowBtn.addEventListener("click", togglePasswordFields);
    }

    let isPasswordVisible = false;

    function togglePasswordFields() {
        const passwordGroup1 = document.getElementById("passwordGroup1");
        const passwordGroup2 = document.getElementById("passwordGroup2");
        const newPassword = document.querySelector("#newPassword");
        const newPassword1 = document.querySelector("#confirmPassword");

        if (isPasswordVisible) {
            // 비밀번호 변경 취소 상태
            passwordGroup1.classList.add("d-none");
            passwordGroup2.classList.add("d-none");
            newPassword.value = "";
            newPassword1.value = "";

            passwordShowBtn.textContent = "비밀번호 변경";
        } else {
            // 비밀번호 변경 상태
            passwordGroup1.classList.remove("d-none");
            passwordGroup2.classList.remove("d-none");
            passwordShowBtn.textContent = "비밀번호 변경 취소";
        }

        isPasswordVisible = !isPasswordVisible;
    }
});
