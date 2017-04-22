import { setDevice, delegateEvent } from 'utils';
import { lecturesData } from 'data';
import { getAvailableFilters } from 'selectors/lectures';
import { renderFiltersList, filtersStore, toggleVisibleFilters, applyFilter, resetFilter } from 'modules/filters';
import { showLecturerModal, hideLecturerModal, hideLecturerModalOnEsc } from 'modules/modal';
import { renderScheduleList, applyInitialLayoutView, changeLayoutView } from 'modules/schedules';

function addEventListeners() {
    if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
        /**
         * touchstart событие необходимо для того, чтобы на IOS устройствах
         * в css срабатывало active состояние
         */
        delegateEvent(document, '.page', 'touchstart', () => {});
    }

    delegateEvent(document, '.content__actions-button[data-filter]', 'click', toggleVisibleFilters);
    delegateEvent(document, '.content__actions-button[data-layout]', 'click', changeLayoutView);
    delegateEvent(document, '.select__control', 'change', applyFilter);
    delegateEvent(document, null, 'keyup', hideLecturerModalOnEsc);
    delegateEvent(document, '[data-lecturer]', 'click', showLecturerModal);
    delegateEvent(document, '.modal__overlay', 'click', hideLecturerModal);
    delegateEvent(document, '.select__clear', 'click', resetFilter);
}

function onContentLoaded() {
    const availableFilters = getAvailableFilters(lecturesData);
    const currentFilters = filtersStore.getAll();

    setDevice();
    applyInitialLayoutView();
    renderFiltersList(availableFilters);
    renderScheduleList(lecturesData, currentFilters);
    addEventListeners();
}

document.addEventListener('DOMContentLoaded', onContentLoaded);
