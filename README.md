# Integrating Angular CLI with dotnet in Visual Studio

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

In Visual Studio open Startup.cs and remove the app.Run code inside the Configure section. Add `app.UseDefaultFiles(); app.UseStaticFiles();`

Change the outDir in the angular-cli.json from dist to wwwroot.

Now when you build your solution in Visual Studio it will kick off ng serve and open a new browser window pointing to `http://localhost:4200/`.

## Phase 3

Coming up...