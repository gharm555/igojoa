let points = 10000;
const costPerPlay = 200;

// DOM 요소 선택
const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");
const $playButton = document.querySelector("#playButton");
const $resetNumbersButton = document.querySelector("#resetNumbersButton");
const $numberSelects = document.querySelectorAll(".number-select");
const $points = document.querySelector("#points");
const $rank = document.querySelector("#rank");

const $modal = document.querySelector("#resultModal");
const $modalMessage = document.querySelector("#modal-message");
const $closeModal = document.querySelector(".close");

// 요소가 제대로 선택되었는지 확인
if (
  !$result ||
  !$bonus ||
  !$playButton ||
  !$resetNumbersButton ||
  !$numberSelects ||
  !$points ||
  !$rank ||
  !$modal ||
  !$modalMessage ||
  !$closeModal
) {
  console.error("필수 요소 중 하나를 찾을 수 없습니다.");
}

// 유저가 선택한 번호와 당첨 번호 저장
let userNumbers = new Set();
let winBalls = [];
let bonus;

// 남은 포인트 업데이트 함수
function updatePoints() {
  $points.textContent = `남은 포인트: ${points}`;
}

// 숫자에 따라 공의 색상을 설정하는 함수
function colorize(number, $tag) {
  if (number < 7) {
    $tag.style.backgroundColor = "#ff6b6b";
  } else if (number < 14) {
    $tag.style.backgroundColor = "#feca57";
  } else if (number < 21) {
    $tag.style.backgroundColor = "#48dbfb";
  } else if (number < 28) {
    $tag.style.backgroundColor = "#ff9ff3";
  } else {
    $tag.style.backgroundColor = "#1dd1a1";
  }
}

// 숫자 공을 화면에 표시하는 함수
const showBall = (number, $target) => {
  const $ball = document.createElement("div");
  $ball.className = "ball";
  colorize(number, $ball);
  $ball.textContent = number;
  $target.appendChild($ball);
  setTimeout(() => {
    $ball.style.opacity = 1;
    $ball.style.transform = "scale(1)";
  }, 100);
};

// 1부터 36까지의 숫자 옵션을 생성하는 함수
function createNumberSelects() {
  const numbers = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36],
  ];

  $numberSelects.forEach((select, index) => {
    select.innerHTML = "";
    numbers[index].forEach((number) => {
      const option = document.createElement("option");
      option.value = number;
      option.textContent = number;
      select.appendChild(option);
    });
    select.addEventListener("change", updateUserNumbers);
  });
}

// 유저가 선택한 번호를 업데이트하는 함수
function updateUserNumbers() {
  userNumbers.clear();
  $numberSelects.forEach((select) => {
    const value = parseInt(select.value);
    if (!isNaN(value)) {
      userNumbers.add(value);
    }
  });
  updatePlayButtonState();
  console.log("현재 선택된 번호: ", Array.from(userNumbers));
}

// 새로운 함수: 플레이 버튼 상태 업데이트
function updatePlayButtonState() {
  if (userNumbers.size === 6) {
    $playButton.disabled = false;
  } else {
    $playButton.disabled = true;
  }
}

// 선택된 숫자를 초기화하는 함수
function resetNumbers() {
  userNumbers.clear();
  $numberSelects.forEach((select) => {
    select.selectedIndex = -1; // 첫 번째 항목으로 초기화
  });
  $result.innerHTML = ""; // 당첨 번호 초기화
  $bonus.innerHTML = ""; // 보너스 번호 초기화
  $rank.textContent = ""; // 결과 초기화
  updatePlayButtonState();
}

// 당첨 순위를 계산하는 함수
function getRank(winBalls, bonusBall, userNumbersArray) {
  const matchedNumbers = winBalls.filter((number) =>
    userNumbersArray.includes(number)
  ).length;
  const isBonusMatched = userNumbersArray.includes(bonusBall);

  if (matchedNumbers === 6)
    return { rank: "1등", prize: "한남더힐 아파트", matchedNumbers };
  if (matchedNumbers === 5 && isBonusMatched)
    return { rank: "2등", prize: "포르쉐", matchedNumbers };
  if (matchedNumbers === 5) return { rank: "3등", prize: "책", matchedNumbers };
  if (matchedNumbers === 4)
    return { rank: "4등", prize: "스타벅스 아메리카노", matchedNumbers };
  if (matchedNumbers === 3)
    return { rank: "5등", prize: "마이쮸", matchedNumbers };
  if (matchedNumbers === 2)
    return { rank: "6등", prize: "청포도 사탕", matchedNumbers };

  return { rank: "꽝", prize: "다음 기회에", matchedNumbers };
}

// 로또 게임을 실행하는 함수
function playLotto() {
  console.log("playLotto 함수 호출됨");

  if (userNumbers.size !== 6) {
    console.log("번호가 6개 선택되지 않았습니다.");
    alert("6개의 번호를 선택해주세요.");
    return;
  }

  if (points < costPerPlay) {
    console.log("포인트가 부족합니다.");
    alert("포인트가 부족합니다!");
    return;
  }

  points -= costPerPlay;
  updatePoints();

  $result.innerHTML = "";
  $bonus.innerHTML = "";
  $rank.textContent = "";

  const candidate = Array.from({ length: 36 }, (_, i) => i + 1);
  const shuffle = [];

  while (candidate.length > 0) {
    const random = Math.floor(Math.random() * candidate.length);
    const spliceArray = candidate.splice(random, 1);
    const value = spliceArray[0];
    shuffle.push(value);
  }

  winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
  bonus = shuffle[6];

  for (let i = 0; i < winBalls.length; i++) {
    setTimeout(() => {
      showBall(winBalls[i], $result);
    }, (i + 1) * 1000);
  }

  setTimeout(() => {
    showBall(bonus, $bonus);
    const result = getRank(winBalls, bonus, Array.from(userNumbers));
    $rank.textContent = `결과: ${result.rank}`;
    showModal(result);
  }, 7000);
}

// 모달 창을 표시하는 함수
function showModal(result) {
  console.log("모달 창 표시");
  const sortedUserNumbers = Array.from(userNumbers).sort((a, b) => a - b);
  const message = `
                <strong>당첨번호:</strong> ${winBalls.join(", ")}<br><br>
                <strong>보너스 번호:</strong> ${bonus}<br><br>
                <strong>내 번호:</strong> ${sortedUserNumbers.join(
                  ", "
                )}<br><br>
                <strong>맞춘 개수:</strong> ${result.matchedNumbers}<br><br>
                <strong>결과:</strong> ${result.rank}<br><br>
                <strong>상품:</strong> ${result.prize}<br><br>
            `;
  $modalMessage.innerHTML = message;
  $modal.style.display = "block";
}

// 모달 창 닫기 버튼 이벤트 리스너
$closeModal.addEventListener("click", () => {
  $modal.style.display = "none";
});

// 모달 창 외부 클릭 시 닫기 이벤트 리스너
window.addEventListener("click", (event) => {
  if (event.target == $modal) {
    $modal.style.display = "none";
  }
});

// 초기 설정 및 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM 로드 완료");
  $resetNumbersButton.addEventListener("click", resetNumbers);
  $playButton.addEventListener("click", playLotto);
  updatePoints();
  createNumberSelects();
  updatePlayButtonState();
});
