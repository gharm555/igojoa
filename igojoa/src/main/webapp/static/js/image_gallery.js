let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let box = document.querySelector(".gallery-box");
let locationName = document.getElementById("location-name");
let degrees = 0;
let currentIndex = 0;
const totalImages = 8; // 총 이미지 수

function updateLocationName() {
  const images = box.querySelectorAll("img");
  const currentImage = images[currentIndex];
  locationName.textContent = currentImage.dataset.name;
}

prev.addEventListener("click", function () {
  degrees += 45;
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  box.style = `transform: perspective(1000px) rotateY(${degrees}deg)`;
  updateLocationName();
});

next.addEventListener("click", function () {
  degrees -= 45;
  currentIndex = (currentIndex + 1) % totalImages;
  box.style = `transform: perspective(1000px) rotateY(${degrees}deg)`;
  updateLocationName();
});

// 초기 이름 설정
updateLocationName();
