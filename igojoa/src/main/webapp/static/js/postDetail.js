document.addEventListener("DOMContentLoaded", function () {
  console.log("js에 들어왔다.");
  // (1)카카오 지도 초기화
  initializeKakaoMap();

  // (2)이모지 리스트 생성
  createEmojiList();

  // (3) 게시물의 모든리뷰 생성
  showAllReview();

  ////// (4)상세페이지 좋아요 버튼 활성화 ////////
  const $heartIcon = document.querySelector("#favoriteHeart");

  function updateHeartIcon() {
    if (pd.userFavorite === 0) {
      $heartIcon.classList.add("bi-heart");
      $heartIcon.classList.remove("bi-heart-fill");
    } else {
      $heartIcon.classList.add("bi-heart-fill");
      $heartIcon.classList.remove("bi-heart");
    }
  }

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

  /** ------------------ (5)로그인한 유저가 작성한 리뷰 가지고 오기 ------------------- */
  // 모든 체크박스 레이블을 선택합니다.
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

  /** --------------------  리뷰 수정하기 -------------------------- */
  // TODO: 수정하기 버튼 만들기

  function updateReview() {
    const reviewData = {
      parkingAvailable: pd.parkingAvailable ? 1 : 0,
      view: pd.view ? 1 : 0,
      freeEntry: pd.freeEntry ? 1 : 0,
      nightView: pd.nightView ? 1 : 0,
      easyTransport: pd.easyTransport ? 1 : 0,
      iScore: pd.iScore,
      review: pd.review,
    };

    console.log("reviewData: ", reviewData);

    const placeName = pd.placeName;
    const uri = `/${placeName}/newReview`;
    console.log("리뷰전체 불러오기에서 보내는 주소: ", uri);

    axios
      .put(uri, reviewData)
      .then((response) => {
        console.log("Review updated successfully:", response.data);
        alert("리뷰가 성공적으로 업데이트되었습니다.");
        // 필요한 경우 여기서 페이지를 새로고침하거나 데이터를 다시 불러오기.
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        if (error.response) {
          alert(error.response.data);
        } else {
          alert("리뷰 업데이트에 실패했습니다.");
        }
      });
  }

 



});
///////////////////////////////////////////////////////////////////////////////////////////////////////


//TODO:
/** ---------------- 게시물에 달린 모든 리뷰 가져오기 ----------------------- */
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
      displayReviews(response.data);
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

function displayReviews(reviews) {
  console.log("Displaying reviews:", reviews);

  // 댓글 목록 html 삽입이 될 섹션
  const $reviewListSection = document.querySelector("#reviewList");

  if (!$reviewListSection) {
    console.error("#reviewList element not found");
    return;
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    $reviewListSection.innerHTML = "<p>아직 리뷰가 없습니다.</p>";
    return;
  }

  let htmlStr = "";
  reviews.forEach((review) => {
    htmlStr += `
    <div class="card card-body my-1">
                <div style="font-size: 0.825rem;">
                    <span>${review.userId}</span>
                    <span class="fw-bold">${review.userId}</span>
                    <span class="text-secondary">${review.userId}</span>
                </div>
                <div>${review.review}</div>
              
            </div>`;
  });

  $reviewListSection.innerHTML = htmlStr;
  console.log("Reviews displayed");
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
