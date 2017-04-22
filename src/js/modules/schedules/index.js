import renderScheduleList from './render';
import createLayoutStore from './store';

const rowsButton = document.querySelector('.content__actions-button[data-layout="rows"]');
const gridButton = document.querySelector('.content__actions-button[data-layout="grid"]');
const scheduleListContainer = document.querySelector('.schedule__list');

export {
    renderScheduleList
};

export const layoutStore = createLayoutStore();

function applyLayoutView(view) {
    if (view === 'grid') {
        scheduleListContainer.classList.remove('schedule__list_rows');
        scheduleListContainer.classList.add('schedule__list_grid');
        gridButton.classList.remove('button_secondary');
        gridButton.classList.add('button_primary');
        rowsButton.classList.add('button_secondary');
        rowsButton.classList.remove('button_primary');
    } else if (view === 'rows') {
        scheduleListContainer.classList.remove('schedule__list_grid');
        scheduleListContainer.classList.add('schedule__list_rows');
        rowsButton.classList.remove('button_secondary');
        rowsButton.classList.add('button_primary');
        gridButton.classList.add('button_secondary');
        gridButton.classList.remove('button_primary');
    }
}

export function applyInitialLayoutView() {
    const view = layoutStore.getView();

    applyLayoutView(view);
}

export function changeLayoutView(event) {
    const view = layoutStore
        .setView(event.target.dataset.layout)
        .getView();

    applyLayoutView(view);
}
