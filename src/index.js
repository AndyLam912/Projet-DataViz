import * as viz1 from './scripts/viz1/radar-chart-viz.js'
import * as preproc1 from './scripts/viz1/preprocess.js'
import * as legend1 from './scripts/viz1/legend.js'

/* Fonction pour le radar chart (vizualisation 1) */
(function (d3) {
  d3.csv('./viz1.csv', d3.autoType).then(function (data) {
    var general_data = [];

    for (var i = 0; i < data.length; i++) {
      general_data.push(data[i]);
    }

    var baseline = preproc1.createBaseline(general_data);
    var neymar_data = preproc1.getNeymarData(general_data);
    neymar_data, baseline = preproc1.roundStats(neymar_data, baseline);

    const ticks = viz1.genTicks();
    const dataset_Neymar = preproc1.generateData(neymar_data, 6);
    const dataset_Baseline = preproc1.generateData(baseline, 6);

    viz1.generateAndDrawLevels();
    viz1.generateAndDrawLines();
    viz1.drawAxis(ticks);
    viz1.drawData(dataset_Baseline, dataset_Neymar);
    viz1.drawLabels(dataset_Neymar);
    legend1.draw();
  });
})(d3)


