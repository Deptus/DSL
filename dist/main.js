/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/env.ts":
/*!********************!*\
  !*** ./src/env.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientID": () => (/* binding */ ClientID),
/* harmony export */   "ClientSecret": () => (/* binding */ ClientSecret),
/* harmony export */   "CodeChallenge": () => (/* binding */ CodeChallenge)
/* harmony export */ });
var ClientID = "391fbcc2-29ef-4c2f-82e1-2ed757b47f3c";
var ClientSecret = "FBY8QfUxabS4WkgA4wR89R9HT47rMarMt8ocxv";
var CodeChallenge = "qe-9QWg4OrhoEx89gOsf71HErqxG9F1mdxN0X2k9JJQ";



/***/ }),

/***/ "./src/mslogin.ts":
/*!************************!*\
  !*** ./src/mslogin.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./env */ "./src/env.ts");


var LoginURL = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?" +
    "client_id=391fbcc2-29ef-4c2f-82e1-2ed757b47f3c" +
    "&response_type=code" +
    "&prompt=login" +
    "&redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fcommon%2Foauth2%2Fnativeclient" +
    "&code_challenge=" + _env__WEBPACK_IMPORTED_MODULE_1__.CodeChallenge +
    "&code_challenge_method=S256" +
    "&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL";
electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle("mslogin", function () {
    return new Promise(function (resolve) {
        var win = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
            width: 1000,
            height: 800,
            autoHideMenuBar: true,
            frame: false
        });
        win.loadURL("https://login.live.com/oauth20_authorize.srf?client_id=00000000402b5328&response_type=code&prompt=login&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL&redirect_uri=https%3A%2F%2Flogin.live.com%2Foauth20_desktop.srf");
        win.webContents.on("will-redirect", function (_ev, url) {
            var prefix = "https://login.live.com/oauth20_desktop.srf?";
            if (url.startsWith(prefix + "code=")) {
                win.close();
                resolve(url.substring(prefix.length));
            }
        });
        win.on("closed", function () { return resolve("null"); });
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginURL);


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mslogin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mslogin */ "./src/mslogin.ts");


var dev = "development" !== 'development';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
function createWindow() {
    var win = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
        height: 600,
        width: 800,
    });
    if (dev)
        win.loadFile('dist/index.html');
    else
        win.loadURL(_mslogin__WEBPACK_IMPORTED_MODULE_1__["default"]);
}
electron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(function () {
    createWindow();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ2lEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQztBQUNaO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0NBQWE7QUFDdEM7QUFDQTtBQUNBLG9EQUFjO0FBQ2Q7QUFDQSxzQkFBc0IsbURBQWE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsdUNBQXVDLHlCQUF5QjtBQUNoRSxLQUFLO0FBQ0wsQ0FBQztBQUNELGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7QUM3QnhCOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDYjtBQUNqQyxVQUFVLGFBQW9CO0FBQzlCO0FBQ0E7QUFDQSxrQkFBa0IsbURBQWE7QUFDL0I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0RBQVE7QUFDNUI7QUFDQSxtREFBYTtBQUNiO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RzbC1mdWkvLi9zcmMvZW52LnRzIiwid2VicGFjazovL2RzbC1mdWkvLi9zcmMvbXNsb2dpbi50cyIsIndlYnBhY2s6Ly9kc2wtZnVpL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovL2RzbC1mdWkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHNsLWZ1aS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9kc2wtZnVpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kc2wtZnVpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHNsLWZ1aS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RzbC1mdWkvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ2xpZW50SUQgPSBcIjM5MWZiY2MyLTI5ZWYtNGMyZi04MmUxLTJlZDc1N2I0N2YzY1wiO1xudmFyIENsaWVudFNlY3JldCA9IFwiRkJZOFFmVXhhYlM0V2tnQTR3Ujg5UjlIVDQ3ck1hck10OG9jeHZcIjtcbnZhciBDb2RlQ2hhbGxlbmdlID0gXCJxZS05UVdnNE9yaG9FeDg5Z09zZjcxSEVycXhHOUYxbWR4TjBYMms5SkpRXCI7XG5leHBvcnQgeyBDbGllbnRJRCwgQ2xpZW50U2VjcmV0LCBDb2RlQ2hhbGxlbmdlIH07XG4iLCJpbXBvcnQgeyBCcm93c2VyV2luZG93LCBpcGNNYWluIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyBDb2RlQ2hhbGxlbmdlIH0gZnJvbSBcIi4vZW52XCI7XG52YXIgTG9naW5VUkwgPSBcImh0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb25zdW1lcnMvb2F1dGgyL3YyLjAvYXV0aG9yaXplP1wiICtcbiAgICBcImNsaWVudF9pZD0zOTFmYmNjMi0yOWVmLTRjMmYtODJlMS0yZWQ3NTdiNDdmM2NcIiArXG4gICAgXCImcmVzcG9uc2VfdHlwZT1jb2RlXCIgK1xuICAgIFwiJnByb21wdD1sb2dpblwiICtcbiAgICBcIiZyZWRpcmVjdF91cmk9aHR0cHMlM0ElMkYlMkZsb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tJTJGY29tbW9uJTJGb2F1dGgyJTJGbmF0aXZlY2xpZW50XCIgK1xuICAgIFwiJmNvZGVfY2hhbGxlbmdlPVwiICsgQ29kZUNoYWxsZW5nZSArXG4gICAgXCImY29kZV9jaGFsbGVuZ2VfbWV0aG9kPVMyNTZcIiArXG4gICAgXCImc2NvcGU9c2VydmljZSUzQSUzQXVzZXIuYXV0aC54Ym94bGl2ZS5jb20lM0ElM0FNQklfU1NMXCI7XG5pcGNNYWluLmhhbmRsZShcIm1zbG9naW5cIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICB2YXIgd2luID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgICAgICAgICAgd2lkdGg6IDEwMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGF1dG9IaWRlTWVudUJhcjogdHJ1ZSxcbiAgICAgICAgICAgIGZyYW1lOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgd2luLmxvYWRVUkwoXCJodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZj9jbGllbnRfaWQ9MDAwMDAwMDA0MDJiNTMyOCZyZXNwb25zZV90eXBlPWNvZGUmcHJvbXB0PWxvZ2luJnNjb3BlPXNlcnZpY2UlM0ElM0F1c2VyLmF1dGgueGJveGxpdmUuY29tJTNBJTNBTUJJX1NTTCZyZWRpcmVjdF91cmk9aHR0cHMlM0ElMkYlMkZsb2dpbi5saXZlLmNvbSUyRm9hdXRoMjBfZGVza3RvcC5zcmZcIik7XG4gICAgICAgIHdpbi53ZWJDb250ZW50cy5vbihcIndpbGwtcmVkaXJlY3RcIiwgZnVuY3Rpb24gKF9ldiwgdXJsKSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gXCJodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfZGVza3RvcC5zcmY/XCI7XG4gICAgICAgICAgICBpZiAodXJsLnN0YXJ0c1dpdGgocHJlZml4ICsgXCJjb2RlPVwiKSkge1xuICAgICAgICAgICAgICAgIHdpbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodXJsLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW4ub24oXCJjbG9zZWRcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZShcIm51bGxcIik7IH0pO1xuICAgIH0pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBMb2dpblVSTDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBhcHAsIEJyb3dzZXJXaW5kb3cgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgTG9naW5VUkwgZnJvbSAnLi9tc2xvZ2luJztcbnZhciBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ2RldmVsb3BtZW50JztcbnByb2Nlc3MuZW52LkVMRUNUUk9OX0RJU0FCTEVfU0VDVVJJVFlfV0FSTklOR1MgPSBcInRydWVcIjtcbmZ1bmN0aW9uIGNyZWF0ZVdpbmRvdygpIHtcbiAgICB2YXIgd2luID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICB9KTtcbiAgICBpZiAoZGV2KVxuICAgICAgICB3aW4ubG9hZEZpbGUoJ2Rpc3QvaW5kZXguaHRtbCcpO1xuICAgIGVsc2VcbiAgICAgICAgd2luLmxvYWRVUkwoTG9naW5VUkwpO1xufVxuYXBwLndoZW5SZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIGNyZWF0ZVdpbmRvdygpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=