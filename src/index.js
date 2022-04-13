import * as viz1 from './scripts/viz1/radar-chart-viz.js'
import * as preproc1 from './scripts/viz1/preprocess.js'
import * as legend1 from './scripts/viz1/legend.js'

import * as viz2 from './scripts/viz2/multi-set-bar-chart-viz.js'
import * as preproc2 from './scripts/viz2/preprocess.js'
import * as legend2 from './scripts/viz2/legend.js'

import * as viz4 from './scripts/viz4/viz4.js'
import * as preproc4 from './scripts/viz4/preprocess.js'

Promise.all([
    d3.csv("./viz1.csv", d3.autoType),
    d3.csv("./viz2.csv", d3.autoType),
    d3.csv("./viz4.csv", d3.autoType)
]).then(function(data) {
  // data[0] will contain data from viz1.csv
  // data[1] will contain data from viz2.csv

                            /* For the radar chart (vizualisation 1) */
    var general_data = [];

    for (var i = 0; i < data[0].length; i++) {
      general_data.push(data[0][i]);
    }

    var baseline = preproc1.createBaseline(general_data);
    var neymar_data = preproc1.getNeymarData(general_data);
    neymar_data, baseline = preproc1.roundStats(neymar_data, baseline);

    const ticks = viz1.genTicks();
    const dataset_Neymar = preproc1.generateData(neymar_data, 6);
    const dataset_Baseline = preproc1.generateData(baseline, 6);

    viz1.DrawTitle();
    viz1.generateAndDrawLevels();
    viz1.generateAndDrawLines();
    viz1.drawAxis(ticks);
    viz1.drawData(dataset_Baseline, dataset_Neymar);
    viz1.drawLabels(dataset_Neymar);
    legend1.draw();
    /* -------------------------------------------------------------------------------------------------*/

                            /* For the multi set bar chart (vizualisation 2) */
    const viz2_groups = preproc2.getGroups(data[1]);
    const viz2_subgroups = preproc2.getSubGroups(data[1]);
    viz2.DrawTitle();
    viz2.addBars(data[1], viz2_groups, viz2_subgroups);
    legend2.draw();

    /* -------------------------------------------------------------------------------------------------*/

                            /* For the multi set bar chart (vizualisation 2) */
    const GCA_NEYMAR = preproc4.getPlayerEffectiveGCAPassData("Neymar", data[2]);
    const GCA_MESSI = preproc4.getPlayerEffectiveGCAPassData("Messi", data[2]);
    const GCA_RONALDO = preproc4.getPlayerEffectiveGCAPassData("Ronaldo", data[2]);
    const SCA_NEYMAR = preproc4.getPlayerEffectiveSCAPassData("Neymar", data[2]);
    const SCA_MESSI = preproc4.getPlayerEffectiveSCAPassData("Messi", data[2]);
    const SCA_RONALDO = preproc4.getPlayerEffectiveSCAPassData("Ronaldo", data[2]);
    const CMP_NEYMAR = preproc4.getPlayerCompletedPassData("Neymar", data[2]);
    const CMP_MESSI = preproc4.getPlayerCompletedPassData("Messi", data[2]);
    const CMP_RONALDO = preproc4.getPlayerCompletedPassData("Ronaldo", data[2]);

    console.log(CMP_NEYMAR)
    // SCA/GCA GCA/CMP CMP/ATP
    viz4.initialLoad([SCA_NEYMAR, SCA_MESSI, SCA_RONALDO]);

    function test() {
      viz4.initialLoad([CMP_NEYMAR, CMP_MESSI, CMP_RONALDO]);
    }
    setTimeout(test, 4000);
    
    /* -------------------------------------------------------------------------------------------------*/

}).catch(function(err) {
    console.log(err);
})