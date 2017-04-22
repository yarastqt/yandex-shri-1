import { filterLectures } from 'selectors/lectures';
import { scheduleTemplate, contentMessageTemplate } from './template';

const scheduleListContainer = document.querySelector('.schedule__list');

function renderScheduleList(lectures, filters = {}) {
    let result = null;
    const { length: filtersKeysLength } = Object.keys(filters);
    const filteredLectures = filterLectures(lectures, filters);
    const scheduleList = filteredLectures.reduce((acc, lecture) => {
        const template = scheduleTemplate(lecture);

        return acc + template;
    }, '');

    if (scheduleList.length) {
        result = scheduleList;
    } else if (filtersKeysLength) {
        result = contentMessageTemplate({ text: 'По вашим фильтрам нет результатов' });
    } else {
        result = contentMessageTemplate({ text: 'Список пуст' });
    }

    scheduleListContainer.innerHTML = result;
}

export default renderScheduleList;
