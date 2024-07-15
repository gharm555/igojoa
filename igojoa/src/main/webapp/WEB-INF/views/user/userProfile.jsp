<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib prefix="c" uri="jakarta.tags.core"%> <%@
taglib prefix="fmt" uri="jakarta.tags.fmt"%> <%@ taglib prefix="fn"
uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="KR">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <c:url var="darkModeCss" value="/css/dark_mode.css" />
        <link rel="stylesheet" href="${darkModeCss}">
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
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
        />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />


        <c:url var="cssResetCss" value="/css/cssReset.css" />
        <link rel="stylesheet" href="${cssResetCss}" />
        <c:url var="userProfileCss" value="/css/userProfile.css" />
        <link rel="stylesheet" href="${userProfileCss}" />
        <c:url var="navbarCss" value="/css/navbar.css" />
        <link rel="stylesheet" href="${navbarCss}" />
        <c:url var="darkmode" value="/css/dark_mode.css"/>
        <link rel="stylesheet" href="${darkmode}">
        
        <title>아이고조아</title>
     <c:url var="appleTouchIcon" value="/favicon/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="${ appleTouchIcon }">
    <c:url var="favicon3232" value="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="${ favicon3232 }">
    <c:url var="favicon1616" value="/favicon/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="${ favicon1616 }">
    <c:url var="webmanifest" value="/favicon/site.webmanifest" />
    <link rel="manifest" href="${ webmanifest }">
    </head>
    <body>
        <header><%@ include file="../header.jspf" %></header>
        <main style="margin-top: 120px; margin-bottom: 15%;" class="userProfile-main">
            <div class="container p-0">
                <div class="row g-0 h-100">
                    <div class="col-md-3 sidebar">
                        <div class="profile-summary">
                            <input
                                type="file"
                                id="profileImageInput"
                                style="display: none"
                                accept="image/*"
                            />
                            <img
                                src="${ userInfo.userProfileUrl }"
                                alt="프로필 이미지"
                                id="profileImage"
                                class="rounded-circle profile-img profileImage"
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
                                    >${ userInfo.nickName }</span
                                >
                            </div>
                        </div>
                        <nav
                            class="nav flex-column flex-md-column nav-pills"
                            id="v-pills-tab"
                            role="tablist"
                        >
                            <button
                                class="nav-link active flex-sm-fill"
                                id="v-pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-home"
                                type="button"
                                role="tab"
                            >
                                <i class="fas fa-user tab-icon me-2"></i>내정보
                            </button>
                            <button
                                class="nav-link flex-sm-fill"
                                id="v-pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-profile"
                                type="button"
                                role="tab"
                            >
                                <i class="fas fa-edit tab-icon me-2"></i>내정보수정
                            </button>
                            <button
                                class="nav-link flex-sm-fill"
                                id="v-pills-disabled-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-disabled"
                                type="button"
                                role="tab"
                            >
                                <i class="fas fa-history tab-icon me-2"></i>내활동내역
                            </button>
                            <button
                                class="nav-link flex-sm-fill"
                                id="v-pills-messages-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-messages"
                                type="button"
                                role="tab"
                            >
                                <i class="fas fa-coins tab-icon me-2"></i>포인트내역
                            </button>
                        </nav>
                    </div>
                    <div class="col-md-9 content p-5 userProfile-tabs-main">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div
                                class="tab-pane fade show active"
                                id="v-pills-home"
                                role="tabpanel"
                                tabindex="0"
                            >
                                <h2 class="mb-4">내 정보</h2>
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title mb-0 mt-3">
                                            아이디
                                        </h5>
                                        <p class="card-text" id="userId">
                                            ${ userInfo.userId }
                                        </p>
                                        <h5 class="card-title mb-0 mt-3">
                                            닉네임
                                        </h5>
                                        <p class="card-text" id="userNickName">
                                            ${ userInfo.nickName }
                                        </p>
                                        <h5 class="card-title mb-0 mt-3">
                                            이메일
                                        </h5>
                                        <p class="card-text" id="email">
                                            ${ userInfo.email }
                                        </p>
                                        <h5 class="card-title mb-0 mt-3">
                                            전화번호
                                        </h5>
                                        <p class="card-text" id="phoneNumber">
                                            <c:set
                                                var="formattedPhone"
                                                value="${userInfo.phoneNumber}"
                                            />
                                            <c:if
                                                test="${not empty formattedPhone and formattedPhone.length() == 11}"
                                            >
                                                <c:set
                                                    var="part1"
                                                    value="${fn:substring(formattedPhone, 0, 3)}"
                                                />
                                                <c:set
                                                    var="part2"
                                                    value="${fn:substring(formattedPhone, 3, 7)}"
                                                />
                                                <c:set
                                                    var="part3"
                                                    value="${fn:substring(formattedPhone, 7, 11)}"
                                                />
                                                <c:set
                                                    var="formattedPhone"
                                                    value="${part1}-${part2}-${part3}"
                                                />
                                            </c:if>
                                            ${formattedPhone}
                                        </p>

                                        <h5 class="card-title mb-0 mt-3">
                                            포인트 현황
                                        </h5>
                                        <p
                                            class="card-text"
                                            id="currentsPoints"
                                        >
                                            현재 포인트:<span class="points">
                                                <fmt:formatNumber
                                                    value="${userInfo.currentsPoints}"
                                                    type="number"
                                                    groupingUsed="true"
                                            /></span>
                                            P
                                        </p>

                                        <p
                                            class="card-text"
                                            id="cumulativePoint"
                                        >
                                            누적 포인트:<span
                                                class="cumulativePoints"
                                            >
                                                <fmt:formatNumber
                                                    value="${userInfo.cumulativePoint}"
                                                    type="number"
                                                    groupingUsed="true"
                                            /></span>
                                            P
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
                                <div
                                    class="d-flex justify-content-between align-items-center mb-4"
                                >
                                    <h2 class="mb-0">내정보수정</h2>
                                    <button
                                        id="withdrawal"
                                        type="button"
                                        class="btn btn-outline-secondary btn-sm"
                                        style="padding: 3px"
                                    >
                                        회원탈퇴
                                    </button>
                                </div>
                                <!-- TODO 시작 -->
                                <div
                                    class="containerImageChange"
                                    style="display: flex; height: 25%"
                                >
                                    <div
                                        class="profile-photo imageInImageChangeContainer"
                                    >
                                        <img
                                            src="${ userInfo.userProfileUrl }"
                                            alt="프로필 이미지"
                                            id="profileImage"
                                            class="rounded-circle profile-img profileImage forMoveToCenter"
                                            style="
                                                cursor: pointer;
                                                width: 150px;
                                                height: 150px;
                                                object-fit: cover;
                                            "
                                        />
                                    </div>
                                    <div
                                        class="info infoInImageChangeContainer"
                                    >
                                        <p style="opacity: 0.8">
                                            98x98픽셀 이상, 10MB 이하의 사진이
                                            권장됩니다. PNG 또는 GIF(애니메이션
                                            GIF 제외) 파일을 사용하세요. 사진이
                                            Igojoa 커뮤니티 가이드를 준수해야
                                            합니다.
                                        </p>
                                        <div class="buttons">
                                            <button
                                                class="btn btn-warning"
                                                id="imageChange"
                                            >
                                                변경
                                            </button>
                                            <button
                                                class="btn btn-danger"
                                                id="imageDelete"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- TODO 끗 -->
                                <form id="editProfileForm">
                                    <div class="mb-3 mt-3">
                                        <label for="nickName" class="form-label"
                                            >사용자 닉네임</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="nickName"
                                            value="${ userInfo.nickName }"
                                            name="nickName"
                                        />
                                        <small
                                            id="nickNameFeedback"
                                            class="form-text"
                                        ></small>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label"
                                            >이메일 주소</label
                                        >
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="email"
                                            value="${ userInfo.email }"
                                            name="email"
                                        />
                                        <small
                                            id="emailFeedback"
                                            class="form-text"
                                        ></small>
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
                                                value="${part1}"
                                                name="phone1"
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
                                                value="${part2}"
                                                name="phone2"
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
                                                value="${part3}"
                                                name="phone3"
                                            />
                                        </div>
                                        <small
                                            id="phoneFeedback"
                                            class="form-text"
                                        ></small>
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
                                        <small
                                            id="passwordFeedback"
                                            class="form-text"
                                        ></small>
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
                                        <small
                                            id="confirmPasswordFeedback"
                                            class="form-text"
                                        ></small>
                                    </div>
                                    <div class="mb-3 mt-4">
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
                                        >
                                            비밀번호 변경
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            class="btn btn-outline-success"
                                            id="updateBtn"
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
                                        id="address-select"
                                        class="form-select"
                                        aria-label="도/광역시 선택"
                                    >
                                        <option selected value="">전체</option>
                                        <option value="경기도">경기도</option>
                                        <option value="강원도">강원도</option>
                                        <option value="전라북도">
                                            전라북도
                                        </option>
                                        <option value="전라남도">
                                            전라남도
                                        </option>
                                        <option value="경상북도">
                                            경상북도
                                        </option>
                                        <option value="경상남도">
                                            경상남도
                                        </option>
                                        <option value="충청북도">
                                            충청북도
                                        </option>
                                        <option value="충청남도">
                                            충청남도
                                        </option>
                                        <option value="서울시">서울시</option>
                                        <option value="부산시">부산시</option>
                                        <option value="대구시">대구시</option>
                                        <option value="인천시">인천시</option>
                                        <option value="광주시">광주시</option>
                                        <option value="대전시">대전시</option>
                                        <option value="울산시">울산시</option>
                                        <option value="제주도">제주도</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="검색어를 입력하세요..."
                                        id="search-input"
                                    />
                                    <button
                                        type="submit"
                                        id="userActivitySearchBtn"
                                    >
                                        검색
                                    </button>
                                </div>
                                <div
                                    class="d-flex justify-content-between align-items-center mt-3"
                                    id="dateAndTabContainer"
                                >
                                    <input
                                        type="text"
                                        id="date-range"
                                        placeholder=""
                                        class="dateRange"
                                    />
                                    <nav class="dateRangeWithNavs">
                                        <div
                                            class="nav nav-tabs"
                                            id="nav-tab"
                                            role="tablist"
                                        >
                                            <button
                                                class="nav-link active d-flex"
                                                id="nav-total-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-total"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-total"
                                                aria-selected="true"
                                            >
                                                전체 내역
                                                <p>
                                                    <i
                                                        class="sort-icon fa-solid fa-sort"
                                                    ></i>
                                                </p>
                                            </button>
                                            <button
                                                class="nav-link d-flex"
                                                id="nav-favoritePlace-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-favoritePlace"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-favoritePlace"
                                                aria-selected="false"
                                            >
                                                좋아요한 게시물
                                                <p>
                                                    <i
                                                        class="sort-icon fa-solid fa-sort"
                                                    ></i>
                                                </p>
                                            </button>
                                            <button
                                                class="nav-link d-flex"
                                                id="nav-likedReview-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-likedReview"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-likedReview"
                                                aria-selected="false"
                                            >
                                                좋아요한 리뷰
                                                <p>
                                                    <i
                                                        class="sort-icon fa-solid fa-sort"
                                                    ></i>
                                                </p>
                                            </button>
                                            <button
                                                class="nav-link d-flex"
                                                id="nav-writtenReview-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-writtenReview"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-writtenReview"
                                                aria-selected="false"
                                            >
                                                작성한 리뷰
                                                <p>
                                                    <i
                                                        class="sort-icon fa-solid fa-sort"
                                                    ></i>
                                                </p>
                                            </button>
                                            <button
                                                class="nav-link d-flex"
                                                id="nav-verifiedPlace-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-verifiedPlace"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-verifiedPlace"
                                                aria-selected="false"
                                            >
                                                위치인증 장소
                                                <p>
                                                    <i
                                                        class="sort-icon fa-solid fa-sort ml-2"
                                                    ></i>
                                                </p>
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                                <div class="tab-content" id="nav-tabContent">
                                    <div
                                        class="tab-pane fade show active"
                                        id="nav-total"
                                        role="tabpanel"
                                        aria-labelledby="nav-total-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="totalList"
                                        ></ul>
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="nav-favoritePlace"
                                        role="tabpanel"
                                        aria-labelledby="nav-favoritePlace-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="favoritePlaceList"
                                        ></ul>
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="nav-likedReview"
                                        role="tabpanel"
                                        aria-labelledby="nav-likdedReview-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="likedReviewList"
                                        ></ul>
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="nav-writtenReview"
                                        role="tabpanel"
                                        aria-labelledby="nav-writtenReview-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="writtenReviewList"
                                        ></ul>
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="nav-verifiedPlace"
                                        role="tabpanel"
                                        aria-labelledby="nav-verifiedPlace-tab"
                                        tabindex="0"
                                    >
                                        <ul
                                            class="list-group"
                                            id="verifiedPlaceList"
                                        ></ul>
                                    </div>
                                </div>
                            </div>
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
                                    <div
                                        class="col-md-5 point-summary-container"
                                    >
                                        <div class="point-summary mb-3 row">
                                            <div
                                                class="col-md-6 monthly-summary"
                                            >
                                                <h5>월별 포인트 요약</h5>
                                                <div>
                                                    <span class="me-3"
                                                        >얻은 포인트:
                                                        <span
                                                            id="monthlyEarnedPoints"
                                                            class="text-success"
                                                            >0</span
                                                        ></span
                                                    >
                                                </div>
                                                <div>
                                                    <span
                                                        >소비 포인트:
                                                        <span
                                                            id="monthlySpentPoints"
                                                            class="text-danger"
                                                            >0</span
                                                        ></span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table
                                                class="table table-striped"
                                                id="pointHistoryTable"
                                            >
                                                <thead>
                                                    <tr class="text-center">
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
        <%@ include file="../footer.jspf"%>

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

        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
        <script src="https://npmcdn.com/flatpickr/dist/l10n/ko.js"></script>
        <c:url var="navbarJs" value="/js/navbar.js" />
        <script src="${navbarJs}"></script>
        <c:url var="userProfileJs" value="/js/userProfile.js" />
        <script src="${userProfileJs}"></script>
        <c:url var="darkModeJs" value="/js/dark_mode.js" />
        <script src="${darkModeJs}"></script>
    </body>
</html>
