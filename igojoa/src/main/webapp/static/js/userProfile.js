// 비밀번호 변수 --------->
const $passwordShowBtn = document.querySelector('#passwordShowBtn');
const $newPasswordInput = document.querySelector('#newPassword');
const $confirmPasswordInput = document.querySelector('#confirmPassword');
const $passwordFeedback = document.querySelector('#passwordFeedback');
const $confirmPasswordFeedback = document.querySelector('#confirmPasswordFeedback');
const $passwordStrength = document.querySelector('#passwordStrength');
// <---------- 비밀번호 변수

// 정보수정 변수 ---------->
const $form = document.querySelector('#editProfileForm');
const $nickName = document.querySelector('input#nickName');
const $nickNameFeedback = document.querySelector('#nickNameFeedback');
const $emailInput = document.querySelector('input#email');
const $emailFeedback = document.querySelector('#emailFeedback');
const $phone1Input = document.querySelector('#phone1');
const $phone2Input = document.querySelector('#phone2');
const $phone3Input = document.querySelector('#phone3');
const $phoneFeedback = document.querySelector('#phoneFeedback');
const $updateBtn = document.querySelector('#updateBtn');
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
$passwordShowBtn.addEventListener('click', function () {
  const $passwordGroup1 = document.querySelector('#passwordGroup1');
  const $passwordGroup2 = document.querySelector('#passwordGroup2');

  if ($passwordGroup1 && $passwordGroup2) {
    if ($passwordGroup1.classList.contains('d-none')) {
      $passwordGroup1.classList.remove('d-none');
      $passwordGroup2.classList.remove('d-none');
      this.textContent = '비밀번호 변경 취소';
    } else {
      $passwordGroup1.classList.add('d-none');
      $passwordGroup2.classList.add('d-none');
      this.textContent = '비밀번호 변경';
      // 필드 초기화
      $newPasswordInput.value = '';
      $confirmPasswordInput.value = '';
      $passwordFeedback.textContent = '';
      $confirmPasswordFeedback.textContent = '';
    }
  }
});

// 비밀번호 검증 & 일치 여부 확인
$newPasswordInput.addEventListener('input', function () {
  const result = checkPasswordStrength(this.value);
  $passwordFeedback.textContent = result.message;
  $passwordFeedback.style.color = result.color;

  if ($passwordStrength) {
    if (this.value === '') {
      $passwordStrength.classList.add('d-none');
    } else {
      $passwordStrength.classList.remove('d-none');
    }
  }

  checkPasswordMatch();
});

$confirmPasswordInput.addEventListener('input', checkPasswordMatch);
// $newPasswordInput.addEventListener("input", checkPasswordMatch);

// 비밀번호 검증
function checkPasswordStrength(password) {
  const hasNumber = /\d/.test(password);
  const isLongEnough = password.length >= 8;
  const isTooLong = password.length >= 12;

  if (isLongEnough && !isTooLong && hasNumber) {
    return {
      score: 100,
      message: '유효한 비밀번호입니다',
      color: 'green',
    };
  } else if (!isLongEnough && !hasNumber) {
    return {
      score: 0,
      message: '8자리 이상, 숫자가 포함된 비밀번호로 해주세요',
      color: 'red',
    };
  } else if (isTooLong) {
    return {
      score: 0,
      message: '비밀번호는 12자리 미만, 숫자가 포함된 비밀번호여야 합니다',
      color: 'red',
    };
  } else {
    return {
      score: 0,
      message: '8자리 이상, 숫자가 포함된 비밀번호로 해주세요',
      color: 'red',
    };
  }
}

// 비밀번호 일치 여부 확인
function checkPasswordMatch() {
  if ($newPasswordInput.value === $confirmPasswordInput.value && $newPasswordInput.value !== '') {
    $confirmPasswordFeedback.textContent = '비밀번호가 일치합니다.';
    $confirmPasswordFeedback.style.color = 'green';
  } else if ($confirmPasswordInput.value === '') {
    $confirmPasswordFeedback.textContent = '';
  } else {
    $confirmPasswordFeedback.textContent = '비밀번호가 일치하지 않습니다.';
    $confirmPasswordFeedback.style.color = 'red';
  }

  checkForChanges();
}

// 사용자 닉네임 중복 검사
document.querySelector('input#nickName').addEventListener('input', function () {
  const nickName = this.value.trim();
  const uri = `./checkNickName?nickName=${nickName}`;
  const $nickNameFeedback = document.querySelector('#nickNameFeedback');

  axios
    .get(uri)
    .then((response) => {
      if (response.data === true) {
        if (nickName.length >= 12) {
          $nickNameFeedback.textContent = '닉네임은 12글자 미만으로 입력해주세요.';
          $nickNameFeedback.style.color = 'red';
        } else {
          $nickNameFeedback.textContent = '변경가능한 닉네임입니다.';
          $nickNameFeedback.style.color = 'green';
        }
      } else {
        $nickNameFeedback.textContent = '중복된 닉네임입니다.';
        $nickNameFeedback.style.color = 'red';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      $nickNameFeedback.textContent = '오류가 발생했습니다. 다시 시도해 주세요.';
      $nickNameFeedback.style.color = 'red';
    });
});

// 사용자 이메일 중복 검사
document.querySelector('input#email').addEventListener('input', function () {
  const email = this.value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const $emailFeedback = document.querySelector('#emailFeedback');

  if (!emailRegex.test(email)) {
    $emailFeedback.textContent = '유효하지 않은 정보입니다.';
    $emailFeedback.style.color = 'red';
    return;
  }

  const uri = `./checkEmail?email=${email}`;

  axios
    .get(uri)
    .then((response) => {
      if (response.data === true) {
        if (email.length >= 20) {
          $emailFeedback.textContent = '이메일은 20글자 미만의 경우에만 사용가능합니다.';
          $emailFeedback.style.catch = 'red';
        } else {
          $emailFeedback.textContent = '유효한 정보입니다.';
          $emailFeedback.style.color = 'green';
        }
      } else {
        $emailFeedback.textContent = '유효하지 않은 정보입니다.';
        $emailFeedback.style.color = 'red';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      $emailFeedback.textContent = '오류가 발생했습니다. 다시 시도해 주세요.';
      $emailFeedback.style.color = 'red';
    });
});

// 사용자 전화번호 중복 검사
[$phone1Input, $phone2Input, $phone3Input].forEach((input) => {
  input.addEventListener('input', function () {
    // 정규표현식 생성: 숫자만 허용
    const regex = /^[0-9]+$/;

    // 입력값이 숫자로만 구성되었는지 확인
    if (!regex.test(this.value)) {
      alert('전화번호에는 숫자만 입력해 주세요');
      // 입력값 초기화
      this.value = '';
      return;
    }

    // 다음 입력 필드로 자동 포커스 이동
    if (this.value.length === this.maxLength) {
      const next = this.nextElementSibling;
      if (next && next.tagName === 'INPUT') {
        next.focus();
      }
    }

    // 전화번호 중복 체크 함수 호출
    checkPhoneNumber();
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
          $phoneFeedback.textContent = '유효한 정보입니다.';
          $phoneFeedback.style.color = 'green';
        } else {
          $phoneFeedback.textContent = '유효하지 않은 정보입니다.';
          $phoneFeedback.style.color = 'red';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        $phoneFeedback.textContent = '오류가 발생했습니다. 다시 시도해 주세요.';
        $phoneFeedback.style.color = 'red';
      });
  }
}

// 정보 수정 버튼 클릭 시 (nickName, email, phoneNumber를 serverside에 POST 방식으로 보낸 후 응답에 따라 성공/실패 alert 띄우기)
// 정보 수정 버튼 클릭 이벤트
$updateBtn.addEventListener('click', function (e) {
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
    .post('./updateProfile', formData)
    .then((response) => {
      // 응답 처리
      if (response.data.success) {
        alert('정보가 성공적으로 업데이트 되었습니다.');
        window.location.href = './userProfile';
      } else {
        alert('정보 업데이트를 실패했습니다: ' + response.data.message);
      }
    })
    .catch((error) => {
      // 에러 처리
      console.error('Error:', error);
      alert('정보 업데이트 중 오류가 발생했습니다.');
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
  $nickNameFeedback.textContent = '';
  $emailFeedback.textContent = '';
  $phoneFeedback.textContent = '';

  // 값 변경 확인 및 공백 검사
  let isChanged = false;
  let isValid = true;
  for (let key in originalValues) {
    if (originalValues[key] !== currentValues[key] && currentValues[key] !== '') {
      isChanged = true;
    }

    // 전혀 공백을 허용하지 않는 경우
    if (!noSpaceRegex.test(currentValues[key])) {
      isValid = false;
      document.querySelector(`#${key}Feedback`).textContent = '공백이 포함되어서는 안됩니다.';
    }

    // 연속된 공백을 허용하지 않는 경우
    else if (!noConsecutiveSpaceRegex.test(currentValues[key])) {
      isValid = false;
      document.querySelector(`#${key}Feedback`).textContent = '공백이 포함되어서는 안됩니다.';
    }

    // 끝에 공백이 있는 경우
    else if (!noTrailingSpaceRegex.test(currentValues[key])) {
      isValid = false;
      document.querySelector(`#${key}Feedback`).textContent = '공백이 포함되어서는 안됩니다.';
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
  $updateBtn.disabled = !(isChanged && isValid && (isPasswordValid || (newPassword === '' && confirmPassword === '')));
}

// 각 입력 필드에 이벤트 리스너 추가
$nickName.addEventListener('input', checkForChanges);
$emailInput.addEventListener('input', checkForChanges);
$phone1Input.addEventListener('input', checkForChanges);
$phone2Input.addEventListener('input', checkForChanges);
$phone3Input.addEventListener('input', checkForChanges);
$newPasswordInput.addEventListener('input', checkForChanges);
$confirmPasswordInput.addEventListener('input', checkForChanges);

// 유저 프로필 이미지 변경 변수 -------->
const $profileImage = document.querySelector('#profileImage');
const $$profileImage = document.querySelectorAll('.profileImage');
const $profileImageInput = document.querySelector('#profileImageInput');
// <-------------- 유저 프로필 이미지 변경 변수

// 유저 프로필 이미지 변경
$profileImage.addEventListener('click', function () {
  $profileImageInput.click();
});

$profileImageInput.addEventListener('change', function () {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('newImage', file);

    // 서버로 put 요청 보내기
    axios
      .put(contextPath + '/profileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        $$profileImage.forEach(($$profileImage) => {
          $$profileImage.src = response.data;
        });
      })
      .catch((error) => {
        alert('프로필 이미지 변경 중 오류가 발생했습니다.');
      });
  }
});

// 초기 상태에서는 버튼 비활성화
$updateBtn.disabled = true;

const $userActivityTab = document.querySelector('#v-pills-disabled-tab');
const $addressSelect = document.querySelector('#address-select');
const $searchInput = document.querySelector('#search-input');
const $searchBtn = document.querySelector('#userActivitySearchBtn');
const $tabContent = document.querySelector('#nav-tabContent');
const tabs = ['total', 'favoritePlace', 'likedReview', 'writtenReview', 'verifiedPlace'];


let startRowValue = 0;
const rowCnt = 5;
let activityData = {};
let currentTab = 'total';
let moreDataAvailable = true;

let sortOrder = {
  total: 'desc',
  favoritePlace: 'desc',
  likedReview: 'desc',
  writtenReview: 'desc',
  verifiedPlace: 'desc',
};

$userActivityTab.addEventListener('click', () => {
  resetActivityTab();
  startRowValue = 0;
  readData();
});

tabs.forEach((tab) => {
  document.querySelector(`#nav-${tab}-tab`).addEventListener('click', () => {
    if (currentTab === tab) {
      // 같은 탭을 다시 클릭한 경우, 정렬 순서를 변경
      sortOrder[tab] = sortOrder[tab] === 'asc' ? 'desc' : 'asc';
      sortData(tab);
    } else {
      // 다른 탭으로 변경한 경우
      currentTab = tab;
      sortOrder[tab] = 'desc'; // 기본 정렬은 내림차순
      startRowValue = 0;
    }
    displayActivityInfo(activityData);
  });
});

// 기존 코드 상단에 추가
let sessionKeyword = '';

// 전체내역 가져오기
function readData(isLoadMore = false) {
  if (!moreDataAvailable) {
    console.log('더 이상 불러올 데이터가 없습니다.');
    return;
  }

  let searchKeyword = sessionStorage.getItem('searchKeyword') || $searchInput.value;

  axios
    .get(contextPath + '/allInfo', {
      params: {
        searchKeyword: searchKeyword,
        largeAddress: $addressSelect.value,
        calendarMin: startDate,
        calendarMax: endDate,
        startRowValue: isLoadMore ? startRowValue : 0,
        rowCnt: rowCnt,
      },
    })
    .then((response) => {
      console.log('Data fetched successfully:', response.data);
      if (response.data.sessionSearchKeyword) {
        sessionStorage.setItem('searchKeyword', response.data.sessionSearchKeyword);
      }

      if (isLoadMore) {
        const additionalDataLength = response.data.userRelatedInfo.length
          + response.data.userFavoritePlaces.length
          + response.data.userFavoriteReviews.length
          + response.data.userWrittenReviews.length
          + response.data.userVerifiedPlaces.length;
          
        if (additionalDataLength < rowCnt) {
          moreDataAvailable = false;
          console.log('더 이상 불러올 데이터가 없습니다.');
        }
        appendActivityInfo(response.data);
      } else {
        activityData = response.data;
        displayActivityInfo(activityData);
      }
    })
    .catch((error) => {
      console.error('Error fetching user related info:', error);
    });
}

// 스크롤시 추가 데이터 가져오기
function readMoreData() {
  startRowValue += rowCnt;
  readData(true);
}

// 검색 버튼
$searchBtn.addEventListener('click', () => {
  sessionStorage.setItem('searchKeyword', $searchInput.value);
  resetStartRow();
  moreDataAvailable = true;
  readData();
});

function resetStartRow() {
  startRowValue = 0;
}

function displayActivityInfo(data) {
  const $userRelatedInfoList = document.querySelector('#totalList');
  const $userFavoritePlacesList = document.querySelector('#favoritePlaceList');
  const $userFavoriteReviewsList = document.querySelector('#likedReviewList');
  const $userWrittenReviewsList = document.querySelector('#writtenReviewList');
  const $userVerifiedPlacesList = document.querySelector('#verifiedPlaceList');

  // 전체 활동 내역
  displayTotalInfo(data.userRelatedInfo || [], $userRelatedInfoList);

  // 관심 장소
  displayFavoritePlaces(data.userFavoritePlaces || [], $userFavoritePlacesList);

  // 좋아요한 리뷰
  displayLikedReviews(data.userFavoriteReviews || [], $userFavoriteReviewsList);

  // 작성한 리뷰
  displayWrittenReviews(data.userWrittenReviews || [], $userWrittenReviewsList);

  // 인증한 장소
  displayVerifiedPlaces(data.userVerifiedPlaces || [], $userVerifiedPlacesList);
}

function displayTotalInfo(info, $list) {
  $list.innerHTML = info.length ? '' : '<li class="list-group-item">활동 내역이 없습니다.</li>';
  info.forEach((item) => {
    let content = '';
    switch (item.type) {
      case 'favorite_places':
        content = `${item.address} ${item.placeName} 게시물에 좋아요를 눌렀습니다.`;
        break;
      case 'liked_reviews':
        content = `${item.placeName}에 ${item.reviewAuthor}님 리뷰 ${item.review}에 좋아요를 눌렀습니다.`;
        break;
      case 'written_reviews':
        content = `${item.address} ${item.placeName}에 "${item.review}" 리뷰를 남겼습니다.`;
        break;
      case 'verified_places':
        content = `${item.address} ${item.placeName} 위치인증을 했습니다.`;
        break;
    }
    $list.innerHTML += `
      <li class="list-group-item d-flex align-items-center">
        <img src="${item.firstUrl}" alt="썸네일" class="rounded-circle me-3" width="50" height="50" />
        <div>
          <p class="mb-0">${content}</p>
          <small class="text-muted">${item.createdAt}</small>
        </div>
      </li>
    `;
  });
}

function displayFavoritePlaces(places, $list) {
  $list.innerHTML = places.length ? '' : '<li class="list-group-item">활동 내역이 없습니다.</li>';
  places.forEach((place) => {
    $list.innerHTML += `
      <li class="list-group-item d-flex align-items-center">
        <img src="${place.firstUrl}" alt="프로필" class="rounded-circle me-3" width="50" height="50" />
        <div>
          <p class="mb-0">${place.address} ${place.placeName} 게시물에 좋아요를 눌렀습니다.</p>
          <small class="text-muted">${place.createdAt}</small>
        </div>
      </li>
    `;
  });
}

function displayLikedReviews(reviews, $list) {
  $list.innerHTML = reviews.length ? '' : '<li class="list-group-item">활동 내역이 없습니다.</li>';
  reviews.forEach((review) => {
    $list.innerHTML += `
      <li class="list-group-item d-flex align-items-center">
        <img src="${review.firstUrl}" alt="게시물 썸네일" class="rounded-circle me-3" width="50" height="50" />
        <div>
          <p class="mb-0">${review.placeName}에 ${review.reviewAuthor}님 리뷰 '${review.review}'에 좋아요를 눌렀습니다.</p>
          <small class="text-muted">${review.createdAt}</small>
        </div>
      </li>
    `;
  });
}

function displayWrittenReviews(reviews, $list) {
  $list.innerHTML = reviews.length ? '' : '<li class="list-group-item">활동 내역이 없습니다.</li>';
  reviews.forEach((review) => {
    $list.innerHTML += `
      <li class="list-group-item d-flex align-items-center">
        <img src="${review.firstUrl}" alt="프로필" class="rounded-circle me-3" width="50" height="50" />
        <div>
          <p class="mb-0">${review.address} ${review.placeName}에 "${review.review}" 리뷰를 남겼습니다.</p>
          <small class="text-muted">${review.createdAt}</small>
        </div>
      </li>
    `;
  });
}

function displayVerifiedPlaces(places, $list) {
  $list.innerHTML = places.length ? '' : '<li class="list-group-item">활동 내역이 없습니다.</li>';
  places.forEach((place) => {
    $list.innerHTML += `
      <li class="list-group-item d-flex align-items-center">
        <img src="${place.firstUrl}" alt="게시물 썸네일" class="rounded-circle me-3" width="50" height="50" />
        <div>
          <p class="mb-0">${place.address} ${place.placeName} 위치인증을 했습니다.</p>
          <small class="text-muted">${place.createdAt}</small>
        </div>
      </li>
    `;
  });
}

function appendActivityInfo(data) {
  appendTotalInfo(data.userRelatedInfo || []);
  appendFavoritePlaces(data.userFavoritePlaces || []);
  appendLikedReviews(data.userFavoriteReviews || []);
  appendWrittenReviews(data.userWrittenReviews || []);
  appendVerifiedPlaces(data.userVerifiedPlaces || []);
}

function appendTotalInfo(info) {
  const $list = document.querySelector('#totalList');
  appendInfo(info, $list);
}

function appendFavoritePlaces(places) {
  const $list = document.querySelector('#favoritePlaceList');
  appendInfo(places, $list);
}

function appendLikedReviews(reviews) {
  const $list = document.querySelector('#likedReviewList');
  appendInfo(reviews, $list);
}

function appendWrittenReviews(reviews) {
  const $list = document.querySelector('#writtenReviewList');
  appendInfo(reviews, $list);
}

function appendVerifiedPlaces(places) {
  const $list = document.querySelector('#verifiedPlaceList');
  appendInfo(places, $list);
}

function appendInfo(items, $list) {
  items.forEach((item) => {
    let content = '';
    switch (item.type) {
      case 'favorite_places':
        content = `${item.address} ${item.placeName} 게시물에 좋아요를 눌렀습니다.`;
        break;
      case 'liked_reviews':
        content = `${item.placeName}에 ${item.reviewAuthor}님 리뷰 ${item.review}에 좋아요를 눌렀습니다.`;
        break;
      case 'written_reviews':
        content = `${item.address} ${item.placeName}에 "${item.review}" 리뷰를 남겼습니다.`;
        break;
      case 'verified_places':
        content = `${item.address} ${item.placeName} 위치인증을 했습니다.`;
        break;
    }
    $list.innerHTML += `
      <li class="list-group-item d-flex align-items-center">
        <img src="${item.firstUrl}" alt="썸네일" class="rounded-circle me-3" width="50" height="50" />
        <div>
          <p class="mb-0">${content}</p>
          <small class="text-muted">${item.createdAt}</small>
        </div>
      </li>
    `;
  });
}

function resetSortOrder() {
  sortOrder = {
    total: 'desc',
    favoritePlace: 'desc',
    likedReview: 'desc',
    writtenReview: 'desc',
    verifiedPlace: 'desc',
  };
}

function sortData(tab) {
  const getDataForTab = (tab) => {
    switch (tab) {
      case 'total':
        return activityData.userRelatedInfo;
      case 'favoritePlace':
        return activityData.userFavoritePlaces;
      case 'likedReview':
        return activityData.userFavoriteReviews;
      case 'writtenReview':
        return activityData.userWrittenReviews;
      case 'verifiedPlace':
        return activityData.userVerifiedPlaces;
    }
  };

  const data = getDataForTab(tab);
  if (data && Array.isArray(data)) {
    data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder[tab] === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}

// 새로운 함수: 활동 내역 탭 초기화
function resetActivityTab() {
  currentTab = 'total';
  $searchInput.value = '';
  sessionStorage.removeItem('searchKeyword');
  $addressSelect.value = '';
  startDate = '';
  endDate = '';
  document.querySelector('#date-range').value = '';
  moreDataAvailable = true;

  // 전체 탭 활성화
  document.querySelector('#nav-total-tab').click();

  // 모든 탭의 정렬 순서를 초기화
  Object.keys(sortOrder).forEach((key) => {
    sortOrder[key] = 'desc';
  });

  // 데이터 재로드
  readData();
}

// 내 활동내역 기간설정
// Flatpickr 스타일시트를 동적으로 로드
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';
document.head.appendChild(link);

// 달력 날짜 변수
let startDate = '';
let endDate = '';
let datePicker;

// Flatpickr 초기화
flatpickr.localize(flatpickr.l10ns.ko);
datePicker = flatpickr('#date-range', {
  mode: 'range',
  dateFormat: 'Y.m.d',
  minDate: '2022-07-01',
  maxDate: 'today',
  disableMobile: 'true',
  defaultDate: [], // 기본값을 빈 배열로 설정

  onChange: function (selectedDates, dateStr, instance) {
    console.log('Selected dates:', selectedDates); // 선택한 날짜를 콘솔에 출력
    if (selectedDates.length === 0) {
      instance.element.placeholder = '전체기간';
    } else if (selectedDates.length === 1) {
      startDate = formatDate(selectedDates[0]);
      endDate = ''; // endDate를 빈 문자열로 설정
      console.log('한개만 선택했을때 시작날짜' + startDate);
      console.log('한개만 선택했을때 끝날짜' + endDate);
      // 필요한 경우 여기서 처리할 작업을 추가
    } else if (selectedDates.length === 2) {
      if (selectedDates[0].getTime() === selectedDates[1].getTime()) {
        startDate = formatDate(selectedDates[0]);
        endDate = ''; // 같은 날짜일 때 endDate를 빈 문자열로 설정
        console.log('같은 날짜 선택했을때 시작날짜: ' + startDate);
        console.log('같은 날짜 선택했을때 끝날짜: ' + endDate);
      } else {
        startDate = formatDate(selectedDates[0]);
        endDate = formatDate(selectedDates[1]);
        console.log('두개 선택했을때 시작날짜: ' + startDate);
        console.log('두개 선택했을때 끝날짜: ' + endDate);
      }
    }
  },
  onReady: function (selectedDates, dateStr, instance) {
    instance.element.placeholder = '전체기간'; // 추가된 부분
    // '전체기간' 버튼 추가
    const wrapper = instance.calendarContainer;
    const clearButton = document.createElement('button');
    clearButton.innerHTML = '전체기간';
    clearButton.className = 'flatpickr-button flatpickr-clear custom-all-period-btn';
    clearButton.addEventListener('click', function () {
      startDate = '';
      endDate = '';
      console.log('전체기간 눌렀을때 시작날짜' + startDate);
      console.log('전체기간 눌렀을때 끝날짜' + endDate);
      instance.clear();
      instance.element.placeholder = '전체기간';
    });
    wrapper.appendChild(clearButton);
    // '기간설정' 버튼
  },
});


const activityTabs = document.querySelectorAll('.list-group');
activityTabs.forEach(tab => {
  tab.addEventListener('scroll', function() {
    if(this.id !== getListIdFromTab(currentTab)) return;
    
    const { scrollTop, scrollHeight, clientHeight } = this;

    // 스크롤의 전체 높이
    const totalScrollHeight = scrollHeight - clientHeight;

    // 현재 스크롤 위치의 비율(0 ~ 1)
    const scrollRatio = scrollTop / totalScrollHeight;

    // 스크롤이 80% 이상 내려갔을때
    if(scrollRatio > 0.8) {
      readMoreData(currentTab);
    }
  });
});

function getListIdFromTab(tab) {
  switch(tab) {
    case 'total':
      return 'totalList';
    case 'favoritePlace':
      return 'favoritePlaceList';
    case 'likedReview':
      return 'likedReviewList';
    case 'writtenReview':
      return 'writtenReviewList';
    case 'verifiedPlace':
      return 'verifiedPlaceList';
    default:
      console.error('Unknown tab:', tab);
      return '';
  }
}



let calendar;
let currentMonth;
let selectedDate;
let previousSelectedCell;
let attendanceDates = []; // 출석 날짜를 저장할 배열

const $userPointTab = document.querySelector('#v-pills-messages-tab');
$userPointTab.addEventListener('click', initializePointTab);

function initializePointTab() {
  selectedDate = new Date();
  currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  fetchAttendanceData(currentMonth).then(() => {
    initializeCalendar();
    updatePointHistoryForDate(selectedDate);
    updatePointSummaryForMonth(currentMonth); // 이 줄이 추가되었습니다
  });
}

function fetchAttendanceData(date) {
  const yearMonth = formatYearMonth(date);
  return axios
    .get(contextPath + '/userLogged', {
      params: { yearMonth: yearMonth },
    })
    .then(function (response) {
      attendanceDates = response.data.map((item) => new Date(item.loginDate));
    })
    .catch(function (error) {
      console.error('Error fetching attendance data:', error);
    });
}

function initializeCalendar() {
  const $calendarEl = document.getElementById('calendar');
  if (!$calendarEl) {
    console.error('Calendar element not found');
    return;
  }

  if (calendar) {
    calendar.destroy();
  }

  calendar = new FullCalendar.Calendar($calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today',
    },
    buttonText: {
      today: '오늘',
    },
    locale: 'ko',
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
    },
    datesSet: function (info) {
      currentMonth = info.view.currentStart;
      fetchAttendanceData(currentMonth).then(() => {
        calendar.render();
        updatePointSummaryForMonth(currentMonth);

        // 테이블 초기화 및 메시지 표시
        const $table = document.querySelector('#pointHistoryTable tbody');
        $table.innerHTML = '<tr><td colspan="3" class="text-center">선택된 날짜의 내역이 없습니다.</td></tr>';

        // 선택된 날짜 초기화
        selectedDate = null;
        if (previousSelectedCell) {
          previousSelectedCell.style.backgroundColor = '';
          previousSelectedCell.style.fontWeight = 'normal';
          previousSelectedCell = null;
        }
      });
    },
    dayCellDidMount: function (info) {
      const today = new Date();
      if (info.date.toDateString() === today.toDateString()) {
        info.el.style.backgroundColor = '#4a86e8';
        info.el.style.color = 'white';
        info.el.style.fontWeight = 'bold';
      }
      if (selectedDate && info.date.toDateString() === selectedDate.toDateString()) {
        highlightSelectedDate(info.el, info.date);
      }
    },
  });

  calendar.render();

  const todayButton = document.querySelector('.fc-today-button');
  if (todayButton) {
    todayButton.addEventListener('click', () => {
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
    previousSelectedCell.style.backgroundColor = '';
    previousSelectedCell.style.fontWeight = 'normal';
  }

  const newSelectedCell = cellEl || calendar.getDate(date).dayEl;

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  if (newSelectedCell) {
    if (isToday) {
      newSelectedCell.style.backgroundColor = '#4a86e8';
      newSelectedCell.style.color = 'white';
    } else {
      newSelectedCell.style.backgroundColor = '#e6f2ff';
    }
    newSelectedCell.style.fontWeight = 'bold';
    previousSelectedCell = newSelectedCell;
  }
}

function updatePointHistoryForDate(date) {
  const formattedDate = formatDate(date);
  axios
    .get(contextPath + '/pointsLogs', {
      params: { yearMonthDay: formattedDate },
    })
    .then(function (response) {
      updatePointHistoryTable(response.data);
      if (calendar) {
        calendar.render();
      }
    })
    .catch(function (error) {
      console.error('Error updating point history for date:', error);
    });
}

function updatePointSummaryForMonth(date) {
  const yearMonth = formatYearMonth(date);
  axios
    .get(contextPath + '/pointsStats', {
      params: { yearMonth: yearMonth },
    })
    .then(function (response) {
      const { totalPointsGained, totalPointsLost } = response.data;
      console.log(response.data);
      document.querySelector('#earnedPoints').textContent = totalPointsGained;
      document.querySelector('#spentPoints').textContent = Math.abs(totalPointsLost);
    })
    .catch(function (error) {
      console.error('Error updating points display:', error);
    });
}

// function updatePointSummaryForDay(date) {
//   const yearMonthDay = formatDate(date);
//   axios
//     .get(contextPath + '/pointsStats', {
//       params: {yearMonthDay: yearMonthDay},
//     })
//     .then(function (response) {
//       const {totalPointGained, totalPointsLost} = response.data;
      
//     })
// }


function updatePointHistoryTable(history) {
  const $table = document.querySelector('#pointHistoryTable tbody');
  $table.innerHTML = '';

  if (history.length === 0) {
    $table.innerHTML = '<tr><td colspan="3" class="text-center">선택된 날짜의 내역이 없습니다.</td></tr>';
  } else {
    history.forEach(function (item) {
      const row = $table.insertRow();
      row.insertCell(0).textContent = formatDate(new Date(item.pointsGetLoseTime));
      row.insertCell(1).textContent = item.userActivity;
      row.insertCell(2).textContent = item.points;
    });
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function formatYearMonth(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}.${month}`;
}
