import beof from 'beof';
import Promise from 'bluebird';
import OutputFilter from './OutputFilter';
import AndOutputFilter from './AndOutputFilter';

class LameFilter {

    and(filter) {

        beof({ filter }).instance(OutputFilter);
        return new AndOutputFilter(this, filter);

    }

    apply(out, req, res) {

        return Promise.resolve(out);

    }

}

export default LameFilter
