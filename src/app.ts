import express, { Application } from 'express';
import bodyParser from 'body-parser';
import chatRouter from './routes/chat.route';
import connectDB from './config/database';
import healthRouter from './routes/health';
import cors from 'cors';


class App {
  private app: Application;

  constructor() {
    this.app = express();
    // Connect to MongoDB
    // connectDB();
    const corsOptions = {
      origin: true, // Replace with your Angular app's URL
      credentials: true, // Enable cookie sharing
    };
    this.app.use(cors(corsOptions))
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use('/', healthRouter);
    this.app.use('/chat', chatRouter);
  }

  public start(): void {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default new App().start();
