import express from 'express';
import * as signale from 'signale';
import { serverConfig } from './configs/server.config';
import expressConfig from './configs/express.config';

import axios from 'axios';
const app = express();
expressConfig(app);
// Assign environment variables
const endpoint = process.env.API_URL || '';
app.post('/api/v1/product', async (req: any, res: any) => {
  
  try {
    const response = await axios.post(endpoint + '/getProduct', req.body);
    if (response.status === 200 && response.data) {
      const productList = response.data.quotationProductList;
      console.log(productList);
      
      return res.status(200).send({
        data: productList,
        success: true,
      });
    } else {
      throw new Error('No response!');
    }
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});
app.listen(serverConfig.port, () => {
  signale.success(`Server's running at port: ${serverConfig.port}`);
});

export default app;
