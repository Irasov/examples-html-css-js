const initApp = () => {
  const options = document.querySelector('.options');
  const optionArr = document.querySelectorAll('.option');

  options.style.setProperty('--total-options', optionArr.length);

  options.addEventListener('click', (e) => {
    const cLickOption = e.target.closest('.option');
    if (!cLickOption || cLickOption.classList.contains('active')) return;
    optionArr.forEach((option) => {
      option.classList.remove('active');
    });
    cLickOption.classList.add('active');
  });
};

document.addEventListener('DOMContentLoaded', initApp);
