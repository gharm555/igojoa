// 비밀번호 변수 --------->
const $passwordShowBtn = document.querySelector("#passwordShowBtn");
const $newPasswordInput = document.querySelector("#newPassword");
const $confirmPasswordInput = document.querySelector("#confirmPassword");
const $passwordFeedback = document.querySelector("#passwordFeedback");
const $confirmPasswordFeedback = document.querySelector("#confirmPasswordFeedback");
const $passwordStrength = document.querySelector("#passwordStrength");
// <---------- 비밀번호 변수

// 정보수정 변수 ---------->
const $form = document.querySelector("#editProfileForm");
const $nickName = document.querySelector("input#nickName");
const $nickNameFeedback = document.querySelector("#nickNameFeedback");
const $emailInput = document.querySelector("input#email");
const $emailFeedback = document.querySelector("#emailFeedback");
const $phone1Input = document.querySelector("#phone1");
const $phone2Input = document.querySelector("#phone2");
const $phone3Input = document.querySelector("#phone3");
const $phoneFeedback = document.querySelector("#phoneFeedback");
const $updateBtn = document.querySelector("#updateBtn");
const originalValues = {
  nickName: $nickName.value,
  email: $emailInput.value,
  phoneNumber: $phone1Input.value + $phone2Input.value + $phone3Input.value,
};
// <--------- 정보수정 변수

// 공백에 관한 정규식 -->
const noSpaceRegex = /^\S*$/;
const noConsecutiveSpaceRegex = /^(?!.*\s\s).*$/;
const noTrailingSpaceRegex = /^(?!.*\s$).*$/;
// <-- 공백에 관한 정규식

// 비밀번호 변경 버튼 클릭 시 비밀번호 필드 토글
$passwordShowBtn.addEventListener("click", function () {
  const $passwordGroup1 = document.querySelector("#passwordGroup1");
  const $passwordGroup2 = document.querySelector("#passwordGroup2");

  if ($passwordGroup1 && $passwordGroup2) {
    if ($passwordGroup1.classList.contains("d-none")) {
      $passwordGroup1.classList.remove("d-none");
      $passwordGroup2.classList.remove("d-none");
      this.textContent = "비밀번호 변경 취소";
    } else {
      $passwordGroup1.classList.add("d-none");
      $passwordGroup2.classList.add("d-none");
      this.textContent = "비밀번호 변경";
      // 필드 초기화
      $newPasswordInput.value = "";
      $confirmPasswordInput.value = "";
      $passwordFeedback.textContent = "";
      $confirmPasswordFeedback.textContent = "";
      checkForChanges();
    }
  }
});

// 비밀번호 검증 & 일치 여부 확인
$newPasswordInput.addEventListener("input", function () {
  const result = checkPasswordStrength(this.value);
  $passwordFeedback.textContent = result.message;
  $passwordFeedback.style.color = result.color;

  if ($passwordStrength) {
    if (this.value === "") {
      $passwordStrength.classList.add("d-none");
    } else {
      $passwordStrength.classList.remove("d-none");
    }
  }

  checkPasswordMatch();
});

$confirmPasswordInput.addEventListener("input", checkPasswordMatch);
// $newPasswordInput.addEventListener("input", checkPasswordMatch);

// 비밀번호 검증
function checkPasswordStrength(password) {
  const hasNumber = /\d/.test(password);
  const isLongEnough = password.length >= 8;
  const isTooLong = password.length >= 12;

  if (isLongEnough && !isTooLong && hasNumber) {
    return {
      score: 100,
      message: "유효한 비밀번호입니다",
      color: "green",
    };
  } else if (!isLongEnough && !hasNumber) {
    return {
      score: 0,
      message: "8자리 이상, 숫자가 포함된 비밀번호로 해주세요",
      color: "red",
    };
  } else if (isTooLong) {
    return {
      score: 0,
      message: "비밀번호는 12자리 미만, 숫자가 포함된 비밀번호여야 합니다",
      color: "red",
    };
  } else {
    return {
      score: 0,
      message: "8자리 이상, 숫자가 포함된 비밀번호로 해주세요",
      color: "red",
    };
  }
}

// 비밀번호 일치 여부 확인
function checkPasswordMatch() {
  if ($newPasswordInput.value === $confirmPasswordInput.value && $newPasswordInput.value !== "") {
    $confirmPasswordFeedback.textContent = "비밀번호가 일치합니다.";
    $confirmPasswordFeedback.style.color = "green";
  } else if ($confirmPasswordInput.value === "") {
    $confirmPasswordFeedback.textContent = "";
  } else {
    $confirmPasswordFeedback.textContent = "비밀번호가 일치하지 않습니다.";
    $confirmPasswordFeedback.style.color = "red";
  }

  checkForChanges();
}

// 사용자 닉네임 중복 검사
document.querySelector("input#nickName").addEventListener("input", function () {
  const nickName = this.value.trim();
  const uri = `./checkNickName?nickName=${nickName}`;
  const $nickNameFeedback = document.querySelector("#nickNameFeedback");

  axios
    .get(uri)
    .then((response) => {
      if (response.data === true) {
        if (nickName.length >= 12) {
          $nickNameFeedback.textContent = "닉네임은 12글자 미만으로 입력해주세요.";
          $nickNameFeedback.style.color = "red";
        } else {
          $nickNameFeedback.textContent = "변경가능한 닉네임입니다.";
          $nickNameFeedback.style.color = "green";
        }
      } else {
        $nickNameFeedback.textContent = "중복된 닉네임입니다.";
        $nickNameFeedback.style.color = "red";
      }
      checkForChanges();
    })
    .catch((error) => {
      console.error("Error:", error);
      $nickNameFeedback.textContent = "오류가 발생했습니다. 다시 시도해 주세요.";
      $nickNameFeedback.style.color = "red";
    });
});

// 사용자 이메일 중복 검사
document.querySelector("input#email").addEventListener("input", function () {
  const email = this.value.trim;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const $emailFeedback = document.querySelector("#emailFeedback");

  if (!emailRegex.test(email)) {
    $emailFeedback.textContent = "유효하지 않은 정보입니다.";
    $emailFeedback.style.color = "red";
    return;
  }

  const uri = `./checkEmail?email=${email}`;

  axios
    .get(uri)
    .then((response) => {
      if (response.data === true) {
        if (email.length >= 20) {
          $emailFeedback.textContent = "이메일은 20글자 미만의 경우에만 사용가능합니다.";
          $emailFeedback.style.catch = "red";
        } else {
          $emailFeedback.textContent = "유효한 정보입니다.";
          $emailFeedback.style.color = "green";
        }
      } else {
        $emailFeedback.textContent = "유효하지 않은 정보입니다.";
        $emailFeedback.style.color = "red";
      }
      checkForChanges();
    })
    .catch((error) => {
      console.error("Error:", error);
      $emailFeedback.textContent = "오류가 발생했습니다. 다시 시도해 주세요.";
      $emailFeedback.style.color = "red";
    });
});

// 사용자 전화번호 중복 검사
[$phone1Input, $phone2Input, $phone3Input].forEach((input) => {
  input.addEventListener("input", function () {
    // 정규표현식 생성: 숫자만 허용
    const regex = /^[0-9]+$/;

    // 입력값이 숫자로만 구성되었는지 확인
    if (!regex.test(this.value)) {
      alert("전화번호에는 숫자만 입력해 주세요");
      // 입력값 초기화
      this.value = "";
      return;
    }

    // 다음 입력 필드로 자동 포커스 이동
    if (this.value.length === this.maxLength) {
      const next = this.nextElementSibling;
      if (next && next.tagName === "INPUT") {
        next.focus();
      }
    }

    // 전화번호 중복 체크 함수 호출
    checkPhoneNumber();
    checkForChanges();
  });
});

// 사용자 전화번호 중복 검사하는 function
function checkPhoneNumber() {
  const phone1 = $phone1Input.value;
  const phone2 = $phone2Input.value;
  const phone3 = $phone3Input.value;

  if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
    axios
      .get(`./checkPhoneNumber?phone1=${phone1}&phone2=${phone2}&phone3=${phone3}`)
      .then((response) => {
        if (response.data === true) {
          $phoneFeedback.textContent = "유효한 정보입니다.";
          $phoneFeedback.style.color = "green";
        } else {
          $phoneFeedback.textContent = "유효하지 않은 정보입니다.";
          $phoneFeedback.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        $phoneFeedback.textContent = "오류가 발생했습니다. 다시 시도해 주세요.";
        $phoneFeedback.style.color = "red";
      });
  }
}

// 정보 수정 버튼 클릭 시 (nickName, email, phoneNumber를 serverside에 POST 방식으로 보낸 후 응답에 따라 성공/실패 alert 띄우기)
// 정보 수정 버튼 클릭 이벤트
$updateBtn.addEventListener("click", function (e) {
  e.preventDefault(); // 기본 form 제출 방지

  // 사용자 입력 데이터 가져오기
  const nickName = $nickName.value;
  const email = $emailInput.value;
  const phone1 = $phone1Input.value;
  const phone2 = $phone2Input.value;
  const phone3 = $phone3Input.value;
  const newPassword = $newPasswordInput.value;

  // 전화번호를 하나의 문자열로 합치기
  const fullPhoneNumber = `${phone1}${phone2}${phone3}`;

  // 서버로 보낼 데이터 객체 생성
  const formData = {
    nickName: nickName,
    email: email,
    phoneNumber: fullPhoneNumber,
    password: newPassword,
  };

  // axios를 사용하여 서버에 POST 요청 보내기
  axios
    .post("./updateProfile", formData)
    .then((response) => {
      // 응답 처리
      if (response.data.success) {
        alert("정보가 성공적으로 업데이트 되었습니다.");
        window.location.href = "./userProfile";
      } else {
        alert("정보 업데이트를 실패했습니다: " + response.data.message);
      }
    })
    .catch((error) => {
      // 에러 처리
      console.error("Error:", error);
      alert("정보 업데이트 중 오류가 발생했습니다.");
    });
});

// 입력 값 변경 감지 함수
function checkForChanges() {
  // 현재 값 가져오기
  const currentValues = {
    nickName: $nickName.value.trim(),
    email: $emailInput.value.trim(),
    phoneNumber: ($phone1Input.value + $phone2Input.value + $phone3Input.value).trim(),
  };

  // 경고 메시지 초기화
  $nickNameFeedback.textContent = "";
  $emailFeedback.textContent = "";
  $phoneFeedback.textContent = "";

  // 값 변경 확인 및 공백 검사
  let isChanged = false;
  let isValid = true;
  for (let key in originalValues) {
    if (originalValues[key] !== currentValues[key] && currentValues[key] !== "") {
      isChanged = true;
    }

    // 전혀 공백을 허용하지 않는 경우
    if (!noSpaceRegex.test(currentValues[key])) {
      isValid = false;
      document.querySelector(`#${key}Feedback`).textContent = "공백이 포함되어서는 안됩니다.";
    }

    // 연속된 공백을 허용하지 않는 경우
    else if (!noConsecutiveSpaceRegex.test(currentValues[key])) {
      isValid = false;
      document.querySelector(`#${key}Feedback`).textContent = "공백이 포함되어서는 안됩니다.";
    }

    // 끝에 공백이 있는 경우
    else if (!noTrailingSpaceRegex.test(currentValues[key])) {
      isValid = false;
      document.querySelector(`#${key}Feedback`).textContent = "공백이 포함되어서는 안됩니다.";
    }
  }

  // 비밀번호 검증
  const newPassword = $newPasswordInput.value;
  const confirmPassword = $confirmPasswordInput.value;
  const passwordResult = checkPasswordStrength(newPassword);

  let isPasswordValid = false;
  if (newPassword === confirmPassword && passwordResult.score === 100) {
    isPasswordValid = true;
    isChanged = true;
  }

  // "정보 수정" 버튼 활성화 또는 비활성화

  $updateBtn.disabled = !(isChanged && isValid && (isPasswordValid || (newPassword === "" && confirmPassword === "")));
  // "정보 수정" 버튼 활성화 또는 비활성화
  $updateBtn.disabled = !(isChanged && isValid && (isPasswordValid || (newPassword === "" && confirmPassword === "")));

  if ($updateBtn.disabled === false) {
    $updateBtn.classList.remove("btn-outline-success");
    $updateBtn.classList.add("btn-success");
  } else {
    $updateBtn.classList.remove("btn-success");
    $updateBtn.classList.add("btn-outline-success");
  }
}

// 각 입력 필드에 이벤트 리스너 추가
$nickName.addEventListener("input", checkForChanges);
$emailInput.addEventListener("input", checkForChanges);
$phone1Input.addEventListener("input", checkForChanges);
$phone2Input.addEventListener("input", checkForChanges);
$phone3Input.addEventListener("input", checkForChanges);
$newPasswordInput.addEventListener("input", checkForChanges);
$confirmPasswordInput.addEventListener("input", checkForChanges);

// 유저 프로필 이미지 변경 변수 -------->
const $profileImage = document.querySelector("#profileImage");
const $$profileImage = document.querySelectorAll(".profileImage");
const $profileImageInput = document.querySelector("#profileImageInput");
const $imageChangeBtn = document.querySelector("#imageChange");
const $imageDeleteBtn = document.querySelector("#imageDelete");
// <-------------- 유저 프로필 이미지 변경 변수

// 초기 상태에서는 버튼 비활성화
$updateBtn.disabled = true;

/* 유저활동내역 */
// DOM 요소 선택
const $userActivityTab = document.querySelector("#v-pills-disabled-tab");
const $addressSelect = document.querySelector("#address-select");
const $searchInput = document.querySelector("#search-input");
const $searchBtn = document.querySelector("#userActivitySearchBtn");
const $dateRange = document.querySelector("#date-range");
const $tabContent = document.querySelector("#nav-tabContent");
const tabs = ["total", "favoritePlace", "likedReview", "writtenReview", "verifiedPlace"];

// 전역 변수 초기화
let startDate = "";
let endDate = "";
let datePicker;
let currentTab = "total";
let currentPage = 0;
const itemsPerPage = 6; // 6개로바꿈
let isLoading = false;
let hasMoreData = true;
// let lastLoadedIds = {
//   total: null,
//   favoritePlace: null,
//   likedReview: null,
//   writtenReview: null,
//   verifiedPlace: null,
// };
let sortOrder = "desc"; // 초기 정렬 순서는 내림차순
let currentData = []; // 현재 탭의 전체 데이터를 저장할 배열

// 내활동내역 탭 클릭 이벤트 리스너
$userActivityTab.addEventListener("click", () => {
  initializeUserActivity();
  setupInfiniteScroll();
  //한줄 추가된거임 진짜임
  setupContainerSize();
});

// 내 활동내역 탭에서 화면사이즈 조절 함수임 07-12 오전에 바꾼거임
function setupContainerSize() {
  const $userProfileMain = document.querySelector(".userProfile-tabs-main");
  // const $userActivityTab = document.querySelector("#v-pills-disabled-tab");

  const isUserActivityTabActive = $userActivityTab.classList.contains("active");

  if (isUserActivityTabActive) {
    if (window.innerWidth <= 390) {
      $userProfileMain.style.height = "61rem";
    } else {
      $userProfileMain.style.height = "";
    }
  } else {
    $userProfileMain.style.height = "";
  }
}

// 내 활동내역 탭에서 화면사이즈 조절 함수임 07-12 오전에 바꾼거임
window.addEventListener("resize", setupContainerSize);

// 내 활동내역 탭에서 화면사이즈 조절 함수임 07-12 오전에 바꾼거임
document.querySelectorAll(".nav-link").forEach((tab) => {
  tab.addEventListener("click", setupContainerSize);
});

// 내활동내역 초기화 함수
function initializeUserActivity() {
  // 상태 초기화
  currentTab = "total";
  currentPage = 0;
  hasMoreData = true;
  sortOrder = "desc";
  currentData = [];
  startDate = "";
  endDate = "";

  // 검색 입력 필드 초기화
  $searchInput.value = "";
  sessionStorage.removeItem("searchKeyword");

  // 세션 스토리지의 검색 키워드 초기화
  sessionStorage.removeItem("searchKeyword");

  // 주소 선택 초기화
  $addressSelect.selectedIndex = 0;

  // 날짜 선택 초기화
  datePicker.clear();

  // 데이터 리셋 및 새로운 데이터 로드
  loadDataWithCurrentSearch();
}
// 각 탭에 이벤트 리스너 추가
tabs.forEach((tab) => {
  const $tabElement = document.querySelector(`#nav-${tab}-tab`);
  $tabElement.addEventListener("click", () => {
    if (currentTab === tab) {
      // 현재 탭을 다시 클릭한 경우, 정렬 순서를 변경하고 데이터를 다시 정렬
      sortOrder = sortOrder === "desc" ? "asc" : "desc";
      sortAndDisplayData();
    } else {
      // 새로운 탭으로 변경한 경우
      currentTab = tab;
      sortOrder = "desc"; // 새 탭으로 변경 시 정렬 순서 초기화
      loadDataWithCurrentSearch();
    }
  });
});

function loadDataWithCurrentSearch() {
  const searchKeyword = sessionStorage.getItem("searchKeyword") || "";
  $searchInput.value = searchKeyword;
  resetAndLoadData();
}

// 검색 버튼 이벤트 리스너
$searchBtn.addEventListener("click", () => {
  sessionStorage.setItem("searchKeyword", $searchInput.value);
  resetAndLoadData();
});

// 검색창 엔터 이벤트 리스너
$searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    // Enter 키 확인
    event.preventDefault();
    $searchBtn.click(); // 검색 버튼 클릭 동작 수행
  }
});

// 무한 스크롤 설정 함수
function setupInfiniteScroll() {
  const activityTabs = document.querySelectorAll(".list-group");

  activityTabs.forEach((tab) => {
    tab.addEventListener("scroll", function () {
      if (this.id !== `${currentTab}List`) return;

      const { scrollTop, scrollHeight, clientHeight } = this;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);

      // 스크롤이 80% 이상 내려갔고, 로딩 중이 아니며, 더 불러올 데이터가 있는 경우
      if (scrollRatio > 0.8 && !isLoading && hasMoreData) {
        console.log(`${currentTab} 탭에서 추가 데이터 로드 시작`);
        loadMoreData();
      }
    });
  });
}

// 데이터 초기화 및 새로 로드하는 함수
function resetAndLoadData() {
  currentPage = 0;
  hasMoreData = true;
  // lastLoadedIds[currentTab] = null;
  currentData = [];
  const container = document.querySelector(`#${currentTab}List`);
  container.innerHTML = "";
  loadMoreData();
}

// 추가 데이터를 로드하는 함수
function loadMoreData() {
  if (isLoading || !hasMoreData) return;

  isLoading = true;

  let searchKeyword = sessionStorage.getItem("searchKeyword") || "";
  let largeAddress = $addressSelect.value;
  let endpoint = getEndpointFromTab(currentTab);

  let params = {
    searchKeyword: searchKeyword,
    largeAddress: largeAddress,
    calendarMin: startDate,
    calendarMax: endDate,
    startRowValue: currentPage * itemsPerPage,
    rowCnt: itemsPerPage,
  };

  // 전체 탭이 아닌 경우에만 lastLoadedId 사용
  if (currentTab !== "total") {
    // params.lastLoadedId = lastLoadedIds[currentTab];
  }

  axios
    .get(contextPath + endpoint, {
      params,
    })
    .then((response) => {
      console.log("Data fetched successfully:", response.data);
      if (response.data.sessionSearchKeyword) {
        sessionStorage.setItem("searchKeyword", response.data.sessionSearchKeyword);
      }

      let newData;
      if (currentTab === "total") {
        newData = response.data.userRelatedInfo || [];
      } else {
        newData = response.data || [];
      }

      if (newData.length < itemsPerPage) {
        hasMoreData = false;
        console.log("더 이상 불러올 데이터가 없습니다");
      }

      currentData = currentData.concat(newData); // 새 데이터를 현재 데이터에 추가
      sortAndDisplayData();
      currentPage++;

      isLoading = false;
    })
    .catch((error) => {
      console.error("Error fetching user related info:", error);
      isLoading = false;
      displayActivityInfo([], currentTab); // 에러 발생 시 빈 배열 전달
    });
}

// 탭에 따른 API 엔드포인트를 반환하는 함수
function getEndpointFromTab(tab) {
  switch (tab) {
    case "total":
      return "/allInfo";
    case "favoritePlace":
      return "/favoritePlaces";
    case "likedReview":
      return "/favoriteReviews";
    case "writtenReview":
      return "/writtenReviews";
    case "verifiedPlace":
      return "/verifiedPlaces";
    default:
      return;
  }
}

// 탭에 따른 데이터 키를 반환하는 함수
function getDataKeyFromTab(tab) {
  const dataKeys = {
    total: "userRelatedInfo",
    favoritePlace: "userFavoritePlaces",
    likedReview: "userFavoriteReviews",
    writtenReview: "userWrittenReviews",
    verifiedPlace: "userVerifiedPlaces",
  };
  return dataKeys[tab] || "";
}

// 활동 정보를 화면에 표시하는 함수
function displayActivityInfo(data, tab) {
  const container = document.querySelector(`#${tab}List`);

  if (data.length === 0 && currentPage === 0) {
    container.innerHTML = '<li class="list-group-item">활동내역이 없습니다.</li>';
    return;
  }

  container.innerHTML = ""; // 컨테이너 초기화

  data.forEach((item) => {
    let content = "";
    switch (tab) {
      case "total":
        content = getTotalContent(item);
        break;
      case "favoritePlace":
        content = getFavoritePlaceContent(item);
        break;
      case "likedReview":
        content = getLikedReviewContent(item);
        break;
      case "writtenReview":
        content = getWrittenReviewContent(item);
        break;
      case "verifiedPlace":
        content = getVerifiedPlaceContent(item);
        break;
    }

    container.innerHTML += `
      <li class="list-group-item d-flex align-items-center">
        <a href="${contextPath}/place/details/${item.placeName}"><img src="${item.firstUrl}" alt="썸네일" class="rounded-circle me-3" width="50" height="50" /></a>
        <div>
          <p class="mb-0">${content}</p>
          <small class="text-muted">${item.createdAt}</small>
        </div>
      </li>
    `;
  });
}

// 전체 탭의 내용을 생성하는 함수
function getTotalContent(item) {
  switch (item.type) {
    case "favorite_places":
      return getFavoritePlaceContent(item);
    case "liked_reviews":
      return getLikedReviewContent(item);
    case "written_reviews":
      return getWrittenReviewContent(item);
    case "verified_places":
      return getVerifiedPlaceContent(item);
    default:
      return "";
  }
}

// 좋아요한 명소 내용을 생성하는 함수
function getFavoritePlaceContent(item) {
  return `${item.address} <a href="${contextPath}/place/details/${item.placeName}"><span class="badge">${item.placeName}</span></a> 명소에 좋아요를 눌렀습니다.</a>`;
}

// 좋아요한 리뷰 내용을 생성하는 함수
function getLikedReviewContent(item) {
  return `<a href="${contextPath}/place/details/${item.placeName}"><span class="badge">${item.placeName}</span></a> 명소에 <span class="nametag">${item.reviewAuthor}</span>님 댓글에 좋아요를 눌렀습니다. <p class=likedReview>"${item.review}"</p>`;
}

// 작성한 리뷰 내용을 생성하는 함수
function getWrittenReviewContent(item) {
  return `${item.address} <a href="${contextPath}/place/details/${item.placeName}"><span class="badge">${item.placeName}</span></a> 명소에 댓글을 남겼습니다. <p class=writtenReview>"${item.review}"</p> `;
}

// 위치인증한 장소 내용을 생성하는 함수
function getVerifiedPlaceContent(item) {
  return `${item.address} <a href="${contextPath}/place/details/${item.placeName}"><span class="badge">${item.placeName}</span></a> 명소에 위치인증을 했습니다.`;
}

// 데이터를 정렬하고 표시하는 함수
function sortAndDisplayData() {
  const sortedData = [...currentData].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  displayActivityInfo(sortedData, currentTab);
}

// Flatpickr 초기화
flatpickr.localize(flatpickr.l10ns.ko);
datePicker = flatpickr("#date-range", {
  mode: "range",
  dateFormat: "Y.m.d",
  minDate: "2022-07-01",
  maxDate: "today",
  disableMobile: "true",
  defaultDate: [],

  onChange: function (selectedDates, dateStr, instance) {
    console.log("Selected dates:", selectedDates);
    if (selectedDates.length === 0) {
      instance.element.placeholder = "전체기간";
      startDate = "";
      endDate = "";
    } else if (selectedDates.length === 1) {
      startDate = formatDate(selectedDates[0]);
      endDate = "";
    } else if (selectedDates.length === 2) {
      if (selectedDates[0].getTime() === selectedDates[1].getTime()) {
        startDate = formatDate(selectedDates[0]);
        endDate = "";
      } else {
        startDate = formatDate(selectedDates[0]);
        endDate = formatDate(selectedDates[1]);
      }
    }
    resetAndLoadData();
  },
  onReady: function (selectedDates, dateStr, instance) {
    instance.element.placeholder = "전체기간";
    const wrapper = instance.calendarContainer;
    const clearButton = document.createElement("button");
    clearButton.innerHTML = "전체기간";
    clearButton.className = "flatpickr-button flatpickr-clear custom-all-period-btn";
    clearButton.addEventListener("click", function () {
      startDate = "";
      endDate = "";
      instance.clear();
      instance.close(); // 07-15 이거 추가함
      instance.element.placeholder = "전체기간";
      resetAndLoadData();
    });
    wrapper.appendChild(clearButton);
  },
});

// 날짜를 형식화하는 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

// 내 포인트 내역
let calendar;
let currentMonth;
let selectedDate;
let previousSelectedCell;
let attendanceDates = []; // 출석 날짜를 저장할 배열
let dailyPointsData = {};

const $userPointTab = document.querySelector("#v-pills-messages-tab");
$userPointTab.addEventListener("click", initializePointTab);

function initializePointTab() {
  selectedDate = new Date();
  currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  fetchAttendanceData(currentMonth).then(() => {
    initializeCalendar();
    updatePointHistoryForDate(selectedDate);
    updatePointSummaryForDay(selectedDate);
    updatePointSummaryForMonth(currentMonth); // 이 줄이 추가되었습니다
  });
}

function fetchAttendanceData(date) {
  const yearMonth = formatYearMonth(date);
  return axios
    .get(contextPath + "/userLogged", {
      params: { yearMonth: yearMonth },
    })
    .then(function (response) {
      attendanceDates = response.data.map((item) => new Date(item.loginDate));
    })
    .catch(function (error) {
      console.error("Error fetching attendance data:", error);
    });
}

function initializeCalendar() {
  const $calendarEl = document.getElementById("calendar");
  if (!$calendarEl) {
    console.error("Calendar element not found");
    return;
  }
  calendar = new FullCalendar.Calendar($calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "today",
    },
    titleFormat: function (date) {
      year = date.date.year;
      month = date.date.month + 1;

      return year + "년 " + month + "월";
    },
    buttonText: {
      today: "오늘",
    },
    dayCellContent: function (arg) {
      let html = arg.dayNumberText;
      if (isAttendanceDay(arg.date)) {
        html += '<i class="fas fa-check-circle attendance-icon"></i>';
      }
      return { html: html };
    },

    dateClick: function (info) {
      selectedDate = info.date;
      updatePointHistoryForDate(selectedDate);
      highlightSelectedDate(info.dayEl, info.date);
      updatePointSummaryForDay(selectedDate);
    },

    dayCellClassNames: function (arg) {
      if (arg.date.getDay() === 0) {
        // 일요일
        return ["sunday"];
      } else if (arg.date.getDay() === 6) {
        // 토요일
        return ["saturday"];
      }
      return [];
    },

    datesSet: function (info) {
      currentMonth = info.view.currentStart;
      fetchAttendanceData(currentMonth).then(() => {
        calendar.render();
        updatePointSummaryForMonth(currentMonth);

        // 테이블 초기화 및 메시지 표시
        const $table = document.querySelector("#pointHistoryTable tbody");
        $table.innerHTML = '<tr><td colspan="3" class="text-center">선택된 날짜의 내역이 없습니다.</td></tr>';

        // 선택된 날짜 초기화
        selectedDate = null;
        if (previousSelectedCell) {
          previousSelectedCell.style.backgroundColor = "";
          previousSelectedCell.style.fontWeight = "normal";
          previousSelectedCell = null;
        }
      });
    },
    dayCellDidMount: function (info) {
      const today = new Date();
      if (info.date.toDateString() === today.toDateString()) {
        info.el.style.backgroundColor = "#4a86e8";
        info.el.style.color = "white";
        info.el.style.fontWeight = "bold";
      }
      if (selectedDate && info.date.toDateString() === selectedDate.toDateString()) {
        highlightSelectedDate(info.el, info.date);
      }
    },
  });

  if (calendar) {
    calendar.destroy();
  }

  calendar.render();

  const todayButton = document.querySelector(".fc-today-button");
  if (todayButton) {
    todayButton.addEventListener("click", () => {
      selectedDate = new Date();
      currentMonth = calendar.view.currentStart;
      updatePointHistoryForDate(selectedDate);
      updatePointSummaryForMonth(currentMonth);
      highlightSelectedDate(null, selectedDate);
    });
  }
}

function isAttendanceDay(date) {
  return attendanceDates.some((attendanceDate) => attendanceDate.toDateString() === date.toDateString());
}

function highlightSelectedDate(cellEl, date) {
  if (previousSelectedCell) {
    previousSelectedCell.style.backgroundColor = "";
    previousSelectedCell.style.fontWeight = "normal";
  }

  const newSelectedCell = cellEl || calendar.getDate(date).dayEl;

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  if (newSelectedCell) {
    if (isToday) {
      newSelectedCell.style.backgroundColor = "#4a86e8";
      newSelectedCell.style.color = "white";
    } else {
      newSelectedCell.style.backgroundColor = "#e6f2ff";
    }
    newSelectedCell.style.fontWeight = "bold";
    previousSelectedCell = newSelectedCell;
  }
}

function updatePointHistoryForDate(date) {
  const formattedDate = formatDate(date);
  axios
    .get(contextPath + "/pointsLogs", {
      params: { yearMonthDay: formattedDate },
    })
    .then(function (response) {
      updatePointHistoryTable(response.data);
      updatePointSummaryForDay(date);
      if (calendar) {
        calendar.render();
      }
    })
    .catch(function (error) {
      console.error("Error updating point history for date:", error);
    });
}

function updatePointSummaryForMonth(date) {
  const yearMonth = formatYearMonth(date);
  axios
    .get(contextPath + "/pointsStats", {
      params: { yearMonth: yearMonth },
    })
    .then(function (response) {
      const { totalPointsGained, totalPointsLost } = response.data;
      console.log(response.data);
      document.querySelector("#monthlyEarnedPoints").textContent = totalPointsGained;
      document.querySelector("#monthlySpentPoints").textContent = Math.abs(totalPointsLost);
    })
    .catch(function (error) {
      console.error("Error updating points display:", error);
    });
}

function updatePointSummaryForDay(date) {
  const yearMonthDay = formatDate(date);
  axios
    .get(contextPath + "/pointsStats", {
      params: { yearMonthDay: yearMonthDay },
    })
    .then(function (response) {
      const { totalPointsGained, totalPointsLost } = response.data;
      console.log(response.data);

      const dailyEarnedPoints = document.querySelector("#dailyEarnedPoints");
      const dailySpentPoints = document.querySelector("#dailySpentPoints");

      if (dailyEarnedPoints) {
        dailyEarnedPoints.textContent = totalPointsGained || "0";
        dailyEarnedPoints.style.color = totalPointsGained > 0 ? "green" : "black";
      }

      if (dailySpentPoints) {
        dailySpentPoints.textContent = Math.abs(totalPointsLost) || "0";
        dailySpentPoints.style.color = totalPointsLost < 0 ? "red" : "black";
      }
    });
}

function updatePointHistoryTable(history) {
  const $table = document.querySelector("#pointHistoryTable tbody");
  $table.innerHTML = "";

  if (history.length === 0) {
    $table.innerHTML = '<tr><td colspan="3" class="text-center">선택된 날짜의 내역이 없습니다.</td></tr>';
  } else {
    history.forEach(function (item) {
      const row = $table.insertRow();
      row.insertCell(0).textContent = formatDate(new Date(item.pointsGetLoseTime));
      row.insertCell(1).textContent = item.userActivity;
      const pointsCell = row.insertCell(2);
      pointsCell.textContent = item.points;
      pointsCell.style.color = item.points >= 0 ? "green" : "red";
      pointsCell.classList.add("points-column"); // 클래스 추가
    });

    // 내역이 있을 때만 일별 요약을 추가합니다.
    addDailySummary($table);
  }
}

function addDailySummary($table) {
  // 기존의 요약 행이 있다면 제거합니다.
  const existingSummaryRows = $table.querySelectorAll(".summary-row");
  existingSummaryRows.forEach((row) => row.remove());

  // 새로운 요약 행을 추가합니다.
  const summaryRow1 = $table.insertRow();
  summaryRow1.classList.add("summary-row");
  summaryRow1.insertCell(0).textContent = ""; // 첫 번째 열은 비워둡니다.
  summaryRow1.insertCell(1).textContent = "얻은 포인트";
  const earnedCell = summaryRow1.insertCell(2);
  earnedCell.innerHTML = '<span id="dailyEarnedPoints" style="color: green;">-</span>';
  earnedCell.classList.add("points-column"); // 클래스 추가

  const summaryRow2 = $table.insertRow();
  summaryRow2.classList.add("summary-row");
  summaryRow2.insertCell(0).textContent = ""; // 첫 번째 열은 비워둡니다.
  summaryRow2.insertCell(1).textContent = "소비한 포인트";
  const spentCell = summaryRow2.insertCell(2);
  spentCell.innerHTML = '<span id="dailySpentPoints" style="color: red;">-</span>';
  spentCell.classList.add("points-column"); // 클래스 추가
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function formatYearMonth(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}.${month}`;
}

// 유저 프로필 이미지 변경 (좌측 이미지 직접 클릭)
$profileImage.addEventListener("click", function () {
  $profileImageInput.click();
});

$profileImageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("newImage", file);

    // 서버로 put 요청 보내기
    axios
      .put(contextPath + "/profileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        $$profileImage.forEach(($$profileImage) => {
          $$profileImage.src = response.data;
        });
      })
      .catch((error) => {
        alert("프로필 이미지 변경 중 오류가 발생했습니다.");
      });
  }
});

// 유저 프로필 이미지 변경 (내 정보수정에서 변경 버튼 클릭)
$imageChangeBtn.addEventListener("click", function () {
  $profileImageInput.click();
});

$profileImageInput.addEventListener("change", function () {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("newImage", file);

    // 서버로 put 요청 보내기
    axios
      .put(contextPath + "/profileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        $$profileImage.forEach(($$profileImage) => {
          $$profileImage.src = response.data;
        });
      })
      .catch((error) => {
        alert("프로필 이미지 변경 중 오류가 발생했습니다.");
      });
  }
});

// 유저 프로필 기본설정으로 변경 (내 정보수정에서 삭제 버튼 클릭)
$imageDeleteBtn.addEventListener("click", function () {
  axios
    .put(contextPath + "/defaultImage")
    .then((response) => {
      $$profileImage.forEach(($$profileImage) => {
        $$profileImage.src = response.data;
      });
    })
    .catch((error) => {
      alert("프로필 이미지 변경 중 오류가 발생했습니다.");
    });
});

// 390px 미만 화면(iPhone 12 기준)일 때 내활동내역 탭부분 아이콘 처리
function checkWidth() {
  const $navTotalTab = document.querySelector("#nav-total-tab");
  const $navFavoritePlaceTab = document.querySelector("#nav-favoritePlace-tab");
  const $navlikedReviewTab = document.querySelector("#nav-likedReview-tab");
  const $navWrittenReviewTab = document.querySelector("#nav-writtenReview-tab");
  const $navVerifiedPlaceTab = document.querySelector("#nav-verifiedPlace-tab");
  const $navTabsInSmallWidth = [
    $navTotalTab,
    $navFavoritePlaceTab,
    $navlikedReviewTab,
    $navWrittenReviewTab,
    $navVerifiedPlaceTab,
  ];

  if (window.innerWidth <= 390 || window.innerWidth <= 1400) {
    $navTabsInSmallWidth.forEach((navTabInSmallWidth) => {
      navTabInSmallWidth.classList.add("col-2");
      if (navTabInSmallWidth.id === "nav-total-tab") {
        navTabInSmallWidth.innerHTML = `<i class="fa-solid fa-list"></i>`;
      }
      if (navTabInSmallWidth.id === "nav-favoritePlace-tab") {
        navTabInSmallWidth.innerHTML = `<i class="fa-solid fa-heart"></i>`;
      }
      if (navTabInSmallWidth.id === "nav-likedReview-tab") {
        navTabInSmallWidth.innerHTML = `<i class="fa-solid fa-thumbs-up"></i>`;
      }
      if (navTabInSmallWidth.id === "nav-writtenReview-tab") {
        navTabInSmallWidth.innerHTML = `<i class="fa-solid fa-pen"></i>`;
      }
      if (navTabInSmallWidth.id === "nav-verifiedPlace-tab") {
        navTabInSmallWidth.innerHTML = `<i class="fa-solid fa-location-dot"></i>`;
      }
    });
  } else {
    $navTabsInSmallWidth.forEach((navTabInSmallWidth) => {
      navTabInSmallWidth.classList.remove("col-2");
      if (navTabInSmallWidth.id === "nav-total-tab") {
        navTabInSmallWidth.innerHTML = `전체 내역 <p><i class="sort-icon fa-solid fa-sort"</p>`;
      }
      if (navTabInSmallWidth.id === "nav-favoritePlace-tab") {
        navTabInSmallWidth.innerHTML = `좋아요한 명소 <p><i class="sort-icon fa-solid fa-sort"</p>`;
      }
      if (navTabInSmallWidth.id === "nav-likedReview-tab") {
        navTabInSmallWidth.innerHTML = `좋아요한 리뷰 <p><i class="sort-icon fa-solid fa-sort"</p>`;
      }
      if (navTabInSmallWidth.id === "nav-writtenReview-tab") {
        navTabInSmallWidth.innerHTML = `작성한 리뷰 <p><i class="sort-icon fa-solid fa-sort"</p>`;
      }
      if (navTabInSmallWidth.id === "nav-verifiedPlace-tab") {
        navTabInSmallWidth.innerHTML = `위치인증한 명소 <p><i class="sort-icon fa-solid fa-sort"</p>`;
      }
    });
  }
}

window.addEventListener("load", checkWidth);
window.addEventListener("resize", checkWidth);
// 회원 탈퇴
const $withdrawalBtn = document.querySelector("#withdrawal");
$withdrawalBtn.addEventListener("click", function () {
  if (confirm("정말 탈퇴하시겠습니까?")) {
    axios.delete(contextPath + "/user/deleteUser").then((response) => {
      alert(response.data);
      window.location.href = contextPath + "/";
    });
  } else {
    alert("탈퇴 취소하셨습니다.");
  }
});

//  ---------------------------------------------------- 수창 작업
const $levelIcon = document.querySelector(".circular-icon");

function getLevel() {
  const pointsText = document.querySelector(".cumulativePoints").textContent.replace(/,/g, "");
  const points = parseInt(pointsText, 10);
  const level = Math.floor(points / 1000) + 1;
  return level;
}

function levelColor(level) {
  if (level >= 90) {
    return {
      bg: "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)",
      animation: "rainbow 5s linear infinite, sparkle 2s linear infinite",
    };
  }

  if (level >= 80) return { bg: "linear-gradient(145deg, #C0C0C0, #A9A9A9, #C0C0C0)" }; // 은
  if (level >= 70) return { bg: "linear-gradient(145deg, #9400D3, #8A2BE2)" }; // 보
  if (level >= 60) return { bg: "linear-gradient(145deg, #4B0082, #483D8B)" }; //남
  if (level >= 50) return { bg: "linear-gradient(145deg, #0000FF, #1E90FF)" }; //파
  if (level >= 40) return { bg: "linear-gradient(145deg, #00FF00, #32CD32)" }; //초
  if (level >= 30) return { bg: "linear-gradient(145deg, #FFFF00, #FFD700)" }; //노
  if (level >= 20) return { bg: "linear-gradient(145deg, #FF4500, #FF6347)" }; //주
  if (level >= 10) return { bg: "linear-gradient(145deg, #FF0000, #DC143C)" }; //빨
  return { bg: "linear-gradient(145deg, #8B4513, #A0522D)" }; //  1 - 9 까지 색상
}

function setLevel(level) {
  if (level >= 100) {
    $levelIcon.innerHTML = "👑";
    $levelIcon.style.background = "none";
    $levelIcon.style.fontSize = "30px";
    $levelIcon.style.top = "-21px";
    $levelIcon.style.position = "relative";
    $levelIcon.style.animation = "sparkle 1.5s infinite";
    $levelIcon.style.filter = "drop-shadow(0 0 2px gold)";
  } else {
    $levelIcon.innerHTML = level;
    const colorStyle = levelColor(level);
    $levelIcon.style.background = colorStyle.bg;
    if (level >= 90) {
      $levelIcon.style.animation = colorStyle.animation;
      $levelIcon.style.backgroundSize = "300% 300%";
    } else {
      $levelIcon.style.animation = "none";
      $levelIcon.style.backgroundSize = "100% 100%";
    }
  }
}

// 필요한 CSS 애니메이션 추가
const style = document.createElement("style");
style.textContent = `
  @keyframes rainbow {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
  @keyframes sparkle {
    0% { filter: brightness(100%) }
    50% { filter: brightness(150%) }
    100% { filter: brightness(100%) }
  }
`;
document.head.appendChild(style);
setLevel(getLevel());
// ------------------------------------------------------ 수창 작업 끝
