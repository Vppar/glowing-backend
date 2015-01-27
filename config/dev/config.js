//=============================================================================
// APPLICATION CONFIGURATION FOR DEV ENVIRONMENT
//=============================================================================
module.exports = {
    port: 8080,
    title: 'Glowing Backend',
    name: 'glowing-backend',
    i18n: {
        locales: ['en', 'pt'],
        defaultLocale: 'en',
        base_directory: './server/resources/',
        bundles_directory: 'bundles',
        updateFiles: false
    },
    http: {
        allowed_methods: 'GET,PUT,POST,DELETE,OPTIONS',
        allowed_headers: 'Content-type,Accept,X-Access-Token,X-Key',
        aloww_origin: '*',
        ok: 200,
        bad_request: 400,
        unauthorized: 401,
        forbidden: 403,
        not_found: 404,
        precondition_failed: 412,
        internal_server_error: 500

    },
    auth: {
        jwt_token_secret: '2gpzMVK5I9h2gNDB4dFup7AW5nrhH@sHA12PeP32nb2',
        daysOfTokenValidate: 7
    },
    auth_admin: {
        token: '2dufia9qnsk@jdna392jspa81djdH1aH93nd',
        username: 'Carla Sofia',
        password: 'admin'
    },
    logger: {
        level: 'dev'
    },
    path: {
        domain: 'https://vopp.com.br/glowing-backend',
        role_admin: 'admin',
        default_version: 'v1',
        apply_authentication_all_endpoints: '/api/:version/*',
        apply_authentication_users_endpoint: '/api/:version/users'
    },
    database: {
        mongo_url: 'mongodb://localhost/test',
        max_result: 100,
        default_sort: {'changeDateTime': 1},
        default_fromPage: 0
    },
    error: {
        validation_error: 'ValidationError'
    },
    message: {
        server: {
            listening: 'Serving listening on port',
            config_not_loaded: 'You must define NODE_ENV variable with (dev, qa or prd) before start the server.'
        },
        database: {
            mongo_connected: 'Connected to MongoDB ...'
        },
        route: {
            missing_application: 'Missing application.',
            user_required_to_generate_token: 'User is required to generate application token.',
            invalid_request_parameters: 'Invalid request parameters.'
        },
        error: {
            error_message_null: 'Error message can not be null.'
        },
        services: {
            index_invalid_func: 'Function attribute can not be null.',
            index_invalid_req: 'Request attribute can not be null.',
            index_invalid_method: 'Method attribute can not be null.',
            index_method_not_implemented: 'Method not implemented.'
        },
        i18n: {
            json_file_with_invalid_format: 'Please, verify the format of resource bundles files.'
        }
    }
}