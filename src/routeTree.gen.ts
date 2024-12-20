/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WifiIndexImport } from './routes/wifi/index'
import { Route as GettingStartedIndexImport } from './routes/getting-started/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WifiIndexRoute = WifiIndexImport.update({
  id: '/wifi/',
  path: '/wifi/',
  getParentRoute: () => rootRoute,
} as any)

const GettingStartedIndexRoute = GettingStartedIndexImport.update({
  id: '/getting-started/',
  path: '/getting-started/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/getting-started/': {
      id: '/getting-started/'
      path: '/getting-started'
      fullPath: '/getting-started'
      preLoaderRoute: typeof GettingStartedIndexImport
      parentRoute: typeof rootRoute
    }
    '/wifi/': {
      id: '/wifi/'
      path: '/wifi'
      fullPath: '/wifi'
      preLoaderRoute: typeof WifiIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/getting-started': typeof GettingStartedIndexRoute
  '/wifi': typeof WifiIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/getting-started': typeof GettingStartedIndexRoute
  '/wifi': typeof WifiIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/getting-started/': typeof GettingStartedIndexRoute
  '/wifi/': typeof WifiIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/getting-started' | '/wifi'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/getting-started' | '/wifi'
  id: '__root__' | '/' | '/getting-started/' | '/wifi/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  GettingStartedIndexRoute: typeof GettingStartedIndexRoute
  WifiIndexRoute: typeof WifiIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  GettingStartedIndexRoute: GettingStartedIndexRoute,
  WifiIndexRoute: WifiIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/getting-started/",
        "/wifi/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/getting-started/": {
      "filePath": "getting-started/index.tsx"
    },
    "/wifi/": {
      "filePath": "wifi/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
