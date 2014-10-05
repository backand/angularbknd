# angularbknd — The seed for Backand AngularJS apps

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app for the Backand back office.
You can use it to quickly Bootstrap your Backand Angular webapp projects and dev environment for these
projects.

It is based on the [angular-seed](https://github.com/angular/angular-seed) application.

## Themes

We have a collection of [Bootstrap](https://www.backand.com/bootstrap-theme) themes that offer a pre-built set of views.

All the themes are fully responsive Admin template. Based on the **Bootstrap 3** framework. Highly customizable and easy to use, it fits many screen resolutions from small mobile devices to large desktops.


## Getting Started

To get started you can simply clone the angularbknd repository and install the dependencies:

### Prerequisites

You need git to clone the angularbknd repository. You can get Git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angularbknd. You must have node.js and its package manager (npm) installed.  You can donwload node.js from [http://nodejs.org/download//](http://nodejs.org/download/).

### Clone angularbknd

Clone the angularbknd repository using [git][git]:

```
git clone https://github.com/backand/angularbknd
cd angularbknd
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*-In Windows you need to manually create `C:\Users\<user name>\AppData\Roaming\npm` folder.*

*-Note that the `bower_components` folder would normally be installed in the root folder but angularbknd changes this location through the `.bowerrc` file.  Putting it in the app folder makes it easier to serve the files by a webserver.

*-On a Mac or Linux, you may have to use `sudu` as:
```
sudo npm install
```

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

*-Note: on Mac or Linux, you may have to use `sudo`, as:

```
sudo npm start
```

### Select the Bootstrap Template

The default template is LTE at `http://localhost:8000/app/index-lte.html`.
You can select other template like Devopps by browse to `http://localhost:8000/app/index-devoops.html`.


## Updating Angular

To update Backand code we recommend that you merge in changes to your own fork of the project.
```
git pull https://github.com/backand/angularbknd
```
You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


### Running the App in Production

Backand Service provide hosting not just the backend but also to the AngularJS code.
- Login to Backand Console to update the Github reposiroty
- The production URL will be at: yourapp.backand.net



## Contact

For more information on Backand please check out https://www.backand.com

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
