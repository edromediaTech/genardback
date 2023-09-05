const jwt = require('jsonwebtoken');
const {role} = require('../role');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       if(token){
          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET',(err,decodedToken)=>{
              if(err){
                console.log(err.message)
                res.status(401).json({ message:"Mauvais token"});
              }
              else{
                const userLevel = decodedToken.userLevel;
                console.log(decodedToken)
                if(userLevel > role.psycologue)
                  next();  
                else  res.status(405).json({ message:"vous n\'etes pas Secretaire..."});     
               
              }
          });
          
       }
       else  res.status(405).json({ message:"vous devez vous authentifier..."});
      
       
   }catch(error) {
       res.status(401).json({ error });
   }
};
