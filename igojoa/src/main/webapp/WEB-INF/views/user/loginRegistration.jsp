<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib prefix="c" uri="jakarta.tags.core"%>
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
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <c:url var="darkModeCss" value="/css/dark_mode.css" />
    <link rel="stylesheet" href="${darkModeCss}">
    <c:url var="cssResetCss" value="/css/cssReset.css" />
    <link rel="stylesheet" href="${cssResetCss}" />
    <c:url var="navbarCss" value="/css/navbar.css" />
    <link rel="stylesheet" href="${navbarCss}" />
    <c:url var="loginRegistrationCss" value="/css/loginRegistration.css" />
    <link rel="stylesheet" href="${loginRegistrationCss}" />
    <c:url var="darkmode" value="/css/dark_mode.css"/>
    <link rel="stylesheet" href="${darkmode}">
    
    
  </head>
  <body>
    <header>
      <%@ include file="../header.jspf" %>
    </header>
    <main style="margin-bottom: 120px;">
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
            <c:url var="loginUrl" value="/user/login" />
            <form action="${loginUrl}" id="loginForm" method="post">
              <h3>로그인</h3>
              <input
                type="text"
                class="form-control"
                id="loginId"
                name="userId"
                placeholder="아이디를 입력해 주세요"
                value="${userId}"
              />
              <input
                type="password"
                class="form-control"
                id="loginPassword"
                name="password"
                placeholder="비밀번호를 입력해 주세요"
              />
              <!-- 로그인 체크 메시지 -->
              <div
                id="login-check-message"
                class="invalid-feedback"
                style="display: none"
              ></div>
              <input
                type="submit"
                class="form-control"
                id="loginBtn"
                value="로그인"
              />
              <div class="find">
                <a
                  type="button"
                  class="btnIdPw"
                  data-bs-toggle="modal"
                  data-bs-target="#findUserIdModal"
                  >아이디를 잊으셨나요?</a
                >
                <span> | </span>
                <a
                  type="button"
                  class="btnIdPw"
                  data-bs-toggle="modal"
                  data-bs-target="#findPasswordModal"
                  >비밀번호를 잊으셨나요?</a
                >
              </div>
            </form>
          </div>
          <div class="form signupform">
            <c:url var="registerUrl" value="/user/register" />
            <form
              action="${registerUrl}"
              id="registerForm"
              method="post"
              enctype="multipart/form-data"
            >
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
                  <input
                    class="d-none"
                    id="profile-input"
                    name="file"
                    type="file"
                    accept="image/*"
                    onchange="previewImage(event)"
                  />
                </label>
              </div>

              <input
                type="text"
                class="form-control"
                placeholder="아이디"
                id="userId"
                name="userId"
                oninput="validateInput('userId', this.value)"
              />
              <div
                id="id-check-message"
                class="invalid-feedback"
                style="display: none"
              ></div>

              <input
                type="password"
                class="form-control"
                placeholder="비밀번호"
                id="password"
                name="password"
                oninput="validateInput('password', this.value)"
              />
              <div
                id="password-check-message"
                class="invalid-feedback"
                style="display: none"
              ></div>

              <input
                type="password"
                class="form-control"
                placeholder="비밀번호 확인"
                id="password-confirm"
                oninput="validateInput('password-confirm', this.value)"
              />
              <div
                id="password-confirm-check-message"
                class="invalid-feedback"
                style="display: none"
              ></div>

              <input
                type="text"
                class="form-control"
                placeholder="닉네임"
                id="nickName"
                name="nickName"
                oninput="validateInput('nickName', this.value)"
              />
              <div
                id="nickname-check-message"
                class="invalid-feedback"
                style="display: none"
              ></div>

              <input
                type="email"
                class="form-control"
                placeholder="이메일"
                id="email"
                name="email"
                oninput="validateInput('email', this.value)"
              />
              <div
                id="email-check-message"
                class="invalid-feedback"
                style="display: none"
              ></div>

              <div class="d-flex align-items-baseline" id="phone-input">
                <input
                  type="text"
                  class="form-control"
                  placeholder="010"
                  id="phone1"
                  name="phone1"
                  maxlength="3"
                  oninput="validateInput('phone', this.value)"
                />
                <span>-</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="1234"
                  id="phone2"
                  name="phone2"
                  maxlength="4"
                  oninput="validateInput('phone', this.value)"
                />
                <span>-</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="5678"
                  id="phone3"
                  name="phone3"
                  maxlength="4"
                  oninput="validateInput('phone', this.value)"
                />
              </div>
              <div
                id="phone-check-message"
                class="invalid-feedback"
                style="display: none"
              ></div>
              <div id="register-check-message" style="display: none"></div>
              <input
                type="submit"
                id="registerBtn"
                name="registerBtn"
                value="회원가입"
              />
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- 아이디 찾기 모달 -->
    <div
      class="modal fade"
      id="findUserIdModal"
      tabindex="-1"
      aria-labelledby="findUserIdModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="findUserIdModalLabel">본인 인증</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" id="findUserIdModalBody">
            <!-- 아이디 찾기 폼 내용 -->
            <input
              type="email"
              name="email"
              id="emailForFindUserId"
              class="form-control"
              placeholder="이메일을 입력해 주세요"
            />
            <input
              type="nickName"
              name="nickName"
              id="nickNameForFindUserId"
              class="form-control mt-2"
              placeholder="닉네임을 입력해 주세요"
            />
            <label
              id="findUserIdMessage"
              class="invalid-feedback"
              style="display: none"
            ></label>
          </div>
          <div class="modal-footer" id="findUserIdModalFooter">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
            <button type="button" id="verifyUserIdBtn" class="btn btn-primary">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 비밀번호 찾기 모달 -->
    <div
      class="modal fade"
      id="findPasswordModal"
      tabindex="-1"
      aria-labelledby="findPasswordModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="findPasswordModalLabel">본인 인증</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" id="findPasswordModalBody">
            <!-- 비밀번호 찾기 폼 내용 -->
            <input
              type="text"
              id="userIdForFindPassword"
              class="form-control"
              placeholder="아이디를 입력해 주세요"
            />
            <input
              type="email"
              id="emailForFindPassword"
              class="form-control mt-2"
              placeholder="이메일을 입력해 주세요"
            />
            <input
              type="nickName"
              id="nickNameForFindPassword"
              class="form-control mt-2"
              placeholder="닉네임을 입력해 주세요"
            />
            <label
              id="findPasswordMessage"
              class="invalid-feedback"
              style="display: none"
            ></label>
          </div>
          <div class="modal-footer" id="findPasswordModalFooter">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
            <button
              type="button"
              id="verifyPasswordBtn"
              class="btn btn-primary"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 알림 모달 -->
    <div
      class="modal fade"
      id="alertModal"
      tabindex="-1"
      aria-labelledby="alertModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="alertModalLabel">회원가입</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" id="alertModalBody"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Include Font Awesome for icons -->
    <script
      type="module"
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
    ></script>
    <!-- BootStrap-->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <c:url var="navbarJs" value="/js/navbar.js" />
    <script src="${navbarJs}"></script>
    <c:url var="darkModeJs" value="/js/dark_mode.js" />
    <script src="${darkModeJs}"></script>
    <c:url var="loginRegistrationJs" value="/js/loginRegistration.js" />
    <script src="${loginRegistrationJs}"></script>
    <c:url var="darkMode" value="/js/dark_mode.js" />
    <script src="${darkMode}"></script>
    
    <script>
      const defaultImageUrl = '${defaultImageUrl}';
    </script>
  </body>
</html>
