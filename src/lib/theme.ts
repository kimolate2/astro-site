import general from '../content/settings/general.json';

export const currentTheme: string = (general as any).theme || 'default';
