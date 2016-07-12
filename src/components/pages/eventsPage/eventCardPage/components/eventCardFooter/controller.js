export default class EventCardFooterController {
    constructor(AuthService) {
        'ngInject';

        this.AuthService = AuthService;
    }

    isAuth() {
        return this.AuthService.getAuth();
    }
};
