import crypto from 'crypto';

var defaultSecret = process.env.SECRET || crypto.randomBytes(64).toString('hex');
export default  {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    session: {
        name: 'PHPSESSIONID',
        secret: defaultSecret,
        resave: false,
        saveUninitialized: true
    },
    csrf: {
        enabled: true
    },
    secret: defaultSecret
};