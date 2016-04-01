Template.serviceList.onCreated(function () {

});

Template.serviceList.helpers({
    services: function () {
        return this.parent.services.get();
    },
    self: function () {
        return Template.instance();
    }
});


Template.serviceItem.onCreated(function () {

});

startNotification = function (deviceId, service, characteristic, name) {
    ble.startNotification(deviceId, service, characteristic,
        function (buffer) {
            var data = new Uint8Array(buffer);
            addToMessages(data, name);
            console.log(data);
        },
        function (e) {
            addToMessages(e, name);
            console.log(service,'notification error:',e);
        }
    );
};


read = function (deviceId, service, characteristic, name) {
    ble.read(deviceId, service, characteristic, function (buffer) {
        var data = new Uint8Array(buffer);
        addToMessages(data, name);
        console.log(data);
    }, function (e) {
        console.log(service,e);
        addToMessages(e, name);
    });
};

Template.serviceItem.events({
    'click [data-read]': function (event, instance) {
        console.log(this);
        read(
            this.data.deviceId,
            this.data.service,
            this.data.characteristic,
            this.data.name
        );
        //battery
        //read(deviceId, "180F", "2A19");
    },
    'click [data-start-notification]': function (event, instance) {
        startNotification(
            this.data.deviceId,
            this.data.service,
            this.data.characteristic,
            this.data.name
        );
    }
});

Template.serviceItem.helpers({
    isCounter: function () {
        var service = "a495ff20-c5b1-4b44-b512-1370f02d74de";
        var c = "a495ff21-c5b1-4b44-b512-1370f02d74de";
        return this.data.service === service && c === this.data.characteristic;
    }
});

/*
 ble.startNotification(deviceId,
 "F000AA80-0451-4000-B000-000000000000",
 "F000AA81-0451-4000-B000-000000000000",
 function (data) {
 var a = new Int16Array(data);
 console.log(a);
 //0 gyro x
 //1 gyro y
 //2 gyro z
 //3 accel x
 //4 accel y
 //5 accel z
 //6 mag x
 //7 mag y
 //8 mag z
 }, function (e) {
 console.log(e);
 });
 );

 */