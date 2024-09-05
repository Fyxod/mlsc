import connectMongo from "../db/mongoose.js";
import Form from "../models/forms.js";

export default async function deleteResponses() {
    try {
        await connectMongo();
        await Form.deleteMany({});
        console.log("Responses deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

deleteResponses();