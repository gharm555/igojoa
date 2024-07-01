/* ---------------- 카카오 지도 (완료) ----------------- */
document.addEventListener("DOMContentLoaded", function () {
  
 // mapData 객체가 정의되어 있는지 확인
    if (typeof mapData !== "undefined") {
        var latitude = parseFloat(mapData.latitude);
        var longitude = parseFloat(mapData.longitude);

        if (typeof kakao !== "undefined" && !isNaN(latitude) && !isNaN(longitude)) {
            let $container = document.querySelector("#map");
            let kakaoMap = new kakao.maps.LatLng(latitude, longitude);
            let options = {
                center: kakaoMap,
                level: 3,
            };
            let map = new kakao.maps.Map($container, options);
            let markerPosition = kakaoMap;
            let marker = new kakao.maps.Marker({
                position: markerPosition,
            });
            marker.setMap(map);
        } else {
            if (typeof kakao === "undefined") {
                console.error("Kakao map API is not loaded.");
            }
            if (isNaN(latitude) || isNaN(longitude)) {
                console.error("Invalid latitude or longitude values.");
            }
        }
    } else {
        console.error("Map data is not defined.");
    }

/** ---------리뷰목록 관련 js ------- */

  const $reviewForm = document.querySelector("#reviewForm");
  const $reviewList = document.querySelector("#reviewList");
  const $difficultyBadge = document.querySelector("#difficultyBadge");
  const $sortDropdown = document.querySelector("#sortDropdown");
  const $sortDropdownButton = document.querySelector("#sortDropdownButton");

  let reviews = [];
  let currentSort = "newest";
  let page = 1;
  let isLoading = false;
  const initialPageSize = 8;
  const additionalPageSize = 4;

  // 난이도 카운트를 저장할 객체
  let difficultyCounts = {
    상: 0,
    중: 0,
    하: 0,
  };

  // 초기 난이도 뱃지 업데이트
  updateDifficultyBadge();

  // 리뷰 제출
  $reviewForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const selectedFeatures = Array.from(
      document.querySelectorAll('input[name="features"]:checked')
    ).map((input) => input.value);

    const selectedDifficulty =
      document.querySelector('input[name="difficulty"]:checked')?.value || "";

    const reviewText = document.querySelector("#reviewText").value;

    try {
      const response = await axios.post(
        `${pageContext.request.contextPath}/api/reviews`,
        {
          placeId: "{pd.placeName}", // JSP 표현식
          text: reviewText,
          features: selectedFeatures,
          difficulty: selectedDifficulty,
        }
      );

      if (response.data.success) {
        // 서버에서 새로운 리뷰 데이터를 반환한다고 가정
        const newReview = response.data.review;
        reviews.unshift(newReview);
        sortAndRenderReviews();

        if (selectedDifficulty) {
          difficultyCounts[selectedDifficulty]++;
          updateDifficultyBadge();
        }

        $reviewForm.reset();
      }
    } catch (error) {
      console.error("리뷰 제출 중 오류 발생:", error);
    }
  });

  function updateDifficultyBadge() {
    const maxDifficulty = Object.entries(difficultyCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    $difficultyBadge.textContent = `난이도: ${maxDifficulty}`;
  }

  // 정렬 함수
  async function sortAndRenderReviews() {
    try {
      const response = await axios.get(
        `${pageContext.request.contextPath}/api/reviews`,
        {
          params: {
            placeId: "${pd.placeId}", // JSP 표현식
            sort: currentSort,
            page: page,
            pageSize: (page - 1) * additionalPageSize + initialPageSize,
          },
        }
      );

      reviews = response.data.reviews;
      renderReviews();
    } catch (error) {
      console.error("리뷰 정렬 및 로딩 중 오류 발생:", error);
    }
  }

  // 리뷰 렌더링 함수
  function renderReviews() {
    $reviewList.innerHTML = "";
    reviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.className = "media mb-4";
      reviewElement.innerHTML = `
        <div class="media-content d-flex align-items-center justify-content-between w-100">
          <div class="d-flex flex-column">
            <div class="feature-tags mb-2">
              ${review.features
                .map(
                  (feature) =>
                    `<span class="badge bg-primary me-1">${feature}</span>`
                )
                .join("")}
              ${
                review.difficulty
                  ? `<span class="badge bg-secondary">난이도: ${review.difficulty}</span>`
                  : ""
              }
            </div>
            <div class="d-flex align-items-center">
              <img class="rounded-circle mr-3" src="${
                review.userProfileUrl || "https://placehold.co/30x30"
              }" alt="">
              <div class="media-body">
                <h5 class="mt-0 mb-0">${review.userName || "사용자 이름"}</h5>
                <p class="mb-0">${review.text}</p>
              </div>
            </div>
          </div>
          <div class="text-end">
            <small class="text-muted d-block">${new Date(
              review.createdAt
            ).toLocaleString()}</small>
            <button class="btn btn-sm btn-outline-primary mt-2 like-btn ${
              review.isLiked ? "active" : ""
            }" data-review-id="${review.id}">
              <i class="fas fa-thumbs-up"></i>
              <span class="like-count">${review.likes}</span>
            </button>
          </div>
        </div>
      `;
      $reviewList.appendChild(reviewElement);
    });
  }

  // 정렬 드롭다운 이벤트 리스너
  document.querySelectorAll(".dropdown-menu .dropdown-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelector(".dropdown-item.active")
        .classList.remove("active");
      this.classList.add("active");
      currentSort = this.dataset.sort;
      $sortDropdownButton.textContent = this.textContent;
      page = 1;
      sortAndRenderReviews();
    });
  });

  // 좋아요 버튼 이벤트 리스너
  $reviewList.addEventListener("click", async function (e) {
    const $button = e.target.closest(".like-btn");
    if ($button) {
      const reviewId = $button.dataset.reviewId;
      try {
        const response = await axios.post(
          `${pageContext.request.contextPath}/api/reviews/${reviewId}/like`
        );
        if (response.data.success) {
          const newLikeCount = response.data.likes;
          $button.classList.toggle("active");
          $button.querySelector(".like-count").textContent = newLikeCount;
        }
      } catch (error) {
        console.error("좋아요 처리 중 오류 발생:", error);
      }
    }
  });

  // 무한 스크롤 구현
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 &&
      !isLoading &&
      reviews.length >= (page - 1) * additionalPageSize + initialPageSize
    ) {
      loadMoreReviews();
    }
  });

  async function loadMoreReviews() {
    if (isLoading) return;
    isLoading = true;
    page++;
    try {
      await sortAndRenderReviews();
    } catch (error) {
      console.error("추가 리뷰 로딩 중 오류 발생:", error);
    } finally {
      isLoading = false;
    }
  }

  // 초기 리뷰 로딩
  sortAndRenderReviews();


/* --------------------- 5개의 뱃지 카운팅 (완료)---------------- */

function createEmojiList() {
  const $listContainer = document.querySelector("#emojiList");
  
  // count를 숫자로 변환하고 최대값 찾기
  const maxCount = Math.max(...emojiData.map(item => parseInt(item.count) || 0));

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
}

// 이모지 리스트 생성
document.addEventListener("DOMContentLoaded", function () {
  createEmojiList();
});

// 이모지 리스트 생성
document.addEventListener("DOMContentLoaded", function () {
  createEmojiList();
});




/*  -------- 위로가는 버튼 --------- */
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

/* ------------ 게시물 찜하기 버튼 ------------- */
document.addEventListener("DOMContentLoaded", function () {
  const $likeButton = document.querySelector("#likeButton");
  const $heartIcon = $likeButton.querySelector("i");

  let isLiked = false;

  $likeButton.addEventListener("click", function () {
    isLiked = !isLiked;

    if (isLiked) {
      $heartIcon.classList.remove("far");
      $heartIcon.classList.add("fas");
      $heartIcon.style.color = "#ff6b6b"; // 활성화 시 색상
    } else {
      $heartIcon.classList.remove("fas");
      $heartIcon.classList.add("far");
      $heartIcon.style.color = "#4a6fa5"; // 비활성화 시 색상
    }

    // 여기에 서버로 좋아요 상태를 보내는 코드를 추가할 수 있습니다.
    console.log("좋아요 상태:", isLiked);
  });
});
