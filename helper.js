
const { data } = require('./utils/logger');
const logger = require('./utils/logger');
const jwt = require('jsonwebtoken');


exports.checkHaveChildren = (ob) => {
  const val = Object.values(ob._doc) 
  console.log(val)
  let trouve = false    
  for(const t of val){    
    if(Array.isArray(t) === true && t.length > 0 && typeof t[0].niveau ==='undefined' )                   
        trouve = true     
  }  
  return trouve
}


// exports.addNode = (pays,node, parent_id, parent_name,pathIndex, unicNode) => {//unicNode identifiant if object exist
//       if(Object.keys(pathIndex).length === 2)
//         pi = pathIndex.pays
//       else
//         pi = pathIndex[(Object.keys(pathIndex)[0])]      
//       var path1 = getPathById(pi, parent_id)+ '.'+parent_name 
         
//       if(isExists(eval(path1), unicNode) === true)
//          return ({message: `${parent_name} a été déja inséré`, status:false}); 
                    
//        ind = eval(path1).length    
//        eval(path1)[ind] = {...node, path:path1.toString()+ '['+ind+']'}
//        lastn =  eval(path1)[ind]   
            
//        obj = {element_id:lastn._id.toString(), path:path1.toString()+ '['+ind+']', parent_id:lastn.parent_id}
//       if(Object.keys(pathIndex).length === 2)
//         pi = pathIndex.ecole
//       else
//         pi = pathIndex[(Object.keys(pathIndex)[0])]                    
//        eval(pi).push(obj)
        
//       return ({message: `${parent_name} enregistré avec succes`, status:true, data:pays, saveObj:lastn});
              
//       }

// exports.addNode1 = (node , parent_id, parent_name,pathIndex, unicNode) => {//unicNode identifiant if object exist
//   const customPromise = new Promise((resolve, reject) => { // creation de promesse
    
//   Pays.findOne({_id:PaysId()}).then(
//     (pays) => {
//       if(Object.keys(pathIndex).length === 2)
//         pi = pathIndex.pays
//       else
//         pi = pathIndex[(Object.keys(pathIndex)[0])]
      
//       var path1 = getPathById(eval(pi), parent_id)+ '.'+parent_name
      
//       if(isExists(eval(path1), unicNode) === true){
//          resolve({message: `${parent_name} a été déja inséré`, status:false});
//          return false
//       }
      
//        ind = eval(path1).length    
//        eval(path1)[ind] = {...node, path:path1.toString()+ '['+ind+']'}
//        lastn =  eval(path1)[ind]
                   
//        obj = {element_id:lastn._id.toString(), path:path1.toString()+ '['+ind+']', parent_id:lastn.parent_id}
//       //pi= pathIndex.pays
       
//       if(Object.keys(pathIndex).length === 2)
//         pi = pathIndex.ecole
//       else
//         pi = pathIndex[(Object.keys(pathIndex)[0])]
        
//         eval(pi).push(obj)

        
//       Pays.updateOne({_id: pays_id}, pays).then(
//         () => {
           
//           //  indexerNode(obj, eval(pi), parent_name ).then((result)=>{
//                     resolve({
//           message: `${parent_name} enregistré avec succès`, status:true, data:lastn
//           });
       
//         }
      
//       ).catch(
//         (error) => {
//           reject(new Error(error))
//         }
//       );
    
//     }
   
//   ).catch(
//     (error) => {
//       reject(new Error(error))
//     }
//   ); 
// })
// return customPromise
// }

// exports.getPathEcole = (ecole_id, tab) => {
//      pathElement = getPathById(tab, ecole_id)
//          if(pathElement === false)             
//            return false  
//         else                            
//            return pathElement  
                
// }

// const getIndicePathParent = (id, pathIndex) => {
//   const path = getPathById(pathIndex, id)
//   if(path === false)
//     return false
//   // get index from path
//   pSplit = path.split('[')
//   lastPart =  pSplit[pSplit.length-1]
//   indice = lastPart.split(']')[0]
//   pathParent = ''
  
//   for (let i=0; i<pSplit.length-1; i++)
//     if(i < pSplit.length -2)
//         pathParent = pathParent + pSplit[i] +'['
//     else
//       pathParent = pathParent + pSplit[i]
//     return {indice:indice, pathParent:pathParent}
// }

// const getIndiceToIndexPath = (id, indexPath) => {

//     for (t of eval(indexPath))
//       if(t.element_id === id)
//         return eval(indexPath).indexOf(t)
//         return false
// }

// const desIndexer = (id, indexPath) =>{
//   indice = getIndiceToIndexPath(id, indexPath)

//   if(indice === false)
//     return false

//   eval(indexPath).splice(indice,1);          
//      return true   
// }

const isVide = (objet) =>{
 const tab = getFamilleInObject(objet)
  if(tab.length > 0)
  return false
else
 for (t of tab)
    if(tab.length > 0)
      return false
return true

   
}

// exports.deleteNode = (id, indexPath, parent_name) => {
//   const deletePromise = new Promise((resolve, reject) => { // creation de promesse
//    Pays.findOne({_id:pays_id}).then(
//       (pays) => {
//         const resultat = getIndicePathParent(id, eval(indexPath))
//         pathElement = getPathById(eval(indexPath), id)
//         if(isVide(eval(pathElement)) === false)  {
//           resolve({message: `ce ${parent_name} n\'est pas vide ` });
//           return false  
//         }  
        
//         if(resultat === false){
//            resolve({message: `Ce ${parent_name} est introuvable` });
//            return false
//         }
//        else {                  
//           eval(resultat.pathParent).splice(resultat.indice,1);          
//          desIndexer(id, eval(indexPath))                  
//         Pays.updateOne({_id: pays_id}, pays).then(
//           () => {
//             resolve({
//               message: `${parent_name} supprimé avec succès`
//             });
//           }
        
//         ).catch(          
//             (error) => {
//               reject(new Error(error))
//             }
          
//         );
//         }
//       }
//     ).catch(
//       (error) => {
//         reject(new Error(error))
//       }
//     ); 
//   })
//     return deletePromise  
// }

const objetAssign = (obj, pathObj) =>{
  okey = Object.keys(obj)
  for(k of okey)
    eval(pathObj)[k] = obj[k]
}

// exports.updateNode = (pays,id,objet, pathIndex, parent_name,idFieldNode) => {
//       pathElement = getPathById(pathIndex, id)      
//       indicePath = getIndicePathParent(id,pathIndex)      
//     if(isExists(eval(indicePath.pathParent), idFieldNode) === true) 
//          return ({status: false , message:` ${parent_name} deja existé`})           
//     else {  
//       okey = Object.keys(objet)
//       for(k of okey)
//         eval(pathElement)[k] = objet[k]  
//            return ({status: true , message:` ${parent_name} modifié succes`, data:pays, upObj:eval(pathElement)})  
//          }     
//   }

  // exports.updateNode1 = (id,objet, pathIndex, parent_name) => {
  //   const updatePromise = new Promise((resolve, reject) => { // creation de promesse
  //     Pays.findOne({_id:pays_id}).then(
  //        (pays) => {
  //         pathElement = getPathById(eval(pathIndex), id)  
  //             indicePath = getIndicePathParent(id,eval(pathIndex))  
           
    
  //      if(isExists(eval(indicePath.pathParent), {nom:objet.nom}) === true){
  //          resolve({message:` ${parent_name} deja existé`}) 
  //          return false 
  //       }      
  //     else {  
  //       okey = Object.keys(objet)
  //       for(k of okey)
  //         eval(pathElement)[k] = objet[k]    
  //           //eval(pathElement).nom = objet.nom                          
  //          Pays.updateOne({_id: pays_id}, pays).then(
  //            () => {
  //              resolve({
  //                message: `${parent_name} modifié avec succès`
  //              });
  //            }
           
  //          ).catch(          
  //              (error) => {
  //                reject(new Error(error))
  //              }
             
  //          );
  //          }
  //        }
  //      ).catch(
  //        (error) => {
  //          reject(new Error(error))
  //        }
  //      ); 
  //    })
  //      return updatePromise
  
  //   }
  

const getIndexById = (tab, id) => {
  for (t of tab)
    if(t._id.toString() === id)
      return tab.indexOf(t)
    return false
}

// stocker l'id et le path du noeud dans la liste index (racine ou ecole)
// const indexerNode =  (indexObject, path, parent_name) => {
  
//   const indexPromise = new Promise((resolve, reject) => { // creation de promesse
//  Pays.findOne({_id:pays_id}).then(
//     (pays) => { 
                        
//       if(isExists(eval(path),{element_id:indexObject.element_id}) === true){
//         logger.error(`803 | index existe `);
//         resolve({message: `index existe`, status:false});
//       }      

//       eval(path).push(indexObject)       
//       Pays.updateOne({_id: pays_id}, pays).then(
//         () => {            
//           logger.info(`801 || ${parent_name} indexé `);
//           resolve({message: `parent indexé`, status:false});
//           return true;
//         }
//       ).catch(
//         (error) => {
//           logger.error(`805 || ${error} `);
//           (error) => {
//             reject(new Error(error))
//           }
//         }
//       );
    
//     }
//   ).catch(
//     (error) => {
//       logger.error(`805 || ${error} `);
//       (error) => {
//         reject(new Error(error))
//       }
//     }
//   );
// })
// return indexPromise 
// }


const isDocumentExist=  (code,tab) => {
        for (t of eval(tab))
          if(t.code === code)           
              return true
          return false
          
        }    
  


const getPathById = (pathIndex, id) => {

  for (n of pathIndex){    
     if(n.element_id === id){
         return n.path  
     }
  }
    return false
}

exports.getParentIdById = (pathIndex, id) => {  
  for (n of pathIndex){    
     if(n.element_id === id){
         return n.parent_id  
     }
  }
    return false
}

const getPathInIndexFromId = (tab,id) => {
 liste = tab.sort((a, b) => {
    if (a.id < b.id)
      return -1;
    if (a.id > b.id)
      return 1;
    return 0;
  })
  var First = 0
  var Last = liste.length - 1
    while (First <= Last) {
       var Middle = Math.floor((First+Last)/2)
       if (List[Middle][id] < Index) {
         First = Middle + 1
       } else if (List[Middle][id] > Index) {
         Last = Middle - 1
       } else {
         return List[Middle]
       }
    }
    return false

}



// exports.createNode = async (parent_id, ObjectNode, parent_name) => {  
//   await Pays.findOne({_id:pays_id}).then(
//     (pays) => {
      
//       const path = getPathById(pays.index_pays, parent_id)+ '.'+parent_name    
      
//       if(path === false){
//         logger.error(`803 || parent n\'existe pas `);
//         return({status:false,code:803, message: 'parent n\'existe pas' });
//       }
      
                    
//       if(isExists(eval(path),ObjectNode) === true){
//         logger.error(`805 || element deja dans la base `);
//         return({status:false,code:805, message: 'element deja dans la base' });       
        
//       }
     
//         const nb = eval(path).length   

//          eval(path)[nb]={...ObjectNode,path:eval(path)[nb]}
         
        
//       Pays.updateOne({_id: pays_id}, pays).then(
//         () => {  
//           lastn =  eval(path)[nb]
//           obj = {element_id:lastn._id.toString(), path:path.toString()+"["+(nb)+"]", parent_id:parent_id}
//           //resu = indexerNode(obj,"pays.index_pays" )
//           logger.info(`801 || element créé `);
//           return({status:true,code:801, message: 'element créé' ,path:path.toString()+"["+(nb-1)+"]"});
          
//         }
//       ).catch(
//         (error) => {
//           logger.error(`400 || ${error} `);           
//           return ({
//             error: error
//           });
//         }
//       );
    
//     }
//   ).catch(
//     (error) => {
//       logger.error(`805 || ${error} `);           
//       return({
//         error: error
//       });
//     }
//   ); 

// }

// exports.getOne = (id, pathIndex, parent_name ) => {
//   const getOnePromise = new Promise((resolve, reject) => { // creation de promesse
//     Pays.findOne({_id:pays_id}).then(
//        (pays) => {         
//          pathElement = getPathById(eval(pathIndex), id)
        
//          if(pathElement === false)  {
//            resolve({message: `${parent_name} introuvable `, status:false });
//            return false  
//          }  
//        else {                  
//            resolve({reponse:eval(pathElement), status:true})
//          }
//        }
//      ).catch(
//        (error) => {
//          reject(new Error(error))
//        }
//      ); 
//    })
//      return getOnePromise  
// }



// exports.getAll = (pays, parent_id, pathIndex, parent_name, critere, sData, sCritere) => {   
//     pathElement = getPathById(eval(pathIndex), parent_id) 
           
//       if(pathElement === false)  
//            return({message: `${parent_name} introuvable `, status:false });         
//        else { 
//           var data = eval(pathElement+'.'+parent_name)                            
//           const  data1 = dataFilter(data, critere, sData,sCritere)   
//           return({reponse:data1, status:true})                                 
//           rep = removeChildren(data1,true)                               
//             if(rep === false )                       
//                 return({reponse:data1, status:false})
//              else
//                 return({reponse:rep, status:true})         
//         }
// }

// const dataFilter = (data, critere, sData, sCritere) => {  
//     var tab =[]
//   var n = 0
  
//   exp = ''
//   if(critere !== null){
//     key = Object.keys(critere)
//   for (k of key){
//     if(n===key.length-1){     
//        if(k === '_id')
//          exp = exp + 'd["'+k+'"].toString() === critere["'+k+'"].toString()'
//         else
//         exp = exp + 'd["'+k+'"].toUpperCase() === critere["'+k+'"].toUpperCase()'
//     }
//     else{
//       if(k === '_id')
//          exp = exp + 'd["'+k+'"]..toString() === critere["'+k+'"].toString()'
//       else
//       exp = exp + 'd["'+k+'"].toUpperCase() === critere["'+k+'"].toUpperCase() &&'
//     }  
       
//       n++
//   } 
          
//     if(sCritere !== null){
//       for (d of data){
//           if(eval(exp) && (isExists(d[sData], sCritere) === true )) 
//            tab.push(d) 
//        }    
//       return tab
//      }  
//     else {
//       for (d of data){
//         if(eval(exp)) 
//          tab.push(d) 
//      }    
//     return tab
//     }
//   }
//   else {
//     if(sCritere !== null){
      
//     for (d of data){
//       if((isExists(d[sData], sCritere) === true )) 
//        tab.push(d) 
//    }    
//   return tab
//     }
//     else{
//       return data
//     }
//   }
// }


// exports.getPathEcoleFromChildPath = (childPath) => {
//   pathSplit = childPath.split('.')
//   pathEcole = ''
//   n = 0
//   for(p of pathSplit){
//     if(n < 7)
//       pathEcole = pathEcole + p + '.'
//     n ++
//   }
//     return pathEcole.substring(0,pathEcole.length)
// }


// exports.getAll = (parent_id, pathIndex, parent_name ) => {
//   const getAllPromise = new Promise((resolve, reject) => { // creation de promesse
//     Pays.findOne({_id:pays_id}).then(
//        (pays) => {         
//          pathElement = getPathById(eval(pathIndex), parent_id)        
//          if(pathElement === false)  {
//            resolve({message: `${parent_name} introuvable `, status:false });
//            return false  
//          }  
//        else {  
//              reponse = removeChildren(eval(pathElement+'.'+parent_name),false)
//             if(reponse === false )           
//              resolve({reponse:eval(pathElement+'.'+parent_name), status:true})
//            else
//              resolve({reponse:reponse, status:true})
//          }
//        }
//      ).catch(
//        (error) => {
//          reject(new Error(error))
//        }
//      ); 
//    })
//      return getAllPromise  
 
// }


// exports.nbNodes = (objet,id, path,tabpath, chemin) => {  
//   const nodes = obVide(objet,id, path,tabpath,chemin)  
//   path = nodes[1] 
//   if(nodes[0].length==0)
//     return 1
//   else{
//     var nod =1
//     for(const node of nodes[0][0])      
//         nod = nod + this.nbNodes(node, id,path, nodes[2], nodes[3])
//       }
//     return nod
// }

// exports.getObjectInTreeById = (tree, id) => {   
//   if(tree._id.toString() === id)
//     return(tree)  
//   else{            
//     const famille = getFamilleInObject(tree)   
//     if(famille.length === 0) return false          
//     for(const node of famille)       
//       return this.getObjectInTreeById(node,id)           
//    }
//    return tree
// }

const getFamilleInObject = (ob) => {  
  var tab = []
  val = Object.values(ob._doc)  
  for(const t of val){
    if(Array.isArray(t) === true )         
        tab.push(t)     
  }  
  return tab[0]
}
const getFamilleKeyInObject = (ob) => {  
  var tab = []
  var except = ['telephone', 'classe', 'salle']
  exp = ''
  if(except.length > 0){
    for(ex of except)
    exp = exp + 'key[n] !== "'+ex+'"&&'
    exp = exp.substring(0, exp.length -2)
  }
  
  val = Object.values(ob._doc) 
  key = Object.keys(ob._doc) 
   n=0
   exp1 = 'Array.isArray(t) === true'
   if(exp !== '')
    exp1 = exp1 + '&&'+ exp
   for(const t of val){
    //if(Array.isArray(t) === true && key[n] !== 'telephone' && key[n] !== 'classe'  )         
    if(eval(exp1))         
        tab.push(key[n])
    n++     
  }  
  return [tab, key]
}

const inList = (list, element) => {
  for (l of list)
    if(l === element)
      return true
    return false
    
}

const  removeChildren = (tabResult, child) =>{
  if(child === true){
 if(tabResult.length > 0){ 
    ty = getFamilleKeyInObject(tabResult[0])
    tabfkey = ty[0]
     t= Object.keys(tabResult[0])
    tr = []
    tabOb = ty[1]
    for(t of tabResult){
      obj = {}
      for(tk of tabOb)        
        if(inList(tabfkey, tk) === false)
          obj[tk] = t[tk]
      tr.push(obj)
 }  
 return tr
 }
 return false
}
return tabResult
}

const evaluer =(e)=> {return (new Function('e','return (' + e + ')' )())}

// const obVide = (ob, id, path, tabpath, chemin) => { 
//   var tab = []  
//   var tkey = []  
//   var se = null
//   val = Object.values(ob._doc)  
//   var key = Object.keys(ob._doc)  
//   if(ob._doc._id.toString()===id){     
//      se = ob._doc
//   }
//   var n =0
//   for(const t of val){
//     if(Array.isArray(t) === true ) {        
//         tab.push(t) 
//         tkey.push(key[n])
//     }
//     n++
//   }
//   nb= nbOccurence(tabpath,path)
//   tabpath.push(path)
//   if(path != "pays" )
//      path = path +"["+nb+"]"  

//   chemin.push(path)
//   path = path +"."+ tkey[0]
//   return [tab,path, tabpath,chemin]
// }

// const formatPath = (path) =>{
//   pa = path.split(".")
//   var pat =""
//   for(let i =0;i<pa.length-1;i++)
//     pat=pat+pa[i]+"."
//  return(pat.replace(/,/g, '.'))
// }

// const nbOccurence = (ar, str) => {
//   n = 0  
//   for (a of ar){   
//     if(a === str)
//       n++
//   }
//   return n
// }


exports.codeFormat = (nom,prenom,sexe,tab) => {
  
    const data = tab
    const exp = nom.substring(0,1).toUpperCase() + sexe + prenom.substring(0,1).toUpperCase()
   
    if(data.length >0){        
        last = "00000000";      
        //last = data[data.length -1].code         
      }
    else{
        last="000000";
      }

      lastid=last.substring(3,6);
      enscount=parseInt(lastid);
      trouve = true;

      while(trouve === true) {
        enscount++;

        frmt=enscount;
        if(enscount<10)
           {
          frmt='0000'+frmt;
        }
         else if(enscount<100){
          frmt='000'+frmt;
        }
         else if(enscount<1000){
          frmt='00'+frmt;
        }
         else if(enscount<10000){
          frmt='0'+frmt;
        }
        else{
            frmt=frmt;
          }
          
        frmt=nom.substring(0, 1).toUpperCase()+sexe+prenom.substring(0, 1).toUpperCase()+frmt;
        if(isDocumentExist(frmt,tab) === false)                 
           trouve = false
          
      } 
      return frmt;
    
};


const isDepExists = (tab,objet) => {    
  for (t of tab)
    if(t.nom === objet.nom)
      return true
    return false
  
 };

const isExists = (tab,objet) => { 
   if(objet === null)
     return false
  keyVal = Object.keys(objet)   
  // create expression conditionnelle
  var exp = ''
  var n = 0
 
  for (k of keyVal){
    if(n===keyVal.length-1)
      exp = exp + 't["'+k+'"]=== objet["'+k+'"]'
    else
      exp = exp + 't["'+k+'"]=== objet["'+k+'"] && '
    n++
  }
  
  for (t of tab)
    if(eval(exp) )
      return true
    return false
  
 };


const isIndExists = (tab,objet) => {
   
  for (t of tab)
    if(t.element_id === objet.element_id)
      return true
    return false
  
 };

 exports.getDataToken = (chaine) => {
  let dtoken = null
  try {
  // const token = req.headers.authorization.split(' ')[1];
   const token = chaine.split(' ')[1];   
   if(token){
    
     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET',(err,decodedToken)=>{
      
         if(err)return false;       
         else dtoken = decodedToken
     });     
  }
  else  return false;  
}catch(error) {
  return false;
}
return dtoken
};