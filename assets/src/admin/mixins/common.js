export default {
    methods: {
        getTimeFromDate( timestamp ) {
            let monthsArr = [
                this.__('Jan', 'vue-js-app'),
                this.__('Feb', 'vue-js-app'),
                this.__('March', 'vue-js-app'),
                this.__('April', 'vue-js-app'),
                this.__('May', 'vue-js-app'),
                this.__('Jun', 'vue-js-app'),
                this.__('July', 'vue-js-app'),
                this.__('Aug', 'vue-js-app'),
                this.__('Sep', 'vue-js-app'),
                this.__('Oct', 'vue-js-app'),
                this.__('Nov', 'vue-js-app'),
                this.__('Dec', 'vue-js-app'),
            ];
            let date      = new Date(timestamp * 1000);
            let year      = date.getFullYear();
            let month     = monthsArr[date.getMonth()];
            let day       = date.getDate();
            let readableTime = month+' '+day+', '+year;

            return readableTime;
        }
    }
};
