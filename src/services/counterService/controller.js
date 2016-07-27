export default class CounterService {
    constructor(FirebaseService, $firebaseObject, CounterServiceConstants, AuthService) {
        'ngInject';

        const { databaseName } = CounterServiceConstants;

        this.CounterServiceConstants = CounterServiceConstants;
        this.AuthService = AuthService;

        const firebase = FirebaseService.getFirebase();
        const ref = firebase.database().ref(databaseName);
        this.$obj = $firebaseObject(ref);
    }

    getVisitors() {
        if (!this.visitors) {
            this.visitors = this._initVisitors();
        }
        return this.visitors;
    }

    _initVisitors() {
        const result = {};
        const currentKey = this._getCurrentKey();

        return this.$obj.$loaded()
            .then(visitors => {
                let { total } = visitors;
                let current = visitors[currentKey];

                if (!current) {
                    current = visitors[currentKey] = {};
                }

                let { value } = current;
                
                isFinite(total) || (total = 0);
                result.total = visitors.total = total + 1;

                isFinite(value) || (value = 0);
                result.current = current.value = value + 1;
            })
            .then(() => {
                const auth = this.AuthService.getAuth();
                const { adminEmail } = this.CounterServiceConstants;
                if (!auth || auth.email !== adminEmail) {
                    return this.$obj.$save();
                }
            })
            .then(() => {
                return result;
            });
    }

    _getCurrentKey() {
        const now = new Date();
        return `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
    }
}
