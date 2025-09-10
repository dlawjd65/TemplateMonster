 // 슬라이더 변수들
        let currentSlide = 0;
        const totalSlides = 3;
        let slideInterval;
        let isAutoSliding = true;

        // DOM 요소들
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const slides = document.querySelectorAll('.slide');
        const pageDots = document.querySelectorAll('.page-dot');
        const progressBar = document.querySelector('.progress-bar');
        const currentSlideSpan = document.getElementById('current-slide');
        const loading = document.querySelector('.loading');
        const sliderContainer = document.querySelector('.slider-container');

        // 초기화
        document.addEventListener('DOMContentLoaded', function() {
            initializeSlider();
            startAutoSlide();
            setupTouchEvents();
        });

        // 슬라이더 초기화
        function initializeSlider() {
            updateSlider();
            updateProgressBar();
            
            // 이미지 로딩 완료 후 로딩 텍스트 제거
            const images = document.querySelectorAll('.slide img');
            let loadedImages = 0;
            
            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener('load', () => {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            loading.style.display = 'none';
                        }
                    });
                }
            });
            
            if (loadedImages === images.length) {
                loading.style.display = 'none';
            }
        }

        // 슬라이드 업데이트
        function updateSlider() {
            // 슬라이더 위치 변경
            const translateX = -currentSlide * (100 / totalSlides);
            sliderWrapper.style.transform = `translateX(${translateX}%)`;
            
            // 활성 슬라이드 클래스 업데이트
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            // 페이지 인디케이터 업데이트
            pageDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // 현재 슬라이드 번호 업데이트
            currentSlideSpan.textContent = currentSlide + 1;
        }

        // 진행바 업데이트
        function updateProgressBar() {
            const progress = ((currentSlide + 1) / totalSlides) * 100;
            progressBar.style.width = '${progress}%';
        }

        // 다음 슬라이드
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
            updateProgressBar();
            resetAutoSlide();
        }

        // 이전 슬라이드
        function previousSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
            updateProgressBar();
            resetAutoSlide();
        }

        // 특정 슬라이드로 이동
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
            updateProgressBar();
            resetAutoSlide();
        }

        // 자동 슬라이드 시작
        function startAutoSlide() {
            if (isAutoSliding) {
                slideInterval = setInterval(nextSlide, 5000);
            }
        }

        // 자동 슬라이드 정지
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        // 자동 슬라이드 재시작
        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // 마우스 호버 이벤트
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);

        // 터치 이벤트 설정 (모바일 스와이프)
        function setupTouchEvents() {
            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;

            sliderContainer.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: true });

            sliderContainer.addEventListener('touchend', function(e) {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const diffX = startX - endX;
                const diffY = startY - endY;
                
                // 수평 스와이프가 수직 스와이프보다 클 때만 처리
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        nextSlide(); // 왼쪽으로 스와이프 = 다음 슬라이드
                    } else {
                        previousSlide(); // 오른쪽으로 스와이프 = 이전 슬라이드
                    }
                }
            }
        }

        // 키보드 이벤트
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // 페이지 가시성 API - 탭이 비활성화되면 슬라이드 정지
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                if (isAutoSliding) {
                    startAutoSlide();
                }
            }
        });

        // 윈도우 리사이즈 이벤트
        window.addEventListener('resize', function() {
            updateSlider();
        });

        // 브라우저 뒤로가기/앞으로가기 버튼 처리
        window.addEventListener('popstate', function() {
            updateSlider();
        });


        // 가로슬라이드
        