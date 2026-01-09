import { OrbOptions } from 'types';

export const resolveOrbLayout = (options: OrbOptions) => {
  switch (options.layout) {
    case 'force':
      return { type: 'force' as const, options: { ...options.layoutOptions.force } };
    case 'hierarchical':
      return { type: 'hierarchical' as const, options: { ...options.layoutOptions.hierarchical } };
    case 'grid':
      return { type: 'grid' as const, options: { ...options.layoutOptions.grid } };
    case 'circular':
      return { type: 'circular' as const, options: { ...options.layoutOptions.circular } };
    default:
      return { type: 'force' as const, options: { ...options.layoutOptions.force } };
  }
}
