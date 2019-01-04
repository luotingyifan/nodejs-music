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
function insert(receiveEmail, vCode) {
    var addSql = 'INSERT INTO music_mail_code(receive_email, v_code, create_date) VALUES(?, ?, NOW());';
    var addSqlParams = [receiveEmail, vCode];

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

function find(receiveEmail, vCode, callback) {
    var findSql = 'SELECT * FROM music_mail_code WHERE date_sub(now(), interval 120 minute) < create_date AND receive_email=? AND v_code=?;';
    var findSqlParams = [receiveEmail, vCode];

    connection.query(findSql, findSqlParams, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            callback(null);
        }

        console.log('--------------------------SELECT----------------------------');
        console.log('SELECT: ', result);
        console.log('-----------------------------------------------------------------\n\n');
        callback(result[0]);
    });
}

// connection.end();

module.exports = {
    insert,
    find
};