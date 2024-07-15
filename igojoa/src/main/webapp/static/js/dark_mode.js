const darkModeToggle = document.querySelectorAll(".darkModeToggle input");
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

function setDarkMode(isDark) {
  if (isDark) {
    document.body.setAttribute("data-bs-theme", "dark");
  } else {
    document.body.removeAttribute("data-bs-theme");
  }

  // 세션 스토리지에 상태 저장
  sessionStorage.setItem("darkMode", isDark);

  // 토글 버튼 상태 업데이트
  darkModeToggle.forEach((toggle) => {
    toggle.checked = isDark;
  });

  console.log("Dark mode state:", isDark);
}

function toggleDarkMode() {
  const isDarkMode = document.body.getAttribute("data-bs-theme") === "dark";
  setDarkMode(!isDarkMode);
}

function applyDarkMode() {
  const storedDarkMode = sessionStorage.getItem("darkMode");

  if (storedDarkMode === null) {
    // 저장된 설정이 없으면 브라우저 기본 설정 사용
    setDarkMode(prefersDarkMode.matches);
  } else {
    // 저장된 설정이 있으면 그 설정 사용
    setDarkMode(storedDarkMode === "true");
  }
}

// 브라우저 다크모드 설정 변경 감지
prefersDarkMode.addEventListener("change", (e) => {
  if (sessionStorage.getItem("darkMode") === null) {
    setDarkMode(e.matches);
  }
});

// 페이지 로드 시 즉시 다크모드 상태 적용
applyDarkMode();

// DOM이 로드된 후 토글 버튼 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  // 초기 상태 설정
  darkModeToggle.forEach((toggle) => {
    toggle.checked = document.body.hasAttribute("data-bs-theme");
    toggle.addEventListener("change", toggleDarkMode);
  });
});
