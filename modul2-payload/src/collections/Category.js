import payload from 'payload';

/** @type {import('payload/types').CollectionConfig} */
const Category = {
    slug: "Category",
    access: {
        read : () => true,
        create : () => true,
        update : () => true,
        delete : () => true
    },
    admin: {
        useAsTitle: "name"
    },
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == "create") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "category",
                            action : "create",
                            timestamp: new Date()
                        },
                    });
                } else if (args.operation == "update") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "category",
                            action : "update",
                            timestamp: new Date()
                        },
                    });
                } else if (args.operation == "delete") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "category",
                            action : "delete",
                            timestamp: new Date()
                        },
                    });
                }
            },
        ],
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Category Name",
        },
        {
            name: "email",
            type: "email",
            required: true,
            label: "User Email",
        },
    ]
}

export default Category