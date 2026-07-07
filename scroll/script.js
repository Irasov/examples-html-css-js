const items = document.querySelectorAll('.item');
const checkItem = () => {
  const triggerBottom = (window.innerHeight / 5) * 4;
  for (const item of items) {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  }
};
checkItem();
window.addEventListener('scroll', checkItem);
