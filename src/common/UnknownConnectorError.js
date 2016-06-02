import PowerError from './PowerError';

/**
 * UnknownConnectorError 
 */
class UnknownConnectorError extends PowerError {

    constructor(key, connector, connectors) {

        super(`The connection '${key}' declares an unknown connector '${connector}'!` +
            `Known connectors-> [${Object.keys(connectors).join(',')}].`);

    }

}

export default UnknownConnectorError
