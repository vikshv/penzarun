export default class EventPageController {
    constructor($scope, $state, EventService) {
        'ngInject';

        this.$scope = $scope;
        this.$state = $state;
        this.EventService = EventService;

        this.event = {};
    }

    isHasError(attrName) {
        const item = this.$scope.event[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    submit() {
        const { title, abstract = '', description = '' } = this.event;

        this._startProgress();
        this.EventService.addEvent({
                title,
                abstract,
                description
            })
            .then(id => {
                this._gotoEventState(id);
            })
            .catch(error => {
                this._stopProgress();
                throw Error(error);
            });
    }

    _startProgress() {
        this.progress = true;
    }

    _stopProgress() {
        this.progress = false;
    }

    _gotoEventState(id) {
        this.$state.go('events.edit', { id });
    }
};
