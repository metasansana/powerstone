import Feature from './Feature';
import merge from 'deepmerge';

/**
 * ViewFeature 
 */
class ViewFeature extends Feature {

    install(method, path, def, q) {

        if (typeof def.view === 'string') {

            return q.enque('get', function(req, res) {

                res.render(def.view, merge({
                    request: req
                }, def.locals||{}), function(err, html) {

                    if (err) {
                        console.log(err.stack);
                        res.status(500).send();
                    }

                    res.send(html);

                });
            });
        }

        if (typeof def === 'string')
            if (method.toLowerCase() === 'view')

                q.enque('get', function(req, res) {

                res.render(def, function(err, html) {

                    if (err) {
                        console.log(err.stack);
                        res.status(500).send();
                    }

                    res.send(html);

                });

            })
    }
}
export default ViewFeature
