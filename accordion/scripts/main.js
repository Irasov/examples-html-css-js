const initOptions = () => {
  const optionsContainer = document.querySelector('.options');
  const options = document.querySelectorAll('.option');
  optionsContainer.style.setProperty('--total-options', options.length);
};

document.addEventListener('DOMContentLoaded', initOptions);
