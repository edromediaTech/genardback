const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       const universite = decodedToken.universite;
       const annee = decodedToken.annee;
       const email = decodedToken.email;
       req.auth = {
           userId: userId,
           annee:annee,
           email:email,
           universite:universite
       };
	next();
   }catch(error) {
       res.status(401).json({ error });
   }
};