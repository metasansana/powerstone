import PipesFeature from './PipesFeature';
import MiddlewareFeature from './MiddlewareFeature';
import ActionFeature from './ActionFeature';
import ActionDefinitionFeature from './ActionDefinitionFeature';
import HandlerFeature from './HandlerFeature';
import ViewFeature from './ViewFeature';
import Decorator from './Decorator';

/**
 * FeatureFactory 
 */
class FeatureFactory {

    api(app) {

        return new Decorator(new PipesFeature(app),
            new Decorator(new MiddlewareFeature(app),
                new Decorator(new HandlerFeature(app),
                    new Decorator(new ActionFeature(app),
                        new ActionDefinitionFeature(app)))));
    }

    web(app) {

        return new Decorator(new PipesFeature(app),
            new Decorator(new MiddlewareFeature(app),
                new Decorator(new HandlerFeature(app),
                    new Decorator(new ActionFeature(app),
                        new Decorator(new ActionDefinitionFeature(app),
                            new ViewFeature(app))))));
    }


}

export default new FeatureFactory()
