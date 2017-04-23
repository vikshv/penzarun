export default class EventsFilterController {
    constructor() {
        'ngInject';

        this._initFilter();
    }

    isActive() {
        const { probeg, marathon, training } = this.filter;
        return probeg || marathon || training;
    }

    onClickTag() {
        this._onChangeFilter();
    }

    resetFilter() {
        this._initFilter();
        this._onChangeFilter();
    }

    _initFilter() {
        this.filter = {
            probeg: false,
            marathon: false,
            training: false
        };
    }

    _onChangeFilter() {
        const filter = this._createFiterArray(this.filter);
        this.handlers.onChangeFilter(filter);
    }

    _createFiterArray(obj) {
        const result = [];
        for (let key in obj) {
            obj[key] && result.push(key);
        }
        return result;
    }
}
