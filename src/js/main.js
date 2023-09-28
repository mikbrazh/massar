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

/* ======= footer START ======= */
// if ( document.querySelector('.footer') ) {

// 	Добавление отрицательного margin. ПРИ ПОСАДКИ ПЕРЕДЕЛАТЬ НА БЭКЕНД	
// 	const footerNavMenuItemFarmLogistics = document.querySelector('.footer__nav-menu-item--farm-logistics');
// 	const footerNavMenuItemBlog = document.querySelector('.footer__nav-menu-item--blog');
// 	const footerNavMenuItemProjects = document.querySelector('.footer__nav-menu-item--projects');
	
// 	if (window.innerWidth >= 960) {
// 		footerNavMenuItemFarmLogistics.classList.add('footer__nav-menu-item--negative-margin');
// 		footerNavMenuItemBlog.classList.add('footer__nav-menu-item--negative-margin');
// 		footerNavMenuItemProjects.classList.remove('footer__nav-menu-item--negative-margin');
// 	} else if (window.innerWidth < 960) {
// 		footerNavMenuItemFarmLogistics.classList.remove('footer__nav-menu-item--negative-margin');
// 		footerNavMenuItemBlog.classList.remove('footer__nav-menu-item--negative-margin');
// 		footerNavMenuItemProjects.classList.add('footer__nav-menu-item--negative-margin');
// 	}
	
// }
/* ======= footer END ======= */

/* ======= Main JS END ======= */
})();