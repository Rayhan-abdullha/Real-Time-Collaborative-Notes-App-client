import {
    FONT_DEFAULT,
    SITE_DESCRIPTION_DEFAULT,
    SITE_DOMAIN,
    SITE_TITLE_DEFAULT,
    SITE_TITLE_TEMPLATE_DEFAULT,
    SITE_VERIFICATION_GOOGLE_DEFAULT,
} from '@/config';
import { Metadata } from 'next';
import React from 'react';
import '../styles/global.css';
import { TheFooter, TheHeader } from './components';
import { Toaster } from 'react-hot-toast';
import ScrollTop from '@/utils/ScrollTop';
import { AuthProvider } from '@/context/AuthContext';
export const metadata: Metadata = {
    metadataBase: new URL(SITE_DOMAIN),
    title: {
        default: SITE_TITLE_DEFAULT,
        template: SITE_TITLE_TEMPLATE_DEFAULT
    },
    description: SITE_DESCRIPTION_DEFAULT,
    verification: {
        google: SITE_VERIFICATION_GOOGLE_DEFAULT
    },
    icons: {
        icon: {
            url: '/logo.svg',
            type: 'images/svg'
        }
    }
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${FONT_DEFAULT.variable}`}>
                <AuthProvider>
                    <Toaster position="top-right" reverseOrder={false} />
                    <TheHeader />
                    {children}
                    <TheFooter />
                    <ScrollTop />
                </AuthProvider>
            </body>
        </html>
    );
}
