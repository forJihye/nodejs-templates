/**
 * 
 * @typedef {(query: string, params: {[key: string]: any}) => Promise<[import('mysql').MysqlError | null, any, import('mysql').FieldInfo[]]>} QueryPromise
 */

/**
 * 
 * @param {import('mysql').Pool} pool 
 * @return {QueryPromise}
 */
const createQuery = pool => (query, params) => new Promise((resolve, reject) => {
  pool.query(query, params, (err, results, fields) => {
    if (err) return reject(err);
    resolve([results, fields]);
  });
}).catch(err => {
  console.error('query: ', query);
  console.error('params: ', params);
  console.error(err);
  throw err;
});

/**
 * 테스트 필요
 * @param {import('mysql').Pool} pool 
 * @return {(f: QueryPromise) => new Promise<void>}
 */
const createTransaction = pool => f => new Promise((resolve, reject) => pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.beginTransaction(err => {
    if (err) throw err;
    f(createQuery(connection))
      .then(() => {
        connection.commit(err => {
          if (err) throw err;
          resolve();
        });
      })
      .catch(err => rollback(connection).then(() => reject(err)));
  })
}));

const rollback = connection => new Promise(resolve => connection.rollback(resolve));

module.exports = {
  createQuery,
  createTransaction,
  rollback,
};