export default class NavbarController {
    constructor($scope, $state) {
        'ngInject';

        this.$scope = $scope;
        this.$state = $state;
        
        this._initState();
        this._initAuth();
        this._bindEvents();
    }

    logout() {
        //this.AuthService.logout();
    }

    _initAuth() {
        //this.auth = this.AuthService.getAuth();
    }

    _initState() {
        this.state = {
            home: this._getState('home'),
            diary: this._getState('diary'),
            food: this._getState('food'),
            about: this._getState('about'),
            login: this._getState('login'),
            register: this._getState('register')
        };
    }

    _getState(name) {
        return this.$state.includes(name);
    }

    _bindEvents() {
        this.$scope.$on('$stateChangeSuccess', () => {
            this._initState();
        });

        this.$scope.$on('$stateChangeError', () => {
            debugger;
        });

        // this.AuthService.onAuth(() => {
        //     this._initAuth();
        // });
    }
}
