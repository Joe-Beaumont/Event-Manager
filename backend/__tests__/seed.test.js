const db = require('../db/connection');
const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test_data/index.js');

beforeAll(() => seed(data));
afterAll(() => db.end());

describe('creating tables', () => {
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
        test('users table contains user_id as integer', () => {
            return db
            .query(
                `SELECT * 
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'user_id';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('user_id');
                expect(column.data_type).toBe('integer');
            });
        });
        test('users table contains email as varying character', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'email';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('email');
                expect(column.data_type).toBe('character varying');
            });
        });
        test('users table contains password as varying character', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'password';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('password');
                expect(column.data_type).toBe('character varying');
            });
        });
        test('users table contains role as varying character', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'role';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('role');
                expect(column.data_type).toBe('character varying');
            });
        });
    });
    describe('events table', () => {
        test('events table exists', () => {
            return db
            .query(
                `SELECT EXISTS (
                SELECT FROM 
                information_schema.tables
                WHERE
                table_name = 'events'
                );`
            )
            .then(( {rows: [{ exists }] }) => {
                expect(exists).toBe(true);
            });
        });
        test('events table contains id as integer', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'events'
                    AND column_name = 'event_id';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('event_id');
                expect(column.data_type).toBe('integer');
            });
        });
        test('events table contains name as text', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'events'
                    AND column_name = 'name';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('name');
                expect(column.data_type).toBe('text');
            });
        });
        test('events table contains description as text', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'events'
                    AND column_name = 'description';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('description');
                expect(column.data_type).toBe('text');
            });
        });
        test('events table contains date as date', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'events'
                    AND column_name = 'date';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('date');
                expect(column.data_type).toBe('date');
            });
        });
        test('events table contains time as time', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'events'
                    AND column_name = 'time';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('time');
                expect(column.data_type).toBe('time without time zone');
            });
        });
        test('events table contains created_by as integer', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'events'
                    AND column_name = 'created_by';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('created_by');
                expect(column.data_type).toBe('integer');
            });
        });
    });
    describe('attending table', () => {
        test('attending table exists', () => {
            return db
            .query(
                `SELECT EXISTS (
                SELECT FROM 
                information_schema.tables
                WHERE
                table_name = 'attending'
                );`
            )
            .then(( {rows: [{ exists }] }) => {
                expect(exists).toBe(true);
            });
        });
        test('attending table contains id as integer', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'attending'
                    AND column_name = 'attending_id';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('attending_id');
                expect(column.data_type).toBe('integer');
            });
        });
        test('attending table contains event_id as integer', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'attending'
                    AND column_name = 'event_id';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('event_id');
                expect(column.data_type).toBe('integer');
            });
        });
        test('attending table contains user_id as integer', () => {
            return db
            .query(
                `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'attending'
                    AND column_name = 'user_id';`
            )
            .then(({ rows: [column] }) => {
                expect(column.column_name).toBe('user_id');
                expect(column.data_type).toBe('integer');
            });
        });
    });
});
describe('populating tables', () => {
    test('users table has been populated correctly', () => {
        return db
        .query(`SELECT * FROM users;`)
        .then(({ rows: users }) => {
            expect(users).toHaveLength(10);
            users.forEach((user) => {
                expect(user).toHaveProperty('user_id');
                expect(user).toHaveProperty('email');
                expect(user).toHaveProperty('password');
                expect(user).toHaveProperty('role');
            });
        });
    });
    test('events table has been populated correctly', () => {
        return db
        .query(`SELECT * FROM events;`)
        .then(( {rows: events }) => {
            expect(events).toHaveLength(10);
            events.forEach((event) => {
                expect(event).toHaveProperty('event_id');
                expect(event).toHaveProperty('name');
                expect(event).toHaveProperty('description');
                expect(event).toHaveProperty('date');
                expect(event).toHaveProperty('time');
                expect(event).toHaveProperty('created_by');
            });
        });
    });
    test('attending table has been populated correctly', () => {
        return db
        .query(`SELECT * FROM attending;`)
        .then(( {rows: attending }) => {
            expect(attending).toHaveLength(10);
            attending.forEach((attending) => {
                expect(attending).toHaveProperty('attending_id');
                expect(attending).toHaveProperty('user_id');
                expect(attending).toHaveProperty('event_id');
            });
        });
    });
});