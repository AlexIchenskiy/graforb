import { css } from "@emotion/css";
import { IEdge, INode } from "@memgraph/orb";
import { OrbEdge, OrbNode } from "models/graph.models";

export const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const getDefaultStyle = (isDarkMode: boolean) => {
  return {
    getNodeStyle(node: INode<OrbNode, OrbEdge>) {
      return {
        borderColor: isDarkMode? '#F9F9F9' : '#1d1d1d',
        borderWidth: 0.6,
        color: '#DD2222',
        colorHover: '#e7644e',
        colorSelected: '#e7644e',
        fontColor: isDarkMode? '#F9F9F9' : '#1d1d1d',
        fontSize: 3,
        label: node.getData()?.label ?? node.getData()?.id,
        size: 6,
      };
    },
    getEdgeStyle(edge: IEdge<OrbNode, OrbEdge>) {
      return {
        color: isDarkMode? '#BAB8BB' : '#999999',
        colorHover: isDarkMode? '#F9F9F9' : '#1d1d1d',
        colorSelected: isDarkMode? '#F9F9F9' : '#1d1d1d',
        fontColor: isDarkMode? '#F9F9F9' : '#1d1d1d',
        fontSize: 3,
        width: 0.3,
        widthHover: 0.9,
        widthSelected: 0.9,
        label: edge.getData().label,
      };
    },
  };
};
