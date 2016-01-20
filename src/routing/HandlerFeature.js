import Feature from './Feature';
/**
 * HandlerFeature
 */
class HandlerFeature extends Feature {

    install(method, path, definition, q) {

        if (typeof definition.handler === 'function')
            q.enque(method , definition.handler);

    }

}
export default HandlerFeature
