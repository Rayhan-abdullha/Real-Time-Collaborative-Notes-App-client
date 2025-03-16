# Environment Variables

The following environment variables are used in the project. Ensure to define them in your `.env` file for the application to work properly.

```env
NEXT_PUBLIC_SITE_DOMAIN=http://localhost:3000/
NEXT_PUBLIC_BACKEND_API_URL="https://api.diasporex.io/api/v1"

NEXT_PUBLIC_USER_PORTAL_URL=https://user.diasporex.io/auth/login
NEXT_PUBLIC_AGENT_PORTAL_URL=https://agent.diasporex.io/auth/login

NEXT_PUBLIC_HERO_AREA_WATCH_VIDEO_URL=https://www.youtube.com/watch?v=v4t1P6InT8k
```

# Static Content Structure

## Shared

Below is the table listing the sections, their location, and corresponding variable names.

### Header

| **Section**          | **Location**                 | **Variable Name** |
| -------------------- | ---------------------------- | ----------------- |
| **Header Menu**      | `src/static/shared/index.ts` | `MENUS`           |
| **Header Menu Auth** | `src/static/shared/index.ts` | `AUTH_MENU`       |

### Footer

| **Section**     | **Location**                 | **Variable Name** |
| --------------- | ---------------------------- | ----------------- |
| **Footer Data** | `src/static/shared/index.ts` | `FOOTER_DATA`     |

## Home Page

Below is the table listing the sections, their location, and corresponding variable names.

| **Section**           | **Location**                       | **Variable Name**        |
| --------------------- | ---------------------------------- | ------------------------ |
| **Hero Area**         | `src/static/home/index.ts`         | `HERO_AREA`              |
| **Agent Platform**    | `src/static/home/HomeSections.tsx` | `PLATFORM_SECTION`       |
| **Transfer Works**    | `src/static/home/HomeSections.tsx` | `TRANSFER_WORKS_SECTION` |
| **Support Countries** | `This is From API`                 | `This is From API`       |
| **Why Choose Us**     | `src/static/home/HomeSections.tsx` | `CHOOSE_US_SECTION`      |
| **About Us**          | `src/static/home/index.ts`         | `ABOUT_US`               |
| **Blog**              | `This is From API	`                 | `This is From API	`       |
| **FAQ**               | `This is From API	`                 | `This is From API	`       |
| **Download App**      | `src/static/home/HomeSections.tsx` | `DOWNLOAD_APP_SECTION`   |
| **Contact Us**        | `src/static/home/HomeSections.tsx` | `CONTACT_US_SECTION`     |

## About Us Overview

Below is the table listing the sections, their location, and corresponding variable names.

| **Section**   | **Location**            | **Variable Name** |
| ------------- | ----------------------- | ----------------- |
| **Hero Area** | `src/static/aboutUs.ts` | `ABOUT_US_PAGE`   |

## Terms And Condition Page

Below is the table listing the sections, their location, and corresponding variable names.

| **Section**        | **Location**                  | **Variable Name**                     |
| ------------------ | ----------------------------- | ------------------------------------- |
| **PRIVACY POLICY** | `src/static/PrivacyPolicy.ts` | `PRIVACY_POLICY, TERMS_AND_CONDITION` |

## Customizing Design

If you want to change the color, size, or breakpoint of the design, simply edit the root `tailwind.config.ts` file. This will automatically apply the changes across the entire project.

```

```
