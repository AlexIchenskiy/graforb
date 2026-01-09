import { DataFrame, PanelData } from "@grafana/data";
import { OrbEdge, OrbNode } from "models/graph.models";

export const frameToOrbGraph = (data: PanelData): { nodes: OrbNode[]; edges: OrbEdge[] } => {
  const nodes: OrbNode[] = [];
  const edges: OrbEdge[] = [];

  for (const frame of data.series) {
    if (frame.name === 'nodes') {
      nodes.push(...mapNodesFrameToOrb(frame));
    } else if (frame.name === 'edges') {
      edges.push(...mapEdgesFrameToOrb(frame));
    }
  }

  return { nodes, edges };
}

export const mapNodesFrameToOrb = (nodesFrame: DataFrame): OrbNode[] => {
  const idField = nodesFrame.fields.find(f => f.name === 'id');
  if (!idField) {
    return [];
  }

  const titleField = nodesFrame.fields.find(f => f.name === 'title');
  const detailFields = nodesFrame.fields.filter(f => f.name.startsWith('detail__'));

  const nodes: OrbNode[] = [];

  for (let i = 0; i < nodesFrame.length; i++) {
    const properties: Record<string, any> = {};
    const label = titleField?.values[i] ?? properties.name ?? String(idField.values[i]);

    for (const field of detailFields) {
      const key = field.name.replace('detail__', '');
      properties[key] = field.values[i];
    }

    nodes.push({
      id: String(idField.values[i]),
      label,
      properties: Object.keys(properties).length ? properties : undefined,
    });
  }

  console.log(nodes);

  return nodes;
};

export const mapEdgesFrameToOrb = (edgesFrame: DataFrame): OrbEdge[] => {
  const idField = edgesFrame.fields.find(f => f.name === 'id');
  const startField = edgesFrame.fields.find(f => f.name === 'source') ?? edgesFrame.fields.find(f => f.name === 'start');
  const endField = edgesFrame.fields.find(f => f.name === 'target') ?? edgesFrame.fields.find(f => f.name === 'end');
  if (!idField || !startField || !endField) {
    return [];
  }

  const titleField = edgesFrame.fields.find(f => f.name === 'title');
  const detailFields = edgesFrame.fields.filter(f => f.name.startsWith('detail__'));

  const edges: OrbEdge[] = [];

  for (let i = 0; i < edgesFrame.length; i++) {
    const properties: Record<string, any> = {};
    const label = titleField?.values[i] ?? properties.name ?? String(idField.values[i]);

    for (const field of detailFields) {
      const key = field.name.replace('detail__', '');
      properties[key] = field.values[i];
    }

    edges.push({
      id: String(idField.values[i]),
      start: String(startField.values[i]),
      end: String(endField.values[i]),
      label,
      properties: Object.keys(properties).length ? properties : undefined,
    });
  }

  return edges;
};

export const getGeoPosition = (node: any) => ({ lat: node?.getData()?.properties?.lat ?? 0, lng: node?.getData()?.properties?.lng ?? 0 });
