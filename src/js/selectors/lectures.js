import { getUniqueArray } from 'utils';

/**
 * Получение списка возможных фильтров на основании лекций
 * @param lectures (Array) - список лекций
 * @return (Object) - объект с доступными фильтрами
 */
export function getAvailableFilters(lectures) {
    const initialState = { lecturers: [], schools: [], startTime: [] };
    const initialStateKeys = Object.keys(initialState);
    const filtersList = lectures.reduce((acc, lecture) => {
        let result = acc;

        initialStateKeys.forEach((filterKey) => {
            let filterValue = lecture[filterKey];

            if (Array.isArray(filterValue)) {
                filterValue.forEach((value) => {
                    result = getUniqueArray(acc, filterKey, value);
                });
            } else {
                if (filterKey === 'startTime') {
                    filterValue = filterValue.split(/\s/)[0];
                }

                result = getUniqueArray(acc, filterKey, filterValue);
            }
        });

        return result;
    }, initialState);

    return filtersList;
}

/**
 * Получение отфильтрованного списка лекций
 * @param lectures (Array) - список лекций
 * @param filters (Object) - список фильтров
 * @return (Array) - отфильтрованный список лекций
 */
export function filterLectures(lectures, filters) {
    const filtersKeys = Object.keys(filters);
    const filteredLectures = lectures.filter((lecture) => filtersKeys.every((key) => {
        const lectureValue = lecture[key];
        const filterValue = filters[key];

        if (!filterValue) {
            return true;
        }

        return lectureValue.indexOf(filterValue) >= 0;
    }));

    return filteredLectures;
}
