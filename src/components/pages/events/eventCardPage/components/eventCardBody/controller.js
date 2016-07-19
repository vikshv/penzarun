
const Kb = 1024;
const Mb = Kb * Kb;

export default class EventCardBodyController {
    constructor($sce) {
        'ngInject';
        
        this.$sce = $sce;
    }

    getDescriptionHtml() {
        return this.$sce.trustAsHtml(this.event.description);
    }

    getFileSize() {
        let result;
        if (Mb < this.provisionFileSize) {
            const size = this.provisionFileSize / Mb;
            result = `${size.toFixed()} Мб`;
        } else {
            const size = this.provisionFileSize / Kb;
            result = `${size.toFixed()} Кб`;
        }
        return result;
    }
};
