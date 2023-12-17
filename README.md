# SeaTheMoss Web app

## Running the app in local

1. Requirements  
Node version: >=18  
Package manager: yarn@1.22.9

2. Installing dependencies  
`yarn install`

3. Starting development server  
`yarn dev`

## UI framework

We are using Mantine as the UI framework with Vanilla Extract to style the components.

## Data management

We are using `@tanstack/react-query` library for data fetching and server state management.

The architecture:  
We use services to implement the API integrations, all services are defined in folder `src/services`.

To make it easier to manage the API usages, all `useQuery` and `useMutation` usages should be defined in folder `src/queries` and `src/mutations`.

For pages such as `/products`, `/blogs`,... we should prefetch the data and use SSR to ensure the SEO capability of the website. Please read [this document](https://tanstack.com/query/latest/docs/react/guides/advanced-ssr#server-components--nextjs-app-router) to understand about the approach.
