# Pristine
A simple personal blog website runs on Flask.

---
## How to Develop Locally
1. Ensure you have Python >= 3.6
2. Create a virtual environment, `python -m venv env` and activate it
3. Restore package dependencies by `pip install -r requirements.txt`
4. Build webpages by `npm install` and `npm run build`
4. Populate the database table with the `project/sql` script
5. Set environment variable `DIALECT = mssql`, `DRIVER = pyodbc`, `ODBC = {SQL Server ODBC String}`
6. To run it using
  - [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools): `func host start`
  - [Python Interpreter](https://www.python.org/): `python runserver.py`

## How to Deploy to Azure Functions
1. Create an [Python Azure Functions App](https://functions.azure.com)
2. Build webpages using `npm install` and `npm run build`
3. Deploy to the Azure Functions App using `func azure functionapp publish <function-app-name>`
4. Change app settings `DIALECT = mssql`, `DRIVER = pyodbc`, `ODBC = {SQL Server ODBC String}`
5. Go to `https://function-app-name.azurewebsites.net`, it should be up and running.

## Before want to deploy this to production
If you want to reuse this repo as your personal website, please change `AboutMe.jsx` to match your personal information.

---
## Story
**Pristine** is one of my personal projects which aims to motivate myself to keep learning after my graduation.

Any easy way to lose passion is the inability of tracking what I have learnt. **Pristine** starts as a personal note taker which aims to serve myself on desktop and mobile.

Later on, I implement a simple account management and a minimal tag system, making it easier to categorise blogs and topics.

---
## Philosophy
I have a habit of writing diary, reminding me what happened yesterday or the same day last year.

A downside of diary recording is not able to **share your thought to others**. However, these days, most forums have insufficient promises for protecting personal privacy (e.g. marking who posts the comment, unable to remove comment record from the database).

I think we should have speaking equality while keeping ourselves safe.

Shall let our ideas flow, but not keeping an eye on who bores them.

---
## Features
- Provide immediate feedback when editing in markdown language, the rendering library I use is **[markdown-js](https://github.com/evilstreak/markdown-js) (many thanks)**
- Provide credential management to keep your blog safe, **everyone shares the same privilege**.
- Provide clean wipe out for your blogs, **does not record delete action** on database.
- Neat user interface using **[material-ui-next](https://material-ui-next.com/) (hugs)**

---
## Special Thanks
1. Pure markdown rendering. Personally, I recommend **[markdown cheetsheet by adam-p](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)**
2. LaTeX mathematics. Using **`$inline formula$`** or **```math block formula```** for math rendering. Special thanks to **[markdown-it-latex by tylingsoft](https://github.com/tylingsoft/markdown-it-latex)**
3. Acually, the markdown-it-latex is powered by **[KaTeX](https://github.com/Khan/KaTeX)**. Here a round of applause to it.
