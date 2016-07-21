export default class EventRegisterPageController {
    constructor($scope, $state, EventService) {
        'ngInject';

        this.$scope = $scope;
        this.$state = $state;

        this._initMember();
        this._initEvent(EventService);
    }

    _initEvent(EventService) {
        this._startProgress();
        EventService.getEvent(this.id)
                .then(event => {
                    this.event = event;
                })
                .then(() => {
                    this._stopProgress();
                })
                .catch(error => {
                    this._stopProgress();
                    throw Error(error);
                });
    }

    _initMember() {
        this.member = {
            fio: '',
            age: ''
        };
    }

    _startProgress() {
        this.progress = true;
    }

    _stopProgress() {
        this.progress = false;
    }

    onClickCancelButton() {
        this.$state.go('events.list');
    }

    isHasError(attrName) {
        const item = this.$scope.member[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    submit() {

    }
};
