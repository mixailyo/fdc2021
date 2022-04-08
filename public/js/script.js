// Popup
let popup = document.querySelector(".popup-overlay");

if (popup) {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("header__btn-registration") || e.target.classList.contains("broadcast__registration-btn")) {
      popup.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (e.target.classList.contains("popup__btn-close") || e.target.closest(".popup__btn-close")) {
      popup.classList.remove("active");
    } else if (e.target == popup) {
      popup.classList.remove("active");
    }
  });

  if (window.location.hash === "#popup") {
    let headerBtnRegistration = document.querySelector(".header__btn-registration");
    let broadcastRegistrationBtn = document.querySelector(".broadcast__registration-btn");

    if (headerBtnRegistration) {
      headerBtnRegistration.click();
    }
    if (broadcastRegistrationBtn) {
      broadcastRegistrationBtn.click();
    }
  }
}

// Label input
let formInputs = document.querySelectorAll(".reg-form__inputs input");

if (formInputs) {
  formInputs.forEach((item) => {
    item.addEventListener("change", () => {
      item.value.length ? item.closest(".reg-form__input-wrapper").classList.add("active") : item.closest(".reg-form__input-wrapper").classList.remove("active");
    });
  });
}

// Select placeholder
let formSelect = document.querySelector(".reg-form__inputs select");

if (formSelect) {
  formSelect.addEventListener("click", () => {
    formSelect.classList.add("active");
    formSelect.closest(".reg-form__input-wrapper").classList.add("active");
  });
}

// QR
let qr = document.querySelector(".qr-overlay");

if (qr) {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("thanks__mask--desktop") || e.target.closest(".thanks__mask--desktop")) {
      qr.classList.add("active");
      // window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (e.target.classList.contains("qr-close") || e.target.closest(".qr-close")) {
      qr.classList.remove("active");
    } else if (e.target == qr) {
      qr.classList.remove("active");
    }
  });
}

// Проверка input'ов в форме при отправке
let formInputsRequired = document.querySelectorAll(".reg-form__inputs .required");

if (formInputs) {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("reg-form__submit")) {
      formInputsRequired.forEach((item) => {
        if (item.value.length) {
          item.closest("div").classList.remove("invalid");
        } else {
          item.closest("div").classList.add("invalid");
        }
      });
    }
  });
}

// Прелоадер и анимация баннера
function animate({ duration, draw, timing }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

let mainBannerCoinContainer = document.querySelector(".header__animation-coin");

if (mainBannerCoinContainer) {
  for (let i = 0; i < 60; i++) {
    let img = document.createElement("img");
    img.src = `video/coin/bluecoin_000${i}-min.png`;
    img.style.display = "none";
    mainBannerCoinContainer.appendChild(img);
  }
}

window.addEventListener("load", () => {
  document.body.classList.add("active");

  if (mainBannerCoinContainer) {
    let mainBannerVideo = document.querySelector(".header__animation-video");
    let mainBannerCoin = document.querySelectorAll(".header__animation-coin img");

    let coinAnimationDuration = 1000;
    let coinAnimationFrames = 60;
    let currentcoinAnimationFrame = 0;

    let coinAnimation = function () {
      animate({
        duration: 1000,
        timing: function (timeFraction) {
          return timeFraction;
        },
        draw: function (progress) {
          let currentFrame = Math.round(coinAnimationFrames * progress - 1 > 0 ? coinAnimationFrames * progress - 1 : 0);
          mainBannerCoin.forEach((item, index) => {
            if (index == currentFrame) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        },
      });
    };

    let coinAnimationReverse = function () {
      animate({
        duration: 1000,
        timing: function (timeFraction) {
          return timeFraction;
        },
        draw: function (progress) {
          let currentFrame = Math.round(coinAnimationFrames - coinAnimationFrames * progress - 1 > 0 ? coinAnimationFrames - coinAnimationFrames * progress - 1 : 0);
          mainBannerCoin.forEach((item, index) => {
            if (index == currentFrame) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        },
      });
    };

    mainBannerVideo.play();
    coinAnimation();
    setTimeout(() => {
      coinAnimationReverse();
    }, 6000);

    mainBannerVideo.addEventListener("ended", () => {
      mainBannerVideo.play();
      coinAnimation();
      setTimeout(() => {
        coinAnimationReverse();
      }, 6000);
    });

    mainBannerVideo.addEventListener("play", () => {
      let peopleCardVideo = document.querySelectorAll(".people__card-photo video");

      if (peopleCardVideo) {
        peopleCardVideo.forEach((video) => {
          // video.play();
        });
      }
    });

    // mainBannerVideo.addEventListener("abort", () => {
    //   alert("abort");
    // });

    // mainBannerVideo.addEventListener("error", () => {
    //   alert("error");
    // });

    // mainBannerVideo.addEventListener("emptied", () => {
    //   alert("emptied");
    // });

    // mainBannerVideo.addEventListener("stalled", () => {
    //   alert("stalled");
    // });
  }
});

let videoWidthlazyLoad = document.querySelector("video.lazy-video");

if (videoWidthlazyLoad) {
  document.addEventListener("DOMContentLoaded", function () {
    var lazyLoadVideos = [].slice.call(document.querySelectorAll("video.lazy-video"));
    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (video) {
          if (video.isIntersecting) {
            video.target.src = video.target.dataset.src;
            for (var source in video.target.children) {
              var videoSource = video.target.children[source];
              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
              }
            }
            video.target.load();
            video.target.play();
            video.target.classList.remove("lazy-video");
            lazyVideoObserver.unobserve(video.target);
          }
        });
      });
      lazyLoadVideos.forEach(function (lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  });
}

// Бегущая строка
let swiperContainer = document.querySelector(".swiper-container");

if (swiperContainer) {
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    slidesPerView: "auto",
    // loopedSlides: 9,
    speed: 2500,
    // freeMode: true,
    autoplay: {
      delay: 0,
    },
  });
}

// Проверка на Safari
var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
      } else if (dataProp) return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome",
    },
    {
      string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb",
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version",
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version",
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab",
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror",
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox",
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino",
    },
    {
      /* For Newer Netscapes (6+) */
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape",
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Internet Explorer",
      versionSearch: "MSIE",
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv",
    },
    {
      /* For Older Netscapes (4-) */
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla",
    },
  ],
  dataOS: [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows",
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac",
    },
    {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod",
    },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux",
    },
  ],
};
BrowserDetect.init();

if (BrowserDetect.OS === "Mac" || BrowserDetect.browser === "Safari") {
  document.body.classList.add("is-safari");
}

// Прокидываем имя юзера
let regFormName = document.querySelector("#reg-form__name");
let regFormSubmit = document.querySelector(".reg-form__submit");
let thanksUserName = document.querySelector(".thanks__user-name");

if (regFormSubmit) {
  regFormSubmit.addEventListener("click", () => {
    localStorage.setItem("fdcUsername", regFormName.value);
  });
}

if (thanksUserName) {
  document.addEventListener("DOMContentLoaded", () => {
    thanksUserName.textContent = `${localStorage.getItem("fdcUsername") ? localStorage.getItem("fdcUsername") : "Аноним"}`;
  });
}

// Timeline popups
let timelineCard = document.querySelectorAll(".timeline__card");
let timelinePopup = document.querySelectorAll(".timeline__popup");
let html = document.querySelector("html");
let scrollWrapper = document.querySelector(".scroll-wrapper");
let distanceToTop;

if (timelinePopup) {
  timelineCard.forEach((card, i) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("timeline__card_current") && !card.classList.contains("timeline__card_final")) {
        html.classList.add("hidden");
        distanceToTop = window.pageYOffset;
        if (finalForm) {
          timelinePopup[i - 1].style.transform = `translateY(${distanceToTop}px)`;
        }
        timelinePopup[i - 1].classList.add("timeline__popup_active");
        let closeBtn = timelinePopup[i - 1].querySelector(".timeline__popup-close");
        closeBtn.addEventListener("click", () => {
          if (finalForm) {
            window.scrollTo({
              top: distanceToTop,
            });
          }
          timelinePopup[i - 1].classList.remove("timeline__popup_active");
          // scrollWrapper.style.transform = `translateY(-${distanceToTop}px)`;
          html.classList.remove("hidden");
        });
      }
    });
  });

  timelinePopup.forEach((popup) => {
    popup.addEventListener("click", () => {
      // scrollWrapper.style.transform = `translateY(-${distanceToTop}px)`;
      if (finalForm) {
        window.scrollTo({
          top: distanceToTop,
        });
      }
      popup.classList.remove("timeline__popup_active");
      html.classList.remove("hidden");
    });
  });
}

// Изобретаем кастомный скролл
let page = document.querySelector(".page");
let scrollContent = document.querySelector(".scroll-content");
let peopleTopLine = document.querySelector(".people__top-line");
let peopleCardsWrapper = document.querySelector(".people__cards-wrapper");
let peopleCards = document.querySelector(".people__cards");

if (page) {
  let bodyHeight = scrollWrapper.clientHeight + peopleCards.clientHeight - peopleCardsWrapper.clientHeight;
  document.body.style.height = `${bodyHeight}px`;

  document.addEventListener("scroll", () => {
    if (!html.classList.contains("hidden")) {
      if (window.pageYOffset < peopleCards.offsetTop - peopleTopLine.clientHeight) {
        scrollWrapper.style.transform = `translateY(-${window.pageYOffset}px)`;
      } else if (window.pageYOffset > peopleCards.offsetTop + peopleCards.clientHeight - peopleCardsWrapper.clientHeight - peopleTopLine.clientHeight) {
        scrollWrapper.style.transform = `translateY(-${window.pageYOffset - peopleCards.clientHeight + peopleCardsWrapper.clientHeight}px)`;
      }
      if (window.pageYOffset > peopleCards.offsetTop - peopleTopLine.clientHeight && window.pageYOffset < peopleCards.offsetTop + peopleCards.clientHeight - peopleCardsWrapper.clientHeight) {
        peopleCards.style.transform = `translateY(-${window.pageYOffset - peopleCards.offsetTop}px)`;
      }
    }
  });
}

// Якорь на кнопку "Зарегистрироваться"
let headerBtnRegistration = document.querySelector(".header__btn-registration");
let finalForm = document.querySelector(".final__form");

if (headerBtnRegistration) {
  headerBtnRegistration.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: finalForm.offsetTop + peopleCards.clientHeight - peopleCardsWrapper.clientHeight - 25,
      behavior: "smooth",
    });
    scrollWrapper.style.transform = `translateY(-${finalForm.offsetTop - 25}px)`;
  });
}

// Скрипты для трансляции
let broadcastTranslationSpeaker = document.querySelector(".broadcast__translation-speaker");
let broadcastTranslationDescription = document.querySelector(".broadcast__translation-description");
let broadcastTimeline = document.querySelector(".broadcast__timeline");
let broadcastTimelineShowOld = document.querySelector(".broadcast__timeline-show-old");

if (broadcastTimeline) {
  let updateBroadcast = () => {
    let dateNow = new Date();
    let hoursNow = Number(dateNow.getHours());
    let minutesNow = Number(dateNow.getMinutes());
    // let hoursNow = 15;
    // let minutesNow = 20;
    let activeCardIndex;

    timelineCard.forEach((card, i) => {
      let timeCard = card.querySelector(".timeline__card-time").textContent;
      let hoursCard = Number(timeCard.slice(0, 2));
      let minutesCard = Number(timeCard.slice(3, 5));
      if (hoursCard < hoursNow && timelineCard[i - 1]) {
        timelineCard[i - 1].classList.add("timeline__card_old");
      } else if (hoursCard === hoursNow) {
        if ((minutesCard < minutesNow || minutesCard === minutesNow) && timelineCard[i - 1]) {
          timelineCard[i - 1].classList.add("timeline__card_old");
        }
      }
    });

    let timelineCardOld = document.querySelectorAll(".timeline__card_old");

    if (timelineCardOld.length) {
      timelineCard.forEach((card, i) => {
        if (!card.classList.contains("timeline__card_old") && !activeCardIndex) activeCardIndex = i;
      });

      let activeCardName = timelineCard[activeCardIndex].querySelector(".timeline__card-name");
      // let activeCardDescription = timelinePopup[activeCardIndex - 1].querySelector(".timeline__popup-description");

      broadcastTranslationSpeaker.textContent = activeCardName.textContent;
      // broadcastTranslationDescription.textContent = activeCardDescription.textContent;

      let cardMarginBottom = Number(window.getComputedStyle(timelineCard[0]).getPropertyValue("margin-bottom").replace(/\D+/g, ""));
      let distanceToScroll = activeCardIndex > 0 ? timelineCard[0].clientHeight * activeCardIndex + cardMarginBottom * activeCardIndex : 0;

      broadcastTimeline.scrollTo({
        top: distanceToScroll,
        behavior: "smooth",
      });
    }
  };

  updateBroadcast();

  setInterval(updateBroadcast, 10000);

  let cardHeight = timelineCard[timelineCard.length - 1].scrollHeight;

  broadcastTimelineShowOld.addEventListener("click", () => {
    let timelineCardOld = document.querySelectorAll(".timeline__card_old");
    broadcastTimelineShowOld.classList.toggle("broadcast__timeline-show-old_active");
    timelineCardOld.forEach((card) => {
      card.classList.toggle("timeline__card_old_active");

      if (card.style.maxHeight) {
        card.style.maxHeight = null;
      } else {
        card.style.maxHeight = `${cardHeight}px`;
      }
    });
  });
}
