import * as viz1 from './scripts/viz1/radar-chart-viz.js'
import * as preproc1 from './scripts/viz1/preprocess.js'
import * as legend1 from './scripts/viz1/legend.js'

import * as viz2 from './scripts/viz2/multi-set-bar-chart-viz.js'
import * as preproc2 from './scripts/viz2/preprocess.js'
import * as legend2 from './scripts/viz2/legend.js'

import * as viz3 from './scripts/viz3/connected-dot-plot-viz.js'

import * as viz4 from './scripts/viz4/viz4.js'
import * as preproc4 from './scripts/viz4/preprocess.js'
import * as viz4tooltip from './scripts/viz4/tooltip.js'
import * as legend4 from './scripts/viz4/legend.js'

import * as viz5 from './scripts/viz5/multi-set-bar-chart-viz.js'
import * as preproc5 from './scripts/viz5/preprocess.js'
import * as legend5 from './scripts/viz5/legend.js'

import * as viz6 from './scripts/viz6/stacked-bar-chart-viz.js'
import * as preproc6 from './scripts/viz6/preprocess.js'
import * as legend6 from './scripts/viz6/legend.js'


Promise.all([
    d3.csv("./viz1.csv", d3.autoType),
    d3.csv("./viz2.csv", d3.autoType),
    d3.csv('./viz3.csv', d3.autoType),
    d3.csv('./viz4.csv', d3.autoType),
    d3.csv("./viz5.csv", d3.autoType),
    d3.csv('./viz6.csv', d3.autoType)
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
                            /* For the multi set bar chart (vizualisation 3) */

    viz3.createConnectedDotPlot(data[2])

    /* -------------------------------------------------------------------------------------------------*/
                            /* For the pie chart (vizualisation 4) */
    const GCA_NEYMAR = preproc4.getPlayerEffectiveGCAPassData("Neymar", data[3]);
    const GCA_MESSI = preproc4.getPlayerEffectiveGCAPassData("Messi", data[3]);
    const GCA_RONALDO = preproc4.getPlayerEffectiveGCAPassData("Ronaldo", data[3]);
    const SCA_NEYMAR = preproc4.getPlayerEffectiveSCAPassData("Neymar", data[3]);
    const SCA_MESSI = preproc4.getPlayerEffectiveSCAPassData("Messi", data[3]);
    const SCA_RONALDO = preproc4.getPlayerEffectiveSCAPassData("Ronaldo", data[3]);
    const CMP_NEYMAR = preproc4.getPlayerCompletedPassData("Neymar", data[3]);
    const CMP_MESSI = preproc4.getPlayerCompletedPassData("Messi", data[3]);
    const CMP_RONALDO = preproc4.getPlayerCompletedPassData("Ronaldo", data[3]);
    // SCA/GCA GCA/CMP CMP/ATP
    viz4.drawTitle();
    viz4.initialLoad([CMP_NEYMAR, CMP_MESSI, CMP_RONALDO]);
    viz4.loadRadioButton([
      [CMP_NEYMAR, CMP_MESSI, CMP_RONALDO],
      [SCA_NEYMAR, SCA_MESSI, SCA_RONALDO],
      [GCA_NEYMAR, GCA_MESSI, GCA_RONALDO]
    ]);
    viz4tooltip.showToolTip();
    legend4.draw();

    /* -------------------------------------------------------------------------------------------------*/
                                /* For the multi set bar chart (vizualisation 5) */
    var viz5_data = preproc5.FilterOutUnwantedData(data[4]);
    viz5_data = preproc5.CalculateBallControlStat(viz5_data);
    viz5_data = preproc5.ChangetoDecimal(viz5_data);
    const viz5_groups = preproc5.getGroups(viz5_data);
    const viz5_subgroup = preproc5.getSubGroups(viz5_data);
    viz5.DrawTitle();
    viz5.addBars(viz5_data, viz5_groups, viz5_subgroup);
    legend5.draw();

    /* -------------------------------------------------------------------------------------------------*/
    /* For the Stacked Bar Chart (vizualisation 6) */
    var filtered_data = preproc6.filterData(data[5]);
    var updated_data = preproc6.updateData(filtered_data);
    const viz6_groups = preproc6.getGroups(updated_data);
    const viz6_subgroups = preproc6.getSubGroups(updated_data);

    viz6.addBars(updated_data, viz6_groups, viz6_subgroups);
    legend6.draw();
    /* -------------------------------------------------------------------------------------------------*/
}).catch(function(err) {
    console.log(err);
})