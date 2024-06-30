<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>아이고조아</title>
  </head>
  <body>
    <h1 id="asd">아이고조아입니다</h1>
    <h1 id="qwe">테스트입니다</h1>
    <c:forEach items="${ placesInfo }" var="p">
      <c:url var="placeDetailsPage" value="/place/details">
        <c:param name="placeName" value="${ p.placeName }"></c:param>
      </c:url>
      <a class="placeItems" style="display: flex" href="${ placeDetailsPage }">
        <span>장소이름: ${ p.placeName }</span>
        <span>주소: ${p.address}</span>
        <span>하트: ${p.userFavorite}</span>
        <span>1등뱃지: ${p.highestBadge}</span>
        <span>2등뱃지: ${p.secondHighestBadge}</span>
        <span>아이난이도: ${ p.IScore }</span>
        <span>방문횟수: ${p.placeVerified}</span>
        <span>베스트 리뷰 작성자: ${p.userId}</span>
        <span>베스트 리뷰 글: ${p.review}</span>
        <span>베스트 리뷰 작성시간: ${p.modifiedAt}</span>
        <span>베스트 리뷰 좋아요 갯수: ${p.likeCount}</span>
        <span>장소이미지1: ${p.firstUrl}</span>
        <span>장소이미지2: ${p.secondUrl}</span>
        <span>장소이미지3: ${p.thirdUrl}</span>
      </a>
    </c:forEach>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const $qwe = document.querySelector("#qwe");
    $qwe.addEventListener("click", () => {
      const uri = `./search`;
      const params = {
        addressCategory: "",
        searchKeyword: "대",
        sortKey: "iScore",
        sortValue: 0,
        startRowValue: 0,
        rowCnt: 9,
      };
      axios
        .get(uri, { params })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error data:", error);
        });
    });

    const $asd = document.querySelector("#asd");
    let heartClickable = 1;
    $asd.addEventListener("click", () => {
      if (heartClickable === 1) {
        console.log(123123123);
        heartClickable = 0;
        const uri = `./clickHeart`;
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
        const uri = `./deleteHeart/` + params;
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
