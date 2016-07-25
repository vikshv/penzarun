export default class FooterController {
    constructor(CounterService) {
        'ngInject';

        CounterService.getVisitors()
            .then(result => {
                this.visitors = result;
            });
    }
};
