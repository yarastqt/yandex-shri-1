import { filterTemplate, optionTemplate } from './template';

const filtersListContainer = document.querySelector('.filters__list');
const filtersOptions = {
    lecturers: {
        placeholder: 'Выберите лектора',
        label: 'Лектор',
        name: 'lecturers',
        options: []
    },
    schools: {
        placeholder: 'Выберите школу',
        label: 'Школа',
        name: 'schools',
        options: []
    },
    startTime: {
        placeholder: 'Выберите дату',
        label: 'Дата',
        name: 'startTime',
        options: []
    }
};

function renderFiltersList(filters) {
    const filtersList = Object.keys(filters).reduce((filtersAcc, filterKey) => {
        const options = filters[filterKey].reduce((optionsAcc, value) => {
            const option = optionTemplate({ value });

            return optionsAcc + option;
        }, '');
        const advancedFilterOptions = { ...filtersOptions[filterKey], options };
        const template = filterTemplate(advancedFilterOptions);

        return filtersAcc + template;
    }, '');

    filtersListContainer.innerHTML = filtersList;
}

export default renderFiltersList;
