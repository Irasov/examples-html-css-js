// Перебираем все элементы с атрибутом data-dialog
document.querySelectorAll('[data-dialog]').forEach((button) => {
  // Обрабатываем взаимодействие (клик)
  button.addEventListener('click', () => {
    // Выбираем соответствующее диалоговое окно
    const dialog = document.querySelector(`#${button.dataset.dialog}`);
    // Открываем его
    dialog.showModal();
    // Закрываем
    dialog.querySelector('.closeDialog').addEventListener('click', () => dialog.close());
  });
});
