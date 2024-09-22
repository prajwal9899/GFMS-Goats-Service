import { Config } from './config/index';
import app from './app';
import connectDB from './config/db';

const startServer = async () => {
  const PORT = Config.PORT;
  try {
    await connectDB()
    console.log('Database connection successfully !!');
    app.listen(PORT, () => {
      console.log(`Listening on the PORT ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      setTimeout(() => {
        process.exit(1);
      }, 2000);
    }
  }
};

startServer();
