import { ICircularLayoutOptions } from "@memgraph/orb/dist/simulator/layout/layouts/circular";
import { IForceLayoutOptions } from "@memgraph/orb/dist/simulator/layout/layouts/force";
import { IGridLayoutOptions } from "@memgraph/orb/dist/simulator/layout/layouts/grid";
import { IHierarchicalLayoutOptions } from "@memgraph/orb/dist/simulator/layout/layouts/hierarchical";

export type LayoutType = 'hierarchical' | 'circular' | 'force' | 'grid' | 'map';

export interface OrbOptions {
  layout: LayoutType;
  layoutOptions: {
    hierarchical: Required<IHierarchicalLayoutOptions>;
    circular: Required<ICircularLayoutOptions>;
    force: Required<IForceLayoutOptions>;
    grid: Required<IGridLayoutOptions>;
    map: {};
  };
  simulatorOptions: {
    isPhysicsEnabled: boolean;
  }
}
