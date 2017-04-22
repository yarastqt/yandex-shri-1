export function optionTemplate({ value, label }) {
    return `
        <option value="${value}">${label || value}</option>
    `;
}

export function filterTemplate({ label, placeholder, name, options }) {
    return `
        <div class="filters__item">
            <div class="select">
                <label class="label">
                    <select name="${name}" class="select__control">
                        <option value selected disabled>${placeholder}</option>
                        ${options}
                    </select>
                    <span class="select__clear"></span>
                    <span class="label__text">${label}</span>
                </label>
            </div>
        </div>
    `;
}
