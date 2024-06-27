<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html lang="KR">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
        />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
            href="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.css"
            rel="stylesheet"
        />
        <c:url var="cssResetCss" value="/css/cssReset.css" />
        <link rel="stylesheet" href="${cssResetCss}" />
        <c:url var="navbarCss" value="/css/navbar.css" />
        <link rel="stylesheet" href="${navbarCss}" />
        <c:url var="userProfileCss" value="/css/userProfile.css" />
        <link rel="stylesheet" href="${userProfileCss}" />

        <title>내정보</title>
    </head>
    <body>
        <header>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <div class="container-sideNav">
                        <button
                            class="navbar-toggler"
                            type="button"
                            onclick="toggleSideNav()"
                            aria-controls="sideNav"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div class="container-logo">
                        <a class="navbar-brand mx-auto" id="goToTop" href="#"
                            ><h2 class="m-0">아이고좋아</h2></a
                        >
                    </div>
                    <div class="container-user">
                        <c:if test="${userId == null}">
                            <button
                                type="button"
                                class="btn btn-outline-primary me-2 nav-btn"
                                id="btnLogin"
                            >
                                로그인
                            </button>
                        </c:if>
                        <c:if test="${userId != null}">
                            <div
                                class="userProfile"
                                onclick="toggleProfileDropdown()"
                            >
                                <img
                                    src="${userProfileUrl}"
                                    alt="프로필 사진"
                                />
                                <!-- <div class="dropdown-menu">
                                    <a
                                        class="dropdown-item"
                                        id="goUserProfileBtn"
                                        >마이페이지</a
                                    >
                                    <a
                                        class="dropdown-item"
                                        id="locationVerifyBtn"
                                        >위치인증</a
                                    >
                                    <span class="dropdown-item"
                                        >포인트정보: 999</span
                                    >
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" id="logoutBtn"
                                        >로그아웃</a
                                    >
                                </div> -->
                                <div class="dropdown-menu">
                                    <button
                                        class="dropdown-item"
                                        id="goUserProfileBtn"
                                    >
                                        마이페이지
                                    </button>
                                    <button
                                        class="dropdown-item"
                                        id="locationVerifyBtn"
                                    >
                                        위치인증
                                    </button>
                                    <span class="dropdown-item"
                                        >포인트정보: 999</span
                                    >
                                    <div class="dropdown-divider"></div>
                                    <button
                                        class="dropdown-item"
                                        id="logoutBtn"
                                    >
                                        로그아웃
                                    </button>
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
                <button
                    class="btn btn-outline-primary banner-toggle"
                    onclick="toggleBanner()"
                >
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
                                <img src="img1.png" class="w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="img2.jpg" class="w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="img3.jpg" class="w-100" alt="..." />
                            </div>
                        </div>
                        <button
                            class="carousel-control-prev"
                            type="button"
                            data-bs-target="#banner-inner"
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
                            data-bs-target="#banner-inner"
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
        </header>
        <main style="margin-top: 120px">
            <div class="container p-0">
                <div class="row g-0 h-100">
                    <div class="col-md-3 sidebar">
                        <!-- TODO: 채워야 할 부분 -->
                        <div class="profile-summary">
                            <input
                                type="file"
                                id="profileImageInput"
                                style="display: none"
                                accept="image/*"
                            />
                            <img
                                src="https://placehold.co/150x150"
                                alt="프로필 이미지"
                                id="userPrifileUrl"
                                class="rounded-circle profile-img"
                                style="
                                    cursor: pointer;
                                    width: 150px;
                                    height: 150px;
                                    object-fit: cover;
                                "
                            />
                            <div class="icon-text text-center">
                                <div id="icon1" class="circular-icon">1</div>
                                <span class="text" id="nickName"
                                    >나는 닉네임</span
                                >
                            </div>
                        </div>
                        <nav
                            class="nav flex-column nav-pills"
                            id="v-pills-tab"
                            role="tablist"
                        >
                            <button
                                class="nav-link active"
                                id="v-pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-home"
                                type="button"
                                role="tab"
                            >
                                <i class="fas fa-user me-2"></i>내정보
                            </button>
                            <button
                                class="nav-link"
                                id="v-pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-profile"
                                type="button"
                                role="tab"
                            >
                                <i class="fas fa-edit me-2"></i>내정보수정
                            </button>
                            <button
                                class="nav-link"
                                id="v-pills-disabled-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-disabled"
                                type="button"
                                role="tab"
                            >
                                <i class="fas fa-history me-2"></i>내활동내역
                            </button>
                            <button
                                class="nav-link"
                                id="v-pills-messages-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-messages"
                                type="button"
                                role="tab"
                            >
                                <i class="fas fa-coins me-2"></i>포인트내역
                            </button>
                        </nav>
                    </div>
                    <div class="col-md-9 content p-5">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div
                                class="tab-pane fade show active"
                                id="v-pills-home"
                                role="tabpanel"
                                tabindex="0"
                            >
                                <h2 class="mb-4">내 정보</h2>
                                <!-- TODO: 채워야 할 부분 -->
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title mb-0 mt-3">
                                            아이디
                                        </h5>
                                        <p class="card-text" id="userId">
                                            qkrtnckd11
                                        </p>
                                        <h5 class="card-title mb-0 mt-3">
                                            이메일
                                        </h5>
                                        <p class="card-text" id="email">
                                            soochang94@naver.com
                                        </p>
                                        <h5 class="card-title mb-0 mt-3">
                                            전화번호
                                        </h5>
                                        <p class="card-text" id="phoneNumber">
                                            010-2974-6302
                                        </p>
                                        <h5 class="card-title mb-0 mt-3">
                                            포인트 현황
                                        </h5>
                                        <p
                                            class="card-text"
                                            id="currentsPoints"
                                        >
                                            누적 포인트: 15,000P
                                        </p>
                                        <p
                                            class="card-text"
                                            id="cumulativePoint"
                                        >
                                            현재 포인트: 5000P
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-profile"
                                role="tabpanel"
                                tabindex="0"
                            >
                                <h2 class="mb-4">내정보수정</h2>
                                <form>
                                    <div class="mb-3">
                                        <label for="nickName" class="form-label"
                                            >사용자 닉네임</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="nickName"
                                            value=""
                                        />
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label"
                                            >이메일 주소</label
                                        >
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="email"
                                            value="soochang94@naver.com"
                                        />
                                    </div>

                                    <div class="mb-3">
                                        <label for="phone1" class="form-label"
                                            >전화번호</label
                                        >
                                        <div
                                            class="phone-input-container"
                                            style="
                                                display: flex;
                                                align-items: center;
                                                gap: 10px;
                                            "
                                        >
                                            <input
                                                type="text"
                                                class="form-control phone-input"
                                                id="phone1"
                                                maxlength="3"
                                                style="
                                                    width: 60px;
                                                    text-align: center;
                                                "
                                            />
                                            <span>-</span>
                                            <input
                                                type="text"
                                                class="form-control phone-input"
                                                id="phone2"
                                                maxlength="4"
                                                style="
                                                    width: 80px;
                                                    text-align: center;
                                                "
                                            />
                                            <span>-</span>
                                            <input
                                                type="text"
                                                class="form-control phone-input"
                                                id="phone3"
                                                maxlength="4"
                                                style="
                                                    width: 80px;
                                                    text-align: center;
                                                "
                                            />
                                        </div>
                                        <input
                                            type="hidden"
                                            id="fullPhoneNumber"
                                            name="fullPhoneNumber"
                                        />
                                    </div>
                                    <div
                                        class="mb-3 d-none"
                                        id="passwordGroup1"
                                    >
                                        <label
                                            for="newPassword"
                                            class="form-label"
                                            >비밀번호</label
                                        >
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="newPassword"
                                            value=""
                                        />
                                    </div>
                                    <div
                                        class="mb-3 d-none"
                                        id="passwordGroup2"
                                    >
                                        <label
                                            for="confirmPassword"
                                            class="form-label"
                                            >비밀번호 확인</label
                                        >
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="confirmPassword"
                                            value=""
                                        />
                                    </div>
                                    <div class="mb-5 mt-4">
                                        <button
                                            id="passwordShowBtn"
                                            type="button"
                                            class="btn btn-primary"
                                            style="
                                                background-color: white;
                                                color: black;
                                                font-size: 14px;
                                                padding: 5px 10px;
                                            "
                                            onclick="showPasswordFields()"
                                        >
                                            비밀번호 변경
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
                                            정보 수정
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-disabled"
                                role="tabpanel"
                                tabindex="0"
                            >
                                <h2 class="mb-4">내활동내역</h2>
                                <div class="search-container">
                                    <select
                                        id="province-select"
                                        class="form-select"
                                        aria-label="도/광역시 선택"
                                    >
                                        <option selected>도/광역시</option>
                                        <option value="gyeonggi">경기도</option>
                                        <option value="gangwon">강원도</option>
                                        <option value="jeollabuk">
                                            전라북도
                                        </option>
                                        <option value="jeollanam">
                                            전라남도
                                        </option>
                                        <option value="gyeongsangbuk">
                                            경상북도
                                        </option>
                                        <option value="gyeongsangnam">
                                            경상남도
                                        </option>
                                        <option value="chungcheongbuk">
                                            충청북도
                                        </option>
                                        <option value="chungcheongnam">
                                            충청남도
                                        </option>
                                        <option value="seoul">서울시</option>
                                        <option value="busan">부산시</option>
                                        <option value="daegu">대구시</option>
                                        <option value="incheon">인천시</option>
                                        <option value="gwangju">광주시</option>
                                        <option value="daejeon">대전시</option>
                                        <option value="ulsan">울산시</option>
                                        <option value="jeju">제주도</option>
                                    </select>
                                    <select id="search-category">
                                        <option value="likes">좋아요</option>
                                        <option value="reviews">
                                            작성리뷰
                                        </option>
                                        <option value="locations">
                                            위치인증장소
                                        </option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="검색어를 입력하세요..."
                                    />
                                    <button>검색</button>
                                </div>
                                <div
                                    class="d-flex justify-content-between align-items-center mt-3"
                                >
                                    <div class="dropdown">
                                        <button
                                            class="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="sortDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            정렬
                                        </button>
                                        <ul
                                            class="dropdown-menu"
                                            aria-labelledby="sortDropdown"
                                        >
                                            <li>
                                                <a
                                                    class="dropdown-item"
                                                    href="#"
                                                    onclick="sortActivities('latest')"
                                                    >최신순</a
                                                >
                                            </li>
                                            <li>
                                                <a
                                                    class="dropdown-item"
                                                    href="#"
                                                    onclick="sortActivities('oldest')"
                                                    >오래된순</a
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                    <nav>
                                        <div
                                            class="nav nav-tabs"
                                            id="nav-tab"
                                            role="tablist"
                                        >
                                            <button
                                                class="nav-link active"
                                                id="nav-home-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-home"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-home"
                                                aria-selected="true"
                                            >
                                                좋아요 게시물
                                            </button>
                                            <button
                                                class="nav-link"
                                                id="nav-liked-posts-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-liked-posts"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-liked-posts"
                                                aria-selected="false"
                                            >
                                                좋아요 리뷰
                                            </button>
                                            <button
                                                class="nav-link"
                                                id="nav-profile-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-profile"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-profile"
                                                aria-selected="false"
                                            >
                                                작성 리뷰
                                            </button>
                                            <button
                                                class="nav-link"
                                                id="nav-contact-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-contact"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-contact"
                                                aria-selected="false"
                                            >
                                                위치인증 장소
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                                <div class="tab-content" id="nav-tabContent">
                                    <!------ 좋아요 게시물 목록 섹션 --------->
                                    <div
                                        class="tab-pane fade show active"
                                        id="nav-home"
                                        role="tabpanel"
                                        aria-labelledby="nav-home-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="activityList"
                                        >
                                            <!-- -------- 좋아요게시물 목록 작성 추가 ------->
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        부산시 전포동 열람실
                                                        게시물에 좋아요를
                                                        눌렀습니다.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.19 10:15</small
                                                    >
                                                </div>
                                            </li>
                                            <!-- ------------------------------------ -->
                                        </ul>
                                    </div>
                                    <!-----------좋아요 리뷰 목록 섹션 --------->
                                    <div
                                        class="tab-pane fade"
                                        id="nav-liked-posts"
                                        role="tabpanel"
                                        aria-labelledby="nav-liked-posts-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="likedPostsList"
                                        >
                                            <!-- 좋아요 리뷰 목록 추가 -->
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="게시물 썸네일"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울 야경 명소 Top 10
                                                        리뷰에 좋아요를
                                                        눌렀습니다.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.25 18:30</small
                                                    >
                                                </div>
                                            </li>
                                            <!-- Add more liked post items as needed -->
                                        </ul>
                                    </div>
                                    <!------- 작성 리뷰 목록 섹션 ------->
                                    <div
                                        class="tab-pane fade"
                                        id="nav-profile"
                                        role="tabpanel"
                                        aria-labelledby="nav-profile-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="activityList"
                                        >
                                            <!-- -------- 작성 리뷰 목록 작성 추가 ------->
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        서울시 관악구 야경
                                                        게시물에 리뷰를 등록.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.20 14:30</small
                                                    >
                                                </div>
                                            </li>

                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="프로필"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        부산 해운대 맛집
                                                        게시물에 리뷰를 작성.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.19 10:15</small
                                                    >
                                                </div>
                                            </li>

                                            <!-- ------------------------------------ -->
                                        </ul>
                                    </div>
                                    <!-- 위치인증 장소 섹션 -->
                                    <div
                                        class="tab-pane fade"
                                        id="nav-contact"
                                        role="tabpanel"
                                        aria-labelledby="nav-contact-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="likedPostsList"
                                        >
                                            <li
                                                class="list-group-item d-flex align-items-center"
                                            >
                                                <img
                                                    src="https://placehold.co/50x50"
                                                    alt="게시물 썸네일"
                                                    class="rounded-circle me-3"
                                                    width="50"
                                                    height="50"
                                                />
                                                <div>
                                                    <p class="mb-0">
                                                        아이티윌 에서 위치인증을
                                                        하였습니다.
                                                    </p>
                                                    <small class="text-muted"
                                                        >2024.06.25 18:30</small
                                                    >
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!-- ---------  포인트 내역 섹션 ------------>
                            <div
                                class="tab-pane fade"
                                id="v-pills-messages"
                                role="tabpanel"
                                tabindex="0"
                            >
                                <h2 class="mb-4">포인트내역</h2>
                                <div class="row">
                                    <div class="col-md-7">
                                        <div id="calendar"></div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="point-summary mb-3">
                                            <span class="me-3"
                                                >얻은 포인트:
                                                <span
                                                    id="earnedPoints"
                                                    class="text-success"
                                                    >0</span
                                                >
                                            </span>
                                            <span
                                                >소비 포인트:
                                                <span
                                                    id="spentPoints"
                                                    class="text-danger"
                                                    >0</span
                                                >
                                            </span>
                                        </div>
                                        <div class="table-responsive">
                                            <table
                                                class="table table-striped"
                                                id="pointHistoryTable"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>날짜</th>
                                                        <th>내용</th>
                                                        <th>포인트</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- 포인트 내역이 여기에 동적으로 추가됩니다 -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 비밀번호 확인 모달 -->
        <div
            class="modal fade"
            id="passwordModal"
            tabindex="-1"
            aria-labelledby="passwordModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="passwordModalLabel">
                            비밀번호 확인
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form id="passwordForm">
                            <div class="mb-3">
                                <label for="password" class="form-label"
                                    >비밀번호를 입력해주세요:</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                확인
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Axios 라이브러리는 js보다 먼저 load 되어야 함 -->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <c:url var="navbarJs" value="/js/navbar.js" />
        <script src="${navbarJs}"></script>
        <c:url var="userProfileJs" value="/js/userProfile.js" />
        <script src="${userProfileJs}"></script>
    </body>
</html>
