import Promise from 'bluebird';
import OutputFilter from 'powerstone/app/filters/OutputFilter';

class Status extends OutputFilter {

    apply(out, req, res) {

        out.status = 'ok';
        return Promise.resolve(out);

    }

}

export default Status
