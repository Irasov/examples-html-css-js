document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const canvasesArr = document.querySelectorAll('.image-sequence');

  canvasesArr.forEach((canvas) => {
    const context = canvas.getContext('2d');
    const frameCount = parseInt(canvas.dataset.sequenceTotalFrames, 10);
    const basePath = canvas.dataset.sequenceBasepath;
    const largeFormat = canvas.dataset.sequenceLargeFormat;
    const mediumFormat = canvas.dataset.sequenceMediumFormat;
    const smallFormat = canvas.dataset.sequenceSmallFormat;

    // Триггер теперь — родительская секция .anim-trigger,
    // а не отдельный класс, заданный через data-атрибут (упрощение под ванильный HTML)
    const triggerEl = canvas.closest('.anim-trigger');

    const getOptimizationSettings = () => {
      if (window.innerWidth >= 1068) {
        if (largeFormat) return ['large', largeFormat];
        if (mediumFormat) return ['medium', mediumFormat];
        if (smallFormat) return ['small', smallFormat];
        return null;
      }
      if (window.innerWidth >= 734 && window.innerWidth < 1068) {
        if (mediumFormat) return ['medium', mediumFormat];
        if (largeFormat) return ['large', largeFormat];
        if (smallFormat) return ['small', smallFormat];
        return null;
      }
      if (smallFormat) return ['small', smallFormat];
      if (mediumFormat) return ['medium', mediumFormat];
      if (largeFormat) return ['large', largeFormat];
      return null;
    };

    const [size, format] = getOptimizationSettings();
    const currentFrame = (index) => `${basePath}${size}/${index + 1}.${format}`;

    const images = [];
    const animation = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    function render() {
      canvas.width = canvas.getBoundingClientRect().width;
      canvas.height = canvas.getBoundingClientRect().height;
      context.clearRect(0, 0, canvas.width, canvas.height);

      const img = images[animation.frame];
      if (!img || !img.complete || img.naturalWidth === 0) return; // кадр ещё не загружен — пропускаем отрисовку

      const imgAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvas.width / canvas.height;
      let drawWidth, drawHeight;

      if (canvasAspectRatio > imgAspectRatio) {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspectRatio;
      } else {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspectRatio;
      }

      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        render();
        ScrollTrigger.refresh();
      }, 550);
    });

    gsap.to(animation, {
      frame: frameCount - 1,
      snap: 'frame',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top top',
        end: 'bottom bottom', // конец анимации = конец секции .anim-trigger
        scrub: 0.5,
        markers: false, // поставьте true для отладки границ триггера
      },
      onUpdate: render,
    });

    images[0].onload = function () {
      render();
    };
    // на случай если нулевой кадр уже был закэширован браузером до навешивания onload
    if (images[0].complete) render();
  });
});
