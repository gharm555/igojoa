document.addEventListener("DOMContentLoaded", function () {
  let prev = document.querySelector(".prev");
  let next = document.querySelector(".next");
  let box = document.querySelector(".gallery-box");
  let locationName = document.querySelector("#location-name");
  let images = box.querySelectorAll("img");
  let degrees = 0;
  let currentIndex = 0;
  const totalImages = 8; // 총 이미지 수

  // 이미지 갤러리 데이터 가져오기
  axios
    .get(contextPath + "/imageGallery")
    .then((response) => {
      const imageGallery = response.data;

      imageGallery.forEach((place, index) => {
        if (index < images.length) {
          const img = images[index];
          img.src = place.firstUrl;
          img.alt = place.placeName;
          img.dataset.name = place.placeName;
          img.onclick = goToPlaceDetail;
          console.log(img.dataset.name);
        }
      });

      // 초기 위치 설정
      setInitialPosition();
    })
    .catch((error) => {
      console.error("Error fetching image gallery:", error);
    });

  // 이전 버튼 클릭 이벤트
  prev.addEventListener("click", function () {
    degrees += 45;
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    box.style = `transform: perspective(900px) rotateY(${degrees}deg)`;
    updateLocationName();
  });

  // 다음 버튼 클릭 이벤트
  next.addEventListener("click", function () {
    degrees -= 45;
    currentIndex = (currentIndex + 1) % totalImages;
    box.style = `transform: perspective(1000px) rotateY(${degrees}deg)`;
    updateLocationName();
  });

  function setInitialPosition() {
    currentIndex = 0;
    degrees = 0;
    updateGallery();
  }
  function updateGallery() {
    box.style.transform = `perspective(1000px) rotateY(${degrees}deg)`;
    updateLocationName();
  }
  function updateLocationName() {
    const currentImage = images[currentIndex];
    if (currentImage) {
      locationName.textContent = currentImage.dataset.name;
    } else {
      locationName.textContent = "정보없음";
    }
  }
  function goToPlaceDetail() {
    window.location.href = `${contextPath}/place/details/${images[currentIndex].dataset.name}`;
  }
});
