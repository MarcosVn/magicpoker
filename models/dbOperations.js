module.exports = {
  getUsers: function(req, res) {    
        var pg = require('pg');        
        //You can run command "heroku config" to see what is Database URL from Heroku belt
        var conString = process.env.DATABASE_URL || "postgres://postgres:araujo123@localhost:5432/magicpoker";
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("select * from users");
        query.on("row", function (row, result) { 
            result.addRow(row); 
        });
        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },
    addUser : function(req, res){
        var pg = require('pg');         
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:araujo123@localhost:5432/magicpoker";
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("insert into users (login,passwd,email,logged) "+ 
                                "values ('"+req.query.usuario+"','"+req.query.senha+"','"+
                                    req.query.email+"','"+req.query.logged+"')");    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });
    },    
     delUser : function(req, res){
        var pg = require('pg');           
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:araujo123@localhost:5432/magicpoker";
        var client = new pg.Client(conString);
        client.connect();         
        var query = client.query( "Delete from users Where id ="+req.query.id);    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });
    },

    getLoggedUser: function(req, res) {    
        var pg = require('pg');        
        //You can run command "heroku config" to see what is Database URL from Heroku belt
        var conString = process.env.DATABASE_URL || "postgres://postgres:araujo123@localhost:5432/magicpoker";
        var client = new pg.Client(conString);
        client.connect();
        var nickname = req.query.nickname;
        var nic
        console.log(nickname);
        var query = client.query("select * from users where login ='"+req.query.nickname+"'");
        query.on("row", function (row, result) { 
            result.addRow(row); 
        });
        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  }
};