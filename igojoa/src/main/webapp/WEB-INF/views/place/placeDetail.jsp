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
  <h1 id="asd">상세페이지</h1>
  <h1>테스트</h1>
  <h1>테스트</h1>
  <h1>테스트</h1>
</body>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>

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
