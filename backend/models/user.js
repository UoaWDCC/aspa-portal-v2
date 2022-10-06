import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const URI =
  "mongodb+srv://wdcc-aspa:12345@cluster0.3rsko.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to database`))
  .catch((error) => console.log(error));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

//module.exports = mongoose.model("userData", userSchema, "userData");
export default mongoose.model("userData", userSchema, "userData");
