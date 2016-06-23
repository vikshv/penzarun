export default class CalendarPageController {
    constructor() {
        this.filter || (this.filter = 'events');
    }

    filterIs(val) {
        return val === this.filter;
    }
};
