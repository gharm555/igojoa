const costPerPlay = 150;
let isGameInProgress = false;
// DOM 요소 선택
const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");
const $playButton = document.querySelector("#playButton");
const $resetNumbersButton = document.querySelector("#resetNumbersButton");
const $numberInputs = document.querySelectorAll(".number-input");
const $points = document.querySelectorAll("#points");
const $pointsText = document.querySelectorAll(".points");
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
  !$numberInputs ||
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

// 유저가 선택한 번호를 업데이트하는 함수
function updateUserNumbers() {
  userNumbers.clear();
  $numberInputs.forEach((input) => {
    const value = parseInt(input.value);
    if (!isNaN(value) && value >= 1 && value <= 36) {
      userNumbers.add(value);
    }
  });
  updatePlayButtonState();
  console.log("현재 선택된 번호: ", Array.from(userNumbers));
}

// 새로운 함수: 플레이 버튼 상태 업데이트
function updatePlayButtonState() {
  $playButton.disabled = userNumbers.size !== 6;
}
// 선택된 숫자를 정렬하고 화면에 표시하는 함수
function sortAndDisplayNumbers() {
  const sortedNumbers = Array.from(userNumbers).sort((a, b) => a - b);
  $numberInputs.forEach((input, index) => {
    input.value = sortedNumbers[index] || "";
  });
}
// 선택된 숫자를 초기화하는 함수
function resetNumbers() {
  $numberInputs.forEach((input) => {
    input.value = "";
  });
  userNumbers.clear();
  updatePlayButtonState();
}
// 숫자 입력 시 1부터 36까지로 제한
$numberInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value < 1) input.value = 1;
    if (input.value > 36) input.value = 36;
    updateUserNumbers();
  });
});

// 초기값을 설정하는 함수
function setInitialNumbers() {
  for (let i = 0; i < 6; i++) {
    $numberInputs[i].value = i * 6 + 1; // 1, 7, 13, 19, 25, 31
  }
  updateUserNumbers();
  sortAndDisplayNumbers();
}

$resetNumbersButton.addEventListener("click", resetNumbers);
$playButton.addEventListener("click", playLotto);

// 로또 게임을 실행하는 함수
function playLotto() {
  if (isGameInProgress) {
    alert("이미 게임이 진행 중입니다.");
    return;
  }
  if (userNumbers.size !== 6) {
    console.log("번호가 6개 선택되지 않았습니다.");
    alert("6개의 번호를 선택해주세요.");
    return;
  }
  // 중복 번호 체크
  if (new Set(Array.from(userNumbers)).size !== 6) {
    alert("중복된 번호가 있습니다. 서로 다른 6개의 번호를 선택해주세요.");
    return;
  }
  if (points == null || points == "") {
    alert("로그인 해주세요");
    window.location.href = contextPath + "/user/loginRegister";
    return;
  }
  if (points < costPerPlay) {
    alert("포인트가 부족합니다!");
    return;
  }
  sortAndDisplayNumbers();

  // 게임 진행 중으로 설정
  isGameInProgress = true;
  // 버튼 비활성화
  $playButton.disabled = true;
  // 결과 초기화
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
    }, (i + 1) * 500);
  }
  axios
    .post(
      contextPath + "/game",
      {
        lottoNum: Array.from(winBalls),
        userNum: Array.from(userNumbers),
        bonusBall: bonus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("Success:", response.data);
      getPoints();
      setTimeout(() => {
        showBall(bonus, $bonus);
      }, 3500);
      setTimeout(() => {
        $rank.textContent = `결과: ${response.data.rank}`;
        showModal(response.data);
        isGameInProgress = false;
        $playButton.disabled = false;
      }, 5000);
    })
    .catch((error) => {
      alert(error.response.data);
      isGameInProgress = false;
      $playButton.disabled = false;
    });
}

// 모달 창을 표시하는 함수
function showModal(result) {
  console.log("모달 창 표시");
  const sortedUserNumbers = Array.from(userNumbers).sort((a, b) => a - b);
  const message = `
                <strong>당첨번호:</strong> ${result.lottoNum.join(", ")}<br><br>
                <strong>보너스 번호:</strong> ${result.bonusBall}<br><br>
                <strong>내 번호:</strong> ${result.userNum.join(", ")}<br><br>
                <strong>맞춘 개수:</strong> ${result.matchCount}<br><br>
                <strong>결과:</strong> ${result.rank}<br><br>
                <strong>상품:</strong> ${result.productName}<br><br>
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
  setInitialNumbers();
  updatePlayButtonState();
});
function getPoints() {
  axios.get(contextPath + "/user/getPoints").then((res) => {
    if (res.data.success) {
      let points = res.data.points.toString();
      let cumulativePoint = res.data.cumulativePoint.toString();
      points = points.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      cumulativePoint = cumulativePoint.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const $points = document.querySelectorAll(".points");
      $points.forEach(($point) => {
        $point.innerHTML = points;
      });
    } else {
      alert(res.data.message);
      window.location.href = contextPath + "/user/loginRegister";
    }
  });
}
