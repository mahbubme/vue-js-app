<template>
    <div class="tabcontent" v-if="loaded">
        <div class="vue-js-app-graph">
            <line-chart
                :chartdata="chartdata"
                :options="options"
            />
        </div>
        <div class="refresh-graph">
            <button @click.prevent="refreshData" class="vue-js-app-button">{{ __('Refresh', 'vue-js-app') }}</button>
        </div>
    </div>

    <div v-else class="vue-js-app-loading">{{ __('Loading...', 'vue-js-app') }}</div>
</template>

<script>
import LineChart from '../mixins/LineChart.js'

export default {
    name: 'Graph',

    components: { LineChart },

    data () {
        return {
            loaded: false,
            refresh: false,
            chartdata: {},
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },

    async mounted () {
        this.fetchGraphData();
    },

    methods: {
        fetchGraphData() {
            self = this;
            self.loaded = false;

            wp.ajax.send( 'vue_js_app_get_data', {
                data: {
                    _wpnonce: vueJSApp.nonce,
                    refresh: this.refresh
                },
                success: function(response) {
                    self.prepareGraphData( response.graph );
                    self.loaded = true;
                },
                error: function(error) {
                    console.log(error);
                }
            });
        },

        prepareGraphData( graphData ) {
            let items           = Object.keys(graphData);
            let labels          = [];
            let datasets        = [];
            let chartDataSets   = {
                label: this.__('Value', 'vue-js-app'),
                backgroundColor: '#f87979',
                data: [],
            };

            items.map(key => {
                let item = graphData[key];

                labels.push(this.getTimeFromDate(item.date));
                chartDataSets.data.push(item.value);
            });

            datasets.push(chartDataSets);

            this.chartdata.labels   = labels;
            this.chartdata.datasets = datasets;
        },

        refreshData() {
            this.refresh = true;
            this.fetchGraphData();
        }
    }

}
</script>

<style lang="less">
  .vue-js-app-graph {
    max-width: 700px;
    margin:  20px auto;
  }
</style>