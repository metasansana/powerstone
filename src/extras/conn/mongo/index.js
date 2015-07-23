import Connections from '../../../conn/Connections';
import Factory from './Factory';

export default function () {
    Connections.set('mongoose', Factory);
    Connections.set('connect-mongo', Factory);
}