const jwt = require('jwt-simple');
const SECRET = 'novatac-turma-sabado';

const jwtMid = {

    verify(request, response, next) {
        const token = request.headers['x-jwt'];

        try {
            const decoded = jwt.decode(token, SECRET, true);

            if(decoded.exprires_at < new Date()) {
                throw new Error('Token expirado');
            }

            request.autorization = decoded;
            next();
        }catch(e) {
            e.status = 401;
            next(e);
        }
    },

    auth(request, response, next) {

        const {user, pass}  = request.body

        if(user === 'admin' && pass === 'caneta') {
    
            let payload = {
                exprires_at: tomorrow(),
                user: user,
                api: 'teams novatec'
            }
            let token = jwt.encode(payload, SECRET);
    
            return response.json({ token: token });
        }

        let err = new Error('vaza');
        err.status = 401;
        next(err);
    }
}

function tomorrow() {
    return Date.now() + 24 * 60 * 60 * 1000;
}

module.exports = jwtMid;