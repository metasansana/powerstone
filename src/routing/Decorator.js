/**
 * Decorator abstracts the decorator pattern logic out of the fixtures
 * @param {Fixture} fixture 
 * @param {Fixture} next 
 */
class Decorator {

    constructor(fixture, next) {
        this.fixture = fixture;
        this.next = next;
    }

    install(method, path, framework, definition) {

        this.fixture.install(method, path, framework, definition);
        this.next.install(method, path, framework, definition);

    }

}
export default Decorator
