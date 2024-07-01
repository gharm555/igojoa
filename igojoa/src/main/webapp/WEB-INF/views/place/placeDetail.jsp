<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>아이고조아</title>
</head>
<body>
  <c:set var="pd" value="${PlaceDetailDto}" />
  <h1 id="asd">하트</h1>
  <h1>상세 테스트 페이지</h1>
  <h3>장소이름: ${ pd.placeName }</h3>
  <h3>주소: ${ pd.address }</h3>
  <h3>설명: ${ pd.placeDescription }</h3>
  <h3>위도: ${ pd.placeLatitude }</h3>
  <h3>경도: ${ pd.placeLongitude }</h3>
  <h3>운영시간: ${ pd.operatingHours }</h3>
  <h3>사용자들이 선택한 주차가능 뱃지 총합: ${ pd.totalParkingAvailable }</h3>
  <h3>사용자들이 선택한 경치좋음 뱃지 총합: ${ pd.totalView }</h3>
  <h3>사용자들이 선택한 야경좋음 뱃지 총합: ${ pd.totalNightView }</h3>
  <h3>사용자들이 선택한 무료입장 뱃지 총합: ${ pd.totalFreeEntry }</h3>
  <h3>사용자들이 선택한 교통원활 뱃지 총합: ${ pd.totalEasyTransport }</h3>
  <h3>사용자들이 선택한 아이난이도 평균: ${ pd.avgIScore }</h3>
  <h3>페이지 접속한 사용자가 남긴 리뷰글: ${ pd.review }</h3>
  <h3>페이지 접속한 사용자가 선택한 주차: ${ pd.parkingAvailable }</h3>
  <h3>페이지 접속한 사용자가 선택한 경치: ${ pd.view }</h3>
  <h3>페이지 접속한 사용자가 선택한 야경: ${ pd.nightView }</h3>
  <h3>페이지 접속한 사용자가 선택한 무료: ${ pd.freeEntry }</h3>
  <h3>페이지 접속한 사용자가 선택한 교통: ${ pd.easyTransport }</h3>
  <h3>페이지 접속한 사용자가 선택한 아이난이도: ${ pd.IScore }</h3>
  <p>여까지가 placeDeatilInfo 로 전달받은 것</p>
  <p>여기서부턴 이 장소에 대한 리뷰글</p>
</body>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>

=======
pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%> <%@ taglib prefix="c"
uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>아이고조아</title>
  </head>
  <body>
    <c:set var="pd" value="${PlaceDetailDto}" />
    <h1 id="asd">하트</h1>
    <h1>상세 테스트 페이지</h1>
    <h3>장소이름: ${ pd.placeName }</h3>
    <h3>이미지1: ${ pd.firstUrl }</h3>
    <h3>이미지2: ${ pd.secondUrl }</h3>
    <h3>이미지3: ${ pd.thirdUrl }</h3>
    <h3>주소: ${ pd.address }</h3>
    <h3>설명: ${ pd.placeDescription }</h3>
    <h3>위도: ${ pd.placeLatitude }</h3>
    <h3>경도: ${ pd.placeLongitude }</h3>
    <h3>운영시간: ${ pd.operatingHours }</h3>
    <h3>사용자들이 선택한 주차가능 뱃지 총합: ${ pd.totalParkingAvailable }</h3>
    <h3>사용자들이 선택한 경치좋음 뱃지 총합: ${ pd.totalView }</h3>
    <h3>사용자들이 선택한 야경좋음 뱃지 총합: ${ pd.totalNightView }</h3>
    <h3>사용자들이 선택한 무료입장 뱃지 총합: ${ pd.totalFreeEntry }</h3>
    <h3>사용자들이 선택한 교통원활 뱃지 총합: ${ pd.totalEasyTransport }</h3>
    <h3>사용자들이 선택한 아이난이도 평균: ${ pd.avgIScore }</h3>
    <h3>페이지 접속한 사용자가 남긴 리뷰글: ${ pd.review }</h3>
    <h3>페이지 접속한 사용자가 선택한 주차: ${ pd.parkingAvailable }</h3>
    <h3>페이지 접속한 사용자가 선택한 경치: ${ pd.view }</h3>
    <h3>페이지 접속한 사용자가 선택한 야경: ${ pd.nightView }</h3>
    <h3>페이지 접속한 사용자가 선택한 무료: ${ pd.freeEntry }</h3>
    <h3>페이지 접속한 사용자가 선택한 교통: ${ pd.easyTransport }</h3>
    <h3>페이지 접속한 사용자가 선택한 아이난이도: ${ pd.IScore }</h3>
    <p>여까지가 placeDeatilInfo 로 전달받은 것</p>

    <a id="reviewSubmit" style="display: flex">작성완료</a>
    <p>여기서부턴 이 장소에 대한 리뷰글</p>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
>>>>>>> bd57672ee1fb79e401160ba32fcbd4c705889435
    const $asd = document.querySelector("#asd");
    let heartClickable = 1;
    $asd.addEventListener("click", () => {
      if (heartClickable === 1) {
        console.log(123123123);
        heartClickable = 0;
        const uri = `../../clickHeart`;
        const params = "가가가가";

        axios
          .put(uri, params)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error data:", error);
          });
      } else {
        console.log(987987987);
        heartClickable = 1;
        const params = "가가가가";
        const uri = `../../deleteHeart/` + params;
        console.log(uri);

        axios
          .delete(uri)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error data:", error);
          });
      }
    });

  </script>
</html>


   
