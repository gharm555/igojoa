<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> <%@ taglib prefix="c"
uri="jakarta.tags.core"%> 
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>상세보기</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <c:url var="cssResetUrl" value="/css/cssReset.css" />
    <c:url var="postDetailCssUrl" value="/css/postDetail.css" />
    <c:url var="navbarCssUrl" value="/css/navbar.css" />
    <link rel="stylesheet" href="${cssResetUrl}" />
    <link rel="stylesheet" href="${postDetailCssUrl}" />
    <link rel="stylesheet" href="${navbarCssUrl}" />
  </head>
  <body>
    <%@ include file="../header.jspf" %>
    <main>
    <c:set var="pd" value="${PlaceDetailDto}" />
      <div class="banner-container">
        <div class="banner-content">
          <div
            id="banner-inner"
            class="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            data-bs-pause="false"
          >
          <!-- TODO:  사진 값 넣어야함 -->
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="/img/img1.png" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="/img/img2.jpg" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="/img/img3.jpg" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#banner-inner"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#banner-inner"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-6 mb-4">
            <div id="map" class="rounded shadow"></div>
          </div>
          <div class="col-lg-6 mb-4">
            <div
              id="carouselExampleIndicators"
              class="carousel slide rounded shadow"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div class="carousel-inner">
              <!-- 이미지 넣어야함 -->
                <div class="carousel-item active">
                  <img
                    src="/img/열람실 2.jpg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="/img/열람실 1.jpg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="/img/열람실 3.jpg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div class="row mb-5">
          <!-- 첫 번째 섹션  -->
          <div class="col-lg-8">
            <section>
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <h2 class="card-title mb-5">
                      ${ pd.placeName }
                      <span
                        id="difficultyBadge"
                        class="badge bg-secondary ms-2"
                        style="font-size: 11px"
                      ></span>
                    </h2>
                    <button
                      class="btn btn-link p-0 text-decoration-none"
                      id="likeButton"
                    >
                      <i
                        class="far fa-heart"
                        style="color: #4a6fa5; font-size: 1.5rem"
                      ></i>
                    </button>
                  </div>

                  <p class="card-text mb-3">
                    <i
                      class="fas fa-map-marker-alt me-2"
                      style="color: #4a6fa5"
                    ></i>
                    ${ pd.address }
                  </p>
                  <p class="card-text mb-3">
                    <i class="far fa-clock me-2" style="color: #4a6fa5"></i>
                    ${ pd.operatingHours }
                  </p>
                  <p class="card-text mb-3">
                    <i
                      class="fas fa-info-circle me-2"
                      style="color: #4a6fa5"
                    ></i>
                    ${ pd.placeDescription }
                  </p>
                </div>
              </div>
            </section>
          </div>

          <!-- 두 번째 섹션 (오른쪽에 배치) -->
          <div class="col-lg-4">
            <section>
              <div id="emojiList" class="card shadow-sm">
                <div class="card-body">
                  <!-- 이모지 리스트 내용 -->
                </div>
              </div>
            </section>
          </div>
        </div>

        <section class="mb-5">
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
              <h2 class="mb-0" style="color: white">리뷰 작성하기</h2>
            </div>
            <div class="card-body">
              <form id="reviewForm">
                <div
                  class="btn-group mb-3"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    class="btn-check"
                    id="btncheck1"
                    name="features"
                    value="주차가능"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btncheck1"
                    >주차가능</label
                  >
                  <input
                    type="checkbox"
                    class="btn-check"
                    id="btncheck2"
                    name="features"
                    value="경치좋은"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btncheck2"
                    >경치좋은</label
                  >
                  <input
                    type="checkbox"
                    class="btn-check"
                    id="btncheck3"
                    name="features"
                    value="무료입장"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btncheck3"
                    >무료입장</label
                  >
                  <input
                    type="checkbox"
                    class="btn-check"
                    id="btncheck4"
                    name="features"
                    value="야경"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btncheck4"
                    >야경</label
                  >
                  <input
                    type="checkbox"
                    class="btn-check"
                    id="btncheck5"
                    name="features"
                    value="교통원활"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btncheck5"
                    >교통원활</label
                  >
                </div>
                <div
                  class="btn-group mb-3"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    class="btn-check"
                    name="difficulty"
                    id="btnradio1"
                    value="상"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio1"
                    >상</label
                  >
                  <input
                    type="radio"
                    class="btn-check"
                    name="difficulty"
                    id="btnradio2"
                    value="중"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio2"
                    >중</label
                  >
                  <input
                    type="radio"
                    class="btn-check"
                    name="difficulty"
                    id="btnradio3"
                    value="하"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio3"
                    >하</label
                  >
                </div>
                <textarea
                  class="form-control mb-3"
                  id="reviewText"
                  rows="4"
                  placeholder="리뷰를 작성해주세요"
                ></textarea>
                <button type="submit" class="btn btn-primary">작성완료</button>
              </form>
            </div>
          </div>
        </section>

        <h2 class="mb-4 d-flex justify-content-between align-items-center">
          리뷰 목록
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="sortDropdownButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              최신순
            </button>
            <ul class="dropdown-menu" aria-labelledby="sortDropdownButton">
              <li>
                <button class="dropdown-item active" data-sort="newest">
                  최신순
                </button>
              </li>
              <li>
                <button class="dropdown-item" data-sort="oldest">
                  오래된순
                </button>
              </li>
              <li>
                <button class="dropdown-item" data-sort="most-liked">
                  좋아요 많은순
                </button>
              </li>
              <li>
                <button class="dropdown-item" data-sort="least-liked">
                  좋아요 적은순
                </button>
              </li>
            </ul>
          </div>
        </h2>

        <section id="reviewList">
          <!-- 리뷰들이 여기에 동적으로 추가됩니다 -->
        </section>
      </div>
      <!--위로 가는 버튼 -->
      <button id="scrollToTopBtn" title="Go to top">↑</button>
    </main>

    

    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=dbb366fd56b3d7369ab7ed5f8caff982"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <c:url var="navbarJsUrl" value="/js/navbar.js" />
    <c:url var="postDetailJsUrl" value="/js/postDetail.js" />
    <script src="${navbarJsUrl}"></script>
    <script src="${postDetailJsUrl}"></script>
    <script >
    let emojiData = [
    	  { emoji: "🏞️", text: '"경치좋은"', count: "${pd.totalView}", key: "view" },
    	  {
    	    emoji: "💵",
    	    text: '"무료입장"',
    	    count: "${pd.totalFreeEntry}",
    	    key: "freeEntry",
    	  },
    	  {
    	    emoji: "🌃",
    	    text: '"야경"',
    	    count: "${pd.totalNightView}",
    	    key: "nightView",
    	  },
    	  {
    	    emoji: "🛣️",
    	    text: '"교통원활"',
    	    count: "${pd.totalEasyTransport}",
    	    key: "easyTransport",
    	  },
    	  {
    	    emoji: "🚗",
    	    text: '"주차가능"',
    	    count: "${ pd.totalParkingAvailable }",
    	    key: "parkingAvailable",
    	  },
    	];
    </script>
    
        let mapData = {
        latitude: ${pd.placeLatitude},
        longitude: ${pd.placeLongitude}
    };
  </body>
</html>
