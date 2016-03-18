import Pipe from 'pipe-transform/Pipe';
import Property from 'property-seek';
import events from '../../usr/events';
import Controller from '../../mvc/Controller';

class PipeController extends Controller {

    /**
     * filter applies the filters of a pipe associated with this controller
     * @param {string} prop 
     * @param {object} definition 
     * @param {function} next Called only if the filter is successful
     */
    filter(prop, definition, next) {

        var p;
        var spec;
        var pipe;
        var selection;

        selection = definition.pipes[prop];

        spec = (typeof selection === 'object') ? selection :
            this.app.framework.pipes.defines[selection];

        if (!spec)
            throw new Error(`Unknown pipe selection '${selection}' ` +
                `decleared for property '${prop}'!`);

        p = new Pipe(spec, this.app.framework.pipes.filters);

        p.run(Property.get(this.request, prop), (err, o) => {

            if (err)
                return events.emit('pipe-error', err,
                    this.request, this.response, next);

            Property.set(this.request, prop, o);
            next();

        }, this);
    }

}

export default PipeController
