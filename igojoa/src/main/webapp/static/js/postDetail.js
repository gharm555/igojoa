document.addEventListener("DOMContentLoaded", function () {
  // 카카오 지도 초기화
  initializeKakaoMap();

  // 이모지 리스트 생성
  createEmojiList();

	// 리뷰목록 불러오기	
  reviews();

userReview();	

});

  /* ------------ 게시물 찜하기 버튼  TODO ------------- */

  

  /**  댓글 불러오기 */
  

  // 게시물에 달려 있는 모든 댓글 목록 가져오기
  function reviews() {
    const uri = `./place/details/${pd.placeName}`;
    axios
      .get(uri)
      .then((response) => {
        console.log(response.data);
        renderReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:");
        // 사용자에게 오류 메시지를 표시
        document.querySelector("#reviewList").innerHTML =
          "<p>리뷰를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.</p>";
      });
  }
  
 

   function userReview() {
     const uri = `./place/details/${pd.placeName}`;
    axios
    .get(uri)
    .then(response => {
        updateReviewForm(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
        if (error.response) {
            // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else if (error.request) {
            // 요청이 전송되었지만 응답을 받지 못한 경우
            console.error('No response received:', error.request);
        } else {
            // 요청 설정 중에 오류가 발생한 경우
            console.error('Error setting up request:', error.message);
        }
    });
}




  

function updateReviewForm(data) {
    // 체크박스 업데이트
    document.getElementById('btncheck1').checked = data.parkingAvailable;
    document.getElementById('btncheck2').checked = data.goodView;
    document.getElementById('btncheck3').checked = data.freeEntry;
    document.getElementById('btncheck4').checked = data.nightView;
    document.getElementById('btncheck5').checked = data.easyTransport;

    // 난이도 라디오 버튼 업데이트
    document.getElementById(`btnradio${data.difficulty}`).checked = true;

    // 리뷰 텍스트 업데이트
    document.getElementById('reviewText').value = data.reviewText;
}

// 폼 제출 처리

    e.preventDefault();

    const formData = new FormData(this);
    const reviewData = {
        parkingAvailable: formData.get('features').includes('주차가능'),
        goodView: formData.get('features').includes('경치좋은'),
        freeEntry: formData.get('features').includes('무료입장'),
        nightView: formData.get('features').includes('야경'),
        easyTransport: formData.get('features').includes('교통원활'),
        difficulty: formData.get('difficulty') === '상' ? 1 : (formData.get('difficulty') === '중' ? 2 : 3),
        reviewText: formData.get('reviewText')
    };

    axios.post('/api/review', reviewData, {
        params: {
            placeName: placeName
        }
    })
    .then(response => {
        console.log('Review submitted successfully:', response.data);
        // 여기에 성공 메시지 표시 또는 페이지 리로드 등의 로직 추가
    })
    .catch(error => {
        console.error('Error submitting review:', error);
        // 여기에 오류 메시지 표시 로직 추가
    });

  
  
  
  
  
  
  

/* 카카오 지도 */
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


/* 이모지 리스트 생성 */
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






// 리뷰 렌더링 함수
const $reviewList = document.querySelector("div#rereviewList");
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
