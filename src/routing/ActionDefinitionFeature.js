import Feature from './Feature';
/**
 * ActionDefinitionFeature 
 */
class ActionDefinitionFeature extends Feature {

    install(method, path, definition, q) {

        if (typeof definition === 'string') 
          if(method !== 'view')
            q.enque(method, this.application.resolveAction(definition, method, null));
        

    }

}
export default ActionDefinitionFeature
