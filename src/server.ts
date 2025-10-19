import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { connectDB } from './config/Database';
import UsuarioRoutes from './routes/UsuarioRoutes';
import RemitosRoutes from './routes/RemitosRoutes';
import FacturasRoutes from './routes/FacturasRoutes';
import PersonasRoutes from './routes/PersonaRoutes';
import ProductoRoutes from './routes/ProductoRoutes';
import EventoRoutes from  './routes/EventoRoutes';
import AuditoriaFacturaRoutes from './routes/AuditoriaFacturaRoutes';

const app = express();
const port = process.env.PORT || 9000;

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());


// usuarios
app.use('/usuarios', UsuarioRoutes);

//remitos
app.use('/remitos', RemitosRoutes);

//facturas
app.use('/facturas', FacturasRoutes);

//peronas
app.use('/personas', PersonasRoutes);

// productos
app.use('/producto', ProductoRoutes);

// eventos
app.use('/eventos', EventoRoutes);

//auditoria facturas
app.use('/auditoriaFactura', AuditoriaFacturaRoutes);


app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
