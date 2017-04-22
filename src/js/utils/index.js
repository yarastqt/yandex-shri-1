/**
 * @param object (Object)
 * @param key (String) - ключ в объекте
 * @param value (String) - значение которое должно быть униальным
 * @return (Object) - объект в котором ключи это массив с уникальными значениями
 */
export function getUniqueArray(object, key, value) {
    if (value && object[key].indexOf(value) === -1) {
        object[key] = object[key].concat([value]);
    }

    return object;
}

/**
 * Делегирование события
 * @param container (HTMLElement) - контейнер в котором будет делегироваться событие
 * @param selector (String) - css селектор
 * @param eventName (String) - название события
 * @param handler (Function) - обработчик события
 */
export function delegateEvent(container, selector, eventName, handler) {
    container.addEventListener(eventName, (event) => {
        let { target } = event;

        if (selector === null) {
            handler.call(target, { target, keyCode: event.keyCode });
            return;
        }

        while (target !== document.documentElement) {
            if (target.matches(selector)) {
                handler.call(target, { target });
                break;
            }

            target = target.parentNode;
        }
    }, false);
}

/**
 * Нормализует дату начала лекции и конца в более короткий вариант
 * @param startTime (String) - время начала лекции (MM-DD-YYYY HH:mm)
 * @param endTime (String) - время окончания лекции (MM-DD-YYYY HH:mm)
 * @return (String) - время начала и окончания лекции (MM-DD-YYYY HH:mm - HH:mm)
 */
export function normalizeDateTime(startTime, endTime) {
    if (!startTime || !endTime) {
        return '';
    }

    const end = endTime.split(/\s/)[1];
    const normalizedDateTime = `${startTime} - ${end}`;

    return normalizedDateTime;
}

/**
 * Дополняет короткую запись года до полной
 * @param year (String) - год YY
 * @return (String) - полный год YYYY
 */
function padYear(year) {
    if (year.length === 2) {
        return `20${year}`;
    }

    return year;
}

/**
 * Проверка на окончание лекции
 * @param endTime (String) - время окончания лекции (MM-DD-YYYY HH:mm)
 * @return (Boolean) - лекция закончилась
 */
export function isCompleteLecture(endTime) {
    /**
     * Т.к. объект Date не везде работает одинаково,
     * а мы крайне не хотим использовать какой-нибудь moment.js
     * то необходимо передать дату в совместимом формате YYYY, MM, DDDD, HH, mm
     */
    const [month, day, year] = endTime.split(/\s/)[0].split(/-/);
    const [hours, minutes] = endTime.split(/\s/)[1].split(/:/);

    const end = +new Date(padYear(year), month - 1, day, hours, minutes);
    const now = Date.now();

    return now > end;
}

/**
 * Устанавливает на html элемент вспомогательный класс
 * в зависимости от того, поддерживает ли устройство тач касания или нет
 */
export function setDevice() {
    if ('ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        document.documentElement.classList.add('is-touch');
    } else {
        document.documentElement.classList.add('is-desktop');
    }
}
