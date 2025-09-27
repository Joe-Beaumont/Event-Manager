const db = require('../db/connection');
const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test_data/index.js');

beforeAll(() => seed(data));
afterAll(() => db.end());

describe('seed', () => {
    describe('users table', () => {
        test('users table exists', () => {
            return db
            .query(
                `SELECT EXISTS (
                SELECT FROM 
                information_schema.tables
                WHERE
                table_name = 'users'
                );`
            )
            .then(( {rows : [{ exists }] }) => {
                expect(exists).toBe(true);
            });
        });
    })
})