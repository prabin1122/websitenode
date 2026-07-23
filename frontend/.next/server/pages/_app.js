/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/context/cart.tsx":
/*!******************************!*\
  !*** ./src/context/cart.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CartProvider: () => (/* binding */ CartProvider),\n/* harmony export */   useCart: () => (/* binding */ useCart)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction CartProvider({ children }) {\n    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // Load from localStorage on mount\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const saved = localStorage.getItem(\"cart\");\n        if (saved) {\n            try {\n                setItems(JSON.parse(saved));\n            } catch (e) {\n                console.error(\"Failed to load cart:\", e);\n            }\n        }\n        setMounted(true);\n    }, []);\n    // Save to localStorage when items change\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (mounted) {\n            localStorage.setItem(\"cart\", JSON.stringify(items));\n        }\n    }, [\n        items,\n        mounted\n    ]);\n    const addItem = (newItem)=>{\n        setItems((prev)=>{\n            const existing = prev.find((item)=>item.id === newItem.id);\n            if (existing) {\n                return prev.map((item)=>item.id === newItem.id ? {\n                        ...item,\n                        quantity: item.quantity + newItem.quantity\n                    } : item);\n            }\n            return [\n                ...prev,\n                newItem\n            ];\n        });\n    };\n    const removeItem = (id)=>{\n        setItems((prev)=>prev.filter((item)=>item.id !== id));\n    };\n    const updateQuantity = (id, quantity)=>{\n        if (quantity <= 0) {\n            removeItem(id);\n            return;\n        }\n        setItems((prev)=>prev.map((item)=>item.id === id ? {\n                    ...item,\n                    quantity\n                } : item));\n    };\n    const clearCart = ()=>{\n        setItems([]);\n    };\n    const total = items.reduce((sum, item)=>sum + parseFloat(item.price) * item.quantity, 0);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CartContext.Provider, {\n        value: {\n            items,\n            addItem,\n            removeItem,\n            updateQuantity,\n            clearCart,\n            total\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/ebpearls/Documents/node/nodejs/frontend/src/context/cart.tsx\",\n        lineNumber: 79,\n        columnNumber: 5\n    }, this);\n}\nfunction useCart() {\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CartContext);\n    if (!context) {\n        throw new Error(\"useCart must be used within CartProvider\");\n    }\n    return context;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dC9jYXJ0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQThFO0FBbUI5RSxNQUFNSyw0QkFBY0osb0RBQWFBLENBQThCSztBQUV4RCxTQUFTQyxhQUFhLEVBQUVDLFFBQVEsRUFBaUM7SUFDdEUsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdQLCtDQUFRQSxDQUFhLEVBQUU7SUFDakQsTUFBTSxDQUFDUSxTQUFTQyxXQUFXLEdBQUdULCtDQUFRQSxDQUFDO0lBRXZDLGtDQUFrQztJQUNsQ0MsZ0RBQVNBLENBQUM7UUFDUixNQUFNUyxRQUFRQyxhQUFhQyxPQUFPLENBQUM7UUFDbkMsSUFBSUYsT0FBTztZQUNULElBQUk7Z0JBQ0ZILFNBQVNNLEtBQUtDLEtBQUssQ0FBQ0o7WUFDdEIsRUFBRSxPQUFPSyxHQUFHO2dCQUNWQyxRQUFRQyxLQUFLLENBQUMsd0JBQXdCRjtZQUN4QztRQUNGO1FBQ0FOLFdBQVc7SUFDYixHQUFHLEVBQUU7SUFFTCx5Q0FBeUM7SUFDekNSLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSU8sU0FBUztZQUNYRyxhQUFhTyxPQUFPLENBQUMsUUFBUUwsS0FBS00sU0FBUyxDQUFDYjtRQUM5QztJQUNGLEdBQUc7UUFBQ0E7UUFBT0U7S0FBUTtJQUVuQixNQUFNWSxVQUFVLENBQUNDO1FBQ2ZkLFNBQVMsQ0FBQ2U7WUFDUixNQUFNQyxXQUFXRCxLQUFLRSxJQUFJLENBQUMsQ0FBQ0MsT0FBU0EsS0FBS0MsRUFBRSxLQUFLTCxRQUFRSyxFQUFFO1lBQzNELElBQUlILFVBQVU7Z0JBQ1osT0FBT0QsS0FBS0ssR0FBRyxDQUFDLENBQUNGLE9BQ2ZBLEtBQUtDLEVBQUUsS0FBS0wsUUFBUUssRUFBRSxHQUFHO3dCQUFFLEdBQUdELElBQUk7d0JBQUVHLFVBQVVILEtBQUtHLFFBQVEsR0FBR1AsUUFBUU8sUUFBUTtvQkFBQyxJQUFJSDtZQUV2RjtZQUNBLE9BQU87bUJBQUlIO2dCQUFNRDthQUFRO1FBQzNCO0lBQ0Y7SUFFQSxNQUFNUSxhQUFhLENBQUNIO1FBQ2xCbkIsU0FBUyxDQUFDZSxPQUFTQSxLQUFLUSxNQUFNLENBQUMsQ0FBQ0wsT0FBU0EsS0FBS0MsRUFBRSxLQUFLQTtJQUN2RDtJQUVBLE1BQU1LLGlCQUFpQixDQUFDTCxJQUFZRTtRQUNsQyxJQUFJQSxZQUFZLEdBQUc7WUFDakJDLFdBQVdIO1lBQ1g7UUFDRjtRQUNBbkIsU0FBUyxDQUFDZSxPQUNSQSxLQUFLSyxHQUFHLENBQUMsQ0FBQ0YsT0FBVUEsS0FBS0MsRUFBRSxLQUFLQSxLQUFLO29CQUFFLEdBQUdELElBQUk7b0JBQUVHO2dCQUFTLElBQUlIO0lBRWpFO0lBRUEsTUFBTU8sWUFBWTtRQUNoQnpCLFNBQVMsRUFBRTtJQUNiO0lBRUEsTUFBTTBCLFFBQVEzQixNQUFNNEIsTUFBTSxDQUFDLENBQUNDLEtBQUtWLE9BQVNVLE1BQU1DLFdBQVdYLEtBQUtZLEtBQUssSUFBSVosS0FBS0csUUFBUSxFQUFFO0lBRXhGLHFCQUNFLDhEQUFDMUIsWUFBWW9DLFFBQVE7UUFBQ0MsT0FBTztZQUFFakM7WUFBT2M7WUFBU1M7WUFBWUU7WUFBZ0JDO1lBQVdDO1FBQU07a0JBQ3pGNUI7Ozs7OztBQUdQO0FBRU8sU0FBU21DO0lBQ2QsTUFBTUMsVUFBVTFDLGlEQUFVQSxDQUFDRztJQUMzQixJQUFJLENBQUN1QyxTQUFTO1FBQ1osTUFBTSxJQUFJQyxNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Q7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbnRleHQvY2FydC50c3g/MWYyNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIENhcnRJdGVtIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBwcmljZTogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyO1xuICBzbHVnOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBDYXJ0Q29udGV4dFR5cGUge1xuICBpdGVtczogQ2FydEl0ZW1bXTtcbiAgYWRkSXRlbTogKGl0ZW06IENhcnRJdGVtKSA9PiB2b2lkO1xuICByZW1vdmVJdGVtOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUXVhbnRpdHk6IChpZDogc3RyaW5nLCBxdWFudGl0eTogbnVtYmVyKSA9PiB2b2lkO1xuICBjbGVhckNhcnQ6ICgpID0+IHZvaWQ7XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbmNvbnN0IENhcnRDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxDYXJ0Q29udGV4dFR5cGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXJ0UHJvdmlkZXIoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPENhcnRJdGVtW10+KFtdKTtcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIExvYWQgZnJvbSBsb2NhbFN0b3JhZ2Ugb24gbW91bnRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0Jyk7XG4gICAgaWYgKHNhdmVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXRJdGVtcyhKU09OLnBhcnNlKHNhdmVkKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNhcnQ6JywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNldE1vdW50ZWQodHJ1ZSk7XG4gIH0sIFtdKTtcblxuICAvLyBTYXZlIHRvIGxvY2FsU3RvcmFnZSB3aGVuIGl0ZW1zIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChtb3VudGVkKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FydCcsIEpTT04uc3RyaW5naWZ5KGl0ZW1zKSk7XG4gICAgfVxuICB9LCBbaXRlbXMsIG1vdW50ZWRdKTtcblxuICBjb25zdCBhZGRJdGVtID0gKG5ld0l0ZW06IENhcnRJdGVtKSA9PiB7XG4gICAgc2V0SXRlbXMoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gcHJldi5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBuZXdJdGVtLmlkKTtcbiAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICByZXR1cm4gcHJldi5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgaXRlbS5pZCA9PT0gbmV3SXRlbS5pZCA/IHsgLi4uaXRlbSwgcXVhbnRpdHk6IGl0ZW0ucXVhbnRpdHkgKyBuZXdJdGVtLnF1YW50aXR5IH0gOiBpdGVtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gWy4uLnByZXYsIG5ld0l0ZW1dO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUl0ZW0gPSAoaWQ6IHN0cmluZykgPT4ge1xuICAgIHNldEl0ZW1zKChwcmV2KSA9PiBwcmV2LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gaWQpKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVRdWFudGl0eSA9IChpZDogc3RyaW5nLCBxdWFudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgaWYgKHF1YW50aXR5IDw9IDApIHtcbiAgICAgIHJlbW92ZUl0ZW0oaWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRJdGVtcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChpdGVtKSA9PiAoaXRlbS5pZCA9PT0gaWQgPyB7IC4uLml0ZW0sIHF1YW50aXR5IH0gOiBpdGVtKSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyQ2FydCA9ICgpID0+IHtcbiAgICBzZXRJdGVtcyhbXSk7XG4gIH07XG5cbiAgY29uc3QgdG90YWwgPSBpdGVtcy5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgcGFyc2VGbG9hdChpdGVtLnByaWNlKSAqIGl0ZW0ucXVhbnRpdHksIDApO1xuXG4gIHJldHVybiAoXG4gICAgPENhcnRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IGl0ZW1zLCBhZGRJdGVtLCByZW1vdmVJdGVtLCB1cGRhdGVRdWFudGl0eSwgY2xlYXJDYXJ0LCB0b3RhbCB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NhcnRDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FydCgpIHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQ2FydENvbnRleHQpO1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUNhcnQgbXVzdCBiZSB1c2VkIHdpdGhpbiBDYXJ0UHJvdmlkZXInKTtcbiAgfVxuICByZXR1cm4gY29udGV4dDtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJDYXJ0Q29udGV4dCIsInVuZGVmaW5lZCIsIkNhcnRQcm92aWRlciIsImNoaWxkcmVuIiwiaXRlbXMiLCJzZXRJdGVtcyIsIm1vdW50ZWQiLCJzZXRNb3VudGVkIiwic2F2ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJhZGRJdGVtIiwibmV3SXRlbSIsInByZXYiLCJleGlzdGluZyIsImZpbmQiLCJpdGVtIiwiaWQiLCJtYXAiLCJxdWFudGl0eSIsInJlbW92ZUl0ZW0iLCJmaWx0ZXIiLCJ1cGRhdGVRdWFudGl0eSIsImNsZWFyQ2FydCIsInRvdGFsIiwicmVkdWNlIiwic3VtIiwicGFyc2VGbG9hdCIsInByaWNlIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUNhcnQiLCJjb250ZXh0IiwiRXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/context/cart.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/cart */ \"./src/context/cart.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                    name: \"viewport\",\n                    content: \"width=device-width, initial-scale=1\"\n                }, void 0, false, {\n                    fileName: \"/home/ebpearls/Documents/node/nodejs/frontend/src/pages/_app.tsx\",\n                    lineNumber: 10,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/ebpearls/Documents/node/nodejs/frontend/src/pages/_app.tsx\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_cart__WEBPACK_IMPORTED_MODULE_2__.CartProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/home/ebpearls/Documents/node/nodejs/frontend/src/pages/_app.tsx\",\n                    lineNumber: 13,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/ebpearls/Documents/node/nodejs/frontend/src/pages/_app.tsx\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQzZCO0FBQ2tCO0FBQ2hCO0FBRWhCLFNBQVNFLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDNUQscUJBQ0U7OzBCQUNFLDhEQUFDSixrREFBSUE7MEJBQ0gsNEVBQUNLO29CQUFLQyxNQUFLO29CQUFXQyxTQUFROzs7Ozs7Ozs7OzswQkFFaEMsOERBQUNOLHVEQUFZQTswQkFDWCw0RUFBQ0U7b0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7OztBQUloQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgeyBDYXJ0UHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L2NhcnQnO1xuaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxDYXJ0UHJvdmlkZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvQ2FydFByb3ZpZGVyPlxuICAgIDwvPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIkhlYWQiLCJDYXJ0UHJvdmlkZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();