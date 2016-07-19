export default class CalendarDatepickerController {
    constructor($scope) {
        'ngInject';

        this._initDatepickers();

        $scope.$watch('$ctrl.date', date => {
            this.onChange({ date });
        });
    }

    _initDatepickers() {
        this.options = Object.assign({}, {
            customClass: () => 'datepicker--calendar',
            showWeeks: false
        }, this.options);
    }
}
