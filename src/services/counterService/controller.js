export default class CounterService {
    constructor(FirebaseService, $firebaseObject) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        const ref = firebase.database().ref('visitors');
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

                return this.$obj.$save();
            })
            .then(() => {
                return result;
            });
    }

    _getCurrentKey() {
        const now = new Date();
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return date.getTime();
    }
}
