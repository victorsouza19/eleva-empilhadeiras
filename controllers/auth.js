const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

db = require('../app');


exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password ) {
            return res.status(400).render('login', {
                alertmessage: 'Por favor, insira o e-mail e senha'
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password) )) {
                res.status(401).render('login', {
                    alertmessage: 'E-mail ou senha incorretos'
                });
            } else {
                const id = results[0].id;

                // creating the jwt token | Criando o token jwt e configurando a expiração
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                // configurando a expiração dos cookies
                const cookieOptions = {
                    expires: new Date(
                        // convertendo a data de expiração para milissegundos
                        Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                // enviando o cookie para o browser
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }
        });



    } catch (error) {
        console.log(error);
    }
};

exports.register = (req, res) => {
    console.log(req.body);

    // EXTENDED FORM | FORMA ESTENDIDA: 
    // const name = req.body.name;
    // const email = req.body.email;
    // const role = req.body.role;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

    // Short form | forma curta:
    const { name, email, role, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        }

        if(results.length > 0) {
            return res.render('create-user', {
                alertmessage: 'Este e-mail já está em uso'
            })
        } else if( password !== passwordConfirm ) {
            return res.render('create-user', {
                alertmessage: 'As senhas não coincidem'
            });
        }

        // Encriptando a senha
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, role: role, password: hashedPassword }, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('create-user', {
                    successmessage: 'Usuário criado'
                });
            }
        })
        
    });

};

exports.isLoggedIn = async (req, res, next) => {
    //console.log(req.cookies);
    if(req.cookies.jwt) {
        try {
            // 1) verify the token | verificar o token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
                );

            console.log(decoded);

            // 2) check if the user still exists | verificar se o usuário existe 
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
                console.log(result);

                if(!result) {
                    return next();
                }

                req.user = result[0];
                return next();

            });

        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }
}

exports.logout = async (req, res) => {
    res.cookie('jwt', 'user-logout', {
        expires: new Date(Date.now()+ 2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/login');
}