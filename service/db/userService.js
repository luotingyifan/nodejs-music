var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    port: '3306',
    database: 'test'
});

connection.connect();

// 增
function insert(user) {
    var addSql = 'INSERT INTO music_user(user_name, user_email, user_password, create_date, update_date) VALUES (?, ?, ?, now(), now());';
    var addSqlParams = [user.userName, user.userEmail, user.userPassword];

    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });
}

// 查
function find(userEmail, callback) {
    var findSql = 'SELECT * FROM music_user WHERE user_email=?;';
    var findSqlParams = [userEmail];

    connection.query(findSql, findSqlParams, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            callback(null);
        }

        console.log('--------------------------SELECT----------------------------');
        console.log('SELECT:', result);
        console.log('-----------------------------------------------------------------\n\n');
        callback(result[0]);
    });
}

// 查
function findByEmailAndPassword(userEmail, userPassword, callback) {
    var findSql = 'SELECT * FROM music_user WHERE user_email=? AND user_password=?;';
    var findSqlParams = [userEmail, userPassword];

    connection.query(findSql, findSqlParams, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            callback(null);
        }

        console.log('--------------------------SELECT----------------------------');
        console.log('SELECT:', result);
        console.log('-----------------------------------------------------------------\n\n');
        callback(result);
    });
}

// connection.end();

module.exports = {
    insert,
    find,
    findByEmailAndPassword
};