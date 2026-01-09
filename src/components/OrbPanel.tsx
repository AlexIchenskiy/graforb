import React from 'react';
import { PanelProps } from '@grafana/data';
import { OrbOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';
import { OrbMapView, OrbView } from '@memgraph/orb';
import { frameToOrbGraph, getGeoPosition } from 'utils/graph.utils';
import { OrbEdge, OrbNode } from 'models/graph.models';
import { resolveOrbLayout } from 'utils/settings.utils';
import { getDefaultStyle, getStyles } from 'utils/style.utils';

interface Props extends PanelProps<OrbOptions> { }

export const OrbPanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  const { layout } = options;

  console.log(data);
  console.log(options);
  console.log(resolveOrbLayout(options));

  const orbRef = React.useRef<OrbView<OrbNode, OrbEdge> | OrbMapView<OrbNode, OrbEdge> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current || width === 0 || height === 0) {
      return;
    }

    orbRef.current = layout === 'map' ?
      new OrbMapView(containerRef.current, { getGeoPosition }) :
      new OrbView(containerRef.current, { layout: { ...resolveOrbLayout(options) }, simulation: { isPhysicsEnabled: options.simulatorOptions.isPhysicsEnabled } });

    orbRef.current.data.setDefaultStyle(getDefaultStyle(theme.isDark));
    orbRef.current.data.setup(frameToOrbGraph(data));
    orbRef.current.render(() => {
      orbRef.current?.recenter();
    });

    return () => {
      if (orbRef.current) {
        orbRef.current.destroy();
        orbRef.current = null;
      }
    }
  }, [data, options, layout, width, height, theme]);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  return (
    <div
      ref={containerRef}
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    ></div>
  );
};
