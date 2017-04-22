function createFiltersStore() {
    let list = {};
    let visible = false;

    return {
        getAll() {
            return list;
        },

        set(key, value) {
            list = { ...list, [key]: value };
            return this;
        },

        reset(key) {
            list = { ...list, [key]: null };
            return this;
        },

        isVisible() {
            return visible;
        },

        setVisible() {
            visible = false;
            return this;
        },

        setInvisible() {
            visible = true;
            return this;
        }
    };
}

export default createFiltersStore;
