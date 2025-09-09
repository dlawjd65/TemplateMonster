        // 상하 롤링 배너 자바스크립트
        document.addEventListener('DOMContentLoaded', function() {
            const bannerContent = document.getElementById('verticalBannerContent');
            const bannerWrapper = document.querySelector('.banner-wrapper');
            const verticalBanner = document.querySelector('.vertical-rolling-banner');
            
            // 배너 메시지 배열
            const bannerMessages = [
                {icon: 'fas fa-shipping-fast', emoji: '🚚', text: '무료 배송 - 5만원 이상 구매 시'},
                {icon: 'fas fa-gift', emoji: '🎁', text: '신규 회원 10% 할인 혜택'},
                {icon: 'fas fa-truck', emoji: '🚛', text: '당일 발송 - 오후 2시 이전 주문'},
            ];

            let currentIndex = 0;
            let isAnimating = false;

            // 동적으로 배너 아이템 생성
            function createBannerItems() {
                let content = '';
                bannerMessages.forEach((message, index) => {
                    content += `
                        <div class="banner-item-vertical" data-index="${index}">
                            <i class="${message.icon}"></i>
                            <span>${message.emoji} ${message.text}</span>
                        </div>
                    `;
                });
                
                // 순환을 위해 첫 번째 아이템 다시 추가
                const firstMessage = bannerMessages[0];
                content += `
                    <div class="banner-item-vertical" data-index="loop">
                        <i class="${firstMessage.icon}"></i>
                        <span>${firstMessage.emoji} ${firstMessage.text}</span>
                    </div>
                `;
                
                return content;
            }

            // 배너 초기화
            function initBanner() {
                bannerContent.innerHTML = createBannerItems();
            }

            // 수동으로 다음 아이템으로 전환
            function nextBannerItem() {
                if (isAnimating) return;
                
                isAnimating = true;
                currentIndex = (currentIndex + 1) % bannerMessages.length;
                
                const bannerHeight = verticalBanner.offsetHeight;
                const translateY = -bannerHeight * currentIndex;
                
                bannerContent.style.transform = `translateY(${translateY}px)`;
                bannerContent.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // 애니메이션 완료 후
                setTimeout(() => {
                    isAnimating = false;
                    
                    // 마지막에서 첫 번째로 순환
                    if (currentIndex === 0) {
                        bannerContent.style.transition = 'none';
                        bannerContent.style.transform = 'translateY(0px)';
                    }
                }, 600);
            }

            // 자동 롤링 시작/중지
            let autoRollingInterval;
            
            function startAutoRolling() {
                autoRollingInterval = setInterval(nextBannerItem, 3000);
            }

            function stopAutoRolling() {
                if (autoRollingInterval) {
                    clearInterval(autoRollingInterval);
                    autoRollingInterval = null;
                }
            }

            // 마우스 이벤트
            verticalBanner.addEventListener('mouseenter', function() {
                stopAutoRolling();
                bannerContent.style.animationPlayState = 'paused';
            });

            verticalBanner.addEventListener('mouseleave', function() {
                startAutoRolling();
                bannerContent.style.animationPlayState = 'running';
            });

            // 터치 이벤트
            let touchStartY = 0;
            let touchEndY = 0;

            verticalBanner.addEventListener('touchstart', function(e) {
                touchStartY = e.changedTouches[0].screenY;
                stopAutoRolling();
            });

            verticalBanner.addEventListener('touchend', function(e) {
                touchEndY = e.changedTouches[0].screenY;
                const touchDiff = touchStartY - touchEndY;
                
                // 스와이프 감지 (위로 스와이프하면 다음 아이템)
                if (Math.abs(touchDiff) > 50) {
                    if (touchDiff > 0) {
                        nextBannerItem();
                    }
                }
                
                // 잠시 후 자동 롤링 재시작
                setTimeout(() => {
                    startAutoRolling();
                }, 2000);
            });

            // 클릭으로 다음 아이템으로 이동
            verticalBanner.addEventListener('click', function(e) {
                if (!isAnimating) {
                    nextBannerItem();
                }
            });

            // 반응형 높이 조절
            function adjustBannerHeight() {
                const screenWidth = window.innerWidth;
                let height;
                
                if (screenWidth <= 576) {
                    height = '40px';
                } else {
                    height = '45px';
                }
                
                verticalBanner.style.height = height;
                
                // 모든 배너 아이템 높이 조절
                const bannerItems = document.querySelectorAll('.banner-item-vertical');
                bannerItems.forEach(item => {
                    item.style.height = height;
                });
            }

            // 배너 색상 변경 (선택사항)
            function changeBannerColor() {
                const colors = [
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                ];
                
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                verticalBanner.style.background = randomColor;
            }

            // 초기화
            initBanner();
            adjustBannerHeight();
            startAutoRolling();

            // 리사이즈 이벤트
            window.addEventListener('resize', adjustBannerHeight);

            // 색상 변경 버튼 (개발자 도구에서 실행 가능)
            window.changeBannerColor = changeBannerColor;
        });