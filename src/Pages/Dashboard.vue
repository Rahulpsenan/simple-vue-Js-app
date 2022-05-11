<template>
  <v-card flat>
    <common-manage ref="commonManage"></common-manage>
    <v-row v-if="role == 1">
      <Bar
        v-if="loaded"
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
      />
    </v-row>
    <v-row v-else-if="role == 2">
    </v-row>
    <v-row v-else-if="role == 3">
    </v-row>
  </v-card>
</template>

<script>
import WebService from '@/service/WebService'
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "dashbord",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loaded: false,
      role: localStorage.getItem('role'),
      dashData: {},
      chartData: {
        labels: [1,20],
        datasets: [ { data: [30,40] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  mounted () {
    this.getDashData()
  },
  methods : {
    getDashData () {
      this.$refs.commonManage.open(1, true)
      WebService.getCall('historical/close.json?start=2019-01-01&end=2019-12-31').then((response) => {
        var dashData = response.data.bpi
        this.$refs.commonManage.open(1, false)
        var labels = []
        var data = []
        Object.keys(dashData).map(function(key) {
          labels.push(key);
          data.push(dashData[key])
        });
        this.chartData.labels = labels
        this.chartData.datasets[0].data = data
        this.loaded = true
      });
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('loggedIn') === 'true') {
      next()
    } else {
      next('/')
    }
  }
}
</script>