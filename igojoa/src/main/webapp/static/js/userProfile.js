document.addEventListener("DOMContentLoaded", function () {
  // 포인트내역에 있는 FullCalendar 및 포인트 내역 관련 코드
  let calendar;
  const $pointHistoryTab = document.querySelector("#v-pills-messages-tab");
  const pointHistory = [
    { date: "2024-06-25", content: "게시글 작성", points: 100 },
    { date: "2024-06-24", content: "댓글 작성", points: 50 },
    { date: "2024-06-27", content: "포인트 사용", points: -200 },
    { date: "2024-06-29", content: "이벤트 참여", points: 500 },
    { date: "2024-06-29", content: "이벤트 참여", points: 500 },
    { date: "2024-06-29", content: "상품 구매", points: -1000 },
    { date: "2024-06-29", content: "리뷰 작성", points: 200 },
    { date: "2024-06-26", content: "출석 체크", points: 10 },
  ];

  if (typeof FullCalendar === "undefined") {
    console.error("FullCalendar library is not loaded");
    return;
  }

  $pointHistoryTab.addEventListener("shown.bs.tab", initializeCalendar);

  function initializeCalendar() {
    const $calendarEl = document.querySelector("#calendar");
    if (!$calendarEl) {
      console.error("Calendar element not found");
      return;
    }

    if (calendar) {
      calendar.destroy();
    }

    const dailyTotals = calculateDailyTotals(pointHistory);

    calendar = new FullCalendar.Calendar($calendarEl, {
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
      events: dailyTotals,
      eventContent: function (arg) {
        return {
          html: arg.event.title,
        };
      },
      dateClick: function (info) {
        updatePointHistory(info.date);
      },
      datesSet: function (info) {
        updatePointHistory(info.start);
        const $todayButton = document.querySelector(".fc-today-button");
        if ($todayButton) {
          $todayButton.disabled = false;
        }
      },
      height: "auto",
    });

    calendar.render();
    console.log("Calendar rendered");

    const $todayButton = document.querySelector(".fc-today-button");
    if ($todayButton) {
      $todayButton.addEventListener("click", function () {
        const today = new Date();
        calendar.gotoDate(today);
        updatePointHistory(today);
      });
    }

    updatePointHistory(new Date());
  }

  function calculateDailyTotals(pointHistory) {
    const totals = {};

    pointHistory.forEach((item) => {
      if (!totals[item.date]) {
        totals[item.date] = { earned: 0, spent: 0 };
      }
      if (item.points > 0) {
        totals[item.date].earned += item.points;
      } else {
        totals[item.date].spent += Math.abs(item.points);
      }
    });

    const events = [];

    Object.keys(totals).forEach((date) => {
      if (totals[date].earned > 0) {
        events.push({
          title: `+${totals[date].earned}P`,
          start: date,
          allDay: true,
          backgroundColor: "#28a745",
          borderColor: "#28a745",
          textColor: "#ffffff",
        });
      }
      if (totals[date].spent > 0) {
        events.push({
          title: `-${totals[date].spent}P`,
          start: date,
          allDay: true,
          backgroundColor: "#dc3545",
          borderColor: "#dc3545",
          textColor: "#ffffff",
        });
      }
    });

    return events;
  }

  function updatePointHistory(date) {
    const formattedDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    const $table = document
      .querySelector("#pointHistoryTable")
      .querySelector("tbody");
    $table.innerHTML = "";

    let earnedPoints = 0;
    let spentPoints = 0;

    pointHistory.forEach((item) => {
      if (item.date === formattedDate) {
        let row = $table.insertRow();
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

    document.querySelector("#earnedPoints").textContent = earnedPoints; // 얻은포인트
    document.querySelector("#spentPoints").textContent = spentPoints; // 소비포인트

    console.log(`Updating for date: ${formattedDate}`);
  }

  /** 내 활동내역 데이터 피커  */
  // 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function enableTodayButton() {
    const $todayButton = document.querySelector(".fc-today-button");
    if ($todayButton) {
      $todayButton.disabled = false;
      $todayButton.removeEventListener("click", handleTodayButtonClick);
      $todayButton.addEventListener("click", handleTodayButtonClick);
    }
  }

  function handleTodayButtonClick() {
    const today = new Date();
    calendar.gotoDate(today);
    updatePointHistory(today);
  }

  // 초기 로드 시 달력 렌더링
  initializeCalendar();

  // placeholder에 오늘 날짜 설정
  document.getElementById("date-range").placeholder = getTodayDate();

  // Flatpickr 스타일시트를 동적으로 로드
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";
  document.head.appendChild(link);

  // Flatpickr 초기화
  flatpickr.localize(flatpickr.l10ns.ko);
  const datePicker = flatpickr("#date-range", {
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
    maxDate: new Date().fp_incr(365),
    disableMobile: "true",
    defaultDate: getTodayDate(),
    onChange: function (selectedDates, dateStr, instance) {
      console.log(selectedDates); // 선택된 날짜
    },
  });

  // 프로필 관련 코드
  const $profileImage = document.querySelector("#profileImage");
  const $profileImageInput = document.querySelector("#profileImageInput");
  const $sidebarNickname = document.querySelector(".sidebar .icon-text .text");
  const $nicknameInput = document.querySelector("#nickName");
  const $editProfileForm = document.querySelector("#v-pills-profile form");

  $profileImage.addEventListener("click", function () {
    $profileImageInput.click();
  });

  $profileImageInput.addEventListener("change", function (event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $profileImage.src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  });

  // 전화번호 입력 관련 코드
  const $phone1Input = document.querySelector("#phone1");
  const $phone2Input = document.querySelector("#phone2");
  const $phone3Input = document.querySelector("#phone3");

  const updateFullPhoneNumber = () => {
    const fullNumber =
      $phone1Input.value + $phone2Input.value + $phone3Input.value;
    document.querySelector("#fullPhoneNumber").value = fullNumber;
  };

  const moveToNext = (current, nextFieldID) => {
    if (current.value.length >= parseInt(current.getAttribute("maxlength"))) {
      const nextField = document.querySelector(`#${nextFieldID}`);
      if (nextField) {
        nextField.focus();
      }
    }
    updateFullPhoneNumber();
  };

  const setupPhoneInput = (fieldId, nextFieldId) => {
    const field = document.querySelector(`#${fieldId}`);
    field.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
      moveToNext(this, nextFieldId);
    });
  };

  setupPhoneInput("phone1", "phone2");
  setupPhoneInput("phone2", "phone3");
  setupPhoneInput("phone3", null);

  // 프로필 수정 폼 관련 코드
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
    $nicknameInput.value = $sidebarNickname.textContent;
    const email = document.querySelector(
      "#v-pills-home .card-text:nth-of-type(2)"
    ).textContent;
    const phone = document.querySelector(
      "#v-pills-home .card-text:nth-of-type(3)"
    ).textContent;
    document.querySelector("#email").value = email;
    const phoneparts = phone.split("-");
    $phone1Input.value = phoneparts[0];
    $phone2Input.value = phoneparts[1];
    $phone3Input.value = phoneparts[2];
    updateFullPhoneNumber();
  }

  $nicknameInput.addEventListener("input", function () {
    $sidebarNickname.textContent = this.value;
  });

  $editProfileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // 여기에 서버로 데이터를 전송하는 코드를 추가할 수 있습니다
    alert("프로필이 성공적으로 업데이트되었습니다.");
    $sidebarNickname.textContent = $nicknameInput.value;
  });

  // 회원 탈퇴 관련 코드
  const $withdrawalBtn = document.querySelector("#withdrawal");
  const $confirmWithdrawalBtn = document.querySelector("#confirmWithdrawal");
  const withdrawalModal = new bootstrap.Modal(
    document.querySelector("#withdrawalModal")
  );

  $withdrawalBtn.addEventListener("click", function () {
    withdrawalModal.show();
  });

  $confirmWithdrawalBtn.addEventListener("click", function () {
    console.log("회원 탈퇴 진행");
    withdrawalModal.hide();
    alert("회원 탈퇴가 완료되었습니다.");
    // window.location.href = '/logout'; // 로그아웃 처리 및 리다이렉트
  });

  // 비밀번호 관련 코드
  const $newPasswordInput = document.querySelector("#newPassword");
  const $confirmPasswordInput = document.querySelector("#confirmPassword");
  const $passwordFeedback = document.querySelector("#passwordFeedback");
  const $confirmPasswordFeedback = document.querySelector(
    "#confirmPasswordFeedback"
  );
  const $passwordStrengthBar = document.querySelector(
    "#passwordStrength .progress-bar"
  );
  const $passwordStrength = document.querySelector("#passwordStrength");
  const $passwordShowBtn = document.querySelector("#passwordShowBtn");

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
        return { score: 20, message: "비밀번호 강도: 매우 취약", color: "red" };
      case 2:
        return { score: 40, message: "비밀번호 강도: 취약", color: "orange" };
      case 3:
        return { score: 60, message: "비밀번호 강도: 보통", color: "blue" };
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

  $newPasswordInput.addEventListener("input", function () {
    const result = checkPasswordStrength(this.value);
    if (this.value === "") {
      $passwordStrength.classList.add("d-none");
    } else {
      $passwordStrength.classList.remove("d-none");
    }
    $passwordStrengthBar.style.width = `${result.score}%`;
    $passwordStrengthBar.style.backgroundColor = result.color;
    $passwordFeedback.textContent = ` ${result.message}`;
    $passwordFeedback.style.color = result.color;

    if ($confirmPasswordInput.value) {
      checkPasswordMatch();
    }
  });

  function checkPasswordMatch() {
    if ($newPasswordInput.value === $confirmPasswordInput.value) {
      $confirmPasswordFeedback.textContent = "비밀번호가 일치합니다.";
      $confirmPasswordFeedback.style.color = "green";
    } else {
      $confirmPasswordFeedback.textContent = "비밀번호가 일치하지 않습니다.";
      $confirmPasswordFeedback.style.color = "red";
    }
  }

  $confirmPasswordInput.addEventListener("input", checkPasswordMatch);

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
      $newPasswordInput.value = "";
      $confirmPasswordInput.value = "";
      $passwordFeedback.textContent = "";
      $confirmPasswordFeedback.textContent = "";
      $passwordStrengthBar.style.width = "0%";
    }
  });

  // 회원수정 중복확인 관련 코드
  const $emailInput = document.querySelector("#email");
  const $nickNameFeedback = document.querySelector("#nickNameFeedback");
  const $emailFeedback = document.querySelector("#emailFeedback");
  const $phoneFeedback = document.querySelector("#phoneFeedback");

  let debounceTimers = {};

  function debounce(func, delay, field) {
    clearTimeout(debounceTimers[field]);
    debounceTimers[field] = setTimeout(func, delay);
  }

  function validateField(field, value, $feedbackElement) {
    fetch(`/api/validate-${field}?value=${encodeURIComponent(value)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.isValid) {
          $feedbackElement.textContent = `유효한 ${field}입니다.`;
          $feedbackElement.style.color = "green";
        } else {
          $feedbackElement.textContent =
            data.message || `유효하지 않은 ${field}입니다.`;
          $feedbackElement.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        $feedbackElement.textContent = `${field} 확인 중 오류가 발생했습니다.`;
        $feedbackElement.style.color = "red";
      });
  }

  $nicknameInput.addEventListener("input", function () {
    debounce(
      () => validateField("nickname", this.value, $nickNameFeedback),
      500,
      "nickname"
    );
  });

  $emailInput.addEventListener("input", function () {
    debounce(
      () => validateField("email", this.value, $emailFeedback),
      500,
      "email"
    );
  });

  [$phone1Input, $phone2Input, $phone3Input].forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
      if (this.value.length === this.maxLength) {
        const next = this.nextElementSibling;
        if (next && next.tagName === "INPUT") {
          next.focus();
        }
      }
      const fullPhone = `${$phone1Input.value}-${$phone2Input.value}-${$phone3Input.value}`;
      debounce(
        () => validateField("phone", fullPhone, $phoneFeedback),
        500,
        "phone"
      );
    });
  });

  $editProfileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // 여기에 폼 제출 로직 추가
    console.log("폼 제출됨");
  });
});
