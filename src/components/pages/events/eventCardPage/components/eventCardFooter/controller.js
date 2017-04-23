export default class EventCardFooterController {
    constructor(AuthService) {
        'ngInject';

        this.AuthService = AuthService;
    }

    isAuth() {
        return this.AuthService.getAuth();
    }

    isRegisterEnabled() {
        const now = Date.now();
        return this.isAuth() && now < this.event.date;
    }
}
