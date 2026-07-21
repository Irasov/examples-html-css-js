const vid = document.getElementById('vid');
const progress = document.getElementById('progress');
const loader = document.getElementById('loader');
const hint = document.getElementById('hint');
const captions = document.querySelectorAll('.caption');

function whenReady() {
  return new Promise((resolve) => {
    const ready = () => {
      const duration = vid.duration ? vid.duration : 8;
      resolve(duration);
    };
    if (vid.readyState >= 1) {
      ready();
    } else {
      vid.addEventListener('loadedmetadata', ready, { once: true });
    }
  });
}

whenReady().then((duration) => {
  loader.classList.add('gone');
  gsap.registerPlugin(ScrollTrigger);
  const proxy = {
    time: 0,
  };

  let lastSeeck = -1;

  const setFrame = () => {
    const t = proxy.time;
    if (Math.abs(t - lastSeeck) > 0.03) {
      vid.currentTime = t;
      lastSeeck = t;
    }
  };

  const tl = gsap.timeline({
    defaults: {
      ease: 'none',
    },
    scrollTrigger: {
      trigger: '#track',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,

      onUpdate: (self) => {
        const p = self.progress;
        progress.style.width = p * 100 + '%';
        hint.classList.toggle('gone', p > 0.02);
      },
    },
  });
  tl.to(proxy, {
    time: duration,
    duration: duration,
    onUpdate: setFrame,
  });

  captions.forEach((caption) => {
    const start = parseFloat(caption.dataset.start);
    const end = parseFloat(caption.dataset.end);
    const fade = Math.min(0.6, (end - start) / 3);
    tl.fromTo(
      caption,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: fade,
      },
      start,
    ).to(
      caption,
      {
        opacity: 0,
        y: -20,
        duration: fade,
      },
      end - fade,
    );
  });
  setFrame();
  ScrollTrigger.refresh();
});
