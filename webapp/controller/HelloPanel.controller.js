sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"../model/chatModel",
	"../model/formatter"
], function (Controller, MessageToast, chatModel, formatter) {
	"use strict";

	return Controller.extend("sap.u5.walkthrough.pythonui5.controller.HelloPanel", {
		formatter: formatter,
		onInit : function () {
			// set data model on view
			var oChatModel = chatModel.createChatModel();
			this.getView().setModel(oChatModel);
		},

		onShowHello : function () {
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
          //var sRecipient = this.getView().getModel().getProperty("/recipient/name");
          var sMsg = oBundle.getText("showLLMButtonText");
          MessageToast.show(sMsg);
		},


		onSendMessage: function() {
            var input = this.getView().byId("userInput").getValue();

            fetch('https://py_app-chipper-wildebeest-uf.cfapps.us10-001.hana.ondemand.com/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question: input}),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
				/*
                this.byId("status").setText('connected');
                this.addMessage('user', 'User: ' + data.response.input);
                this.addMessage('system','System: ' + data.response.output + '\n -> ' + 'SQL: \n' + data.sql);
				*/
				var oModel = this.getView().getModel();
				var aMessages = oModel.getProperty("/messages");
				aMessages.push({
					author: "User",
					message: data.response.input
				});
				aMessages.push({
					author: "System",
					message: data.response.output
				});
				aMessages.push({
					author: "SQL",
					message: data.sql
				});
				oModel.setProperty("/messages", aMessages);
				oModel.refresh();
				this.byId("status").setText('Connected');

			})
            .catch(error => {
                this.byId("status").setText('Error');
                this.addMessage('system', 'Error: No response from server');
            });
        },
		
		/*
		addMessage: function(sender, message) {
            var chatContainer = this.byId("chatList");
            var messageElement = new sap.m.Text({
                text: message
            }).addStyleClass(sender + "-message");
            chatContainer.addItem(messageElement);

            // Scroll to the bottom of the chat container
            chatContainer.scrollToIndex(chatContainer.getItems().length - 1);
        }
		*/

        

	});
});
