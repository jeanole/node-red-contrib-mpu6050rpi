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

        this.address = config.address;//config.address;
        var address = 0x68;
        this.bus = config.bus; //config.bus;
        var i2c1 = i2c.openSync(parseInt(this.bus));
        this.sensor =new MPU6050(i2c1, parseInt(this.address,16));
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