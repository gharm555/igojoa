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
    <c:url var="cssResetCss" value="/css/cssReset.css" />
    <link rel="stylesheet" href="${cssResetCss}" />
    <c:url var="navbarCss" value="/css/navbar.css" />
    <link rel="stylesheet" href="${navbarCss}" />
    <c:url var="loginRegistrationCss" value="/css/loginRegistration.css" />
    <link rel="stylesheet" href="${loginRegistrationCss}" />
  </head>
  <body>
    <header>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <div class="container-sideNav">
            <button class="navbar-toggler" type="button" onclick="toggleSideNav()" aria-controls="sideNav">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="container-logo">
            <a class="navbar-brand mx-auto" id="goToTop" href="#"><h2 class="m-0">아이고좋아</h2></a>
          </div>
          <div class="container-user">
            <c:if test="${userId == null}">
              <button type="button" class="btn btn-outline-primary me-2 nav-btn" id="btnLogin">로그인</button>
            </c:if>
            <c:if test="${userId != null}">
            <div class="userProfile" onclick="toggleProfileDropdown()">
                <img src="${userProfileUrl}" alt="프로필 사진" />
                <div class="dropdown-menu">
                  <a class="dropdown-item" >마이페이지</a>
                  <a class="dropdown-item">위치인증</a>
                  <span class="dropdown-item">포인트정보: 999</span>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" id="logoutBtn">로그아웃</a>
                </div>
              </div>
            </c:if>
          </div>
        </div>
      </nav>

      <div id="sideNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" id="goMain">메인</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="goPopular">추천명소</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="goGame">미니게임</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="goFAQ">자주묻는질문</a>
          </li>
        </ul>
      </div>

      <div class="banner-toggle-container">
        <button class="btn btn-outline-primary banner-toggle nav-btn" onclick="toggleBanner()">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>

      <div class="banner-container">
        <div class="banner-content">
          <div
            id="banner-inner"
            class="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            data-bs-pause="false"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="/img/img1.png" class="w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="/img/img2.jpg" class="w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="/img/img3.jpg" class="w-100" alt="..." />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#banner-inner" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#banner-inner" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>
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
            <form action="${loginUrl}" method="post">
              <h3>로그인</h3>
              <input type="text" class="form-control" id="loginId" name="userId" placeholder="아이디를 입력해 주세요" value="${userId}"/>
              <input type="password" class="form-control" id="loginPassword" name="password" placeholder="비밀번호를 입력해 주세요" />
              <input type="submit" class="form-control" id="loginBtn" value="로그인" />
              <div class="find">
                <a class="text-decoration-underline" data-bs-toggle="modal" data-bs-target="#findUserIdModal"
                  >아이디를 잊으셨나요?</a
                >
                <span> | </span>
                <a class="text-decoration-underline" data-bs-toggle="modal" data-bs-target="#findPasswordModal"
                  >비밀번호를 잊으셨나요?</a
                >
              </div>
            </form>
          </div>
          <div class="form signupform">
            <c:url var="registerUrl" value="/user/register" />
            <form action="${registerUrl}" id="registerForm"  method="post" enctype="multipart/form-data">
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
              <div id="id-check-message" class="invalid-feedback" style="display: none">중복된 아이디입니다.</div>

              <input
                type="password"
                class="form-control"
                placeholder="비밀번호"
                id="password"
                name="password"
                oninput="validateInput('password', this.value)"
              />
              <div id="password-check-message" class="invalid-feedback" style="display: none">
                비밀번호가 유효하지 않습니다.
              </div>

              <input
                type="password"
                class="form-control"
                placeholder="비밀번호 확인"
                id="password-confirm"
                oninput="validateInput('password-confirm', this.value)"
              />
              <div id="password-confirm-check-message" class="invalid-feedback" style="display: none">
                비밀번호가 일치하지 않습니다.
              </div>

              <input
                type="text"
                class="form-control"
                placeholder="닉네임"
                id="nickName"
                name="nickName"
                oninput="validateInput('nickName', this.value)"
              />
              <div id="nickname-check-message" class="invalid-feedback" style="display: none">중복된 닉네임입니다.</div>

              <input
                type="email"
                class="form-control"
                placeholder="이메일"
                id="email"
                name="email"
                oninput="validateInput('email', this.value)"
              />
              <div id="email-check-message" class="invalid-feedback" style="display: none">
                유효하지 않은 이메일입니다.
              </div>

              <div class="d-flex align-items-baseline">
                <input
                  type="text"
                  class="form-control"
                  placeholder="010"
                  id="phone1"
                  name="phone1"
                  maxlength="3"
                  style="width: 80px; margin-right: 5px"
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
                  style="width: 100px; margin-left: 5px; margin-right: 5px"
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
                  style="width: 100px; margin-left: 5px"
                  oninput="validateInput('phone', this.value)"
                />
              </div>
              <div id="phone-check-message" class="invalid-feedback" style="display: none">
                유효하지 않은 전화번호입니다.
              </div>
              <input type="submit" id="registerBtn" name="registerBtn" value="회원가입" />
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- 아이디 찾기 모달 -->
    <div class="modal fade" id="findUserIdModal" tabindex="-1" aria-labelledby="findUserIdModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="findUserIdModalLabel">본인 인증</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="findUserIdModalBody">
            <!-- 아이디 찾기 폼 내용 -->
            <input type="email" name="email" id="emailForFindUserId" class="form-control" placeholder="이메일을 입력해 주세요" />
            <input type="nickName" name="nickName" id="nickNameForFindUserId" class="form-control mt-2" placeholder="닉네임을 입력해 주세요" />
            <label id="findUserIdMessage" class="invalid-feedback" style="display: none"></label>
          </div>
          <div class="modal-footer" id="findUserIdModalFooter">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" id="verifyUserIdBtn" class="btn btn-primary">확인</button>
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
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="findPasswordModalBody">
            <!-- 비밀번호 찾기 폼 내용 -->
            <input type="text" id="userIdForFindPassword" class="form-control" placeholder="아이디를 입력해 주세요" />
            <input type="email" id="emailForFindPassword" class="form-control mt-2" placeholder="이메일을 입력해 주세요" />
            <input type="nickName" id="nickNameForFindPassword" class="form-control mt-2" placeholder="닉네임을 입력해 주세요" />
            <label id="findPasswordMessage" class="invalid-feedback" style="display: none"></label>
          </div>
          <div class="modal-footer" id="findPasswordModalFooter">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" id="verifyPasswordBtn" class="btn btn-primary">확인</button>
          </div>
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
    <c:url var="navbarJs" value="/js/navbar.js" />
    <script src="${navbarJs}"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <c:url var="loginRegistrationJs" value="/js/loginRegistration.js" />
    <script src="${loginRegistrationJs}"></script>
  </body>
</html>


