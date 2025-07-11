let currentIndex = 0;
const slides = document.querySelector(".slides");
const leftDots = document.querySelectorAll(".left-dots .dot");

// 全局自动播放定时器
let autoPlay;
// 在全局添加动画控制变量
let animationPaused = false;

// 启动自动播放
function startAutoPlay() {
  // autoPlay = setInterval(nextSlide, 5000);
  autoPlay = setInterval(() => {
    if (!animationPaused) nextSlide();
  }, 5000);
}

// 停止自动播放
function stopAutoPlay() {
  clearInterval(autoPlay);
}

// 轮播图切换事件
function updateSlide() {
  document.querySelectorAll(".slide").forEach((slide) => {
    slide.classList.remove("active");
  });
  document.querySelectorAll(".slide")[currentIndex].classList.add("active");
  leftDots.forEach((dot) => dot.classList.remove("active"));
  leftDots[currentIndex].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % 3;
  updateSlide();
}

// 悬停暂停
const carousel = document.querySelector(".carousel");
// carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
// carousel.addEventListener("mouseleave", () => {
//   stopAutoPlay(); // 先停止旧定时器
//   startAutoPlay(); // 再启动新定时器
// });
// 更新鼠标事件监听
carousel.addEventListener("mouseenter", () => {
  animationPaused = true;
  clearInterval(autoPlay);
  document
    .querySelectorAll(".left-dots .dot.active::after")
    .forEach((progress) => {
      progress.style.animationPlayState = "paused";
    });
});

carousel.addEventListener("mouseleave", () => {
  stopAutoPlay(); // 先停止旧定时器
  animationPaused = false;
  startAutoPlay();
  document
    .querySelectorAll(".left-dots .dot.active::after")
    .forEach((progress) => {
      progress.style.animationPlayState = "running";
    });
});

// 轮播图 dot 点击切换事件
leftDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopAutoPlay(); // 点击前先清除之前的定时器

    // 移除旧动画
    document
      .querySelectorAll(".left-dots .dot.active::after")
      .forEach((progress) => {
        progress.style.animation = "none";
      });
    // 强制重绘
    void document.querySelector(".left-dots .dot.active").offsetWidth;
    // 重新添加动画
    document
      .querySelectorAll(".left-dots .dot.active::after")
      .forEach((progress) => {
        progress.style.animation = "circle-progress 5s linear forwards";
      });

    currentIndex = index;
    updateSlide();
    startAutoPlay(); // 切换后重新启动自动播放
  });
});



window.addEventListener('DOMContentLoaded', () => {
    // 设置首项默认激活
    document.querySelectorAll('.slide')[0].classList.add('active');
    leftDots[0].classList.add('active');
    startAutoPlay();
});
