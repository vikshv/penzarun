export default class CalendarPageController {
    constructor($scope, $state, EventService, CalendarPageConstants) {
        'ngInject';
        
        this.$state = $state;
        this.CalendarPageConstants = CalendarPageConstants;
        this.EventService = EventService;

        this.filter || (this.filter = 'events');

        this._initDatepickers();
        this._loadEvents();

        $scope.$watch('$ctrl.dateBegin', date => {
            this.endDatepickerOptions = {
                minDate: date,
                maxDate: this._getMaxDate()
            };
        });
    }

    _getDefaultDateBegin() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    _getMaxDate() {
        const now = new Date();
        return new Date(now.getFullYear(), 11, 31);
    }

    _initDatepickers() {
        const maxDate = this._getMaxDate();

        this.beginDatepickerOptions = {
            minDate: new Date(2015, 0, 1),
            maxDate
        };

        this.dateBegin = this._getDefaultDateBegin();
        this.dateEnd = maxDate;

        this.endDatepickerOptions = {
            minDate: this.dateBegin,
            maxDate
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
        const { filterTagMap } = this.CalendarPageConstants;
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
        this._loadEvents();
    }

    onChangeDateEnd(value) {
        this.dateEnd = value;
        this._loadEvents();
    }
}
