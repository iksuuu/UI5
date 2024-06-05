sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";

    return {
        createChatModel: function() {
            var initialData = {
                messages: [
                    {
                        author: "System",
                        message: "Hello, how can I help you?"
                    }
                ]
            };

            return new JSONModel(initialData);
        }
    };
});