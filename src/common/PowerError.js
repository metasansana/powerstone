
/**
 * PowerError is the parent class of all non-standard errors 
 * this framework throws
 */
class PowerError extends Error {

  constructor(m) {

    super(m);
    this.name = this.constructor.name;
    this.message = m;
    Error.captureStackTrace(this, this.constructor);

  }

}
export default PowerError

