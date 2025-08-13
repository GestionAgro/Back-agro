import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { connectDB } from './config/Database';
import UsuarioRoutes from './routes/UsuarioRoutes';


const app = express();
const port = process.env.PORT || 9000;

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// usuarios
app.use('/usuarios', UsuarioRoutes);


app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
