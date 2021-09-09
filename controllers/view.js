const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const db = require('../app');


// QUERYS TO SHOW IN PAGE || CONSULTAS PARA EXIBIR NA PÁGINA

    exports.viewOrders = async (req,res) => {
        try {

        db.query('SELECT o.id, c.name, c.identify, o.responsible, o.status, o.type FROM orders AS o INNER JOIN customers as c ON c.id = o.customer_id ORDER BY o.initial_date DESC;', async (error, rows) => {
            if(error){
                console.log(error)

            } else if(rows.length > 0) {
                return res.render('viewOrders', {
                    items: rows 
                });


            } else {
                return res.render('viewOrders', {
                    alertmessage: "Nenhuma ordem de serviço cadastrada"
                })
            }
        });


        } catch (error) {
            console.log(error);
        }
    };
    
    exports.orderEdit = async (req,res) => {
        try {
            console.log(req.params.id);
            id = req.params.id

        db.query('SELECT * FROM orders WHERE id = ?', [id], async (error, result) => {
            if(error){
                console.log(error);
            }  
            
            if(result.length > 0) {
                console.log(result);
                let customer_id = await result[0].customer_id;
                let order = result[0];

                let orderType;
                let open, progress, closed;
    

                if(order.type == "Requisição"){
                    orderType = true;
                } else if (order.type == "Incidente"){
                    orderType = false;
                };

                if(order.status =="Aberto"){
                    open = true;
                }
                else if(order.status =="Em andamento"){
                    progress = true;
                }
                else if(order.status =="Fechado"){
                    closed = true;
                }
            
                db.query('SELECT * FROM customers WHERE id = ?', [customer_id], async (error, result)=> {
                    if(error){
                        console.log(error);
                    }
                    
                    if(result.length > 0){
                        res.render('osEdit',{
                            order,
                            orderType,
                            open, progress, closed,
                            customer: result[0]
                        });
                    }

                });
            }
        });         

        } catch (error) {
            console.log(error);
        }
    };

// DELETES
    exports.orderDelete = async (req,res) => {
        try {
            console.log(req.params.id);
            id = req.params.id

            db.query('DELETE FROM orders WHERE id = ?', [id], async (error, result) => {
                if(error){
                    return console.log(error);
                }  
                
                else if(result) {
                    console.log(result);
                    db.query('SELECT o.id, c.name, c.identify, o.responsible, o.status, o.type FROM orders AS o INNER JOIN customers as c ON c.id = o.customer_id ORDER BY o.initial_date DESC;', async (error, rows) => {
                        if(error){
                            console.log(error)
            
                        } else if(rows.length > 0) {
                            return res.render('viewOrders', {
                                items: rows, 
                                successmessage: "Ordem de serviço apagada!"
                            });
            
            
                        } else {
                            return res.render('viewOrders', {
                                alertmessage: "Nenhuma ordem de serviço cadastrada"
                            })
                        }
                    });
                }
            });      

        } catch (error) {
            console.log(error);
        }
    };