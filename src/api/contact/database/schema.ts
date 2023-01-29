import moongose from 'mongoose';

const contactFormMessageSchema = new moongose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
    },
});

export { contactFormMessageSchema };
