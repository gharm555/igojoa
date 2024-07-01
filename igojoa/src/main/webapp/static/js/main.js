document.addEventListener("DOMContentLoaded", function () {
    const $moreButton = document.querySelector("#btnPlus");
    const $cardContainer = document.querySelector(".row.text-center");
    let $extraCards = document.querySelectorAll(".extra-card");
    let $extraCardIndex = 0;

    $moreButton.addEventListener("click", function () {
        for (let i = 0; i < 3 && $extraCardIndex < $extraCards.length; i++, $extraCardIndex++) {
            $extraCards[$extraCardIndex].classList.remove("d-none");
        }
        if ($extraCardIndex >= $extraCards.length) {
            axios.get("./search", {
                params: {
                    startRowValue: $extraCardIndex,
                    rowCnt: 3,
                },
            })
            .then((response) => {
                const $newPlaces = response.data;
                $newPlaces.forEach((place) => {
                    const $newCard = document.createElement("div");
                    $newCard.classList.add("col-lg-4", "col-md-6", "mb-3", "card-item", "extra-card");
                    $newCard.innerHTML = `
                      <div class="main-card">
                        <div class="main-card-header bg-transparent">
                          <div class="d-flex justify-content-between align-items-center">
                            <h1 class="main-card-title">${place.placeName}</h1>
                            <i class="bi bi-heart main-custom-heart"></i>
                          </div>
                          <div class="main-badges mt-3">
                            <span class="badge">${place.highestBadge}</span>
                            <span class="badge">${place.secondHighestBadge}</span>
                            <span class="badge difficulty ${place.IScore}">난이도: ${place.IScore}</span>
                          </div>
                        </div>
                        <div class="d-flex justify-content-between my-3 mx-3">
                          <h3>${place.address}</h3>
                          <h4>누적방문수: ${place.placeVerified}</h4>
                        </div>
                        <div class="main-card-body">
                          <img src="${place.firstUrl}" alt="${place.placeName}" class="img-fluid mb-2" />
                          <img src="${place.secondUrl}" alt="${place.placeName}" class="img-fluid mb-2" />
                          <img src="${place.thirdUrl}" alt="${place.placeName}" class="img-fluid mb-2" />
                        </div>
                        <div class="main-card-footer bg-transparent">
                          <div class="footer-meta">
                            <div class="user-info">
                              <span class="username">${place.nickName}</span>
                            </div>
                            <div class="post-info">
                              <span class="date"><i class="bi bi-calendar3"></i> ${place.modifiedAt}</span>
                              <span class="likes"><i class="bi bi-heart-fill"></i> ${place.likeCount}</span>
                            </div>
                          </div>
                          <div class="comment-section">
                            <p class="comment-text"><i class="bi bi-chat-left-quote"></i> ${place.review}</p>
                          </div>
                        </div>
                      </div>
                    `;
                    $cardContainer.appendChild($newCard);
                });
                $extraCards = document.querySelectorAll(".extra-card");
            })
            .catch((error) => {
                console.error("Error fetching more places:", error);
                if (error.response) {
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                } else if (error.request) {
                    console.error("Request data:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
                console.error("Config:", error.config);
            });
        }
    });


  

    document.addEventListener("click", function (event) {
    if (event.target.classList.contains("main-custom-heart")) {
        event.target.classList.toggle("bi-heart");
        event.target.classList.toggle("bi-heart-fill");
        event.target.classList.toggle("red-color");
    }
});

const $heartFill = document.querySelector(".main-custom-heart");
let heartClickable = 1;

$heartFill.addEventListener("click", () => {
    if (heartClickable === 1) {
        console.log(123123123);
        heartClickable = 0;
        const uri = './clickHeart';
        const params = "${placeName}";

        axios.put(uri, { placeName: params })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error data:", error);
            });
    } else {
        console.log(987987987);
        heartClickable = 1;
        const params = "${placeName}";
        const uri = `./deleteHeart/${params}`;
        console.log(uri);

        axios.delete(uri)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error data:", error);
            });
    }
});

    const $scrollToTopBtn = document.querySelector("#scrollToTopBtn");
    window.addEventListener("scroll", scrollFunction);

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            $scrollToTopBtn.style.display = "block";
        } else {
            $scrollToTopBtn.style.display = "none";
        }
    }

    $scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
