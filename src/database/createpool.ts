import { createPool } from 'mysql';

export default async function connect(options:object) {

    return new Promise(resolve => {

        const database = createPool(options);

        database.getConnection((error: unknown) => {

            if (error) {
                resolve(false)
            };

            resolve(database);

        });

    });

};