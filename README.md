This application has the following components:
- Node.js server that loads GTFS and exposes an API with the subway stops.
- Frontend App that shows all the stops on a map (developed using React framework).

To start the application, run (in project directory):

# `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>
Server listens to http://localhost:3001<br>
A proxy is configured to link client/server.

## Folder Structure
```
react/
  README.md
  node_modules/
  package.json
  data/
      GTRFs (text files)
  mapapp/
    node_modules
    public/
      assets/
        images/
          icon.png
      index.html
      manifest.json
    src/
      components/
        Map.js
      App.css
      App.js
      App.test.js
      index.css
      index.js
      markerstyle.css
      registerServiceWorker.js
    package.json
  server.js
  start-client.js
```

Files & Folders
* `server.js`: Nodejs server.
* `mapp/`: Client.
* `start-client.js`: script to run the client and be able to run client/server at the same time.
* `public/index.html`: page template;
* `src/index.js`: JavaScript entry point.
