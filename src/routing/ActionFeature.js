import Feature from './Feature';

/**
 * ActionFeature 
 */
class ActionFeature extends Feature {

    install(method, path, definition, q) {

        switch (typeof definition.action) {

            case 'string':
                q.enque(method, this.application.resolveAction(definition.action, method, definition));
                break;

            case 'function':
                q.enque(method, definition.action);
                break;

            case 'object':
                q.enque(method, definition.action[method].bind(definition.action));
                break;

            default:
                break;
        }

    }

}

export default ActionFeature
