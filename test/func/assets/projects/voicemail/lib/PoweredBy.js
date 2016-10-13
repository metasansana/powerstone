import Promise from 'bluebird';
import OutputFilter from 'powerstone/app/filters/OutputFilter';

class PoweredBy extends OutputFilter {

    apply(out, req, res) {

        out.poweredBy = 'powerstone';
        return Promise.resolve(out);

    }

}

export default PoweredBy
