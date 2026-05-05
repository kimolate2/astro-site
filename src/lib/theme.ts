import general from '../content/settings/general.json';

export const currentTheme: string =
	(typeof process !== 'undefined' && process.env.THEME?.trim()) ||
	(general as { theme?: string }).theme ||
	'default';
