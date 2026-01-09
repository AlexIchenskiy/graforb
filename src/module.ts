import { PanelPlugin } from '@grafana/data';
import { OrbOptions } from './types';
import { OrbPanel } from './components/OrbPanel';
import { DEFAULT_FORCE_LAYOUT_OPTIONS } from '@memgraph/orb/dist/simulator/layout/layouts/force';
import { DEFAULT_HIERARCHICAL_LAYOUT_OPTIONS } from '@memgraph/orb/dist/simulator/layout/layouts/hierarchical';
import { DEFAULT_GRID_LAYOUT_OPTIONS } from '@memgraph/orb/dist/simulator/layout/layouts/grid';
import { DEFAULT_CIRCULAR_LAYOUT_OPTIONS } from '@memgraph/orb/dist/simulator/layout/layouts/circular';

export const plugin = new PanelPlugin<OrbOptions>(OrbPanel).setPanelOptions(builder => {
  builder
    .addSelect({
      path: 'layout',
      name: 'Layout type',
      description: 'Graph layout algorithm',
      defaultValue: 'hierarchical',
      settings: {
        options: [
          { value: 'hierarchical', label: 'Hierarchical' },
          { value: 'circular', label: 'Circular' },
          { value: 'force', label: 'Force' },
          { value: 'grid', label: 'Grid' },
          { value: 'map', label: 'Map' },
        ],
      },
    })

    // FORCE layout options
    .addNumberInput({
      path: 'layoutOptions.force.centerX',
      name: 'Center X',
      defaultValue: DEFAULT_FORCE_LAYOUT_OPTIONS.centerX,
      showIf: o => o.layout === 'force',
    })
    .addNumberInput({
      path: 'layoutOptions.force.centerY',
      name: 'Center Y',
      defaultValue: DEFAULT_FORCE_LAYOUT_OPTIONS.centerY,
      showIf: o => o.layout === 'force',
    })
    .addNumberInput({
      path: 'layoutOptions.force.nodeDistance',
      name: 'Node distance',
      defaultValue: DEFAULT_FORCE_LAYOUT_OPTIONS.nodeDistance,
      showIf: o => o.layout === 'force',
    })

    // HIERARCHICAL layout options
    .addNumberInput({
      path: 'layoutOptions.hierarchical.nodeGap',
      name: 'Node gap',
      defaultValue: DEFAULT_HIERARCHICAL_LAYOUT_OPTIONS.nodeGap,
      showIf: o => o.layout === 'hierarchical',
    })
    .addNumberInput({
      path: 'layoutOptions.hierarchical.levelGap',
      name: 'Level gap',
      defaultValue: DEFAULT_HIERARCHICAL_LAYOUT_OPTIONS.levelGap,
      showIf: o => o.layout === 'hierarchical',
    })
    .addNumberInput({
      path: 'layoutOptions.hierarchical.treeGap',
      name: 'Tree gap',
      defaultValue: DEFAULT_HIERARCHICAL_LAYOUT_OPTIONS.treeGap,
      showIf: o => o.layout === 'hierarchical',
    })
    .addSelect({
      path: 'layoutOptions.hierarchical.orientation',
      name: 'Orientation',
      defaultValue: DEFAULT_HIERARCHICAL_LAYOUT_OPTIONS.orientation,
      settings: {
        options: [
          { value: 'horizontal', label: 'Horizontal' },
          { value: 'vertical', label: 'Vertical' },
        ],
      },
      showIf: o => o.layout === 'hierarchical',
    })
    .addBooleanSwitch({
      path: 'layoutOptions.hierarchical.reversed',
      name: 'Reversed',
      defaultValue: DEFAULT_HIERARCHICAL_LAYOUT_OPTIONS.reversed,
      showIf: o => o.layout === 'hierarchical',
    })

    // GRID layout options
    .addNumberInput({
      path: 'layoutOptions.grid.rowGap',
      name: 'Row gap',
      defaultValue: DEFAULT_GRID_LAYOUT_OPTIONS.rowGap,
      showIf: o => o.layout === 'grid',
    })
    .addNumberInput({
      path: 'layoutOptions.grid.colGap',
      name: 'Column gap',
      defaultValue: DEFAULT_GRID_LAYOUT_OPTIONS.colGap,
      showIf: o => o.layout === 'grid',
    })

    // CIRCULAR layout options
    .addNumberInput({
      path: 'layoutOptions.circular.radius',
      name: 'Radius',
      defaultValue: DEFAULT_CIRCULAR_LAYOUT_OPTIONS.radius,
      showIf: o => o.layout === 'circular',
    })
    .addNumberInput({
      path: 'layoutOptions.circular.centerX',
      name: 'Center X',
      defaultValue: DEFAULT_CIRCULAR_LAYOUT_OPTIONS.centerX,
      showIf: o => o.layout === 'circular',
    })
    .addNumberInput({
      path: 'layoutOptions.circular.centerY',
      name: 'Center Y',
      defaultValue: DEFAULT_CIRCULAR_LAYOUT_OPTIONS.centerY,
      showIf: o => o.layout === 'circular',
    })

    // SIMULATOR options
    .addBooleanSwitch({
      path: 'simulatorOptions.isPhysicsEnabled',
      name: 'Is Physics Enabled',
      defaultValue: false,
      showIf: o => o.layout === 'force',
    });
});
