require('msnodesqlv8')
const config = {
  server: 'LAPTOP-3IK55VF2', // update me
   driver:'msnodesqlv8',
   database:'Survey',
   options:{
     trustedConnection:true,
     connectionTimeout: 10000,
   }
   
};

module.exports = config;