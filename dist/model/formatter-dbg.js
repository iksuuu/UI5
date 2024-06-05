sap.ui.define([], function() {
    "use strict";

    return {
        messageClass: function(author) {
            if (author === "User") {
                return "userMessage";
            } else if (author === "System" || author === "SQL") {
                return "systemMessage";
            }
            return ""; // Default, no additional class
        }
    };
});