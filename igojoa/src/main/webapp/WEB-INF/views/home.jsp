<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
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
      crossorigin="anonymous"
    />
    <c:url var="cssResetCss" value="/css/cssReset.css" />
    <link rel="stylesheet" href="${cssResetCss}" />
    <c:url var="navbarCss" value="/css/navbar.css" />
    <link rel="stylesheet" href="${navbarCss}" />
  </head>
  <body>
    <%@ include file="header.jspf" %>
    <h1>아이고조아입니다</h1>
    <h1>테스트입니다</h1>
    <div id="qwe">1${ list[2] }</div>
    <!-- Include Font Awesome for icons -->
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <!-- BootStrap-->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <c:url var="navbarJs" value="/js/navbar.js" />
    <script src="${navbarJs}"></script>
    <script>
      const LoginUserId = '${userId}';
      const defaultImageUrl = '${defaultImageUrl}';
    </script>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const qwe = document.querySelector('#qwe');
    qwe.addEventListener('click', () => {
      const uri = `./search`;
      const params = {
        addressCategory: '',
        sortKey: 'iScore',
        sortValue: 0,
        startRowValue: 9,
        rowCnt: 3,
      };
      axios
        .get(uri, { params })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    });
  </script>
</html>
