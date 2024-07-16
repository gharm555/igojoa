<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib prefix="c" uri="jakarta.tags.core"%> <%@
taglib prefix="fmt" uri="jakarta.tags.fmt"%> <%@ taglib prefix="fn"
uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
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
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
    <c:url var="cssResetUrl" value="/css/cssReset.css" />
    <c:url var="placeDetailCssUrl" value="/css/placeDetail.css" />
    <c:url var="navbarCssUrl" value="/css/navbar.css" />
    <c:url var="darkmode" value="/css/dark_mode.css"/>
    <link rel="stylesheet" href="${cssResetUrl}" />
    <link rel="stylesheet" href="${placeDetailCssUrl}" />
    <link rel="stylesheet" href="${navbarCssUrl}" />
    <link rel="stylesheet" href="${darkmode}">
  </head>
  <body>
    <header>
      <%@ include file="../header.jspf" %>
    </header>
    <main style="margin-bottom: 20%;">
      <c:set var="pd" value="${PlaceDetailDto}" />
      <c:set var="place" value="${placesInfo}" />
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
                    src="${ pd.firstUrl }"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="${pd.secondUrl }"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="${pd.thirdUrl }"
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
                  <div class="d-flex justify-content-between align-items-start" style="height:55px;">
                    <h2 class="card-title mb-5">
                      ${ pd.placeName }
                      <span
                        id="iscoreBedge"
                        class="badge bg-secondary ms-2"
                        style="font-size: 13px;"
                        
                      >${ pd.avgIScore } </span>
                    </h2>
                    <i id="favoriteHeart" class="bi-heart" style="color: red;" data-favorite="${pd.userFavorite}"></i>
                     
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
                     ${ fn:replace(pd.placeDescription, '. ', '.<br>') } 
                  </p>
                </div>
              </div>
            </section >
          </div>

          <!-- 두 번째 섹션 (오른쪽에 배치) -->
          <div class="col-lg-4">
            <section>
             <div class="card shadow-sm">
               <div id="emojiList" class="card-body">
                  <h3>이런 점이 좋았어요</h3>
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
            <div id="createReview" class="card-body">
            <h3 class="mb-0">이런 점이 좋았어요</h3>
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
                  <label class="btn btn-outline-primary" for="btncheck1" data-parkingAvailable="${pd.parkingAvailable}"
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
                  <label class="btn btn-outline-primary" for="btncheck2" data-view="${ pd.view }"
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
                  <label class="btn btn-outline-primary" for="btncheck3" data-freeEntry="${pd.freeEntry}"
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
                  <label class="btn btn-outline-primary" for="btncheck4" data-nightView="${pd.nightView}"
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
                  <label class="btn btn-outline-primary" for="btncheck5" data-easyTransport="${pd.easyTransport}"
                    >교통원활</label
                  >
                </div>
                <h3 class="mb-0">아이난이도</h3>
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
                >${ pd.review }</textarea>
                  <div id="reviewButtonsContainer">
  <c:choose>
    <c:when test="${empty pd.review}">
      <button id="createReviewBtn" type="button" class="btn btn-primary">작성완료</button>
    </c:when>
    <c:otherwise>
      <button id="updateReviewBtn" type="button" class="btn btn-warning">수정하기</button>
      <button id="deleteReviewBtn" type="button" class="btn btn-danger">삭제하기</button>
    </c:otherwise>
  </c:choose>
</div>
              </form>
            </div>
          </div>
        </section>

        <h2 class="mb-4 d-flex justify-content-between align-items-center">
          리뷰 목록
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="sortDropdownButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              좋아요 많은순
            </button>
            <ul class="dropdown-menu" aria-labelledby="sortDropdownButton">
              <li>
                <button class="btn dropdown-item1 active" data-sort="modifiedAtDESC">
                  최신순
                </button>
              </li>
              <li>
                <button class="btn dropdown-item1" data-sort="modifiedAtASC">
                  오래된순
                </button>
              </li>
              <li>
                <button class="btn dropdown-item1" data-sort="cntLikeDESC">
                  좋아요 많은순
                </button>
              </li>
              <li>
                <button class="btn dropdown-item1" data-sort="cntLikeASC">
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
    <%@ include file="../footer.jspf"%>

    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=dbb366fd56b3d7369ab7ed5f8caff982"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
      //console.log("Defining emojiData");
      let emojiData = [
          { emoji: "🏞️", text: '"경치좋은"', count: "${pd.totalView}", key: "view" },
          { emoji: "💵", text: '"무료입장"', count: "${pd.totalFreeEntry}", key: "freeEntry" },
          { emoji: "🌃", text: '"야경"', count: "${pd.totalNightView}", key: "nightView" },
          { emoji: "🛣️", text: '"교통원활"', count: "${pd.totalEasyTransport}", key: "easyTransport" },
          { emoji: "🚗", text: '"주차가능"', count: "${pd.totalParkingAvailable}", key: "parkingAvailable" }
      ];
      //console.log("emojiData defined:", emojiData);
          let mapData = {
              latitude: ${pd.placeLatitude},
              longitude: ${pd.placeLongitude}
          };
          //console.log("emojiData and mapData initialized");


          let pd = {
                placeName: "<c:out value='${pd.placeName}' />",
                firstUrl: "<c:out value='${pd.firstUrl}' />",
                secondUrl: "<c:out value='${pd.secondUrl}' />",
                thirdUrl: "<c:out value='${pd.thirdUrl}' />",
                address: "<c:out value='${pd.address}' />",
                placeDescription: "<c:out value='${pd.placeDescription}' />",
                placeLatitude: Number("<c:out value='${pd.placeLatitude}' />") || null,
                placeLongitude: Number("<c:out value='${pd.placeLongitude}' />") || null,
                operatingHours: "<c:out value='${pd.operatingHours}' />",
                totalParkingAvailable: Number("<c:out value='${pd.totalParkingAvailable}' />") || 0,
                totalView: Number("<c:out value='${pd.totalView}' />") || 0,
                totalNightView: Number("<c:out value='${pd.totalNightView}' />") || 0,
                totalFreeEntry: Number("<c:out value='${pd.totalFreeEntry}' />") || 0,
                totalEasyTransport: Number("<c:out value='${pd.totalEasyTransport}' />") || 0,
                avgIScore: Number("<c:out value='${pd.avgIScore}' />") || 0,
                review: "<c:out value='${pd.review}' />",
                parkingAvailable: Boolean("<c:out value='${pd.parkingAvailable}' />"),
                view: Boolean("<c:out value='${pd.view}' />"),
                nightView: Boolean("<c:out value='${pd.nightView}' />"),
                freeEntry: Boolean("<c:out value='${pd.freeEntry}' />"),
                easyTransport: Boolean("<c:out value='${pd.easyTransport}' />"),
                iScore: Number("<c:out value='${pd.IScore}' />") || 0,
                userFavorite:  Number("<c:out value='${pd.userFavorite}' />") || 0
            };
    </script>

    <c:url var="navbarJsUrl" value="/js/navbar.js" />
    <c:url var="placeDetailJsUrl" value="/js/placeDetail.js" />
    <c:url var="darkMode" value="/js/dark_mode.js" />
    <script src="${navbarJsUrl}"></script>
    <script src="${placeDetailJsUrl}"></script>
     <script src="${darkMode}"></script>
    
  </body>
</html>