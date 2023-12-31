(function() {
/* ======= Main JS START ======= */
// Globals
const html = document.querySelector('html');
const body = document.querySelector('body');

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

/* ======= Canvi mobile navbar START ======= */
var canviMobileNavbar = new Canvi({
    content: '.canvi-content',
    navbar: '.canvi-navbar',
    openButton: '.canvi-open-button',
	position: 'left',
	pushContent: false,
	width: "100%",
	speed: "0.5s",
	// responsiveWidths: [ {
	// 	breakpoint: "340px",
	// 	width: "90%"
	// }, ],
});

const headerHamburgerButton = document.querySelector('.header__hamburger-button');
headerHamburgerButton.addEventListener('click', function (event) {
	html.classList.add('is-static');
	body.classList.add('is-static');
});

const canviNavbarCloseButton = document.querySelector('.canvi-navbar__close-button');
canviNavbarCloseButton.addEventListener('click', function (event) {
	html.classList.remove('is-static');
	body.classList.remove('is-static');
	canviMobileNavbar.close();
});

const canviNavbarMenuDropdownLinks = document.querySelectorAll('.canvi-navbar__menu-dropdown-link');
canviNavbarMenuDropdownLinks.forEach(function (item) {
	item.addEventListener('click', function (event) {
		if ( this.nextElementSibling ) {
			if ( this.nextElementSibling.tagName.toLowerCase() == 'ul' ) { // Проверка на наличие соседнего тега <ul>

			if (window.getComputedStyle(this.nextElementSibling, null).getPropertyValue("height") === "0px") {
				this.classList.add('canvi-navbar__menu-dropdown-link--is-active');
				this.nextElementSibling.style.height = `${ this.nextElementSibling.scrollHeight }px`
			} else {
				this.classList.remove('canvi-navbar__menu-dropdown-link--is-active');
				this.nextElementSibling.style.height = `${ this.nextElementSibling.scrollHeight }px`;
				window.getComputedStyle(this.nextElementSibling, null).getPropertyValue("height");
				this.nextElementSibling.style.height = "0";
			}

			this.nextElementSibling.addEventListener("transitionend", () => {
				if (this.nextElementSibling.style.height !== "0px") {
					this.nextElementSibling.style.height = "auto"
				}
			});

			}
		}
	});
});
/* ======= Canvi mobile navbar END ======= */
/* ======= Main JS END ======= */
})();