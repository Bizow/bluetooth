
messages = null;

addToMessages = function (data, name) {
    var curMessages = messages.get();
    var msg = {value: data};
    if(name){
        msg.name = name;
    }
    curMessages.unshift(msg);
    messages.set(curMessages);
};

Template.console.onCreated(function () {
    messages = new ReactiveVar([]);
});

Template.console.helpers({
    messages: function () {
        return messages.get();
    }
});