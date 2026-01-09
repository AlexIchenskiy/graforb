export interface OrbNode {
  id: string;
  label?: string;
  properties?: Record<string, any>;
}

export interface OrbEdge {
  id: string;
  start: string;
  end: string;
  label?: string;
  properties?: Record<string, any>;
}
