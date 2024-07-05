document.addEventListener("DOMContentLoaded", function () {
  console.log("js에 들어왔다.");
  //(1)카카오 지도 초기화
  initializeKakaoMap();
  //(2)이모지 리스트 생성
  createEmojiList();

  //사용자의 작성 리뷰 생성
  showUserReview();

  //(3) 게시물의 모든리뷰 생성
  showAllReview();

  //(4)상세페이지 좋아요 버튼 활성화 //
  const $heartIcon = document.querySelector("#favoriteHeart");
  console.log("이까지 왔다 1111111111111112");

  //(8) 게시물 좋아요 하트 버튼 활성화 //
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

  /** --------------- (6) 장소의 avgIscore 값을 받아와서 장소이름 옆에 보여주기 ----------*/
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
        difficulty = "난이도: 하";
        break;
      case 2:
        difficulty = "난이도: 중";
        break;
      case 3:
        difficulty = "난이도: 상";
        break;
      default:
        console.log("올바르지 않은 IScore 값입니다:", avgiScore);
        return; // 올바르지 않은 값일 경우 함수 종료
    }

    // 난이도 텍스트 업데이트
    $iscoreBedge.textContent = difficulty;
    console.log(`난이도가 "${difficulty}"(으)로 설정되었습니다.`);
  } else {
    $iscoreBedge.textContent = "난이도: ";
  }

  ///// 리뷰의 좋아요 버튼 처리 /////////
  const $reviewListContainer = document.querySelector("#reviewList"); // 리뷰 리스트를 감싸는 컨테이너의 ID

  $reviewListContainer.addEventListener("click", function (event) {
    const likeButton = event.target.closest(".like-btn");
    if (likeButton) {
      const userId = likeButton.dataset.reviewId;
      reviewLike(userId, likeButton);
    }
  });

  function reviewLike(userId, button) {
    console.log("온클릭 들어옴 ");
    const placeName = pd.placeName;
    const heartIcon = button.querySelector("i");

    // 현재 좋아요 상태 확인
    const isCurrentlyLiked = heartIcon.classList.contains("bi-heart-fill");
    console.log("isCurrentlyLiked:", isCurrentlyLiked);
    // API 호출
    const uri = isCurrentlyLiked
      ? `${contextPath}/${encodeURIComponent(placeName)}/deleteReviewLike`
      : `${contextPath}/${encodeURIComponent(placeName)}/clickReviewLike`;
    if (!isCurrentlyLiked) {
      axios
        .put(uri, userId)
        .then((response) => {
          console.log("클릭리뷰 라이크 실행 값 :", response.data);

          heartIcon.classList.replace("bi-heart", "bi-heart-fill");
        })
        .catch((error) => {
          console.error("리뷰 좋아요 실패:", error);
          // 에러 처리
        });
    } else {
      console.log("리뷰의 좋아요 삭제 실패 들어옴");
      const formData = new URLSearchParams();
      formData.append("userId", userId);
      axios
        .post(uri, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          console.log("클릭리뷰 라이크 실행 값 :", response.data);

          heartIcon.classList.replace("bi-heart-fill", "bi-heart");
        })
        .catch((error) => {
          console.error("리뷰 좋아요 삭제 실패:", error);
          // 에러 처리
        });
    }
  }
});
/////////////////////////////////////////////돔돔돔돔//////////////////////////////////////////////////////////
// 버튼을 동적으로 변경하는 함수
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

//리뷰 작성 버튼 활성화 //
const $createReviewBtn = document.querySelector("#createReviewBtn");
console.log("이까지 왔다 2222222222222");
/** --------------------  리뷰 작성하기 버튼 -------------------------- */
function createReview() {
  review();

  const placeName = pd.placeName;
  const uri = `${contextPath}/${placeName}/newReview`;

  console.log("리뷰 보내는 주소: ", uri);
  const { reviewData } = review();

  axios
    .put(uri, reviewData)
    .then((response) => {
      console.log("Server response:", response.data);
      if (response.data === 0) {
        alert("방문 인증이 필요합니다.");
      } else {
        alert("리뷰가 성공적으로 등록되었습니다.");
        showUserReview();
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
  /** --------------- 리뷰 수정하기 버튼 ------------------------ */
  //리뷰 수정 버튼 활성화 //
  const $updateReviewBtn = document.querySelector("#updateReviewBtn");

  $updateReviewBtn.addEventListener("click", function () {
    console.log("수정하기 버튼 누름");
    review();

    const placeName = pd.placeName;
    const uri = `${contextPath}/${placeName}/updateReview`;

    console.log("리뷰 보내는 주소: ", uri);
    const { reviewData } = review();

    axios
      .put(uri, reviewData)
      .then((response) => {
        console.log("Server response:", response.data);
        if (response.data === 0) {
          alert("방문 인증이 필요합니다.");
        } else {
          alert("리뷰가 성공적으로 등록되었습니다.");
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
  });
  //(7)리뷰 삭제 버튼 활성화 //
  const $deleteReviewBtn = document.querySelector("#deleteReviewBtn");

  $deleteReviewBtn.addEventListener("click", function () {
    const placeName = pd.placeName;
    const uri = `${contextPath}/${placeName}/deleteReview`;

    axios
      .delete(uri, placeName)
      .then((response) => {
        console.log("추가 응답:", response.data);
      })
      .catch((error) => {
        console.error("추가 에러:", error);
        // 에러 시 상태 복구
        pd.userFavorite = 0;
      });
  });

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
        1: "하",
        2: "중",
        3: "상",
      };

      const badgeHtml = badges
        .map((badge) =>
          review[badge.name]
            ? `<span class="badge bg-primary me-1">${badge.text}</span>`
            : ""
        )
        .join("");

      const difficultyBadge = review.iscore
        ? `<span class="badge bg-secondary me-1">난이도: ${
            difficultyMap[review.iscore] || review.iscore
          }</span>`
        : `<h1>${review.iscore} 난이도 값은 이거다</h1>`;

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
            <p class="card-text mb-0" style="font-size: 0.875rem;">${
              review.review
            }</p>
          </div>
        </div>
      </div>
    </div>
  `;
    }
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

    // count를 숫자로 변환하고 최대값 찾기
    const maxCount = Math.max(
      ...emojiData.map((item) => {
        const count = parseInt(item.count) || 0;
        console.log(`${item.key} count:`, count); // 디버깅: 각 항목의 count 출력
        return count;
      })
    );

    console.log("maxCount:", maxCount); // 디버깅: maxCount 출력

    $listContainer.innerHTML = ""; // 기존 내용 초기화

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
      $listContainer.appendChild(emojiItem);
    });

    console.log("Emoji list created successfully");
  }

  /* ---------------------------- 카카오 지도 -------------------------- */
  function initializeKakaoMap() {
    if (
      typeof mapData !== "undefined" &&
      mapData.latitude &&
      mapData.longitude
    ) {
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

  /////////////////////////////
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
}
