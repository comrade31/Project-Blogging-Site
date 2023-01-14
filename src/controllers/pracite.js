// console.log([1,2,3] === [1,2,3])
// // flase

const { JsonWebTokenError, decode } = require("jsonwebtoken")

// function func2(){
//     for(let i = 0; i < 3; i++){
//       setTimeout(()=> console.log(i),2000);
//   }
//   }
//   func2();

//   /// 3,3,3
  
  let x= {}, y = {name:"Ronny"},z = {name:"John"};
x[y] = {name:"Vivek"};
x[z] = {name:"Akki"};
console.log(x[y]);
// // {name:"Vivek"};

// var x = 23;

(function(){
  var x = 43;
  (function random(){
    x++;
    console.log(x);
    var x = 21;
  })();
})();

const auth = function(req,res) {
    try{
   let token = req.Headers['x-api-key']
   if(!token) {
    return res.status(400).send({status:false,msg:"please Provide token"})
   }
   jwt.verify(token,"secretkey",function(err,decoded){
    if(err) {
    return res.status(401).send({status:false,msg:"Invlaid token"})
    req.decoded = decoded
    next()
    }
   })
    }
    catch{
res.send.status(500).send({msg:"Internal server error"})
    }
}