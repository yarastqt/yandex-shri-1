/**
 * Получение информации о лекторе по его ФИО
 * @param lecturers (Array) - массив лекторов
 * @param lecturerName (String) - ФИО лектора
 * @return (Object) - объект с информацией о лекторе
 */
export function getLecturersByName(lecturers, lecturerName) {
    return lecturers.filter((lecturer) => lecturer.name === lecturerName)[0];
}
