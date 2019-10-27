import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import authRoutes from '../routes/auth.routes';

const app = express();

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.set('strict routing', true);

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.redirect('/swagger');
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
