document.addEventListener("DOMContentLoaded", function () {
  console.log("js에 들어왔다.");

  // 이모지 리스트 생성
  createEmojiList();

  //사용자의 작성 리뷰 생성
  showUserReview();

  // 게시물의 모든리뷰 생성
  showAllReview();

  // 리뷰 작성, 수정, 삭제 버튼들 활성화
  updateReviewButtons();

  // 상세페이지 좋아요 버튼 활성화
  const $heartIcon = document.querySelector("#favoriteHeart");
  console.log("이까지 왔다 1111111111111112");

  // 게시물 좋아요 하트 아이콘
  function updateHeartIcon() {
    if (pd.userFavorite === 0) {
      $heartIcon.classList.add("bi-heart");
      $heartIcon.classList.remove("bi-heart-fill");
    } else {
      $heartIcon.classList.add("bi-heart-fill");
      $heartIcon.classList.remove("bi-heart");
    }
  }
  console.log("이까지 왔다 333333333333333");
  // 초기 상태 설정
  updateHeartIcon();

  $heartIcon.addEventListener("click", function () {
    // 상태 토글
    pd.userFavorite = pd.userFavorite === 0 ? 1 : 0;

    // UI 업데이트
    updateHeartIcon();

    console.log("Current userFavorite:", pd.userFavorite);

    const placeName = pd.placeName;

    if (pd.userFavorite === 0) {
      //(좋아요 취소)
      const deleteUri = `${contextPath}/deleteHeart/${placeName}`;
      console.log("Delete URI:", deleteUri);

      axios
        .delete(deleteUri)
        .then((response) => {
          console.log("삭제 응답:", response.data);
        })
        .catch((error) => {
          console.error("삭제 에러:", error);
          // 에러 시 상태 복구
          pd.userFavorite = 1;
          updateHeartIcon();
        });
    } else {
      //(좋아요 추가)
      const addUri = `${contextPath}/clickHeart`;
      console.log("Add URI:", addUri);

      axios
        .put(addUri, placeName)
        .then((response) => {
          console.log("추가 응답:", response.data);
        })
        .catch((error) => {
          console.error("추가 에러:", error);
          // 에러 시 상태 복구
          pd.userFavorite = 0;
          updateHeartIcon();
        });
    }
  });

  /** ---------------  장소의 avgIscore 값을 받아와서 장소이름 옆에 보여주기 ----------*/
  const $iscoreBedge = document.querySelector("#iscoreBedge");
  const avgiScore = $iscoreBedge.textContent.trim();

  const regex = /^\s*$/;

  // iScore가 공백이 아닐 때 실행
  if (!regex.test(avgiScore) && avgiScore !== "") {
    console.log("avgIScore:", avgiScore);

    let difficulty;
    // iScore 값에 따라 난이도 설정
    switch (Number(avgiScore)) {
      case 1:
        difficulty = "아이난이도: 하";
        color = "success";
        break;
      case 2:
        difficulty = "아이난이도: 중";
        color = "warning";
        break;
      case 3:
        difficulty = "아이난이도: 상";
        color = "danger";
        break;
      default:
        console.log("올바르지 않은 IScore 값입니다:", avgiScore);
        return; // 올바르지 않은 값일 경우 함수 종료
    }

    // 난이도 텍스트 업데이트
    $iscoreBedge.textContent = difficulty;
    $iscoreBedge.className = `badge bg-${color} ms-2`;
    console.log(`난이도가 "${difficulty}"(으)로 설정되었습니다.`);
  } else {
    $iscoreBedge.textContent = "아이난이도: ";
    $iscoreBedge.className = "badge bg-secondary";
  }

  ///// ---------------- 리뷰의 좋아요 버튼 처리 ------------- /////////
  const $reviewListContainer = document.querySelector("#reviewList"); // 리뷰 리스트를 감싸는 컨테이너의 ID

  $reviewListContainer.addEventListener("click", function (event) {
    const likeButton = event.target.closest(".like-btn");
    if (likeButton) {
      const userId = likeButton.dataset.reviewId;
      reviewLike(userId, likeButton);
    }
  });

  function reviewLike(userId, button) {
    console.log("클릭 들어옴 ");
    const placeName = pd.placeName;
    const heartIcon = button.querySelector("i");
    const likeCountSpan = button.querySelector(".like-count");
    let currentCount = parseInt(likeCountSpan.textContent);

    // 현재 좋아요 상태 확인
    const isCurrentlyLiked = heartIcon.classList.contains("bi-heart-fill");
    console.log("isCurrentlyLiked:", isCurrentlyLiked);
    // API 호출
    const uri = isCurrentlyLiked
      ? `${contextPath}/${encodeURIComponent(
          placeName
        )}/deleteReviewLike?userId=` + userId
      : `${contextPath}/${encodeURIComponent(placeName)}/clickReviewLike`;
    if (!isCurrentlyLiked) {
      axios
        .put(uri, userId)
        .then((response) => {
          console.log("클릭리뷰 라이크 실행 값 :", response.data);
          console.log("currentCount", currentCount);
          heartIcon.classList.replace("bi-heart", "bi-heart-fill");
          currentCount += 1;
          likeCountSpan.textContent = currentCount;
        })
        .catch((error) => {
          console.error("리뷰 좋아요 실패:", error);
          // 에러 처리
        });
    } else {
      console.log("리뷰의 좋아요 삭제 실패에 들어옴");

      const formData = new URLSearchParams();
      formData.append("userId", userId);
      axios
        .delete(uri)
        .then((response) => {
          console.log("클릭리뷰 딜리트라이크 실행 값 :", response.data);

          heartIcon.classList.replace("bi-heart-fill", "bi-heart");
          currentCount -= 1;
          likeCountSpan.textContent = currentCount;
        })
        .catch((error) => {
          console.error("리뷰 좋아요 삭제 실패:", error);
          // 에러 처리
        });
    }
  }
});
/////////////////////////////////////////////돔돔돔돔 끝끝끝끝//////////////////////////////////////////////////////////

// ---------------- 작성, 수정, 삭제 버튼을 동적으로 변경하는 함수
function updateReviewButtons() {
  const $container = document.querySelector("#reviewButtonsContainer");
  if (pd.review) {
    $container.innerHTML = `
        <button id="updateReviewBtn" type="button" class="btn btn-warning">수정하기</button>
        <button id="deleteReviewBtn" type="button" class="btn btn-danger">삭제하기</button>
      `;
    document
      .querySelector("#updateReviewBtn")
      .addEventListener("click", updateReview);
    document
      .querySelector("#deleteReviewBtn")
      .addEventListener("click", deleteReview);
  } else {
    $container.innerHTML = `
        <button id="createReviewBtn" type="button" class="btn btn-primary">작성완료</button>
      `;
    document
      .querySelector("#createReviewBtn")
      .addEventListener("click", createReview);
  }
}

console.log("이까지 왔다 2222222222222");
/** --------------------  리뷰 작성하기 버튼 -------------------------- */
const regex = /^\s*$/;
function createReview() {
  review();

  const placeName = pd.placeName;
  const uri = `${contextPath}/${placeName}/newReview`;

  console.log("리뷰 보내는 주소: ", uri);
  const { reviewData } = review();
  console.log("reviewData", reviewData);
  console.log("reviewData.review", reviewData.review);

  if (regex.test(reviewData.review)) {
    alert("리뷰 내용을 작성해주세요.");
    return;
  } else {
    axios
      .put(uri, reviewData)
      .then((response) => {
        console.log("Server response:", response.data);
        if (response.data === 0) {
          alert("방문 인증이 필요합니다.");
        } else {
          console.log("response.data이거다", response.data);
          alert("리뷰가 성공적으로 등록되었습니다.");
          pd.review = reviewData.review;
          updateReviewButtons();
          displayReviews(response.data);
          sortDropdownButton.textContent = "최신순";
        }
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        if (error.response) {
          console.error("Server error response:", error.response.data);
          alert(error.response.data);
        } else {
          alert("리뷰 등록에 실패했습니다.");
        }
      });
  }
}

/** --------------- 리뷰 수정하기 버튼 ------------------------ */

function updateReview() {
  console.log("수정하기 버튼 누름");
  review();

  const placeName = pd.placeName;
  const uri = `${contextPath}/${placeName}/updateReview`;

  console.log("리뷰 보내는 주소: ", uri);
  const { reviewData } = review();

  if (regex.test(reviewData.review)) {
    alert("리뷰 내용을 작성해주세요.");
    return;
  } else {
    axios
      .put(uri, reviewData)
      .then((response) => {
        console.log("Server response:", response.data);
        if (response.data === 0) {
          alert("방문 인증이 필요합니다.");
        } else {
          alert("리뷰가 성공적으로 수정되었습니다.");
          pd.review = reviewData.review;
          displayReviews(response.data);
          sortDropdownButton.textContent = "최신순";
        }
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        if (error.response) {
          console.error("Server error response:", error.response.data);
          alert(error.response.data);
        } else {
          alert("리뷰 수정에 실패했습니다.");
        }
      });
  }
}

/** --------------- 리뷰삭제 버튼 -----------------------------*/
function deleteReview() {
  const placeName = pd.placeName;
  const uri = `${contextPath}/${placeName}/deleteReview`;

  axios
    .delete(uri)
    .then((response) => {
      console.log("삭제 응답:", response.data);
      alert("리뷰가 성공적으로 삭제되었습니다.");
      pd.review = null;
      updateReviewButtons(); // 버튼 상태 업데이트
      resetReviewForm(); // 폼 초기화
      showAllReview(); // 리뷰 목록 새로고침
      sortDropdownButton.textContent = "좋아요 많은순";
    })
    .catch((error) => {
      console.error("삭제 에러:", error);
      alert("리뷰 삭제에 실패했습니다.");
    });
}

//리뷰작성 폼에 있는 값을 만드는 객체 (재사용성을 위해서 따로 만들었음)
function review() {
  console.log("리뷰작성 버튼 실행실행");
  const selectedRadio = document.querySelector(
    'input[name="difficulty"]:checked'
  );
  let difficulty;

  console.log(`리뷰작성 버튼2 selectedRadio 실행실행`);
  if (selectedRadio) {
    switch (selectedRadio.id) {
      case "btnradio1":
        console.log(`리뷰작성 버튼1 selectedRadio 실행실행`);
        difficulty = 3; // 상
        break;
      case "btnradio2":
        console.log(`리뷰작성 버튼2 selectedRadio 실행실행`);
        difficulty = 2; // 중
        break;
      case "btnradio3":
        console.log(`리뷰작성 버튼3 selectedRadio 실행실행`);
        difficulty = 1; // 하
        break;
    }
    console.log("스위치문 나왔다");
  } else {
    console.log("난이도가 선택되지 않았습니다.");
    alert("난이도를 선택해주세요.");
    return; // 난이도 선택이 없으면 함수 종료
  }

  console.log("리뷰작성 버튼4 실행실행");
  const reviewData = {
    review: document.querySelector("#reviewText").value,
    parkingAvailable: document.querySelector("#btncheck1").checked ? 1 : 0,
    view: document.querySelector("#btncheck2").checked ? 1 : 0,
    nightView: document.querySelector("#btncheck3").checked ? 1 : 0,
    freeEntry: document.querySelector("#btncheck4").checked ? 1 : 0,
    easyTransport: document.querySelector("#btncheck5").checked ? 1 : 0,
    iscore: difficulty,
  };

  return { reviewData };
}

/** ---------------- 게시물에 달린 모든 리뷰 호출 ----------------------- */
function showAllReview() {
  const placeName = pd.placeName;
  if (!placeName) {
    console.error("placeName is undefined");
    return;
  }

  const uri = `${contextPath}/${encodeURIComponent(
    placeName
  )}/selectDefaultReview`;
  console.log("모든 리뷰 가져오기 URI:", uri);

  axios
    .get(uri)
    .then((response) => {
      console.log("가져온 리뷰 목록:", response.data);
      displayReviews(response.data); // 게시물에 달린 리뷰들을 displayReviews 함수로 보냄
    })
    .catch((error) => {
      console.error("리뷰 가져오기 실패:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
      } else if (error.request) {
        console.error("응답 없음");
      } else {
        console.error("요청 오류:", error.message);
      }
    });
}

// 리뷰를 만드는 함수
function displayReviews(reviews) {
  const $reviewListSection = document.querySelector("#reviewList");

  if (!$reviewListSection) {
    console.error("#reviewList element not found");
    return;
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    $reviewListSection.innerHTML = "";
    return;
  }

  const htmlStr = reviews.map((review) => createReviewCard(review)).join("");
  $reviewListSection.innerHTML = htmlStr;

  console.log("Reviews displayed");
}

// 리뷰에 들어갈 값
function createReviewCard(review) {
  const badges = [
    { name: "parkingAvailable", text: "🚗 주차가능" },
    { name: "view", text: "🏞️ 경치좋은" },
    { name: "nightView", text: "🌃 야경" },
    { name: "freeEntry", text: "💵 무료입장" },
    { name: "easyTransport", text: "🛣️ 교통원활" },
  ];

  const difficultyMap = {
    1: { text: "하", color: "success" },
    2: { text: "중", color: "warning" },
    3: { text: "상", color: "danger" },
  };

  const badgeHtml = badges
    .map((badge) =>
      review[badge.name]
        ? `<span class="badge bg-primary me-1">${badge.text}</span>`
        : ""
    )
    .join("");

  const difficultyBadge = review.iscore
    ? `<span class="badge bg-${
        difficultyMap[review.iscore]?.color || "secondary"
      } bg-gradient me-1">아이난이도: ${
        difficultyMap[review.iscore]?.text || review.iscore
      }</span>`
    : "";
  const formattedDate = formatDate(review.modifiedAt);

  return `
  <div class="card mb-2">
    <div class="card-body py-2 px-3">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div>
          ${badgeHtml}
          ${difficultyBadge}
        </div>
      <button class="btn btn-outline-primary btn-sm like-btn p-1" data-review-id="${
        review.nickName
      }">
<i class="bi bi-heart${review.myLike ? "-fill" : ""}"></i>
<span class="like-count">${review.cntLike || 0}</span>
</button>

      </div>
      <div class="d-flex">
        <img src="${
          review.userProfileUrl
        }" alt="User profile" class="rounded-circle me-2" style="width: 55px; height: 55px;">
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 id="nickName"class="card-title mb-0">${review.nickName}</h5>
            <small class="text-muted" style="font-size: 0.75rem;">${formattedDate}</small>
          </div>
          <p class="card-text mb-0" style="font-size: 0.95rem; font-weight: 500;">${
            review.review
          }</p>
        </div>
      </div>
    </div>
  </div>
`;
}

/* ----------------------------  이모지 리스트 생성 ------------------------- */
function createEmojiList() {
  console.log("Creating Emoji List");
  console.log("emojiData:", emojiData); // 디버깅: emojiData 출력

  const $listContainer = document.querySelector("#emojiList");
  if (!$listContainer) {
    console.error("#emojiList element not found");
    return;
  }

  // h2 요소 다음에 새로운 컨테이너 추가
  const $emojiContainer = document.createElement("div");
  $emojiContainer.className = "emoji-container";
  $listContainer.appendChild($emojiContainer);

  // count를 숫자로 변환하고 최대값 찾기
  const maxCount = Math.max(
    ...emojiData.map((item) => {
      const count = parseInt(item.count) || 0;
      console.log(`${item.key} count:`, count); // 디버깅: 각 항목의 count 출력
      return count;
    })
  );

  console.log("maxCount:", maxCount); // 디버깅: maxCount 출력

  // $listContainer.innerHTML = ""; // 기존 내용 초기화

  emojiData.forEach((item) => {
    const emojiItem = document.createElement("div");
    emojiItem.className = "emoji-item";

    // count를 숫자로 변환
    const count = parseInt(item.count) || 0;
    const ratio = maxCount > 0 ? (count / maxCount) * 100 : 0;

    emojiItem.innerHTML = `
      <div class="background-fill" style="width: ${ratio}%;"></div>
      <div class="emoji-content">
        <span class="emoji">${item.emoji}</span>
        <span class="text">${item.text}</span>
      </div>
      <span class="count">${count}</span>
    `;
    $emojiContainer.appendChild(emojiItem);
  });

  console.log("Emoji list created successfully");
}

/* ---------------------------- 카카오 지도 -------------------------- */
function initializeKakaoMap() {
  if (typeof mapData !== "undefined" && mapData.latitude && mapData.longitude) {
    var latitude = parseFloat(mapData.latitude);
    var longitude = parseFloat(mapData.longitude);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      if (typeof kakao !== "undefined" && kakao.maps) {
        let $container = document.querySelector("#map");
        if ($container) {
          let kakaoMap = new kakao.maps.LatLng(latitude, longitude);
          let options = {
            center: kakaoMap,
            level: 3,
          };
          console.log(kakaoMap);
          let map = new kakao.maps.Map($container, options);
          let markerPosition = kakaoMap;
          let marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        } else {
          console.error("Map container not found");
        }
      } else {
        console.error("Kakao maps API not loaded");
      }
    } else {
      console.error("Invalid latitude or longitude values");
    }
  } else {
    console.error("Map data is not defined or incomplete");
  }
}
initializeKakaoMap();

/*  ----------------------- 위로가는 버튼 ---------------------------- */
//  버튼 요소 선택
const $scrollToTopBtn = document.querySelector("#scrollToTopBtn");

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  // 페이지를 100px 이상 스크롤했을 때 버튼 표시
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    $scrollToTopBtn.style.display = "block";
  } else {
    $scrollToTopBtn.style.display = "none";
  }
}

// 버튼 클릭 이벤트 리스너 추가
$scrollToTopBtn.addEventListener("click", function () {
  // 부드러운 스크롤 효과로 페이지 최상단으로 이동
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/** ---------------------- 날짜 변환 ------------- ---------- */
function formatDate(dateArray) {
  if (!Array.isArray(dateArray) || dateArray.length < 6) {
    console.error("Invalid date array:", dateArray);
    return "Invalid Date";
  }

  const [year, month, day, hour, minute, second] = dateArray;
  const date = new Date(year, month - 1, day, hour, minute, second);

  const pad = (num) => num.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

/** ------------------ (5)로그인한 유저가 작성한 리뷰 가지고 오기 ------------------- */
// 모든 체크박스 레이블을 선택합니다.
function showUserReview() {
  const $labels = document.querySelectorAll(
    '.btn-group[aria-label="Basic checkbox toggle button group"] label'
  );

  // 각 레이블에 대해 반복합니다.
  $labels.forEach((label) => {
    // 레이블에 연결된 체크박스를 찾습니다.
    const checkbox = document.getElementById(label.getAttribute("for"));

    // 데이터 속성 이름을 결정합니다 (예: data-parkingAvailable, data-view 등).
    const dataAttr = Object.keys(label.dataset)[0];

    // 데이터 속성 값을 확인합니다.
    if (label.dataset[dataAttr] === "1") {
      // 값이 1이면 체크박스를 선택 상태로 만듭니다.
      checkbox.checked = true;
    }
  });

  let radioId;
  switch (pd.iScore) {
    case 1:
      radioId = "btnradio3"; // 하
      break;
    case 2:
      radioId = "btnradio2"; // 중
      break;
    case 3:
      radioId = "btnradio1"; // 상
      break;
    default:
      console.log("Invalid iScore value:", pd.iScore);
      radioId = null; // 유효하지 않은 값일 경우 null로 설정
  }

  console.log("Selected radioId:", radioId);

  if (radioId) {
    // 해당하는 라디오 버튼을 선택합니다.
    const $radioButton = document.querySelector(`#${radioId}`);
    console.log("선택한 라디오버튼 :", $radioButton);

    if ($radioButton) {
      $radioButton.checked = true;
      console.log("Radio button checked:", radioId);
    } else {
      console.log("Radio button not found for id:", radioId);
    }
  } else {
    console.log("No valid radioId selected");
  }
}

/** =--------------드롭다운 버튼 --------------- */
const sortDropdownButton = document.getElementById("sortDropdownButton");
const dropdownItems = document.querySelectorAll(".dropdown-item1");

let sortObject = {
  orderBy: "cntLikeDESC",
  startRowValue: 0,
  rowCnt: 8,
};

dropdownItems.forEach((item) => {
  item.addEventListener("click", function () {
    // 버튼 텍스트 변경
    sortDropdownButton.textContent = this.textContent;

    // 선택된 아이템에 active 클래스 추가, 다른 아이템에서는 제거
    dropdownItems.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");

    const sortType = this.getAttribute("data-sort");
    sortObject.orderBy = sortType;

    // 정렬 요청 보내기
    currentPage = 1;
    allReviews = []; // 전체 리뷰 배열 초기화
    sendSortRequest(sortObject);
  });
});

function sendSortRequest(sortObject) {
  console.log("정렬 요청:", sortObject);

  const placeName = pd.placeName;
  const uri = `${contextPath}/${placeName}/sortReview`;

  // 정렬 시 페이지 초기화
  currentPage = 1;
  sortObject.startRowValue = 0;
  sortObject.rowCnt = initialItemCount;

  axios
    .get(uri, { params: sortObject })
    .then((response) => {
      console.log("정렬 결과:", response.data);
      allReviews = response.data;
      displayReviews(response.data);
    })
    .catch((error) => {
      console.error("정렬 요청 실패:", error);
    });
}

/** ************************ 무한스크롤 *************************  */

let isLoading = false;
let currentPage = 1;
const initialItemCount = 8; //처음 불러오는 값
const additionalItemCount = 4; //추가로 불러오는 리뷰 갯수
let allReviews = []; //전체 리뷰를 담을 배열

let sortObject1 = {
  orderBy: "cntLikeDESC",
  startRowValue: 0,
  rowCnt: initialItemCount,
};

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
    !isLoading
  ) {
    loadMoreReviews();
  }
});

function loadMoreReviews() {
  if (isLoading) return;
  isLoading = true;

  // 정렬 객체 업데이트
  sortObject.startRowValue =
    initialItemCount + (currentPage - 1) * additionalItemCount;
  sortObject.rowCnt = additionalItemCount;

  const placeName = pd.placeName;
  const uri = `${contextPath}/${placeName}/sortReview`;

  axios
    .get(uri, { params: sortObject })
    .then((response) => {
      console.log("추가 리뷰 로드:", response.data);
      if (response.data.length > 0) {
        // 새 리뷰를 기존 리뷰 목록에 추가
        allReviews = allReviews.concat(response.data);
        appendReviews(response.data);
        currentPage++;
      } else {
        console.log("더 이상 불러올 리뷰가 없습니다.");
      }
    })
    .catch((error) => {
      console.error("추가 리뷰 로드 실패:", error);
    })
    .finally(() => {
      isLoading = false;
    });
}

function appendReviews(newReviews) {
  const $reviewListSection = document.querySelector("#reviewList");
  const newReviewsHtml = newReviews
    .map((review) => createReviewCard(review))
    .join("");
  $reviewListSection.insertAdjacentHTML("beforeend", newReviewsHtml);
}

// -------------- 페이지 로드(f5) 시 스크롤을 최상단으로 이동 --------------
window.onload = function () {
  window.scrollTo(0, 0);
};

// -----------------  리뷰 폼 초기화 함수 --------------
function resetReviewForm() {
  // 텍스트 영역 초기화
  document.querySelector("#reviewText").value = "";

  // 체크박스 초기화
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
