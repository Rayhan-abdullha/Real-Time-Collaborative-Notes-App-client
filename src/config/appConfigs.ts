import { Roboto } from 'next/font/google';

export const SITE_TITLE_DEFAULT = 'Notes';
export const SITE_TITLE_TEMPLATE_DEFAULT = `%s - Notes App`;
export const SITE_DESCRIPTION_DEFAULT = 'Notes Description';
export const SITE_VERIFICATION_GOOGLE_DEFAULT =
    'google-site-verification=adwdawdaw';

export const FONT_DEFAULT = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'], // Adjust weights based on your needs
    variable: '--font-roboto', // Update the CSS variable name
});