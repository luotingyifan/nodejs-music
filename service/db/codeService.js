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
function insert(vCode) {
    var addSql = 'INSERT INTO music_code(v_code, create_date) VALUES (?, now());';
    var addSqlParams = [vCode];

    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
        return result.insertId;
    });
}

function find(vCode, callback) {
    var findSql = 'SELECT * FROM music_code WHERE date_sub(now(), interval 2 minute) < create_date AND v_code=?;';
    var findSqlParams = [vCode];

    connection.query(findSql, findSqlParams, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            callback(null);
        }

        console.log('--------------------------SELECT----------------------------');
        console.log('SELECT: ', result);
        console.log('-----------------------------------------------------------------\n\n');
        callback(result);
    });
}

// connection.end();

module.exports = {
    insert,
    find
};