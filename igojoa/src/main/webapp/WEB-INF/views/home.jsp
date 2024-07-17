<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<!DOCTYPE html>

<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>아이고조아</title>
     <c:url var="appleTouchIcon" value="/favicon/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="${ appleTouchIcon }">
    <c:url var="favicon3232" value="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="${ favicon3232 }">
    <c:url var="favicon1616" value="/favicon/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="${ favicon1616 }">
    <c:url var="webmanifest" value="/favicon/site.webmanifest" />
    <link rel="manifest" href="${ webmanifest }">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
   <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
        />

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
    <c:url var="darkmode" value="/css/dark_mode.css"/>
     <link rel="stylesheet" href="${darkmode}">
    <c:url var="faqCss" value="/css/faq.css" />
    <link rel="stylesheet" href="${faqCss}" />
    <c:url var="imageGalleryCss" value="/css/image_gallery.css" />
    <link rel="stylesheet" href="${imageGalleryCss}" />
    <c:url var="lottoCss" value="/css/lotto.css" />
    <link rel="stylesheet" href="${lottoCss}" />


</head>

<body>
  <header>
    <%@ include file="header.jspf"%>
    </header>

    <main>
    <c:set var="place" value="${placesInfo}" />
    <!-- Main Section -->
    <section id="main-section">
    <div class="d-flex justify-content-center my-5" id="search-bar">
        <div class="search-container">
          <div class="search-wrapper">
              <select id="province-select" class="form-select">
                  <option value="">지역 선택</option>
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
            <input type="text" id="search-keyword" class="form-control" placeholder="검색어를 입력하세요" aria-label="검색" autocomplete="off"/>
              <button  id="search-button" type="button">
                <i class="bi bi-search"></i>
             </button>
          </div>
        <ul id="suggestions" class="list-group"></ul>
      </div>
    </div>
    <div class="d-flex justify-content-center mb-4">
<div class="btn-group" role="group">
    <button class="btn btn-outline-secondary" id="iScore" type="button" data-sortIscore="1">아이난이도</button>
    <button class="btn btn-outline-secondary" id="placeVerified" type="button" data-sortPlaceVerified="1">방문횟수</button>
    <button class="btn btn-outline-secondary" id="userFavorite" type="button" data-sortUserFavorite="1">좋아요</button>
    <button class="btn btn-outline-secondary" id="reviewCnt" type="button" data-sortReviewCnt="1">리뷰수</button>
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
                      <span class="badge"><i class="bi bi-fire" id="fire" ></i> ${place.highestBadge}</span>
                        <span class="badge"><i class="bi bi-fire" id="fire"></i> ${place.secondHighestBadge}</span>
                           <span class="badge difficulty-badge" data-iscore="${place.IScore}">아이난이도: ${place.IScore}</span>
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
                                   <span class="level circular-icon" id="levelIcon">${place.level}</span>
                                <span class="username">${place.nickName}</span>
                            </div>
                            <div class="post-info">
                                <fmt:parseDate value="${ place.modifiedAt }" pattern="yyyy-MM-dd" var="parsedDateTime" type="both" />
                                <span class="date"><i class="bi bi-calendar3"></i> <fmt:formatDate pattern="yyyy-MM-dd" value="${parsedDateTime}" /></span>
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
<div class="text-center d-flex justify-content-center w-100">
    <button class="btn " id="btnPlus">더보기</button>
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
                            <img />
                        </span>
                        <span style="--i: 1">
                            <img />
                        </span>
                        <span style="--i: 2">
                            <img />
                        </span>
                        <span style="--i: 3">
                            <img />
                        </span>
                        <span style="--i: 4">
                            <img />
                        </span>
                        <span style="--i: 5">
                            <img />
                        </span>
                        <span style="--i: 6">
                            <img />
                        </span>
                        <span style="--i: 7">
                            <img />
                        </span>
                    </div>

                    <div class="gallery-btns">
                        <div class="gallery-btn prev"><i class="bi bi-caret-left-square-fill"></i></div>
                        <div id="location-name"></div>
                        <div class="gallery-btn next"><i class="bi bi-caret-right-square-fill"></i></div>
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
                <div id="points" name="points">남은 포인트 : <span class="points"><fmt:formatNumber value="${points}" type="number" groupingUsed="true" /></span> P</div>
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
                <c:forEach var="faq" items="${faqList}" varStatus="status">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button ${status.index == 0 ? '' : 'collapsed'}" type="button" 
                                    data-bs-toggle="collapse" data-bs-target="#collapse${status.index}" 
                                    aria-expanded="${status.index == 0 ? 'true' : 'false'}" 
                                    aria-controls="collapse${status.index}"><span>Q:&nbsp;</span>
                                <span>${faq.question}</span>
                            </button>
                        </h2>
                        <div id="collapse${status.index}" 
                             class="accordion-collapse collapse ${status.index == 0 ? 'show' : ''}" 
                             data-bs-parent="#accordionExample">
                            <div class="accordion-body"><span>A: </span>
                                <span>${faq.answer}</span>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </section>
        <hr class="my-5"/>
        <button id="scrollToTopBtn" title="Go to top">↑</button>
        
    </main>

<%@ include file="footer.jspf"%>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <c:url var="navbarJs" value="/js/navbar.js" />
    <script src="${navbarJs}"></script>
    <c:url var="mainJs" value="/js/main.js" />
    <script src="${mainJs}"></script>
    <c:url var="darkMode" value="/js/dark_mode.js" />
    <script src="${darkMode}"></script>
    <c:url var="imageGalleryJs" value="/js/image_gallery.js" />
    <script src="${imageGalleryJs}"></script>
    <c:url var="lottoJs" value="/js/lotto.js" />
    <script src="${lottoJs}"></script>


    <script>

        document.addEventListener("DOMContentLoaded", function() {
            const difficultyMap = {
              "하": "bg-success",
              "중": "bg-warning",
              "상": "bg-danger"
            };

            document.querySelectorAll('.difficulty-badge').forEach(badge => {
              const iScore = badge.dataset.iscore;
              badge.classList.add(difficultyMap[iScore] || '');
            });
          });
        

        const points ="${points}";
      	const placeLevel = "${place.level}"
      	console.log("placeLevel = ", placeLevel);
    </script>
    
  
    

</body>

</html>