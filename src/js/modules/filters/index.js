import { lecturesData } from 'data';
import { renderScheduleList } from 'modules/schedules';
import renderFiltersList from './render';
import createFiltersStore from './store';

const toggleFiltersButton = document.querySelector('.content__actions-button[data-filter]');
const toggleFiltersButtonText = toggleFiltersButton.querySelector('.button__text');
const filtersContainer = document.querySelector('.filters');

export {
    renderFiltersList
};

export const filtersStore = createFiltersStore();

export function toggleVisibleFilters() {
    if (filtersStore.isVisible()) {
        toggleFiltersButton.classList.remove('button_primary');
        toggleFiltersButton.classList.add('button_secondary');
        toggleFiltersButtonText.innerText = 'Показать фильтры';
        filtersContainer.classList.remove('filters_visible');
        filtersStore.setVisible();
    } else {
        toggleFiltersButton.classList.remove('button_secondary');
        toggleFiltersButton.classList.add('button_primary');
        toggleFiltersButtonText.innerText = 'Скрыть фильтры';
        filtersContainer.classList.add('filters_visible');
        filtersStore.setInvisible();
    }
}

export function applyFilter(event) {
    const selectControl = event.target;
    const nextFilters = filtersStore
        .set(selectControl.name, selectControl.value)
        .getAll();

    selectControl.classList.add('select__control_active');

    renderScheduleList(lecturesData, nextFilters);
}

export function resetFilter(event) {
    const selectControl = event.target.previousElementSibling;
    const nextFilters = filtersStore
        .reset(selectControl.name)
        .getAll();

    selectControl.classList.remove('select__control_active');
    selectControl[0].selected = true;
    /**
     * Убираем фокус с селекта после сброса фильтра
     * setTimeout - используем для отложенного вызова
     */
    setTimeout(() => selectControl.blur(), 0);

    renderScheduleList(lecturesData, nextFilters);
}
