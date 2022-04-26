// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import { Router } from "@layer0/core/router";
import { nextRoutes } from "@layer0/next";

/* eslint-disable sort-keys */
const { CustomCacheKey } = require("@layer0/core/router");

/**
 * 1 minute
 */
const ONE_MIN = 60;

/**
 * 1 hour
 */
const ONE_HOUR = 60 * 60;

/**
 * 24 hours
 */
const ONE_DAY = 60 * 60 * 24;

/**
 * 10 years
 */
const FAR_FUTURE_TTL = 60 * 60 * 24 * 365 * 10;

/**
 * One week
 */
const ONE_WEEK_TTL = 60 * 60 * 24 * 7;

/**
 * The custom cache key for all SSR and API responses.  Here we ignore all
 * query parameters except ones that we know our app specifically handles.  This
 * prevents cache fragmentation due to unexpected query parameters added in links
 * from 3rd parties.
 */
const key = new CustomCacheKey().excludeAllQueryParametersExcept(
  "oem",
  "trim",
  "tireSize",
  "sort",
  "loadRange",
  "loadIndex",
  "speedRating",
  "warranty",
  "promotion",
  "price",
  "brand",
  "size",
  "subtype",
  "category"
);

module.exports = {
  key,
  /**
   * Cache config for routes we should not cache
   */
  NO_CACHE: {
    browser: {
      maxAgeSeconds: 0,
    },
    edge: {
      maxAgeSeconds: 0,
    },
  },
  DISABLE_EDGE_CACHE: {
    edge: false,
  },
  /**
   * The cache config for all server side rendered pages
   */
  SSR: {
    browser: {
      maxAgeSeconds: 0,
    },
    edge: {
      maxAgeSeconds: ONE_MIN,
      staleWhileRevalidateSeconds: ONE_MIN,
      key,
    },
  },
  /**
   * The cache config for all server side rendered pages
   */
  SSR1HR: {
    browser: {
      maxAgeSeconds: 0,
    },
    edge: {
      maxAgeSeconds: ONE_HOUR,
      staleWhileRevalidateSeconds: ONE_HOUR,
      key,
    },
  },
  /**
   * The cache config for all server side rendered pages
   */
  API: {
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 0,
    },
    edge: {
      maxAgeSeconds: ONE_MIN,
      staleWhileRevalidateSeconds: ONE_MIN,
      forcePrivateCaching: true,
      key,
    },
  },

  /**
   * Cache config for static assets that infrequently change and thus can be cached
   * at the edge and in the browser for a while.
   */
  STATIC_ASSETS: {
    browser: {
      maxAgeSeconds: 0,
    },
    edge: {
      maxAgeSeconds: ONE_WEEK_TTL,
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  },

  /**
   * Cache the service worker at edge, but never in the browser.  Allowing
   * the service worker to be cached in the browser can prevent it from ever being updated.
   */
  SERVICE_WORKER: {
    browser: {
      maxAgeSeconds: 0,
    },
    edge: {
      maxAgeSeconds: FAR_FUTURE_TTL,
      staleWhileRevalidateSeconds: 60 * 60 * 2,
    },
  },

  /**
   * Creates a route handler that caches based on the specified config
   * @param {Object} config A config for @layer0/core's cache function
   * @return {Function} a route handler
   */
  cacheResponse:
    (config) =>
    ({ cache }) => {
      cache(config);
    },
};

export default new Router()
  .match("/static/:path", cacheResponse(STATIC_ASSETS))
  .use(nextRoutes); // automatically adds routes for all files under /pages
