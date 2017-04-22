import { normalizeDateTime, isCompleteLecture } from 'utils';

/* eslint-disable max-len */

export function contentMessageTemplate({ text }) {
    return `
        <div class="schedule__message">
            <div class="schedule__message-icon"></div>
            <div class="schedule__message-text">${text}</div>
        </div>
    `;
}

export function scheduleTemplate({ source, name, location, lecturers, schools, startTime, endTime }) {
    return `
        <div class="schedule__item">
            ${isCompleteLecture(endTime) ? `
                <div class="schedule__item-name">
                    <a class="schedule__item-link" href="${source}" target="_blank">${name}</a>
                </div>
            ` : `
                <div class="schedule__item-name">${name}</div>
            `}
            <div class="schedule__item-meta">
                ${schools.map((shool) => `
                    <div class="schedule__item-prop">
                        <i class="icon icon_school"></i>
                        <span class="schedule__item-prop-text">${shool}</span>
                    </div>
                `).join('')}
                ${lecturers.map((lecturer) => `
                    <div class="schedule__item-prop">
                        <i class="icon icon_person"></i>
                        <span class="schedule__item-prop-text schedule__item-prop-text_highlight" data-lecturer="${lecturer}">${lecturer}</span>
                    </div>
                `).join('')}
                <div class="schedule__item-prop">
                    <i class="icon icon_location"></i>
                    <span class="schedule__item-prop-text">${location}
                    </span>
                </div>
                <div class="schedule__item-prop">
                    <i class="icon icon_date"></i>
                    <span class="schedule__item-prop-text">${normalizeDateTime(startTime, endTime)}</span>
                </div>
                ${isCompleteLecture(endTime) ? `
                    <div class="schedule__item-prop schedule__item-prop_last">
                        <i class="icon icon_done"></i>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}
