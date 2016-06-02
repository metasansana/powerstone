import methodOverride from 'method-override';
/**
 * MethodOverrideFilter 
 * @implements {Filter}
 */
class MethodOverrideFilter {

  apply(app, config) {

    app.use(methodOverride());

  }

}
export default new MethodOverrideFilter()

