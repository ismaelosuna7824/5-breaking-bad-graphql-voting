class Database {
    getItems(collection: string, db: any) {
        return db.collection(collection).find().toArray()
    }
    getItemsCount(collection: string, db: any) {
        return db.collection(collection).countDocuments();
    }
    getItemsBy(collection: string, db: any, condition: string, value: number | string) {
        return db.collection(collection).find().toArray()
    }
    insertOne(collection: string, db: any, value: any) {
        db.collection(collection)
                .insertOne(value).then((result: any) => {
                    value.id = result.insertedId;
                })
                .catch((err: any) => {
                    // handle error
                    console.log(err);
            });
    }
}

export default Database;