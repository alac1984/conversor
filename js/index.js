// Conversion Controller

let conversionController = (function () {

    let isGoodValue = function(value) {
        // Return TRUE is is a good value and FALSE if is not a good value
        return !Number.isNaN(value) &&
            value !== 0 &&
            value != undefined &&
            value !== '' &&
            value != 'NaN' &&
            value != 'Invalid Date';
    };
    
    return {

        // Converts Unix Timestamp to ISO 8601
        UnixToISO: function (value) {
            let values = [];
            try {
                values[0] = new Date(value * 1000).toISOString();
                values[1] = true;

            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        // Converts ISO 8601 time to Unix Timestamp
        ISOToUnix: function (value) {
            let values = [];
            try {
                values[0] = new Date(value).getTime() / 1000;
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        // Converts Unix Timestamp to RFC 2822
        UnixToRFC: function (value) {
            let values = [];
            try {
                values[0] = new Date(value * 1000).toString();
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        // Converts RFC 2822 to Unix Timestamp
        RFCToUnix: function (value) {
            let values = [];
            try {
                values[0] = new Date(value).getTime() / 1000;
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        // Converts RFC 2822 to ISO 8601 
        RFCToISO: function (value) {
            let values = [];
            try {
                values[0] = new Date(value).toISOString();
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        // Converts ISO 8601 to RFC 2822
        ISOToRFC: function (value) {
            let values = [];
            try {
                values[0] = new Date(value).toString();
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        decimalToHexa: function (value) {
            let values = [];
            try {
                values[0] = Number.parseInt(value).toString(16);
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        decimalToBinary: function (value) {
            let values = [];
            try {
                values[0] = (value >>> 0).toString(2);
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        hexaToDecimal: function (value) {
            let values = [];
            try {
                values[0] = Number.parseInt(value, 16);
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        hexaToBinary: function (value) {
            let values = [];
            try {
                values[0] = (Number.parseInt(value, 16) >>> 0).toString(2);
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        binaryToHexa: function (value) {
            let values = [];
            try {
                values[0] = Number.parseInt(value, 2).toString(16);
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },

        binaryToDecimal: function (value) {
            let values = [];
            try {
                values[0] = Number.parseInt(value, 2);
                values[1] = true;
            } catch (err) {
                values[0] = undefined;
                values[1] = false;
            }

            values[1] = values[1] && isGoodValue(values[0]);

            return values;
        },
    }

})();

// UI Controller

let UIController = (function () {

    // Register if we're dealing with a good value

    const DOMStrings = {
        inputTimeUnix: 'unix',
        inputTimeIso: 'iso8601',
        inputTimeRfc: 'rfc2822',
        inputNumberDecimal: 'decimal',
        inputNumberHexa: 'hexadecimal',
        inputNumberBinary: 'binary',
        smartphoneBody: 'smartphone__body',
        timeLink: 'timeLink',
        numberLink: 'numberLink',
        timeOption: 'time-option',
        numberOption: 'number-option',
        btnUnix: 'clip-btn-unix',
        btnIso: 'clip-btn-iso',
        btnRfc: 'clip-btn-rfc',
        btnDec: 'clip-btn-decimal',
        btnHexa: 'clip-btn-hexa',
        btnBinary: 'clip-btn-binary',
    };


    let blueIcon = function (btnclicked) {
        // Make the damn icon blue
        document.getElementById(btnclicked).firstChild.classList.add('form__icon--blue');

        // Remove it after 3 secons
        setTimeout(function () {
            document.getElementById(btnclicked).firstChild.classList.remove('form__icon--blue');
        }, 2600);
    };


    return {
        getDOMStrings: function () {
            return DOMStrings;
        },

        insertIntoInput: function (inputToAlter, alteredValue) {
            document.getElementById(inputToAlter).value = alteredValue;
        },

        copytoClipboard(e) {
            let btnclicked, input;

            btnclicked = e.target.id;

            switch (btnclicked) {
                case 'clip-btn-unix':
                    input = document.getElementById('unix');
                    break;
                case 'clip-btn-rfc':
                    input = document.getElementById('rfc2822');
                    break;
                case 'clip-btn-iso':
                    input = document.getElementById('iso8601');
                    break;
                case 'clip-btn-decimal':
                    input = document.getElementById('decimal');
                    break;
                case 'clip-btn-hexa':
                    input = document.getElementById('hexadecimal');
                    break;
                case 'clip-btn-binary':
                    input = document.getElementById('binary');
                    break;
            }

            input.select();
            document.execCommand('copy');
            blueIcon(btnclicked);

        },

        // Change input color to red as the input value is not producing any reasonable output
        addRedInput: function (input) {
            input.classList.add('form__input--red');
        },

        // Remove red input when the value is ok
        removeRedInput: function (input) {
            input.classList.remove('form__input--red');
        },

    }

})();

// Global App Controller

let controller = (function (conversionCtrl, UICtrl) {

    // Get DOMStrings to use here
    let DOM = UICtrl.getDOMStrings();

    // Setup event listeners
    let setupEventListeners = function () {

        // Everytime an input value is altered, all of then are updated
        document.getElementById(DOM.smartphoneBody).addEventListener('input', recalcThemAll);
        // When numberLink is clicked, show number form
        document.getElementById(DOM.numberLink).addEventListener('click', showNumberForm);
        // When timeLink is clicked, show time form
        document.getElementById(DOM.timeLink).addEventListener('click', showTimeForm);
        // When a copy to clipboard btn is clicked
        document.getElementById(DOM.btnUnix).addEventListener('click', UICtrl.copytoClipboard);
        document.getElementById(DOM.btnIso).addEventListener('click', UICtrl.copytoClipboard);
        document.getElementById(DOM.btnRfc).addEventListener('click', UICtrl.copytoClipboard);
        document.getElementById(DOM.btnDec).addEventListener('click', UICtrl.copytoClipboard);
        document.getElementById(DOM.btnHexa).addEventListener('click', UICtrl.copytoClipboard);
        document.getElementById(DOM.btnBinary).addEventListener('click', UICtrl.copytoClipboard);

    }

    // Determine what inputs we need to change value based on the input we're changing in the DOM
    let whatInputsToAlter = function (id) {
        let inputsToAlter = [];

        switch (id) {
            case DOM.inputTimeIso:
                inputsToAlter.push(DOM.inputTimeRfc);
                inputsToAlter.push(DOM.inputTimeUnix);
                break;
            case DOM.inputTimeRfc:
                inputsToAlter.push(DOM.inputTimeIso);
                inputsToAlter.push(DOM.inputTimeUnix);
                break;
            case DOM.inputTimeUnix:
                inputsToAlter.push(DOM.inputTimeIso);
                inputsToAlter.push(DOM.inputTimeRfc);
                break;
            case DOM.inputNumberBinary:
                inputsToAlter.push(DOM.inputNumberDecimal);
                inputsToAlter.push(DOM.inputNumberHexa);
                break;
            case DOM.inputNumberDecimal:
                inputsToAlter.push(DOM.inputNumberBinary);
                inputsToAlter.push(DOM.inputNumberHexa);
                break;
            case DOM.inputNumberHexa:
                inputsToAlter.push(DOM.inputNumberBinary);
                inputsToAlter.push(DOM.inputNumberDecimal);
                break;
            default:
                console.log('Some kind of error here');
                break;
        }

        return inputsToAlter;

    }

    // Given the altered input Id and, input Id that we should alter and the value we should alter, alter that value
    let alterTheRightValue = function (alteredId, alteringId, value) {
        switch (alteredId) {
            case DOM.inputTimeUnix:
                return alteringId === DOM.inputTimeIso ? conversionCtrl.UnixToISO(value) : conversionCtrl.UnixToRFC(value);
                break;
            case DOM.inputTimeIso:
                return alteringId === DOM.inputTimeUnix ? conversionCtrl.ISOToUnix(value) : conversionCtrl.ISOToRFC(value);
                break;
            case DOM.inputTimeRfc:
                return alteringId === DOM.inputTimeIso ? conversionCtrl.RFCToISO(value) : conversionCtrl.RFCToUnix(value);
                break;
            case DOM.inputNumberDecimal:
                return alteringId === DOM.inputNumberHexa ? conversionCtrl.decimalToHexa(value) : conversionCtrl.decimalToBinary(value);
                break;
            case DOM.inputNumberHexa:
                return alteringId === DOM.inputNumberBinary ? conversionCtrl.hexaToBinary(value) : conversionCtrl.hexaToDecimal(value);
                break;
            case DOM.inputNumberBinary:
                return alteringId === DOM.inputNumberHexa ? conversionCtrl.binaryToHexa(value) : conversionCtrl.binaryToDecimal(value);
                break;
        }
    }

    let recalcThemAll = function (e) {
        let alteredInputId, value, inputsToAlter, alteredValue01, alteredValue02;

        // 1. Detect what input we're changing
        alteredInputId = e.target.id;

        // 2. Grabs input value
        value = e.target.value;

        // 3. Determine what inputs should be altered
        inputsToAlter = whatInputsToAlter(alteredInputId);

        // 4. Alter the value in that inputs
        alteredValue01 = alterTheRightValue(alteredInputId, inputsToAlter[0], value);
        alteredValue02 = alterTheRightValue(alteredInputId, inputsToAlter[1], value);

        // 5. Put the values into the right input if the value is right and gives redInput
        if(alteredValue01[1]) {
            UICtrl.insertIntoInput(inputsToAlter[0], alteredValue01[0]);
            UICtrl.removeRedInput(document.getElementById(alteredInputId));
        } else {
            UICtrl.addRedInput(document.getElementById(alteredInputId));
        }

        if(alteredValue02[1]) {
            UICtrl.insertIntoInput(inputsToAlter[1], alteredValue02[0]);
            UICtrl.removeRedInput(document.getElementById(alteredInputId));
        } else {
            UICtrl.addRedInput(document.getElementById(alteredInputId));
        }
    }

    let showNumberForm = function (e) {
        e.preventDefault();
        // Change the link underlines
        document.getElementById(DOM.numberLink).classList.add('smartphone__link--active');
        document.getElementById(DOM.timeLink).classList.remove('smartphone__link--active');
        // Show the proper form
        document.getElementById(DOM.numberOption).classList.add('smartphone__option--active');
        document.getElementById(DOM.numberOption).classList.remove('smartphone__option--deactive');
        document.getElementById(DOM.timeOption).classList.add('smartphone__option--deactive');
    }

    let showTimeForm = function (e) {
        e.preventDefault();
        // Change the link underlines
        document.getElementById(DOM.timeLink).classList.add('smartphone__link--active');
        document.getElementById(DOM.numberLink).classList.remove('smartphone__link--active');
        // Show the proper form
        document.getElementById(DOM.timeOption).classList.add('smartphone__option--active');
        document.getElementById(DOM.timeOption).classList.remove('smartphone__option--deactive');
        document.getElementById(DOM.numberOption).classList.add('smartphone__option--deactive');
    }

    return {
        init: function () {
            console.log('Application has started.');

            setupEventListeners();
        },

    }
})(conversionController, UIController);

// Init app

controller.init();