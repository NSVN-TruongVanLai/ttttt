"use strict";
(function () {

    function App() {

        var self = this;
        self.messages = ko.observableArray([]);
        self.currentMessage = ko.observable("");

        self.buttonEnabled = ko.computed(function(){
           return self.currentMessage().length > 0;
        });

        self.sendText = function () {
            window.console.log("sending");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    receive(this.responseText);
                }
            };
            xhr.open("GET", "api/string/" + encodeURIComponent(self.currentMessage()), true);
            xhr.send();

        };


        function receive(responseText) {
            self.messages.push(JSON.parse(responseText));
        }

        ko.components.register("messages", {
            viewModel: function () {
                this.messages = self.messages;
            },
            
            template: "<table><thead><tr><th>Original message</th><th>Response</th></tr></thead><tbody data-bind='foreach: messages'><tr><td data-bind='text: original'></td><td data-bind='text: reverted'></td></tr></tbody></table>"
        });
        ko.components.register("mytitle", {
            viewModel: function (params) {
                this.title = ko.observable(params.title);
            },
            
            template: "<h2 data-bind='text: title'></h2>"
        });

    }

    ko.applyBindings(new App());

})();
