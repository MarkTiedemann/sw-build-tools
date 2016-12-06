
# sw-build-tools

**Service Worker build tools.**

## Installation

```sh
npm install --save-dev sw-build-tools
```

## Quickstart - Generate a Service Worker config file

```js
/* # Quickstart 
 *
 * The following generates a `service-worker-config.js`
 * file which contains a prefetch array as is used for
 * precaching resources with a Service Worker.
 *
 * The file will be saved in the `dist` directory, and 
 * will contain all resources found in the `src/assets` 
 * directory. 
 *
 * It will also include root (`/`) and the `bundle.js`
 * file (even if it does not exist yet). 
 */

const tools = require('sw-build-tools')

tools.generateConfig({
  prefetchResources: [
    'bundle.js'
  ],
  prefetchResourceGlobs: [
    'assets/**'
  ]
})

/* **Example output in the config file:**
 *
 *   ```
 *   navigator.serviceWorkerConfig = {
 *     prefetch: [
 *       '/',
 *       '/bundle.js',
 *       '/assets/favicon.ico'
 *     ]
 *   }
 *   ```
 *
 * After this, you can import the config in your
 * Service Worker:
 *
 *   ```
 *   importScripts('service-worker-config.js')
 *   ```
 *
 * And add the resources that are supposed to be
 * prefetched to the cache:
 *
 *   ```
 *   cache.addAll(navigator.serviceWorkerConfig.prefetch)
 *   ```
 *
 * # Why should you use this module?
 *
 * a) It's more lightweight and customizable than Google's
 *    'sw-precache' (github.com/GoogleChrome/sw-precache)
 *
 * b) You haven't yet tried Service Worker, and you know 
 *    you absolutely should
 * 
 * # Why are you writing all this in a gigantic JavaScript 
 * comment that includes Markdown syntax which is placed 
 * in a JavaScript code block in a Markdown Readme?
 * 
 * - ... whatever.
 */
```

### API - `tools.generateConfig(options)`

  - **inputDirectory**: `src`
  - **outputDirectory**: `dist`
  - **serviceWorkerName**: `service-worker-config.js`
  - **serviceWorkerScope**: `/`
  - **navigatorProperty**: `serviceWorkerConfig`
  - **prefetchRoot**: `true`
  - **prefetchResources**: `[]`
  - **prefetchResourceGlobs**: `[]`
  - **globOptions**: `{}`
  - **dryRun**: `false`
  - **disableEslint**: `{{NODE_ENV != production}}`
  - **verbose**: `{{NODE_ENV != production}}`

## Quickstart - Synchronize the Service Worker version

```js
/* # Quickstart 
 *
 * The following synchronizes the `SW_VERSION` variable 
 * found in the `service-worker.js` file in the `src`
 * directory with the `version` number found in your
 * `package.json` file.
 */

const tools = require('sw-build-tools')

tools.syncVersion({
  versionVariableName: 'SW_VERSION',
  serviceWorkerDirectory: 'src'
})

/* **Example output in your Service Worker:**
 * 
 *   ```
 *   const SW_VERSION = 'x.y.z'
 *   // more code
 *   ```
 * 
 * # Why should you use this module?
 *
 * a) You are too lazy to manually update your Service 
 *    Worker version number
 *
 * b) You are so lazy that you haven't even tried Service 
 *    Worker yet, and you know you absolutely should
 */
```

### API - `tools.syncVersion(options)`

  - **version**: `{{package.json}}.version`
  - **versionVariableName**: `VERSION`
  - **versionVariableSingleQuotes**: `true`
  - **serviceWorkerDirectory**: `{{cwd}}`
  - **serviceWorkerFile**: `service-worker.js`
  - **dryRun**: `false`
  - **verbose**: `{{NODE_ENV != production}}`

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).
