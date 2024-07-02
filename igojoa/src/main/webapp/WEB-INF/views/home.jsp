<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>

<html>
  <head>
    <meta charset="UTF-8" />
    <title>아이고조아</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <c:url var="cssResetCss" value="/css/cssReset.css" />
    <link rel="stylesheet" href="${cssResetCss}" />
    <c:url var="navbarCss" value="/css/navbar.css" />
    <link rel="stylesheet" href="${navbarCss}" />
    <c:url var="loginRegistrationCss" value="/css/loginRegistration.css" />
    <link rel="stylesheet" href="${loginRegistrationCss}" />
    <c:url var="mainCss" value="/css/main.css" />
    <link rel="stylesheet" href="${mainCss}" />
    <c:url var="faqCss" value="/css/faq.css" />
    <link rel="stylesheet" href="${faqCss}" />
    <c:url var="imageGalleryCss" value="/css/image_gallery.css" />
    <link rel="stylesheet" href="${imageGalleryCss}" />
    <c:url var="lottoCss" value="/css/lotto.css" />
    <link rel="stylesheet" href="${lottoCss}" />
</head>

<body>
    <%@ include file="header.jspf"%>

    <!-- Main Section -->
    <main>
<section id="main-section">
        <div class="d-flex justify-content-center my-5" id="search-bar">
            <div class="input-group main-search-bar">
                <select id="province-select" class="form-select" aria-label="도/광역시 선택">
                    <option selected value="">전체</option>
                    <option value="seoul">서울시</option>
                    <option value="gyeonggi">경기도</option>
                    <option value="gangwon">강원도</option>
                    <option value="jeollabuk">전라북도</option>
                    <option value="jeollanam">전라남도</option>
                    <option value="gyeongsangbuk">경상북도</option>
                    <option value="gyeongsangnam">경상남도</option>
                    <option value="chungcheongbuk">충청북도</option>
                    <option value="chungcheongnam">충청남도</option>
                    <option value="busan">부산시</option>
                    <option value="daegu">대구시</option>
                    <option value="incheon">인천시</option>
                    <option value="gwangju">광주시</option>
                    <option value="daejeon">대전시</option>
                    <option value="ulsan">울산시</option>
                    <option value="jeju">제주도</option>
                </select>
                <input type="text" id="search-keyword" class="form-control" placeholder="검색어를 입력하세요" aria-label="검색"/>
                <button class="btn btn-secondary" id="search-button" type="button">
                    <i class="bi bi-search"></i> 검색
                </button>
            </div>
        </div>

        <div class="d-flex justify-content-center mb-5">
            <div class="btn-group" role="group">
                <button class="btn btn-outline-secondary" id="iScore" type="button">난이도</button>
                <button class="btn btn-outline-secondary" id="placeVerified" type="button">방문횟수</button>
                <button class="btn btn-outline-secondary" id="userFavorite" type="button">좋아요</button>
                <button class="btn btn-outline-secondary" id="reviewCnt" type="button">댓글수</button>
            </div>
        </div>


        <div class="container-fluid main-container" id="container">
            <div class="row text-center" id="cardMain">
                <!-- Initial 9 places loaded from the server -->
   <c:forEach var="place" items="${placesInfo}" varStatus="status">
    <div class="col-lg-4 col-md-6 mb-3 card-item ${status.index > 5 ? 'd-none extra-card' : ''}">
        <div class="main-card go-to-details" data-place-name="${place.placeName}">
            <div class="main-card-header bg-transparent">
                <div class="d-flex justify-content-between align-items-center">
                    <h1 class="main-card-title">${place.placeName}</h1>
                     <i class="bi ${place.userFavorite == 1 ? 'bi-heart-fill red-color' : 'bi-heart'} main-custom-heart" 
                     data-place-name="${place.placeName}" 
                     data-user-favorite="${place.userFavorite}"></i>
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
                <img src="${place.firstUrl}" alt="${place.placeName}" class="img-fluid mb-2"/>
                <img src="${place.secondUrl}" alt="${place.placeName}" class="img-fluid mb-2"/>
                <img src="${place.thirdUrl}" alt="${place.placeName}" class="img-fluid mb-2"/>
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
    </div>
</c:forEach>
            </div>
            <div class="text-center">
                <button class="btn btn-secondary mt-3" id="btnPlus">더보기</button>
            </div>
        </div>
    </section>

        <!-- Image Gallery Section -->
        <section id="image-gallery-section" class="mt-5">
            <h2 class="text-center my-5 fs-2">명소 추천</h2>
            <div class="gallery-body">
                <div class="gallery-content-container">
                    <div class="gallery-box">
                        <span style="--i: 0">
                            <img src="/img/골방 1.jpg" data-name="짜라라짜짜짜"/>
                        </span>
                        <span style="--i: 1">
                            <img src="/img/골방 2.jpg" data-name="광개토대왕"/>
                        </span>
                        <span style="--i: 2">
                            <img src="/img/골방 3.jpg" data-name="아이스크림"/>
                        </span>
                        <span style="--i: 3">
                            <img src="/img/골방 1.jpg" data-name="에베레스트"/>
                        </span>
                        <span style="--i: 4">
                            <img src="/img/골방 2.jpg" data-name="지구 온난화"/>
                        </span>
                        <span style="--i: 5">
                            <img src="/img/골방 3.jpg" data-name="오케스트라"/>
                        </span>
                        <span style="--i: 6">
                            <img src="/img/골방 1.jpg" data-name="껄껄껄껄"/>
                        </span>
                        <span style="--i: 7">
                            <img src="/img/골방 3.jpg" data-name="안녕하세요"/>
                        </span>
                    </div>

                    <div class="gallery-btns">
                        <div class="gallery-btn prev"></div>
                        <div id="location-name"></div>
                        <div class="gallery-btn next"></div>
                    </div>
                </div>
            </div>
        </section>
        <hr class="my-5"/>

        <!-- Lotto Section -->
        <section id="lotto-section" class="lotto-body">
            <div class="lotto-container">
                <h1 class="lotto-h1 fs-1">로또</h1>
                <div class="user-numbers">
                    <label for="number-inputs">번호를 선택하세요 (1-36):</label>
                    <div id="number-inputs" class="number-inputs">
                        <input type="number" class="number-input" min="1" max="36"></input>
                        <input type="number" class="number-input" min="1" max="36"></input>
                        <input type="number" class="number-input" min="1" max="36"></input>
                        <input type="number" class="number-input" min="1" max="36"></input>
                        <input type="number" class="number-input" min="1" max="36"></input>
                        <input type="number" class="number-input" min="1" max="36"></input>
                    </div>
                    <button id="resetNumbersButton">번호 초기화</button>
                </div>
                <span class="bonus-label">당첨 번호</span>
                <div id="result" class="ball-container"></div>
                <div class="bonus-container">
                    <span class="bonus-label">보너스:</span>
                    <div id="bonus" class="ball-container"></div>
                </div>
                <div id="points" name="points">남은 포인트 : ${points}</div>
                <div id="rank" class="rank" name="rank"></div>
                <button id="playButton">추첨하기</button>
            </div>
        </section>
        <div id="resultModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>추첨 결과</h2>
                <p id="modal-message"></p>
            </div>
        </div>

        <!-- FAQ Section -->
        <section id="faq-section" class="faq-body">
            <h1 class="text-center mt-5 fs-1">자주 묻는 질문 (FAQ)</h1>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            회원가입은 어떻게 하나요?
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            회원가입은 메인 페이지 우측 상단의 '회원가입' 버튼을 클릭하여 진행할 수 있습니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            로그인은 어떻게 하나요?
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            로그인은 메인 페이지 우측 상단의 '로그인' 버튼을 클릭하여 진행할 수 있습니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            개인정보 수정은 어떻게 하나요?
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            개인정보 수정은 로그인 후 마이페이지에서 가능합니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            비밀번호를 잊어버렸어요. 어떻게 해야 하나요?
                        </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            비밀번호를 잊어버린 경우, 비밀번호 찾기 기능을 이용해 주세요.
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <hr class="my-5"/>
        <button id="scrollToTopBtn" title="Go to top">↑</button>
    </main>

    <footer class="bg-light text-center text-lg-start mt-4">
        <div class="container p-4">
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">회사 정보</h5>
                    <ul class="list-unstyled mb-0">
                        <li><a href="#!" class="text-dark">회사 소개</a></li>
                        <li><a href="#!" class="text-dark">이용약관</a></li>
                        <li><a href="#!" class="text-dark">개인정보처리방침</a></li>
                        <li><a href="#!" class="text-dark">고객센터</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">추천 기능</h5>
                    <ul class="list-unstyled mb-0">
                        <li><a href="#!" class="text-dark">인기 명소</a></li>
                        <li><a href="#!" class="text-dark">새로운 장소</a></li>
                        <li><a href="#!" class="text-dark">이벤트</a></li>
                        <li><a href="#!" class="text-dark">여행 팁</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">커뮤니티</h5>
                    <ul class="list-unstyled mb-0">
                        <li><a href="#!" class="text-dark">여행 후기</a></li>
                        <li><a href="#!" class="text-dark">Q&A</a></li>
                        <li><a href="#!" class="text-dark">모임</a></li>
                        <li><a href="#!" class="text-dark">공지사항</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">팔로우하기</h5>
                    <ul class="list-unstyled mb-0">
                        <li><a href="#!" class="text-dark"><i class="fab fa-facebook-f"></i> Facebook</a></li>
                        <li><a href="#!" class="text-dark"><i class="fab fa-instagram"></i> Instagram</a></li>
                        <li><a href="#!" class="text-dark"><i class="fab fa-twitter"></i> Twitter</a></li>
                        <li><a href="#!" class="text-dark"><i class="fab fa-youtube"></i> YouTube</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="text-center p-3" style="background-color: var(--main-bg-color)">
            © 2024 아이고좋아. All rights reserved.
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <c:url var="navbarJs" value="/js/navbar.js" />
    <script src="${navbarJs}"></script>
    <c:url var="mainJs" value="/js/main.js" />
    <script src="${mainJs}"></script>
    <c:url var="imageGalleryJs" value="/js/image_gallery.js" />
    <script src="${imageGalleryJs}"></script>
    <c:url var="lottoJs" value="/js/lotto.js" />
    <script src="${lottoJs}"></script>

    <script>
        const LoginUserId = '${userId}';
        const points = '${points}';
    </script>

</body>

</html>