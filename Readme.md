# Setup the MERN stack on your local machine

1. Download nodejs version 16.16.0 and npm version 8.11.0
   - Copy and paste the above statement to google

2. Download vscode

3. Download git

4. Open repository in vscode
   - On gitlab repo page, click the clone drop down button
   - down under "open in your IDE", click Visual Studio Code. Choose (SSH) or (HTTP), no difference

5. Navigate to fronend directory, and type in the terminal this command line to run the react app "npm start"
   - ctrl-` to open the terminal
   - cd frontend
   - npm install
   - npm start
   - chrome should open to display our react app
   - ctrl-c to stop the app from running

6. Navigate to backend directory, and type in the terminal this command line to run the server and database "npm start"
   - ctrl-` to open the terminal
   - cd backend
   - npm install
   - npm start
   - the console will print "server is listening on port 8080/n DB connected"
   - ctrl-c to stop the app from running

7. Create your own git/gitlab branch
   - in the gitlab repo page, click on the + button next to repo name utradu, and create a branch
   - in your terminal, make sure you are in the project directory (utradeu)
   - type in the command "git checkout -b nameofyourbranch", this will create the branch and switch to it
   - connect your local branch to gitlab branch by typing this command "git push -u origin nameofyourbranch"

# Notes

1. Merge & Pull Time: Teammates should meet to merge thier branches to the main branch, then they should pull the repo from main branch. This should be done during team meetings/work sessions. 

2. To avoid future bugs: In the future, we will probably have to install packages, so make sure to `npm install` both in frontend and backend directories every time you pull the repo. This will install the packages that other teammates installed while developing.

3. Don't push irrelevant files/folders: I created .gitignore folder for the whole project, you should add your practice folders/files to the gitignore (the most outter one not the ones in frontend or backend). This way your folders will not be pushed or shared with us. This will keep our repo clean.

4. If you have to install packages for either frontend or backend development, be sure to "npm install packageName" in either frontend or backend directories. Don't npm install packages in the global folder "utradeu".

