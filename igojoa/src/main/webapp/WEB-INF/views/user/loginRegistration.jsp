<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login&Registration</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <c:url  var="loginRegistrationCss" value="/css/loginRegistration.css"  />
    <link rel="stylesheet" type="text/css" href="${loginRegistrationCss}" />
  </head>
  <body>
    <div class="container">
      <div class="box signin">
        <h2>이미 계정이 있습니까?</h2>
        <button class="signinBtn">로그인</button>
      </div>
      <div class="box singnup">
        <h2>등록된 계정이 없습니까?</h2>
        <button class="signupBtn">회원가입</button>
      </div>
      <div class="formBx">
        <div class="form signinform">
          <c:url var="loginUrl" value="/Users/login" />
          <form action="${loginUrl}" method="post">
            <h3>로그인</h3>
            <input type="text" name="UsersId" placeholder="아이디를 입력해 주세요" />
            <input type="password" name="password" placeholder="비밀번호를 입력해 주세요" />
            <input type="submit" value="로그인" />
          </form>
        </div>
        <div class="form signupform">
          <c:url var="registerUrl" value="/Users/register" />
          <form action="${registerUrl}" id="registerForm" method="post" enctype="multipart/form-data">
            <h3>회원가입</h3>
            <div class="image-upload d-flex justify-content-center">
              <label for="profile-input">
                <img
                  src="${defaultImageUrl}"
                  class="rounded-circle mx-auto d-block"
                  type="button"
                  id="register-profileimg"
                />
                <div class="upload-icon">
                  <ion-icon name="camera-outline"></ion-icon>
                </div>
                <input class="d-none" name="file" id="profile-input" type="file" accept="image/*" onchange="previewImage(event)" />
              </label>
            </div>
            <input type="text" id="UsersId" name="UsersId" placeholder="아이디" />
            <input type="password" id="password" name="password" placeholder="비밀번호" />
            <input type="text" id="nickName" name="nickName" placeholder="닉네임" />
            <input type="email" id="email" name="email" placeholder="이메일" />
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="전화번호" />
            <input type="submit" id="registerBtn" value="회원가입" />
          </form>
        </div>
      </div>
    </div>

    <!-- Include Font Awesome for icons -->
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <!-- BootStrap-->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
  </body>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <c:url  var="loginRegistrationJs" value="/js/loginRegistration.js"  />
  <script src="${loginRegistrationJs}"></script>
</html>
