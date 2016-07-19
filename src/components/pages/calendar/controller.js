export default class CalendarPageController {
    constructor($scope, $state, EventService, Constants) {
        'ngInject';
        
        this.$state = $state;
        this.Constants = Constants;
        this.EventService = EventService;

        this.filter || (this.filter = 'events');
        this.dateBegin || (this.dateBegin = this._getDefaultDateBegin());
        this.dateEnd || (this.dateEnd = this._getDefaultDateEnd());

        this._initDatepickers();
        this._loadEvents();
    }

    _getDefaultDateBegin() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    _getDefaultDateEnd() {
        return this._getMaxDate();
    }

    _getMaxDate() {
        const now = new Date();
        return new Date(now.getFullYear(), 11, 31);
    }

    _getFormatDate(date) {
        const dt = new Date(date);
        return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    }

    _initDatepickers() {
        this.datepickerOptions = {
            minDate: new Date(2015, 0, 1),
            maxDate: this._getMaxDate()
        };
    }

    filterIs(val) {
        return val === this.filter;
    }

    getEvents() {
        return this.events;
    }

    _loadEvents() {
        const options = this._getLoadEventsOptions();
        this._startLoadProgress();
        this.EventService.loadEvents(options)
            .then(result => {
                this._stopLoadProgress();
                this.events = this._filterEvents(result);
            });
    }

    _filterEvents(events) {
        const { filterTagMap } = this.Constants;
        const tagName = filterTagMap[this.filter];
        let result;

        if (tagName) {
            result = events.filter(event => {
                return event.tag === tagName;
            });
        } else {
            result = events;
        }

        return result;
    }

    _getLoadEventsOptions() {
        const { dateBegin, dateEnd } = this;
        return {
            dateBegin: Date.parse(dateBegin),
            dateEnd: Date.parse(dateEnd)
        };
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }

    onChangeDateBegin(value) {
        this.dateBegin = value;
        this.$state.go('calendar', this.getSrefOptions());
    }

    onChangeDateEnd(value) {
        this.dateEnd = value;
        this.$state.go('calendar', this.getSrefOptions());
    }

    getSrefOptions(filter = this.filter) {
        const { dateBegin, dateEnd } = this;
        return {
            filter,
            dateBegin: this._getFormatDate(dateBegin),
            dateEnd: this._getFormatDate(dateEnd)
        };
    }
};
