export default {
    scope: {
        file: '='
    },

    link: function(scope, el, attrs) {
        el.bind('change', event => {
            const files = event.target.files;
            scope.file = files[0];
            scope.$apply();
        });
    }
};
