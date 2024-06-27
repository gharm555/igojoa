function toggleSideNav() {
  let $sideNav = document.querySelector("#sideNav");
  $sideNav.classList.toggle("open");
}

// 섹션 이동 기능 추가
const $goMain = document.querySelector("#goMain");
const $goPopular = document.querySelector("#goPopular");
const $goGame = document.querySelector("#goGame");
const $goFAQ = document.querySelector("#goFAQ");

$goMain.addEventListener("click", function () {
  event.preventDefault();
  document
    .getElementById("main-section")
    .scrollIntoView({ behavior: "smooth" });
});
$goPopular.addEventListener("click", function () {
  event.preventDefault();
  document
    .getElementById("image-gallery-section")
    .scrollIntoView({ behavior: "smooth" });
});
$goGame.addEventListener("click", function () {
  event.preventDefault();
  document
    .getElementById("lotto-section")
    .scrollIntoView({ behavior: "smooth" });
});
$goFAQ.addEventListener("click", function () {
  event.preventDefault();
  document.getElementById("faq-section").scrollIntoView({ behavior: "smooth" });
});

function toggleProfileDropdown() {
  const $dropdownMenu = document.querySelector(".dropdown-menu");
  $dropdownMenu.classList.toggle("show"); // 드롭다운 메뉴 토글
}

// 배너 버튼
function toggleBanner() {
  const $bannerContainer = document.querySelector(".banner-container");
  const $bannerToggle = document.querySelector(".banner-toggle");
  const $main = document.querySelector("main"); // main 요소 선택

  const isOpen = $bannerContainer.classList.toggle("open");

  if (isOpen) {
    $bannerToggle.innerHTML = '<i class="fas fa-chevron-up"></i> ';
    setTimeout(() => {
      const bannerHeight = $bannerContainer.scrollHeight;
      $main.style.marginTop = `${134 + bannerHeight}px`;
    }, 300); // CSS transition 시간과 일치시킴
  } else {
    $bannerToggle.innerHTML = '<i class="fas fa-chevron-down"></i> ';
    setTimeout(() => {
      $main.style.marginTop = "134px"; // 기본 네비게이션 바와 토글 버튼 높이
    }, 300); // CSS transition 시간과 일치시킴
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

// 메인화면일때 sideNav 위치 조정
document.addEventListener("DOMContentLoaded", function () {
  // 현재 URL을 체크하여 조건에 따라 스타일변경
  if (window.location.pathname !== "/html/main.html") {
    document.querySelector("#sideNav").style.top = "80px";
  }
});

const $logoutBtn = document.querySelector("#logoutBtn");
$logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  axios
    .get("./logout")
    .then((res) => {
      if (res.status === 200) {
        console.log("로그아웃 성공");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
