const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const db = require('../app');
const { viewOrders } = require('./view');


// ACCESS CONTROL  || CONTROLE DE ACESSO
    // Login Function | Função de Login
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
                if (!results.length || !(await bcrypt.compare(password, results[0].password) )) {
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

    // Logout Function | Função de Logout
    exports.logout = async (req, res) => {
        res.cookie('jwt', 'user-logout', {
            expires: new Date(Date.now()+ 1*1000),
            httpOnly: true
        });

        //Other possible form | Outra forma possível:
        //res.clearCookie("jwt" ,{
        //    httpOnly: true
        //});

        res.status(200).redirect('/login');
    }

    // Login Check | Verificação de Login
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

    // Login Check for Index | Verificação de Login para index.hbs
    exports.isLoggedInIndex = async (req, res, next) => {
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
                    data = new Date();

                    Date.prototype.getMesEmPortugues = function() {
                        if (this.getMonth() == 0){this.mesPt = "Janeiro"};
                        if (this.getMonth() == 1){this.mesPt = "Fevereiro"};
                        if (this.getMonth() == 2){this.mesPt = "Março"};
                        if (this.getMonth() == 3){this.mesPt = "Abril"};
                        if (this.getMonth() == 4){this.mesPt = "Maio"};
                        if (this.getMonth() == 5){this.mesPt = "Junho"};
                        if (this.getMonth() == 6){this.mesPt = "Julho"};
                        if (this.getMonth() == 7){this.mesPt = "Agosto"};
                        if (this.getMonth() == 8){this.mesPt = "Setembro"};
                        if (this.getMonth() == 9){this.mesPt = "Outubro"};
                        if (this.getMonth() == 10){this.mesPt = "Novembro"};
                        if (this.getMonth() == 11){this.mesPt = "Dezembro"};
                    };
                    data.getMesEmPortugues();
                    mes = data.mesPt

                    Date.prototype.getDiaEmPortugues = function() {
                        if (this.getDay() == 0){this.diaPt = "Dom"};
                        if (this.getDay() == 1){this.diaPt = "Seg"};
                        if (this.getDay() == 2){this.diaPt = "Ter"};
                        if (this.getDay() == 3){this.diaPt = "Qua"};
                        if (this.getDay() == 4){this.diaPt = "Qui"};
                        if (this.getDay() == 5){this.diaPt = "Sex"};
                        if (this.getDay() == 6){this.diaPt = "Sab"};
                    };
                    data.getDiaEmPortugues();
                    dia = data.diaPt

                    db.query('SELECT count(status) as "contagem", status FROM orders GROUP BY status', async (error, fields) => {
                        if(error){
                            console.log(error);

                        } 
                       
                        if(fields){
                            console.log(fields); 
                            order = await fields; 
                            
                            return next();
                        }
                    });

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


// FORM INSERTS || FORMULÁRIOS DE INSERÇÃO
    // User register Function | Função de cadastro de usuário
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
                return res.render('userRegister', {
                    alertmessage: 'Este e-mail já está em uso'
                })
            } else if( password !== passwordConfirm ) {
                return res.render('userRegister', {
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
                    return res.render('successMessage', {
                        successmessage: 'Usuário criado'
                    });
                }
            })
            
        });

    };

    // Equipment register Function | Função de cadastro de equipamentos
    exports.equipmentRegister = (req, res) => {
        console.log(req.body);

        const { equipment_type, made, model, price, description } = req.body;

        db.query('INSERT INTO equipments SET ?', { provider: equipment_type, manufacturer: made, model: model, price: price, description: description}, (error, results) => {

            if(error) {
                console.log(error);
                return res.render('successMessage', {
                    errormessage: 'Erro ao cadastrar equipamento!'
                });
            } else {
                console.log(results);
                return res.render('successMessage', {
                    successmessage: 'Equipamento cadastrado'
                });
            }
        });
    };

    // Os Function | Função de Os
    exports.osRegisterOnly = (req, res) => {
        console.log(req.body);

        const { identify } = req.body;
        db.query('SELECT id, provider, manufacturer, model FROM equipments', (error, rows) => {
            if(error) {
            console.log(error);
            res.redirect.status(404);
            }
            if (rows.length > 0){
                db.query('SELECT * from customers WHERE identify = ?', [identify], (error, results) => {
                    if (error) {
                        console.log(error);
                    }
                    if (results.length > 0) {
                        console.log(rows);
                        return res.render('osRegister', {
                            customer: results[0],
                            equipment: rows
                        });
                    }
        
                });

            } else {
                db.query('SELECT * from customers WHERE identify = ?', [identify], (error, results) => {
                    if (error) {
                        console.log(error);
                    }
                    if (results.length > 0) {
                        console.log(rows);
                        return res.render('osRegister', {
                            customer: results[0],
                            emptymessage: "Nenhum equipamento cadastrado!"
                        });
                    }
                });
            }
        });   
    }

    exports.notOsRegisterOnly = (req, res) => {
        console.log(req.body);

        db.query('SELECT id, provider, manufacturer, model FROM equipments', (error, rows) => {
            if(error) {
            console.log(error);
            res.redirect.status(404);
            }

            if (rows.length > 0){
                console.log(rows);
                return res.render('osCustomerRegister', {
                    equipment: rows
                });
            } else {
                return res.render('osCustomerRegister', {
                    emptymessage: "Nenhum equipamento cadastrado!"
                });
            }
        }); 
    }

    // Os Function | Função de Os
    exports.osRegister = (req, res) => {
        console.log(req.body);

        const {customer_id, responsible, os_type, description, status, equipment_situation} = req.body;
        let initial_date = new Date();

        // check the type of equipment input | checar o tipo de inserção de equipamento
        // if new equipment
        if (equipment_situation == "new"){
            const { provider_type, made, model, price, equipment_description } = req.body;

            db.query('INSERT INTO equipments SET ?', { provider: provider_type, manufacturer: made, model: model, price: price, description: equipment_description}, async (error, results) => {

                if(error) {
                    console.log(error);
                    return res.render('successMessage', {
                        errormessage: 'Erro ao cadastrar equipamento!'
                    });
                } else {
                    let id_equip = await results.insertId;

                    db.query('INSERT INTO orders SET ?', { customer_id, responsible, description, type: os_type, status, initial_date}, async (error, results) => {
                        if(error) {
                            console.log(error);
                            return res.render('successMessage', {
                                errormessage: 'Erro ao cadastrar a Ordem de serviço'
                            });
                        } else {
                            console.log(results);
                            let id_os = await results.insertId;

                            db.query('INSERT INTO orders_equipments SET ?', {equipment_id: id_equip, order_id: id_os}, (error, results) => {
                                if(error){
                                    console.error(error);
                                    return res.render('successMessage', {
                                        errormessage: 'Erro ao vincular equipamento à ordem de serviço'
                                    });
                                } else {
                                    console.log(results);
                                    return res.render('successMessage', {
                                        successmessage: 'Ordem de serviço cadastrada'
                                    });
                                };
                            });    
                        }
                    });
                }
            });
        // if old equipment
        } else if (equipment_situation == "old") {
            const { equipment_id } = req.body;

            db.query('INSERT INTO orders SET ?', { customer_id, responsible, description, type: os_type, status, initial_date}, async (error, results) => {
                if(error) {
                    console.log(error);
                    return res.render('successMessage', {
                        errormessage: 'Erro ao cadastrar a Ordem de serviço'
                    });
                } else {
                    console.log(results);
                    let id_os2 = await results.insertId;

                    db.query('INSERT INTO orders_equipments SET ?', {equipment_id, order_id: id_os2}, (error, results) => {
                        if(error){
                            console.error(error);
                            return res.render('successMessage', {
                                errormessage: 'Erro ao vincular equipamento à ordem de serviço'
                            });
                        } else {
                            console.log(results);
                            return res.render('successMessage', {
                                successmessage: 'Ordem de serviço cadastrada'
                            });
                        };
                    });    
                }
            });
        }
    };

    // os and customer Function | Função de os e cliente
    exports.osCustomerRegister = (req, res) => {
        console.log(req.body);

        // Short form | forma curta:
        const { customerName, identify, telephone, adress, adressNumber, cep, adressComplement, responsible, description, os_type, status, equipment_situation} = req.body;


        db.query('SELECT * FROM customers WHERE identify = ?', [identify], (error, results) => {
            if(error) {
                console.log(error);
            }

            if(results.length > 0) {
                return res.render('osCustomerRegister', {
                    alertmessage: 'Cliente já cadastrado'
                });
            } 

            db.query('INSERT INTO addresses SET ?', { street: adress, number: adressNumber, cep: cep, complement: adressComplement}, async (error, results) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(results);
                    
                }

                let addresses_id = await results.insertId;


                db.query('INSERT INTO customers SET ?', { name: customerName, telephone: telephone, identify: identify, adress_id: addresses_id }, async (error, result) => {
                    if(error) {
                        console.log(error);
                    } else {
                        console.log(result);

                    }
                
                    let customer_id = await result.insertId;
                    let initial_date = new Date();

                    // check the type of equipment input | checar o tipo de inserção de equipamento
                    // if new equipment
                    if (equipment_situation == "new"){
                        const { provider_type, made, model, price, equipment_description } = req.body;
            
                        db.query('INSERT INTO equipments SET ?', { provider: provider_type, manufacturer: made, model: model, price: price, description: equipment_description}, async (error, results) => {
            
                            if(error) {
                                console.log(error);
                                return res.render('successMessage', {
                                    errormessage: 'Erro ao cadastrar equipamento!'
                                });
                            } else {
                                let id_equip = await results.insertId;
            
                                db.query('INSERT INTO orders SET ?', { customer_id, responsible, description, type: os_type, status, initial_date}, async (error, results) => {
                                    if(error) {
                                        console.log(error);
                                        return res.render('successMessage', {
                                            errormessage: 'Erro ao cadastrar a Ordem de serviço'
                                        });
                                    } else {
                                        console.log(results);
                                        let id_os = await results.insertId;
            
                                        db.query('INSERT INTO orders_equipments SET ?', {equipment_id: id_equip, order_id: id_os}, (error, results) => {
                                            if(error){
                                                console.error(error);
                                                return res.render('successMessage', {
                                                    errormessage: 'Erro ao vincular equipamento à ordem de serviço'
                                                });
                                            } else {
                                                console.log(results);
                                                return res.render('successMessage', {
                                                    successmessage: 'Ordem de serviço cadastrada'
                                                });
                                            };
                                        });    
                                    }
                                });
                            }
                        });
                    // if old equipment
                    } else if (equipment_situation == "old") {
                        const { equipment_id } = req.body;
            
                        db.query('INSERT INTO orders SET ?', { customer_id, responsible, description, type: os_type, status, initial_date}, async (error, results) => {
                            if(error) {
                                console.log(error);
                                return res.render('successMessage', {
                                    errormessage: 'Erro ao cadastrar a Ordem de serviço'
                                });
                            } else {
                                console.log(results);
                                let id_os2 = await results.insertId;
            
                                db.query('INSERT INTO orders_equipments SET ?', {equipment_id, order_id: id_os2}, (error, results) => {
                                    if(error){
                                        console.error(error);
                                        return res.render('successMessage', {
                                            errormessage: 'Erro ao vincular equipamento à ordem de serviço'
                                        });
                                    } else {
                                        console.log(results);
                                        return res.render('successMessage', {
                                            successmessage: 'Ordem de serviço cadastrada'
                                        });
                                    };
                                });    
                            }
                        });
                    }
                });
            });
        });
    };

    // Customer verify function | Função de verificação de cliente
    exports.customerVerify = (req, res) => {
        console.log(req.body);

        // Short form | forma curta:
        const { identify } = req.body;

        db.query('SELECT * FROM customers WHERE identify = ?', [identify], (error, results) => {
            if(error) {
                console.log(error);
            }

            if(results.length > 0) {
                res.render('customerVerify', {
                    successmessage: 'Cliente já cadastrado, deseja utilizar o cadastro existente?',
                    customer: results[0] 
                });
            
            } else if(!results.length) {
                res.render('customerVerify', {
                    alertmessage: 'Cliente não cadastrado'
                });
            
            }

            
        });

    };

    // customer register Function | Função de cadastro de cliente
    exports.customerRegister = (req, res) => {
        console.log(req.body);

        // Short form | forma curta:
        const { customerName, identify, telephone, adress, adressNumber, cep, adressComplement} = req.body;

        db.query('SELECT * FROM customers WHERE identify = ?', [identify], (error, results) => {
            if(error) {
                console.log(error);
            }

            if(results.length > 0) {
                return res.render('customerRegister', {
                    alertmessage: 'Cliente já cadastrado'
                });
            } 

            db.query('INSERT INTO addresses SET ?', { street: adress, number: adressNumber, cep: cep, complement: adressComplement}, async (error, results) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(results);
                    
                }

                let addresses_id = await results.insertId;


                db.query('INSERT INTO customers SET ?', { name: customerName, telephone: telephone, identify: identify, adress_id: addresses_id }, (error, results) => {
                    if(error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        return res.render('successMessage', {
                            successmessage: 'Cliente criado'
                        });
                    }
                });
            });
            
        });

    };

    exports.osEdit = (req, res) => {
        console.log(req.body);

        const {order_id, responsible, os_type, description, status} = req.body;

        let param = [
            {responsible: responsible, description: description, type: os_type, status: status},
            order_id
        ];

            try {
                db.query('UPDATE orders SET ? WHERE id = ?', param, (error, results) => {
                    if(error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        return res.render('successMessage', {
                            successmessage: 'Ordem de serviço editada'
                        });
                    }
                });

            } catch (error) {
                return console.error(error);
            }
};






