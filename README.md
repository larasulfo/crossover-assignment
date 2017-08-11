

# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`

## Installing
* `npm install` to install dependencies

## Running the App
NG6 uses Gulp to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `npm start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.


##Folder Structure
client
⋅⋅app/
⋅⋅⋅⋅app.js * app entry file
⋅⋅⋅⋅app.html * app template
⋅⋅⋅⋅common/ * functionality pertinent to several components propagate into this directory
⋅⋅⋅⋅services/ * where services live
⋅⋅⋅⋅components/ * where components live
⋅⋅⋅⋅⋅⋅components.js * components entry file
⋅⋅⋅⋅⋅⋅todoApp/ * component
⋅⋅⋅⋅⋅⋅⋅⋅todoApp.js * home entry file (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅todoApp.component.js * todoApp "directive"
⋅⋅⋅⋅⋅⋅⋅⋅todoApp.controller.js * todoApp controller
⋅⋅⋅⋅⋅⋅⋅⋅todoApp.scss * todoApp styles
⋅⋅⋅⋅⋅⋅⋅⋅todoApp.html * todoApp template
⋅⋅⋅⋅⋅⋅⋅⋅todoApp.spec.js * todoApp specs (for entry, component, and controller)
```
 
 
## Testing Setup
All tests are also written in ES6. We use Webpack to take care of the logistics of getting those files to run in the various browsers, just like with our client files. This is our testing stack:
* Karma
* Webpack + Babel
* Mocha
* Chai

To run tests, type `npm test` in the terminal. Read more about testing [below](#testing).

 
### Testing
To run the tests, run `npm test`.

`Karma` combined with Webpack runs all files matching `*.spec.js` inside the `app` folder. This allows us to keep test files local to the component--which keeps us in good faith with continuing to build our app modularly. The file `spec.bundle.js` is the bundle file for **all** our spec files that Karma will run.

Be sure to define your `*.spec.js` files within their corresponding component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` suffix, you must change the `regex` in `spec.bundle.js` to look for whatever file(s) you want.
`Mocha` is the testing suite and `Chai` is the assertion library. If you would like to change this, see `karma.conf.js`.

