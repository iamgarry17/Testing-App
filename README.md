# Testing-App

A lightweight experimental web application for testing **frontend UI**,
**JavaScript behavior**, and a **custom Vitest GUI server**.\
This project is mainly used as a sandbox to quickly try out ideas,
prototype logic, and verify JS functionality in a simple environment.

## 🚀 What the App Does

### ✅ 1. Provides a Simple Frontend Test Playground

The **index.html** file acts as a clean environment where you can: - Run
JavaScript experiments - Test UI components - Debug browser-side logic -
Load scripts without a framework

### ✅ 2. Includes a Vitest GUI Server

Inside `js/vitest-gui-server.js`, the app includes a lightweight web
server that: - Serves testing files - Provides a simple GUI for running
Vitest tests - Lets you interactively debug functions and modules

Great for quick unit test prototyping.

### ✅ 3. Acts as a Node.js Starter Environment

With the included `package.json` and `package-lock.json`, you can: -
Install dependencies - Add test libraries - Run local scripts - Expand
into a bigger JS project later

------------------------------------------------------------------------

## 📂 Project Structure

    /
    ├── index.html                    # Frontend testing page
    ├── .gitignore
    ├── README.md
    └── js/
        ├── vitest-gui-server.js      # Custom test runner server
        ├── package.json              # Node project metadata
        └── package-lock.json

------------------------------------------------------------------------

## 🛠️ Requirements

-   Node.js (v16+)
-   npm

------------------------------------------------------------------------

## 📦 Installation

 bash
git clone https://github.com/iamgarry17/Testing-App
cd Testing-App
npm install


------------------------------------------------------------------------

## ▶️ Running the App

### **Run the Vitest GUI Server**

 bash
node js/vitest-gui-server.js


### **Run Frontend Tests**

Open:

    index.html

------------------------------------------------------------------------

## 🧪 Testing

If tests are added in the future:

 bash
npm test


------------------------------------------------------------------------

## 🤝 Contributing

Pull requests are welcome.\
Open an issue for discussion before major changes.
