export default class CalendarPageController {
    constructor($scope, EventService, Constants) {
        'ngInject';
        
        this.Constants = Constants;
        this.EventService = EventService;

        this.filter || (this.filter = 'events');

        this._initDatepickers();
        this._loadEvents();
    }

    _getMinDate() {
        return new Date(2015, 0, 1);
    }

    _getMaxDate() {
        const now = new Date();
        return new Date(now.getFullYear(), 11, 31);
    }

    _initDatepickers() {
        const maxDate = this._getMaxDate();

        this.datepickerOptions = { 
            customClass: () => 'datepicker--calendar',
            minDate: this._getMinDate(),
            maxDate,
            showWeeks: false
        };

        this.dtBegin = new Date();
        this.dtEnd = maxDate;
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
                this.events = result;
            });
    }

    _getLoadEventsOptions() {
        const { filterTagMap } = this.Constants;
        const tagName = filterTagMap[this.filter];
        return tagName ? {
            key: 'tag',
            value: tagName
        } : null;
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
};
