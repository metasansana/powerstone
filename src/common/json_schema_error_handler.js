 export default function(err, req, res, next) {

     if (err.name === 'JsonSchemaValidation') {

         res.status(400);

         var responseData = {
             message: 'Errors occurred during ' + req.method + ' request to ' + req.url + '.',
             errors: err.validations
         };

         if (req.xhr || req.get('Content-Type') === 'application/json') {
             res.json(responseData);
         } else {
             console.log(err.stack);
             res.send();
         }

     } else {
         next(err);
     }
 }
