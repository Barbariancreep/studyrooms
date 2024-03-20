## Dev guide

In the project directory, you can run:

`npm start`

to run the app on http://localhost:3000,

`npm run build`

to build the app/dependcies for production.

## Errors
If you're getting the following error when building:

`'react-scripts' is not recognized as an internal or external command, operable program or batch file.`

Then run:

`npm install react-scripts --save`

And if you're getting this error:

`babel-preset-react-app is part of the create-react-app project, which is not maintained anymore. It is thus unlikely that this bug will ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to your devDependencies to work around this error. This will make this message go away.`

Then run:

`npm install --save-dev @babel/plugin-proposal-private-property-in-object`

This will install the recommended babel packages to your devDependencies
