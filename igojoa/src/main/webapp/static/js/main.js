document.addEventListener("DOMContentLoaded", () => {
  const $searchButton = document.querySelector("#search-button");
  const $provinceSelect = document.querySelector("#province-select");
  const $searchKeyword = document.querySelector("#search-keyword");
  const $cardContainer = document.querySelector(".row.text-center");
  const $moreButton = document.querySelector("#btnPlus");

  let currentPage = 0;
  const itemsPerPage = 3;

  // 도/광역시 값을 한글로 매핑
  const provinceMap = {
    seoul: "서울시",
    gyeonggi: "경기도",
    gangwon: "강원도",
    jeollabuk: "전라북도",
    jeollanam: "전라남도",
    gyeongsangbuk: "경상북도",
    gyeongsangnam: "경상남도",
    chungcheongbuk: "충청북도",
    chungcheongnam: "충청남도",
    busan: "부산시",
    daegu: "대구시",
    incheon: "인천시",
    gwangju: "광주시",
    daejeon: "대전시",
    ulsan: "울산시",
    jeju: "제주도",
  };

  $searchButton.addEventListener("click", function () {
    currentPage = 0;
    $cardContainer.innerHTML = ""; // 기존 카드 제거
    $moreButton.style.display = "block"; // '더보기' 버튼 표시

    fetchPlaces();
  });

  function fetchPlaces() {
    const selectedProvince = $provinceSelect.value || ""; // 선택된 값이 없을 경우 빈 문자열로 설정
    const addressCategory = provinceMap[selectedProvince] || ""; // 한글 매핑 값으로 설정
    const searchKeyword = $searchKeyword.value.trim() || ""; // 값이 없을 경우 빈 문자열로 설정

    console.log("Sending request with:", { addressCategory, searchKeyword });

    axios
      .get("./search", {
        params: {
          addressCategory: addressCategory,
          searchKeyword: searchKeyword,
          sortKey: "date",
          sortValue: 1,
          startRowValue: currentPage * itemsPerPage,
          rowCnt: itemsPerPage,
        },
      })
      .then((response) => {
        console.log("Received response from server:", response.data);
        const $newPlaces = response.data;

        if ($newPlaces.length === 0 && currentPage === 0) {
          $cardContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
          $moreButton.style.display = "none";
          return;
        }

        $newPlaces.forEach((place) => {
          console.log("Adding new place:", place);
          const $newCard = createCard(place);
          $cardContainer.appendChild($newCard);
        });

        if ($newPlaces.length < itemsPerPage) {
          $moreButton.style.display = "none";
        } else {
          $moreButton.style.display = "block";
        }

        currentPage++;
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        if (currentPage === 0) {
          $cardContainer.innerHTML =
            "<p>검색 중 오류가 발생했습니다. 다시 시도해 주세요.</p>";
        } else {
          alert(
            "데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요."
          );
        }
        $moreButton.style.display = "none";
      });
  }

  $moreButton.addEventListener("click", fetchPlaces);

  function createCard(place) {
    const $newCard = document.createElement("div");
    $newCard.classList.add("col-lg-4", "col-md-6", "mb-3", "card-item");
    $newCard.innerHTML = `
            <div class="main-card go-to-details" data-place-name="${place.placeName}">
                <div class="main-card-header bg-transparent">
                    <div class="d-flex justify-content-between align-items-center">
                        <h1 class="main-card-title">${place.placeName}</h1>
                        <i class="bi bi-heart main-custom-heart" data-place-name="${place.placeName}"></i>
                    </div>
                    <div class="main-badges mt-3">
                        <span class="badge">${place.highestBadge}</span>
                        <span class="badge">${place.secondHighestBadge}</span>
                        <span class="badge difficulty ${place.IScore}">난이도: ${place.IScore}</span>
                    </div>
                </div>
                <div class="d-flex justify-content-between my-3 mx-3">
                    <h3>${place.address}</h3>
                    <h4>누적방문수: ${place.placeVerified}</h4>
                </div>
                <div class="main-card-body">
                    <img src="${place.firstUrl}" alt="${place.placeName}" class="img-fluid mb-2" />
                    <img src="${place.secondUrl}" alt="${place.placeName}" class="img-fluid mb-2" />
                    <img src="${place.thirdUrl}" alt="${place.placeName}" class="img-fluid mb-2" />
                </div>
                <div class="main-card-footer bg-transparent">
                    <div class="footer-meta">
                        <div class="user-info">
                            <span class="username">${place.nickName}</span>
                        </div>
                        <div class="post-info">
                            <span class="date"><i class="bi bi-calendar3"></i> ${place.modifiedAt}</span>
                            <span class="likes"><i class="bi bi-heart-fill"></i> ${place.likeCount}</span>
                        </div>
                    </div>
                    <div class="comment-section">
                        <p class="comment-text"><i class="bi bi-chat-left-quote"></i> ${place.review}</p>
                    </div>
                </div>
            </div>
        `;
    return $newCard;
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("main-custom-heart")) {
      const heartIcon = event.target;
      const placeName = heartIcon.getAttribute("data-place-name");

      console.log("클릭된 장소 이름:", placeName); // 디버깅용 로그

      if (placeName) {
        heartIcon.classList.toggle("bi-heart");
        heartIcon.classList.toggle("bi-heart-fill");
        heartIcon.classList.toggle("red-color");

        let heartClickable = heartIcon.classList.contains("bi-heart-fill")
          ? 1
          : 0;
        heartIcon.setAttribute("data-user-favorite", heartClickable); // data-user-favorite 속성 업데이트

        if (heartClickable === 1) {
          console.log("하트 클릭됨:", placeName);
          const uri = "./clickHeart";

          axios
            .put(uri, placeName)
            .then((response) => {
              console.log("응답 데이터:", response.data);
            })
            .catch((error) => {
              console.error("에러 데이터:", error);
            });
        } else {
          console.log("하트 취소됨:", placeName);
          const uri = `./deleteHeart/${placeName}`;
          console.log("삭제 URI:", uri);

          axios
            .delete(uri)
            .then((response) => {
              console.log("응답 데이터:", response.data);
            })
            .catch((error) => {
              console.error("에러 데이터:", error);
            });
        }
      } else {
        console.error("placeName이 null입니다.");
      }
    }
  });

  // 스크롤 탑 버튼
  const $scrollToTopBtn = document.querySelector("#scrollToTopBtn");
  if ($scrollToTopBtn) {
    window.addEventListener("scroll", scrollFunction);

    function scrollFunction() {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        $scrollToTopBtn.style.display = "block";
      } else {
        $scrollToTopBtn.style.display = "none";
      }
    }

    $scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 카드 컨테이너에 이벤트 리스너 추가 (이벤트 위임)
  const cardContainer = document.querySelector(".row.text-center"); // 카드들을 포함하는 컨테이너의 선택자를 적절히 수정하세요

  if (cardContainer) {
    cardContainer.addEventListener("click", function (event) {
      const card = event.target.closest(".go-to-details");
      if (card) {
        const heartIcon = event.target.closest(".main-custom-heart");
        if (heartIcon) {
          return;
        } else {
          const placeName = card.getAttribute("data-place-name");
          if (placeName) {
            window.location.href = `${contextPath}/place/details/${placeName}`;
          }
        }
      }
    });
  }
  // 배너 버튼
  const $bannerToggle = document.querySelector("#banner-toggle");
  $bannerToggle.addEventListener("click", toggleBanner);
  function toggleBanner() {
    const $bannerContainer = document.querySelector(".banner-container");
    const $bannerToggle = document.querySelector(".banner-toggle");
    const $main = document.querySelector("main"); // main 요소 선택

    const isOpen = $bannerContainer.classList.toggle("open");

    if (isOpen) {
      const bannerHeight = $bannerContainer.scrollHeight;
      $main.style.marginTop = `${134 + bannerHeight}px`;
      $bannerToggle.innerHTML = '<i class="fas fa-chevron-up"></i> ';
    } else {
      $main.style.marginTop = "134px"; // 기본 네비게이션 바와 토글 버튼 높이
      $bannerToggle.innerHTML = '<i class="fas fa-chevron-down"></i> ';
    }
    window.addEventListener("scroll", closeBannerOnScroll, { passive: true });
  }

  // 문서 전체 클릭 이벤트 리스너 추가
  document.addEventListener("click", function (event) {
    const $userProfile = document.querySelector(".userProfile");
    const $dropdownMenu = document.querySelector(".dropdown-menu");

    // 클릭된 요소가 드롭다운 메뉴 또는 프로필 이미지가 아니면 드롭다운 메뉴 닫기
    if (!$userProfile.contains(event.target)) {
      $dropdownMenu.classList.remove("show");
      $userProfile.classList.remove("show");
    }
  });

  // 페이지 로드 시 배너 상태 초기화
  document.addEventListener("DOMContentLoaded", function () {
    const bannerToggle = document.querySelector(".banner-toggle");
    bannerToggle.innerHTML = '<i class="fas fa-chevron-down"></i> ';
  });

  document.addEventListener("DOMContentLoaded", function () {
    const goToTopButton = document.getElementById("goToTop");

    goToTopButton.addEventListener("click", function (e) {
      e.preventDefault(); // 기본 링크 동작 방지
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 0);
  });

  // 메인 위치 원상태로
  function updateMainMargin() {
    const $bannerContainer = document.querySelector(".banner-container");
    const $main = document.querySelector("main"); // main 요소 선택

    if ($bannerContainer.classList.contains("open")) {
      const bannerHeight = $bannerContainer.scrollHeight;
      $main.style.marginTop = `${134 + bannerHeight}px`;
    } else {
      $main.style.marginTop = "134px"; // 기본 네비게이션 바와 토글 버튼 높이
    }
  }
  //  스크롤 시 배너 접힘
  function closeBannerOnScroll() {
    const $bannerContainer = document.querySelector(".banner-container");
    const $bannerToggle = document.querySelector(".banner-toggle");

    if ($bannerContainer.classList.contains("open")) {
      $bannerContainer.classList.remove("open");
      $bannerToggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
      setTimeout(updateMainMargin, 300); // CSS transition 시간과 일치시킴
      $bannerToggle.innerHTML = '<i class="fas fa-chevron-down"></i> ';
    }
  }
});
