(function() {
/* ======= Main JS START ======= */

/* ======= Header dropdown START ======= */
// Полифилл для метода forEach для NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

// alert(headerDropdownListFirstChildHtml);

document.querySelectorAll('.header__dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.header__dropdown-button');
	const dropDownList = dropDownWrapper.querySelector('.header__dropdown-list');
	const dropDownListItems = dropDownList.querySelectorAll('.header__dropdown-list-item');
	const dropDownInput = dropDownWrapper.querySelector('.header__dropdown-input-hidden');
    const headerDropdownList = document.querySelector('.header__dropdown-list');
    const headerDropdownListFirstChildHtml = headerDropdownList.firstElementChild.innerHTML;

    dropDownBtn.innerHTML = headerDropdownListFirstChildHtml;

	// Клик по кнопке. Открыть/Закрыть select
	dropDownBtn.addEventListener('click', function (e) {
		dropDownList.classList.toggle('header__dropdown-list--visible');
        this.classList.add('header__dropdown-button--active');
	});

	// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
	dropDownListItems.forEach(function (listItem) {
		listItem.addEventListener('click', function (e) {
			e.stopPropagation();

            let listItemHtml = this.innerHTML;

            dropDownBtn.innerHTML = listItemHtml;

			dropDownBtn.focus();
			dropDownInput.value = this.dataset.value;
			dropDownList.classList.remove('header__dropdown-list--visible');
            dropDownBtn.classList.remove('header__dropdown-button--active');
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

/* ======= Header dropdown END ======= */

/* ======= Main JS END ======= */
})();