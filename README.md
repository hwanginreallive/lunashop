# Disable Web Security in Chrome (Windows)

-   Create a tempFolder for Chrom C:\chromeTemp
-   Right-click on your chrome shortcut and select Properties
-   Edit the Target property and Set it to
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"  
     --disable-web-security --allow-running-insecure-content --user-data-dir=C:\chromeTemp

# Disable Web Security in Chrome (Mac)

-   Execute this in your terminal
    open -a Google\ Chrome --args --disable-web-security --user-data-dir=“/Users/<youruser>/work/chrome

## Launch Browser App In Development Mode

To run the source in development mode, perform the following steps:

-   Run: `yarn start`
-   Make sure you have disabled web security in chrome
-   Create a `.env` file in the root of the project with this content: `PORT=3000`
-   Open a browser to: http://localhost:3000/

# ESLint

-   Run `npm run eslint`

# ES Doc

Builds the ESDocs for the API. ESDocHome.md is the source for the 'home' page of the docs, the remaining pages are generated from the source code.

-   Run `npm run docs`
-   Navigate to the .\docs folder and open index.html

# Release

-   Run `npm run build`
