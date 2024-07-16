document.addEventListener("DOMContentLoaded", () => {
	function levelColor(level) {
		if (level >= 90) {
			return {
				bg: "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)",
				animation: "rainbow 5s linear infinite, sparkle 2s linear infinite",
			};
		}
		if (level >= 80)
			return { bg: "linear-gradient(145deg, #C0C0C0, #A9A9A9, #C0C0C0)" }; // 은
		if (level >= 70) return { bg: "linear-gradient(145deg, #9400D3, #8A2BE2)" }; // 보
		if (level >= 60) return { bg: "linear-gradient(145deg, #4B0082, #483D8B)" }; // 남
		if (level >= 50) return { bg: "linear-gradient(145deg, #0000FF, #1E90FF)" }; // 파
		if (level >= 40) return { bg: "linear-gradient(145deg, #00FF00, #32CD32)" }; // 초
		if (level >= 30) return { bg: "linear-gradient(145deg, #FFFF00, #FFD700)" }; // 노
		if (level >= 20) return { bg: "linear-gradient(145deg, #FF4500, #FF6347)" }; // 주
		if (level >= 10) return { bg: "linear-gradient(145deg, #FF0000, #DC143C)" }; // 빨
		return { bg: "linear-gradient(145deg, #8B4513, #A0522D)" }; // 1 - 9 까지 색상
	}

	function setLevel(element, level) {
		if (level >= 100) {
			element.innerHTML = "👑";
			element.style.background = "none";
			element.style.fontSize = "30px";
			element.style.top = "-18px";
			element.style.position = "relative";
			element.style.animation = "sparkle 1.5s infinite";
			element.style.filter = "drop-shadow(0 0 2px gold)";
		} else {
			const colorStyle = levelColor(level);
			element.innerHTML = level;
			element.style.background = colorStyle.bg;
			if (level >= 90) {
				element.style.animation = colorStyle.animation;
				element.style.backgroundSize = "300% 300%";
			} else {
				element.style.animation = "none";
				element.style.backgroundSize = "100% 100%";
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

	// 페이지 로드 시 모든 카드의 레벨 설정
	document.querySelectorAll(".circular-icon").forEach((element) => {
		const level = parseInt(element.textContent, 10);
		setLevel(element, level);
	});



	function updateButtonVisibility(isLoggedIn) {
		const $sortButtons = document.querySelectorAll(".btn-group .btn[data-sortUserFavorite]");
		$sortButtons.forEach((button) => {
			if (isLoggedIn) {
				button.classList.remove("d-none");
				button.classList.add("d-inline-block");
			} else {
				button.classList.add("d-none");
				button.classList.remove("d-inline-block");
			}
		});
	}
	function checkLoginStatus() {
		const loginButton = document.querySelector("#loginBtn");
		const profileButton = document.querySelector("#profileBtn");

		if (!loginButton && !profileButton) {
			console.error("Login or Profile button not found");
			return;
		}

		const isLoggedIn = profileButton !== null;
		updateButtonVisibility(isLoggedIn);

		// MutationObserver 설정
		const observer = new MutationObserver(() => {
			const isLoggedIn = profileButton !== null;
			updateButtonVisibility(isLoggedIn);
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	// 초기 체크
	checkLoginStatus();

	let currentSearchParams = {
		addressCategory: "",
		searchKeyword: ""
	};

	const $searchButton = document.querySelector("#search-button");
	const $provinceSelect = document.querySelector("#province-select");
	const $searchKeyword = document.querySelector("#search-keyword");
	const $cardContainer = document.querySelector("#cardMain");
	const $moreButton = document.querySelector("#btnPlus");
	const $sortButtons = document.querySelectorAll(".btn-group .btn");

	let startRowValue = 0; // 처음 0으로 설정
	const initialItemsPerPage = 9; // 처음 로드할 아이템 수
	const itemsPerPage = 6; // 더보기 시 로드할 아이템 수
	let currentSortKey = "iScore";
	let currentSortValue = 1;

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

	// 초기 로드 시 9개의 항목 불러오기
	fetchPlaces(initialItemsPerPage, true);

	$searchButton.addEventListener("click", () => {
		startRowValue = 0; // 검색 시 시작 행을 0으로 초기화
		$cardContainer.innerHTML = ""; // 기존 카드 제거
		currentSearchParams.addressCategory = provinceMap[$provinceSelect.value] || "";
		currentSearchParams.searchKeyword = $searchKeyword.value.trim();
		fetchPlaces(initialItemsPerPage, true); // 검색 시 9개 로드
	});

	$moreButton.addEventListener("click", () => {
		const hiddenCards = document.querySelectorAll(".extra-card.d-none");
		if (hiddenCards.length > 0) {
			fetchPlaces(3);
			for (let i = 0; i < 3 && i < hiddenCards.length; i++) {
				hiddenCards[i].classList.remove("d-none");
			}
		} else {
			fetchPlaces(3); // 3개의 새로운 카드 로드
		}
	});
	$searchKeyword.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			// Enter 키 확인
			event.preventDefault();
			$searchButton.click(); // 검색 버튼 클릭 동작 수행
		}
	});

	function fetchPlaces(rowCnt, isInitialLoad = false, sortKey = currentSortKey, sortValue = currentSortValue) {
		const selectedProvince = $provinceSelect.value || "";
		const addressCategory = provinceMap[selectedProvince] || "";
		const searchKeyword = $searchKeyword.value.trim() || "";

		axios
			.get("./search", {
				params: {
					addressCategory: currentSearchParams.addressCategory,
					searchKeyword: currentSearchParams.searchKeyword,
					sortKey: sortKey,
					sortValue: sortValue,
					startRowValue: startRowValue,
					rowCnt: rowCnt,
				},
			})
			.then((response) => {
				const $newPlaces = response.data;
				if (isInitialLoad) {
					console.log("처음 장소 9개 로드: ");
					console.log($newPlaces);  // 테이블 형식으로 데이터 출]력
				} else {
					console.log("추가 장소 정보: ");
					console.log($newPlaces);
				}
				if ($newPlaces.length === 0 && startRowValue === 0) {
					$cardContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
					$moreButton.style.display = "none";
					return;
				}

				const existingPlaceNames = new Set();
				document.querySelectorAll(".card-item .main-card-title").forEach((title) => {
					existingPlaceNames.add(title.textContent);
				});

				$newPlaces.forEach((place, index) => {
					if (!existingPlaceNames.has(place.placeName)) {
						const $newCard = createCard(place, startRowValue + index);
						$cardContainer.appendChild($newCard);
						existingPlaceNames.add(place.placeName); // 새로운 장소 이름을 추가
					}
				});

				if ($newPlaces.length >= rowCnt || document.querySelectorAll(".extra-card.d-none").length > 0) {
					$moreButton.style.display = "block";
				} else {
					$moreButton.style.display = "none";
				}
				startRowValue += $newPlaces.length; // 다음 시작 행 업데이트
			})
			.catch((error) => {
				console.error("Error fetching places:", error);
				if (startRowValue === 0) {
					$cardContainer.innerHTML = "<p>검색 중 오류가 발생했습니다. 다시 시도해 주세요.</p>";
				} else {
					alert("데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
				}
				$moreButton.style.display = "none";
			});
	}
	const difficultyMap = {
		하: "bg-success",
		중: "bg-warning",
		상: "bg-danger",
	};



	function createCard(place, index) {

		const $newCard = document.createElement("div");
		$newCard.classList.add("col-lg-4", "col-md-6", "mb-3", "card-item");
		if (index >= 6) {
			$newCard.classList.add("d-none", "extra-card");
		}
		$newCard.innerHTML = `
      <div class="main-card go-to-details" data-place-name="${place.placeName}">
        <div class="main-card-header bg-transparent">
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="main-card-title">${place.placeName}</h1>
            <i class="bi ${place.userFavorite == 1 ? "bi-heart-fill red-color" : "bi-heart"
			} main-custom-heart" data-place-name="${place.placeName}" data-user-favorite="${place.userFavorite}"></i>
          </div>
          <div class="main-badges mt-3">
            <span class="badge"><i class="bi bi-fire" id="fire"></i> ${place.highestBadge}</span>
            <span class="badge"><i class="bi bi-fire" id="fire"></i> ${place.secondHighestBadge}</span>
            <span class="badge ${difficultyMap[place.iscore] || ""}">아이난이도: ${place.iscore}</span>
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
            <span class="level circular-icon" id="levelIcon">${place.level}</span>
              <span class="username">${place.nickName}</span>
            </div>
            <div class="post-info">
              <span class="date"><i class="bi bi-calendar3"></i> ${formatDate(place.modifiedAt)}</span>
              <span class="likes"><i class="bi bi-heart-fill"></i> ${place.likeCount}</span>
            </div>
          </div>
          <div class="comment-section">
            <p class="comment-text"><i class="bi bi-chat-left-quote"></i> ${place.review}</p>
          </div>
        </div>
      </div>
    `;
		const levelElement = $newCard.querySelector(".level.circular-icon");
		setLevel(levelElement, place.level);


		return $newCard;
	}

	function formatDate(dateArray) {
		const year = dateArray[0];
		const month = dateArray[1].toString().padStart(2, "0");
		const day = dateArray[2].toString().padStart(2, "0");
		return `${year}-${month}-${day}`;
	}


	$sortButtons.forEach((button) => {
		button.addEventListener("click", function(event) {
			const $sortButton = event.target;
			let $iScore = $sortButton.getAttribute("data-sortIscore");
			let $placeVerified = $sortButton.getAttribute("data-sortPlaceVerified");
			let $userFavorite = $sortButton.getAttribute("data-sortUserFavorite");
			let $reviewCnt = $sortButton.getAttribute("data-sortReviewCnt");

			// 클릭된 버튼의 정렬 방향을 토글
			if ($iScore !== null) {
				$iScore = $iScore === "1" ? "0" : "1";
				$sortButton.setAttribute("data-sortIscore", $iScore);
				currentSortKey = "iScore";
				currentSortValue = parseInt($iScore);
			} else if ($placeVerified !== null) {
				$placeVerified = $placeVerified === "1" ? "0" : "1";
				$sortButton.setAttribute("data-sortPlaceVerified", $placeVerified);
				currentSortKey = "placeVerified";
				currentSortValue = parseInt($placeVerified);
			} else if ($userFavorite !== null) {
				$userFavorite = $userFavorite === "1" ? "0" : "1";
				$sortButton.setAttribute("data-sortUserFavorite", $userFavorite);
				currentSortKey = "userFavorite";
				currentSortValue = parseInt($userFavorite);
			} else if ($reviewCnt !== null) {
				$reviewCnt = $reviewCnt === "1" ? "0" : "1";
				$sortButton.setAttribute("data-sortReviewCnt", $reviewCnt);
				currentSortKey = "reviewCnt";
				currentSortValue = parseInt($reviewCnt);
			}

			// 정렬 시 시작 행을 0으로 초기화
			startRowValue = 0;
			$cardContainer.innerHTML = "";
			fetchPlaces(initialItemsPerPage, true, currentSortKey, currentSortValue); // 정렬 시 처음 9개 로드
		});
	});
});





document.addEventListener("click", function(event) {
	if (event.target.classList.contains("main-custom-heart")) {
		const $heartIcon = event.target;
		const $placeName = $heartIcon.getAttribute("data-place-name");

		console.log("클릭된 장소 이름:", $placeName); // 디버깅용 로그

		if ($placeName) {
			$heartIcon.classList.toggle("bi-heart");
			$heartIcon.classList.toggle("bi-heart-fill");
			$heartIcon.classList.toggle("red-color");

			let heartClickable = $heartIcon.classList.contains("bi-heart-fill") ? 1 : 0;
			$heartIcon.setAttribute("data-user-favorite", heartClickable); // data-user-favorite 속성 업데이트

			//if (LoginUserId === 'null' || LoginUserId === '') {
			// window.location.href = `${contextPath}/user/loginRegister`;
			// return; // 로그인 페이지로 리다이렉트 후 함수 종료
			// }
			if (heartClickable === 1) {
				console.log("하트 클릭됨:", $placeName);
				const uri = "./clickHeart";

				axios
					.put(uri, $placeName)
					.then((response) => {
						if (response.data === 0) {
							alert("로그인 하세요.");
							window.location.href = `${contextPath}/user/loginRegister`;
							return;
						}
						console.log("응답 데이터:", response.data);
					})
					.catch((error) => {
						console.error("에러 데이터:", error);
					});
			} else {
				console.log("하트 취소됨:", $placeName);
				const uri = `./deleteHeart/${$placeName}`;
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



const $searchBox = document.querySelector("#search-keyword");
const $suggestions = document.querySelector("#suggestions");
const $provinceSelects = document.querySelector("#province-select");

let selectedIndex = -1; // 현재 선택된 리스트 아이템의 인덱스

const provinceMaps = {
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

$searchBox.addEventListener("input", function() {
	const query = $searchBox.value.trim();
	const selectedProvince = $provinceSelects.value || "";
	const addressCategory = provinceMaps[selectedProvince] || "";

	if (query.length > 0) {
		axios
			.get("./searchSuggestions", {
				params: {
					searchKeyword: query,
					addressCategory: addressCategory,
				},
			})
			.then((response) => {
				const data = response.data;
				$suggestions.innerHTML = "";
				selectedIndex = -1; // 새로 검색할 때 인덱스 초기화
				if (data.length > 0) {
					data.forEach((item) => {
						const li = document.createElement("li");
						li.textContent = item;
						li.classList.add("list-group-item", "list-group-item-action");
						$suggestions.appendChild(li);
					});
					$suggestions.style.display = "block";
				} else {
					const li = document.createElement("li");
					li.textContent = "검색결과가 없습니다";
					li.classList.add("list-group-item");
					$suggestions.appendChild(li);
					$suggestions.style.display = "block";
				}
			})
			.catch((error) => {
				console.error("Error fetching suggestions:", error);
			});
	} else {
		$suggestions.innerHTML = "";
		$suggestions.style.display = "none";
	}
});

$searchBox.addEventListener("keydown", function(event) {
	const items = $suggestions.querySelectorAll("li");
	if (items.length === 0) return;

	if (event.key === "ArrowDown") {
		selectedIndex = (selectedIndex + 1) % items.length;
		updateSelection();
	} else if (event.key === "ArrowUp") {
		selectedIndex = (selectedIndex - 1 + items.length) % items.length;
		updateSelection();
	} else if (event.key === "ArrowLeft") {
		// 추가 기능: 왼쪽 방향키로 리스트의 첫 번째 항목으로 이동
		$provinceSelects.focus();
	} else if (event.key === "Enter" && selectedIndex > -1) {
		$searchBox.value = items[selectedIndex].textContent;
		$suggestions.style.display = "none";
	}
});

function updateSelection() {
	const items = $suggestions.querySelectorAll("li");
	items.forEach((item, index) => {
		if (index === selectedIndex) {
			item.classList.add("active");
			item.scrollIntoView({ block: "nearest" });
		} else {
			item.classList.remove("active");
		}
	});
}

$suggestions.addEventListener("click", function(event) {
	if (event.target.tagName === "LI") {
		$searchBox.value = event.target.textContent;
		$suggestions.style.display = "none";
	}
});

// 검색창 외부 클릭 시 추천 검색어 숨기기
document.addEventListener("click", function(event) {
	if (!event.target.closest(".search-container")) {
		$suggestions.style.display = "none";
	}
});
$provinceSelects.addEventListener("keydown", function(event) {
	const options = Array.from($provinceSelects.options);
	let selectedOptionIndex = options.findIndex((option) => option.selected);

	if (event.key === "ArrowDown") {
		selectedOptionIndex = (selectedOptionIndex + 1) % options.length;
		options[selectedOptionIndex].selected = true;
	} else if (event.key === "ArrowUp") {
		selectedOptionIndex = (selectedOptionIndex - 1 + options.length) % options.length;
		options[selectedOptionIndex].selected = true;
	} else if (event.key === "Enter" && selectedOptionIndex > -1) {
		event.preventDefault(); // 기본 엔터 동작 방지
		$searchBox.focus();
	} else if (event.key === "ArrowRight") {
		$provinceSelects.focus();
	}
});

// 스크롤 탑 버튼
const $scrollToTopBtn = document.querySelector("#scrollToTopBtn");
if ($scrollToTopBtn) {
	window.addEventListener("scroll", scrollFunction);

	function scrollFunction() {
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
			$scrollToTopBtn.style.display = "block";
		} else {
			$scrollToTopBtn.style.display = "none";
		}
	}

	$scrollToTopBtn.addEventListener("click", function() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}

// 카드 컨테이너에 이벤트 리스너 추가 (이벤트 위임)
const cardContainer = document.querySelector(".row.text-center"); // 카드들을 포함하는 컨테이너의 선택자를 적절히 수정하세요

if (cardContainer) {
	cardContainer.addEventListener("click", function(event) {
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

function checkSession() {
	axios
		.get(`${contextPath}/user/checkSession`)
		.then((response) => {
			if (response.data.success === false) {
				alert(response.data.message);
				window.location.href = `${contextPath}/user/loginRegister`;
			}
		})
		.catch((error) => {
			console.error("Session check error:", error);
		});
}

// 30초마다 세션 체크
setInterval(checkSession, 30000);
// 페이지 로드 시 즉시 세션 체크
checkSession();

