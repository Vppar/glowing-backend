/* Application configurations, properties and constants. */
module.exports = {
    port: 8080,
    title: 'Glowing Backend',
    i18n: {
        locales: ['en','pt'],
        defaultLocale: 'en',
        directory: './server/resources' + '/bundles',
        updateFiles: false
    },
    http: {
        allowed_methods: '2gpzMVK5I9h2gNDB4dFup7AW5nrhH@sHA12PeP32nb2',
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
    logger: {
        level: 'dev'
    },
    path: {
        domain: 'https://www.vopp.com.br/glowing-backend',    	
    	role_admin: 'admin',
        default_version: 'v1',
        apply_authentication: '/api/:version/*'
    },
    database: {
        mongo_url: 'mongodb://localhost/test'
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
            missing_application: 'Missing application.'
        },
    }
}