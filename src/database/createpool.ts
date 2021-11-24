import { createPool } from 'mysql';

export default async function connect(HOST: string, USER: string, PASS: string, DATABASE: string) {

    return new Promise((resolve, reject) => {

        const database = createPool({
            host: HOST,
            user: USER,
            password: PASS,
            database: DATABASE
        });

        database.getConnection((error:any) => {

            if (error) {
                resolve(false)
            };

            resolve(database);

        });

    });

};