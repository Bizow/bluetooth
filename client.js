/*
 meteor update --release 1.3-beta.12
 meteor install-sdk android
 meteor add-platform android
 meteor run android-device
 meteor update --release 1.3-cordova-beta.5
 chrome://inspect/#devices

 meteor build ~/your-output-dir
 */

Template.devices.onCreated(function () {
    var instance = this;
    instance.devices = new ReactiveVar([]);
    instance.scanning = new ReactiveVar(false);
    instance.enabled = new ReactiveVar('');
    instance.connectedDevice = new ReactiveVar();
    instance.services = new ReactiveVar([]);
    console.log(ble);
});


Template.devices.events({
    'click [data-enabled]': function (event, instance) {
        ble.isEnabled(
            function() {
                console.log("Bluetooth is enabled");
                instance.enabled.set("Bluetooth is enabled");
            },
            function() {
                instance.enabled.set("Bluetooth is *not* enabled");
                console.log("Bluetooth is *not* enabled");
            }
        );
    },
    'click [data-connect]': function (event, instance) {
        var device = this;
        addToMessages(`Attempting connection to ${device.name}`);
        ble.connect(device.id, function (r) {
            console.log(`connectedDevice:`,r);
            instance.connectedDevice.set(device.id);
            addToMessages(`Connected to device: ${device.id}`);
            var service = "a495ff20-c5b1-4b44-b512-1370f02d74de";
            var sc = "a495ff21-c5b1-4b44-b512-1370f02d74de";
            r.characteristics.forEach(function (c) {
                if(c.service === service && sc === c.characteristic){
                    c.name = "Scratch Counter";
                }
                c.deviceId = device.id;
            });
            instance.services.set(r.characteristics);
        }, function (e) {
            console.log(`connection error:`,e);
            addToMessages(`connection error: ${e}`);
        });
    },
    'click [data-disconnect]': function (event, instance) {
        var device = this;
        console.log(`Attempting disconnect from ${device.name}`);
        ble.disconnect(device.id, function (r) {
            console.log(`disconnectedDevice:`,r);
            addToMessages(`disconnected from: ${device.id}`);
            instance.connectedDevice.set('');
            instance.services.set([]);
        }, function (e) {
            console.log(`disconnectedDevice error:`,e);
            addToMessages(`disconnect error: ${e}`);
        });
    },
    'click [data-start-scan]': function (event, instance) {
        instance.scanning.set(true);
        ble.startScan([], function (device) {
            console.log('device',JSON.stringify(device));
            var devices = instance.devices.get();
            devices.push(device);
            instance.devices.set(devices);
        }, function (error) {
            console.log('onError:',JSON.stringify(error));
        });
    },
    'click [data-stop-scan]': function (event, instance) {
        instance.scanning.set(false);
        instance.devices.set([]);
        ble.stopScan(function (success) {

        }, function (error) {

        });
    },
    'click [data-start-all-notifications]': function (event, instance) {
        var deviceId = instance.connectedDevice.get();
        var services = instance.services.get();
        services.forEach(function (data) {
            startNotification(deviceId, data.service, data.characteristic);
        });
    },
    'click [data-read-all]': function (event, instance) {
        var deviceId = instance.connectedDevice.get();
        var services = instance.services.get();
        services.forEach(function (data) {
            read(deviceId, data.service, data.characteristic);
        });
    }
});


Template.devices.helpers({
    stringify: function (obj) {
        return JSON.stringify(obj);
    },
    enabled: function () {
        var instance = Template.instance();
        return instance.enabled.get();
    },
    connectedDevice: function () {
        var instance = Template.instance();
        return instance.connectedDevice.get();
    },
    deviceList: function () {
        var instance = Template.instance();
        return instance.devices.get();
    },
    scanning: function () {
        var instance = Template.instance();
        return instance.scanning.get();
    },
    isConnectedDevice: function (id) {
        var instance = Template.instance();
        var connectedDeviceId = instance.connectedDevice.get();
        return id === connectedDeviceId;
    },
    services: function () {
        var instance = Template.instance();
        return instance.services.get();
    },
    self: function () {
        return Template.instance();
    }
});

/* supposed to be accelerometer
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
 */