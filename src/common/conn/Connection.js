/**
 * Connection needs to open to something remotely at application boot time.
 * @interface
 */
class Connection {

    /**
     * open the connection
     * @return {Promise}
     */
    open(){}

    /**
     * close the connection
     * @return {Promise}
     */
    close(){}

    getRaw(){

    }

}

export default Connection