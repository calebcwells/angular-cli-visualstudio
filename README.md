# This repository has been archived
 # Hit The Ground Running

Clone repo.

`npm run setup`

Open solution in Visual Studio, choose either IIS Express or dotnet Kestrel and F5 or Ctrl-F5. Make a change and verify that the browser reloads with the change.  


# Phases to integrate Angular CLI with dotnet in Visual Studio

## Phase 1

Make sure you have Node version 6 or greater installed and have also installed Angular CLI, `npm i -g angular/cli@latest`.

When you create a new CLI project it will create the folder and put all necessary files into that folder. Open a command prompt and navigate to where you would like the project to reside and type in `ng new {app name}`.

Open the folder created for your project and in the same command prompt type `dotnet new web` to create an empty Visual Studio web application.

When you open the .proj file that was created it will create a solution for you to hold the project. Make sure you close the solution so that it can save the .sln file before you continue.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Phase 2

Install the [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner) and then right click on the package.json file in Visual Studio explorer and select Task Runner Explorer. Right click on the start option and check After Build under Bindings.

Update the start script in your package.json file to `ng serve -o`.

Make sure that you follow the instructions in this [article](https://blogs.msdn.microsoft.com/webdev/2015/03/19/customize-external-web-tools-in-visual-studio-2015/) to use the most recent version of Node installed on your PC.

Open a command prompt to your project folder and type in `dotnet add package Microsoft.AspNetCore.StaticFiles`.

In Visual Studio open Startup.cs and remove the app.Run code inside the Configure section. Add 
```
app.UseDefaultFiles();
app.UseStaticFiles();
```

Change the outDir in the angular-cli.json from dist to wwwroot.

Now when you build your solution in Visual Studio it will kick off ng serve and open a new browser window pointing to `http://localhost:4200/`.

## Phase 3

In this phase we are going to take over management of webpack and run everything through IIS Express or dotnet run.

Replace npm start script in package.json to original version.

Remove -vs-binding reference at bottom of package.json.

Open a command prompt to your project folder and type in `ng eject`.

Copy webpack.config.js, webpack.config.vendor.js and package.json from this [commit](https://github.com/calebcwells/angular-cli-visualstudio/tree/37a8a0ad31a63d01a399c574f8673c58d8c523f3).

Edit your proj file to include 
```
<Target Name="AngularBuild" AfterTargets="Build">
  <Exec Command="webpack" /> 
</Target>
```

In a command prompt in your project folder and type in `dotnet add package Microsoft.AspNetCore.SpaServices`.

In Startup.cs add
```
app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
{
	HotModuleReplacement = true
});
```

Open main.ts file and replace
```
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
```
with
```
if (module['hot']) {
    module['hot'].accept();
} else {
    enableProdMode();
}
```

Add references to vendor.css and vendor.js in index.html

Open your project properties and under Debug make sure Environment Variables has `ASPNETCORE_ENVIRONMENT Development` as a name:value pair.

In a command prompt in your project folder and type in `npm run buildFull`.

You should now be able to run the solution in IIS Express or dotnet run with F5 or Ctrl-F5 with HMR.
