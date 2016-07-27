'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libpowerstoneCommonBulkLookup = require('libpowerstone/common/BulkLookup');

var _libpowerstoneCommonBulkLookup2 = _interopRequireDefault(_libpowerstoneCommonBulkLookup);

var _libpowerstoneCommonUnknownResourceLookupError = require('libpowerstone/common/UnknownResourceLookupError');

var _libpowerstoneCommonUnknownResourceLookupError2 = _interopRequireDefault(_libpowerstoneCommonUnknownResourceLookupError);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var lookup;
var makeLookup = function lookup(ret) {
    return {
        lookup: function lookup() {
            return ret;
        }
    };
};

describe('Lookup', function () {

    describe('Lookup#lookup', function () {

        it('should execute the correct lookup', function () {

            lookup = new _libpowerstoneCommonBulkLookup2['default']('nonesense', makeLookup(1));
            lookup.add('mongodb', makeLookup('mongo'));
            lookup.add('memory', makeLookup('mem'));
            lookup.add('require', makeLookup('module'));
            (0, _must2['default'])(lookup.lookup('memory://path/to/somewhere')).be('mem');
        });

        it('should run the default lookup if the string is not a URL', function () {

            lookup = new _libpowerstoneCommonBulkLookup2['default']('memory', makeLookup('mem'));
            lookup.add('mongodb', makeLookup('mongo'));
            lookup.add('require', makeLookup('module'));
            (0, _must2['default'])(lookup.lookup('path/to/somewhere')).be('mem');
        });

        it('should throw an error if an unknown scheme is used', function () {

            lookup = new _libpowerstoneCommonBulkLookup2['default']('memory', makeLookup('mem'));
            lookup.add('mongodb', makeLookup('mongo'));
            lookup.add('require', makeLookup('module'));

            (0, _must2['default'])(function () {
                lookup.lookup('go://path/to/somewhere');
            })['throw'](UnknownLookupError);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L3VuaXQvY29tbW9uL0J1bGtMb29rdXBfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OzZDQUF1QixpQ0FBaUM7Ozs7NkRBQ2pCLGlEQUFpRDs7OztvQkFDdkUsTUFBTTs7OztBQUV2QixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksVUFBVSxHQUFHLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNsQyxXQUFPO0FBQ0gsY0FBTSxFQUFBLGtCQUFHO0FBQ0wsbUJBQU8sR0FBRyxDQUFDO1NBQ2Q7S0FDSixDQUFDO0NBQ0wsQ0FBQzs7QUFFRixRQUFRLENBQUMsUUFBUSxFQUFFLFlBQVc7O0FBRTFCLFlBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBVzs7QUFFakMsVUFBRSxDQUFDLG1DQUFtQyxFQUFFLFlBQVc7O0FBRS9DLGtCQUFNLEdBQUcsK0NBQWUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELGtCQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMzQyxrQkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDeEMsa0JBQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzVDLG1DQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUUvRCxDQUFDLENBQUM7O0FBRUgsVUFBRSxDQUFDLDBEQUEwRCxFQUFFLFlBQVc7O0FBRXRFLGtCQUFNLEdBQUcsK0NBQWUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3JELGtCQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMzQyxrQkFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDNUMsbUNBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRXRELENBQUMsQ0FBQzs7QUFFSCxVQUFFLENBQUMsb0RBQW9ELEVBQUUsWUFBVzs7QUFFaEUsa0JBQU0sR0FBRywrQ0FBZSxRQUFRLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckQsa0JBQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzNDLGtCQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7QUFFNUMsbUNBQUssWUFBVztBQUNaLHNCQUFNLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDM0MsQ0FBQyxTQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUVoQyxDQUFDLENBQUM7S0FFTixDQUFDLENBQUM7Q0FFTixDQUFDLENBQUMiLCJmaWxlIjoiQnVsa0xvb2t1cF90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1bGtMb29rdXAgZnJvbSAnbGlicG93ZXJzdG9uZS9jb21tb24vQnVsa0xvb2t1cCc7XG5pbXBvcnQgVW5rbm93blJlc291cmNlTG9va3VwRXJyb3IgZnJvbSAnbGlicG93ZXJzdG9uZS9jb21tb24vVW5rbm93blJlc291cmNlTG9va3VwRXJyb3InO1xuaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5cbnZhciBsb29rdXA7XG52YXIgbWFrZUxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cChyZXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb29rdXAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmRlc2NyaWJlKCdMb29rdXAnLCBmdW5jdGlvbigpIHtcblxuICAgIGRlc2NyaWJlKCdMb29rdXAjbG9va3VwJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBleGVjdXRlIHRoZSBjb3JyZWN0IGxvb2t1cCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBsb29rdXAgPSBuZXcgQnVsa0xvb2t1cCgnbm9uZXNlbnNlJywgbWFrZUxvb2t1cCgxKSk7XG4gICAgICAgICAgICBsb29rdXAuYWRkKCdtb25nb2RiJywgbWFrZUxvb2t1cCgnbW9uZ28nKSk7XG4gICAgICAgICAgICBsb29rdXAuYWRkKCdtZW1vcnknLCBtYWtlTG9va3VwKCdtZW0nKSk7XG4gICAgICAgICAgICBsb29rdXAuYWRkKCdyZXF1aXJlJywgbWFrZUxvb2t1cCgnbW9kdWxlJykpO1xuICAgICAgICAgICAgbXVzdChsb29rdXAubG9va3VwKCdtZW1vcnk6Ly9wYXRoL3RvL3NvbWV3aGVyZScpKS5iZSgnbWVtJyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBydW4gdGhlIGRlZmF1bHQgbG9va3VwIGlmIHRoZSBzdHJpbmcgaXMgbm90IGEgVVJMJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGxvb2t1cCA9IG5ldyBCdWxrTG9va3VwKCdtZW1vcnknLCBtYWtlTG9va3VwKCdtZW0nKSk7XG4gICAgICAgICAgICBsb29rdXAuYWRkKCdtb25nb2RiJywgbWFrZUxvb2t1cCgnbW9uZ28nKSk7XG4gICAgICAgICAgICBsb29rdXAuYWRkKCdyZXF1aXJlJywgbWFrZUxvb2t1cCgnbW9kdWxlJykpO1xuICAgICAgICAgICAgbXVzdChsb29rdXAubG9va3VwKCdwYXRoL3RvL3NvbWV3aGVyZScpKS5iZSgnbWVtJyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBhbiB1bmtub3duIHNjaGVtZSBpcyB1c2VkJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGxvb2t1cCA9IG5ldyBCdWxrTG9va3VwKCdtZW1vcnknLCBtYWtlTG9va3VwKCdtZW0nKSk7XG4gICAgICAgICAgICBsb29rdXAuYWRkKCdtb25nb2RiJywgbWFrZUxvb2t1cCgnbW9uZ28nKSk7XG4gICAgICAgICAgICBsb29rdXAuYWRkKCdyZXF1aXJlJywgbWFrZUxvb2t1cCgnbW9kdWxlJykpO1xuXG4gICAgICAgICAgICBtdXN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvb2t1cC5sb29rdXAoJ2dvOi8vcGF0aC90by9zb21ld2hlcmUnKTtcbiAgICAgICAgICAgIH0pLnRocm93KFVua25vd25Mb29rdXBFcnJvcik7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG4iXX0=