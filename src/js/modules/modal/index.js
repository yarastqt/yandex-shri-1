import { lecturersData } from 'data';
import { getLecturersByName } from 'selectors/lecturers';

const viewport = document.querySelector('.viewport');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const modalPhoto = document.querySelector('.modal__container-photo .image');
const modalTitle = document.querySelector('.modal__container-title');
const modalText = document.querySelector('.modal__container-text');

export function showLecturerModal(event) {
    const { lecturer } = event.target.dataset;
    const { name, photo, biography } = getLecturersByName(lecturersData, lecturer);

    modalPhoto.src = photo;
    modalTitle.innerText = name;
    modalText.innerText = biography;

    modal.classList.add('modal_visible');
    viewport.classList.remove('viewport_overflow');
}

export function hideLecturerModal() {
    modal.classList.remove('modal_visible');
    viewport.classList.add('viewport_overflow');

    modalContainer.addEventListener('transitionend', function modalTransitionEnd() {
        setTimeout(() => {
            /**
             * Проверяем имеется ли модификатор прежде чем очистить поля
             * если не проверить на наличие модификатора, при быстром переключении
             * возможен случай, когда поля будут пустыми при открытии модального окна
             */
            if (!modal.classList.contains('modal_visible')) {
                modalPhoto.src = null;
                modalTitle.innerText = null;
                modalText.innerText = null;
            }
            /**
             * Отписываемся от события, т.к. оно нам нужно лишь при закрытии модального окна
             */
            modalContainer.removeEventListener('transitionend', modalTransitionEnd);
        }, 200);
    });
}

export function hideLecturerModalOnEsc(event) {
    if (event.keyCode === 27) {
        hideLecturerModal();
    }
}
