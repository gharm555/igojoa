document.addEventListener("DOMContentLoaded", function () {
  initializePage();
  setupEventListeners();

  function initializePage() {
    window.scrollTo(0, 0);
    const $bannerToggle = document.querySelector(".banner-toggle");
    if ($bannerToggle) {
      $bannerToggle.innerHTML = '<i class="fas fa-chevron-down"></i> ';
    }
    if (window.location.pathname !== "/html/main.html") {
      const $sideNav = document.querySelector("#sideNav");
      if ($sideNav) {
        $sideNav.style.top = "80px";
      }
    }
  }
  // 이벤트 리스너
  function setupEventListeners() {
    const $goToMain = document.querySelector("#logo");

    if ($goToMain) {
      $goToMain.addEventListener("click", goToMain);
    }

    const $sideNavBtn = document.querySelector("#sideNavBtn");

    if ($sideNavBtn) {
      $sideNavBtn.addEventListener("click", toggleSideNav);
    }

    const $profileBtn = document.querySelector("#profileBtn");
    if ($profileBtn) {
      $profileBtn.addEventListener("click", toggleProfileDropdown);
    }

    const $loginBtn = document.querySelector("#loginBtn");
    if ($loginBtn) {
      $loginBtn.addEventListener("click", goToLoginRegister);
    }

    const $logoutBtn = document.querySelector("#logoutBtn");
    if ($logoutBtn) {
      $logoutBtn.addEventListener("click", handleLogout);
    }

    const $locationVerifyBtn = document.querySelector("#locationVerifyBtn");
    if ($locationVerifyBtn) {
      $locationVerifyBtn.addEventListener("click", getLocation);
    }

    const $goUserProfileBtn = document.querySelector("#goUserProfileBtn");
    if ($goUserProfileBtn) {
      $goUserProfileBtn.addEventListener("click", goToUserProfile);
    }

    // 메인 화면에서 각 섹션으로 이동
    const $$navItems = document.querySelectorAll(
      "#goMain-section, #goImage-gallery-section, #goLotto-section, #goFaq-section"
    );

    $$navItems.forEach(($item) => {
      $item.addEventListener("click", (e) => {
        e.preventDefault(); // 기본 동작(링크 이동) 막기
        const isMainPage = window.location.pathname === contextPath + "/"; // 메인 페이지 확인
        const sectionId = $item.id.slice(2).toLowerCase(); // 섹션 ID

        if (isMainPage) {
          scrollToSection(sectionId);
        } else {
          // 다른 페이지에서 메인 페이지로 이동하면서 해당 섹션 ID를 해시로 전달
          window.location.href = `${contextPath}/#${sectionId}`;
        }
      });
    });

    // 스크롤 이동 함수 (메인 페이지 내에서 사용)
    function scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    // 페이지 로드 시 해시 체크 및 스크롤
    window.addEventListener("load", () => {
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
          // setTimeout을 사용하여 페이지 로드 완료 후 스크롤
          setTimeout(() => {
            section.scrollIntoView({ block: "center", inline: "center" });
          }, 0);
        }
      }
    });

    document.addEventListener("click", handleDocumentClick);
  }

  function toggleSideNav() {
    const $sideNav = document.querySelector("#sideNav");
    if ($sideNav) {
      $sideNav.classList.toggle("open");
    }
  }

  function toggleProfileDropdown() {
    const $dropdownMenu = document.querySelector(".dropdown-menu");
    if ($dropdownMenu) {
      $dropdownMenu.classList.toggle("show");
    }
  }

  function handleDocumentClick(event) {
    const $userProfile = document.querySelector(".userProfile");
    const $dropdownMenu = document.querySelector(".dropdown-menu");

    if ($userProfile && $dropdownMenu && !$userProfile.contains(event.target)) {
      $dropdownMenu.classList.remove("show");
      $userProfile.classList.remove("show");
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    axios
      .get(contextPath + "/user/logout")
      .then((res) => {
        if (res.status === 200) {
          console.log("로그아웃 성공");
          location.href = contextPath + "/"; // 또는 적절한 메인 페이지 URL
        }
      })
      .catch((err) => console.error("로그아웃 실패:", err));
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success function
        sendPosition,
        // Error function
        showError,
        // Options. See MDN for details.
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert("지역 정보를 제공하지 않는 브라우저입니다.");
    }
  }

  function sendPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    axios
      .post(contextPath + "/place/verifyLocation", null, {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      })
      .then((res) => {
        if (res.data === "위치 인증 성공") {
          alert("위치인증에 성공했습니다.");
          getPoints();
        }
        if (res.data === "이미 위치 인증 한 장소입니다.") {
          alert("이미 위치 인증 한 장소입니다.");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(`위치인증 실패: ${err.response.data}`);
        } else {
          alert("위치인증에 실패했습니다. 다시 시도해주세요.");
        }
      });
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("유저가 위치 정보 제공 거부");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("위치 정보가 사용 불가능합니다.");
        break;
      case error.TIMEOUT:
        alert("위치 정보 요청 시간 초과");
        break;
      case error.UNKNOWN_ERROR:
        alert("알 수 없는 오류가 발생했습니다.");
        break;
    }
  }

  function getPoints() {
    axios.get(contextPath + "/user/getPoints").then((res) => {
      if (res.data.success) {
        let points = res.data.points.toString();
        let cumulativePoint = res.data.cumulativePoint.toString();
        points = points.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        cumulativePoint = cumulativePoint.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const $points = document.querySelectorAll(".points");
        const $cumulativePoint = document.querySelector(".cumulativePoint");
        $points.forEach(($point) => {
          $point.innerHTML = points;
        });
        $cumulativePoint.innerHTML = cumulativePoint;
      } else {
        alert(res.data.message);
        window.location.href = contextPath + "/user/loginRegister";
      }
    });
  }

  // 마이페이지로 이동
  function goToUserProfile() {
    window.location.href = contextPath + "/user/userProfile";
  }

  // 로그인 회원가입 페이지로 이동
  function goToLoginRegister() {
    window.location.href = contextPath + "/user/loginRegister";
  }

  // 메인페이지로 이동
  function goToMain() {
    window.location.href = contextPath + "/";
  }
});
