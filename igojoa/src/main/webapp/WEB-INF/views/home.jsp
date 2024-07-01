<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>아이고조아</title>
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous" />
<c:url var="cssResetCss" value="/css/cssReset.css" />
<link rel="stylesheet" href="${cssResetCss}" />
<c:url var="navbarCss" value="/css/navbar.css" />
<link rel="stylesheet" href="${navbarCss}" />
</head>
<body>
  <%@ include file="header.jspf"%>
  <h1 id="asd">하트</h1>
  <h1 id="qwe">검색 & 정렬</h1>
  <c:forEach items="${ placesInfo }" var="p">
    <c:url var="placeDetailsPage"
      value="/place/details/${ p.placeName }">
    </c:url>
    <a class="placeItems" style="display: flex"
      href="${ placeDetailsPage }"> <span>장소이름: ${ p.placeName }</span>
      <span>주소: ${p.address}</span> <span>하트: ${p.userFavorite}</span> <span>1등뱃지:
        ${p.highestBadge}</span> <span>2등뱃지: ${p.secondHighestBadge}</span> <span>아이난이도:
        ${ p.IScore }</span> <span>방문횟수: ${p.placeVerified}</span> <span>베스트
        리뷰 작성자: ${p.userId}</span> <span>베스트 리뷰 글: ${p.review}</span> <span>베스트
        리뷰 작성시간: ${p.modifiedAt}</span> <span>베스트 리뷰 좋아요 갯수:
        ${p.likeCount}</span> <span>장소이미지1: ${p.firstUrl}</span> <span>장소이미지2:
        ${p.secondUrl}</span> <span>장소이미지3: ${p.thirdUrl}</span>
    </a>
  </c:forEach>

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

  <!-- Include Font Awesome for icons -->
  <script type="module"
    src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule
    src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  <!-- BootStrap-->
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <c:url var="navbarJs" value="/js/navbar.js" />
  <script src="${navbarJs}"></script>
  <script>
      const LoginUserId = '${userId}';
      const defaultImageUrl = '${defaultImageUrl}';
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
</body>
</html>
