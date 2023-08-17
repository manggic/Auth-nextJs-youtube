import mongoose,{ConnectOptions} from "mongoose";

const { MONGO_URL } = process.env;

export const connect = async () => {
  try {

    const mongoURL = MONGO_URL! || "mongodb://127.0.0.1:27017/myapp"

    console.log('mongoURL ?????',mongoURL);
    
     await mongoose.connect(
       mongoURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    mongoose.connection.on('connected',()=>{
        console.log('MONGO_DB CONNECTED');
        
    })
  } catch (error) {
    console.log("DB connection failed!!!");
    console.log("DB ERROR", error);
  }
};
