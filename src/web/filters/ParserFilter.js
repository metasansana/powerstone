import parser from 'body-parser';

/**
 * ParserFilter 
 * @implements {Filter}
 * TODO multipart/form-data support
 */
class ParserFilter {

    apply(app, config) {

        if (config.read(config.keys.FILTERS_PARSER_JSON_ENABLED, true))
            app.use(parser.json(config.keys.FILTERS_PARSER_JSON_OPTIONS, null))

        if (config.read(config.keys.FILTERS_PARSER_URLENCODED_ENABLED, true))
            app.use(parser.urlencoded(config.read(config.keys.FILTERS_PARSER_URLENCODED_OPTIONS, {
                extended: true
            })))

        if (config.read(config.keys.FILTERS_PARSER_RAW_ENABLED, false))
            app.use(parser.raw(config.keys.FILTERS_PARSER_RAW_OPTIONS, null))

        if (config.read(config.keys.FILTERS_PARSER_TEXT_ENABLED, false))
            app.use(parser.text(config.keys.FILTERS_PARSER_TEXT_OPTIONS, null))



    }

}

export default new ParserFilter()
