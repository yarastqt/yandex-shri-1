function createLayoutStore() {
    let kind = 'rows';

    return {
        getView() {
            return kind;
        },

        setView(view) {
            kind = view;
            return this;
        }
    };
}

export default createLayoutStore;
