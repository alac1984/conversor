// Conversion Controller

let conversionController =(function() {

    return {
        // Converts Unix Timestamp to ISO 8601
        UnixToISO: function(value) {
            let date;
            date = new Date(value * 1000).toISOString();
            return date;
        },

        // Converts ISO 8601 time to Unix Timestamp
        ISOToUnix: function(value) {
            let date;
            date = new Date(value).getTime() / 1000;
            return date;
        },

        // Converts Unix Timestamp to RFC 2822
        UnixToRFC: function(value) {
            let date;
            date = new Date(value * 1000).toString();
            return date;
        },

        // Converts RFC 2822 to Unix Timestamp
        RFCToUnix: function(value) {
            console.log('RFC TO UNIX!!')
        },

        // Converts RFC 2822 to ISO 8601 
        RFCToISO: function(value) {
            console.log('RFC TO ISO!!')
        },

        // Converts ISO 8601 to RFC 2822
        ISOToRFC: function(value) {
            console.log('ISO TO RFC!!')
        },
    }

})();

// UI Controller

let UIController =(function() {
    const DOMStrings = {
        inputTimeUnix: 'unix',
        inputTimeIso: 'iso8601',
        inputTimeRfc: 'rfc2822',
        inputNumberDecimal: 'decimal',
        inputNumberHexa: 'hexadecimal',
        inputNumberBinary: 'binary',
        smartphoneBody: 'smartphone__body',
    };

    // Check if a value is worth displaying in the input
    let isGoodValue = function(value) {
        return Number.isNaN(value) || value === 0 || value == undefined ? false : true;
    }

    // Change input color to red as the input value is not producing any reasonable output
    let redInput = function(input) {

    }

    
    return {
        getDOMStrings: function() {
            return DOMStrings;
        },

        insertIntoInput: function(inputToAlter, alteredValue) {
            if(isGoodValue(alteredValue)) {
                document.getElementById(inputToAlter).value = alteredValue;
            }
        }

    }

})();

// Global App Controller

let controller =(function(conversionCtrl, UICtrl) {

    // Get DOMStrings to use here
    let DOM = UICtrl.getDOMStrings();

    // Setup event listeners
    let setupEventListeners = function() {

        document.getElementById(DOM.smartphoneBody).addEventListener('input', recalcThemAll);

    }

    // Determine what inputs we need to change value based on the input we're changing in the DOM
    let whatInputsToAlter = function(id) {
        let inputsToAlter = [];

        switch(id) {
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
    let alterTheRightValue = function(alteredId, alteringId, value) {
        switch(alteredId) {
            case DOM.inputTimeUnix:
                return alteringId === DOM.inputTimeIso ? conversionCtrl.UnixToISO(value) : conversionCtrl.UnixToRFC(value);
                break;
            case DOM.inputTimeIso:
                return alteringId === DOM.inputTimeUnix ? conversionCtrl.ISOToUnix(value) : conversionCtrl.ISOToRFC(value);
                break;
            case DOM.inputTimeRfc:
                return alteringId === DOM.inputTimeIso ? conversionCtrl.RFCToISO(value) : conversionCtrl.RFCToUnix(value);
                break;
        }
    }

    let recalcThemAll = function(e) {
        // 1. Detect what input we're changing
        let alteredInputId, value, inputsToAlter, alteredValue01, alteredValue02;
        alteredInputId = e.target.id;

        // 2. Grabs input value
        value = e.target.value;

        // 3. Determine what inputs should be altered
        inputsToAlter = whatInputsToAlter(alteredInputId);

        // 4. Alter the value in that inputs
        alteredValue01 = alterTheRightValue(alteredInputId, inputsToAlter[0], value);
        alteredValue02 = alterTheRightValue(alteredInputId, inputsToAlter[1], value);

        // 5. Put the values into the right input
        UICtrl.insertIntoInput(inputsToAlter[0], alteredValue01);
        UICtrl.insertIntoInput(inputsToAlter[1], alteredValue02);
    }

    return {
        init: function() {
            console.log('Application has started.');

            setupEventListeners();
        },

    }
})(conversionController, UIController);

// Init app

controller.init();