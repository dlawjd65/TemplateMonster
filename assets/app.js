// ------------------------------
// CDN 이미지 배열
// ------------------------------





// 배너 이미지
const bannerImages = [
  "https://uiparadox.co.uk/templates/print-hive/assets/media/banner/banner-image-1.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/banner/banner-image-2.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/banner/banner-image-3.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/banner/banner-image-4.png",
];

// 컬렉션 이미지
const collectionImages = [
  "https://uiparadox.co.uk/templates/print-hive/assets/media/collection/collection-1.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/collection/collection-2.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/collection/collection-3.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/collection/collection-4.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/collection/collection-5.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/collection/collection-6.png",
];

// 상품 카드 이미지
const productImages = [
  "https://uiparadox.co.uk/templates/print-hive/assets/media/products/product-1.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/products/product-2.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/products/product-3.png",
  "https://uiparadox.co.uk/templates/print-hive/assets/media/products/product-4.png",
  // 필요에 따라 더 추가
];

// ------------------------------
// 이미지 교체 로직
// ------------------------------
function replaceImages(selector, arr) {
  document.querySelectorAll(selector).forEach((img, i) => {
    if (arr[i]) {
      img.src = arr[i];
      img.loading = "lazy";
      img.decoding = "async";
    }
  });
}

replaceImages(".banner-images-container img", bannerImages);
replaceImages(".collection-sec .image-box img", collectionImages);
replaceImages(".product-image", productImages);


window.addEventListener("load", function() {
    document.getElementById("preloader").style.display = "none";
});





