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
  <h1 id="asd">아이고조아입니다</h1>
  <h1>테스트입니다</h1>
  <div id="qwe">1${ list[2] }</div>
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
    $asd.addEventListener("click", () => {
      const uri = `./clickHeart`;
      const params = {
    		  placeName: "아이티윌",
    		  userId: "서상원"
      };
      axios
        .put(uri, { params })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error data:", error);
        });
    });
  </script>
</html>
