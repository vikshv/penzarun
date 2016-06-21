export default class NavbarController {
    constructor($scope, $state) {
        'ngInject';

        this.$scope = $scope;
        this.$state = $state;

        this.stateNames = [
            'home',
            'news',
            'calendar',
            'events',
            'about',
            'login'
        ];
        
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
        const state = {};
        this.stateNames.forEach(name => {
            state[name] = this.$state.includes(name);
        });
        this.state = state;
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
