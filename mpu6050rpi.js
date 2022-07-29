module.exports = function(RED) {

    //
    var i2c = require('i2c-bus');
    var MPU6050 = require('./lib/node-i2c-mpu6050-master');
    
    
    
    //var sensor = new MPU6050(i2c1, address);
    
    //setInterval(() =>{var data = sensor.readSync();
    //    console.log(data);
    //    },1000);
    //
    //var mp = require('mpu6050');

    function mpu6050rpi(config) {
        RED.nodes.createNode(this,config);
        var address = 0x68;
        var i2c1 = i2c.openSync(1);
        this.sensor =new MPU6050(i2c1, address);
        var node = this;

        node.on('input', function(msg) {
            var data = this.sensor.readSync();
            console.log(data);
            msg.payload = data;
            node.send(msg);
        });
    }
    RED.nodes.registerType("mpu6050rpi",mpu6050rpi);
}