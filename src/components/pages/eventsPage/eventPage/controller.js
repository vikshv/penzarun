export default class EventPageController {
    constructor($scope) {
        'ngInject';

        this.$scope = $scope;
    }

    isHasError(attrName) {
        const item = this.$scope.event[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    submit() {
        this.progress = true;
    }
};
