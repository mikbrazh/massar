(function() {
/* ======= Main JS START ======= */
/* ======= Header START ======= */
if ( document.querySelector('.header') ) {

	// Полифилл для метода forEach для NodeList
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	document.querySelectorAll('.header__dropdown').forEach(function (dropDownWrapper) {
		const dropDownBtn = dropDownWrapper.querySelector('.header__dropdown-button');
		const dropDownList = dropDownWrapper.querySelector('.header__dropdown-list');
		const dropDownListItems = dropDownList.querySelectorAll('.header__dropdown-list-item');
		const dropDownInput = dropDownWrapper.querySelector('.header__dropdown-input-hidden');
		const headerDropdownList = document.querySelector('.header__dropdown-list');
		const headerDropdownListFirstChildHtml = headerDropdownList.firstElementChild.innerHTML;
	const headerDropdownListFirstChildData = headerDropdownList.firstElementChild.dataset.value;

	dropDownBtn.innerHTML = headerDropdownListFirstChildHtml;
	dropDownBtn.dataset.value = headerDropdownListFirstChildData;

		// Клик по кнопке. Открыть/Закрыть select
		dropDownBtn.addEventListener('click', function (e) {
			dropDownList.classList.toggle('header__dropdown-list--visible');
			this.classList.add('header__dropdown-button--active');
		});

		// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
		dropDownListItems.forEach(function (listItem) {

		// Отключаем пункт если он выбран
		(listItem.dataset.value == dropDownBtn.dataset.value) ?
		listItem.classList.add('header__dropdown-list-item--disabled') :
			null;

		listItem.addEventListener('click', function (e) {
				e.stopPropagation();
				let thisInnerHtml = this.innerHTML;
				dropDownBtn.innerHTML = thisInnerHtml;

		let thisData = this.dataset.value;
		dropDownBtn.dataset.value = thisData;

				dropDownBtn.focus();
				dropDownInput.value = this.dataset.value;
				dropDownList.classList.remove('header__dropdown-list--visible');
		dropDownBtn.classList.remove('header__dropdown-button--active');

		// Отключаем пункт если он выбран при клике
		dropDownListItems.forEach(function (dropDownListItem) {
			(dropDownListItem.dataset.value == dropDownBtn.dataset.value) ?
				dropDownListItem.classList.add('header__dropdown-list-item--disabled') :
				dropDownListItem.classList.remove('header__dropdown-list-item--disabled');
		});
			});
		});

		// Клик снаружи дропдауна. Закрыть дропдаун
		document.addEventListener('click', function (e) {
			if (e.target !== dropDownBtn) {
				dropDownBtn.classList.remove('header__dropdown-button--active');
				dropDownList.classList.remove('header__dropdown-list--visible');
			}
		});

		// Нажатие на Tab или Escape. Закрыть дропдаун
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Tab' || e.key === 'Escape') {
				dropDownBtn.classList.remove('header__dropdown-button--active');
				dropDownList.classList.remove('header__dropdown-list--visible');
			}
		});
	});

}
/* ======= Header END ======= */

/* ======= modal START ======= */
if ( document.querySelector('.modal') ) {

	const html = document.querySelector('html');
	const body = document.querySelector('body');

	const modals = document.querySelectorAll('[data-modal]');

	modals.forEach(function (trigger) {
	  trigger.addEventListener('click', function (event) {
		event.preventDefault();
		const modal = document.getElementById(trigger.dataset.modal);

		// Убираем скролл с документа
		body.classList.add('is-static');
		html.classList.add('is-static');

		modal.classList.add('modal--open');
		const exits = modal.querySelectorAll('.modal-exit');
		exits.forEach(function (exit) {
		  exit.addEventListener('click', function (event) {
			event.preventDefault();

			// Возвращаем скролл
			body.classList.remove('is-static');
			html.classList.remove('is-static');

			modal.classList.remove('modal--open');
		  });
		});
	  });
	});

}
/* ======= modal END ======= */

/* ======= preloader START ======= */
let hidePreloader = function() {
	setTimeout(function() {
	  let preloader = document.getElementById('preloader');
	
	  if (!preloader.classList.contains('preloader--hidden')) {
		  preloader.classList.add('preloader--hidden');
	  }
	}, 300)
  };
  
  document.addEventListener('DOMContentLoaded', hidePreloader());
/* ======= preloader END ======= */
/* ======= Main JS END ======= */
})();