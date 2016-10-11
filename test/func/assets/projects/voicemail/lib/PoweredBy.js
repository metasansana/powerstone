import Promise from 'bluebird';
import OutputFilter from 'pwr/app/filters/OutputFilter';

class PoweredBy extends OutputFilter {

    apply(out, req, res) {

        out.poweredBy = 'pwr';
        return Promise.resolve(out);

    }

}

export default PoweredBy
