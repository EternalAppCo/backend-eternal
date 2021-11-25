import type { AWS } from '@serverless/typescript';
import users, { models as userModels} from '@controllers/users';
import order from '@controllers/orders';
import { chargeOrder , rechargeWallet, transferMoney} from '@controllers/wallet';

const serverlessConfiguration: AWS = {
  service: 'muncher',
  org: 'javierfelipevasquezroldan',
  app: 'muncher-test',
  frameworkVersion: '2',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dotenv-plugin',
    'serverless-openapi-documentation',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { 
    users,
    order,
    chargeOrder,
    rechargeWallet,
    transferMoney
  },
  package: { individually: true },
  custom: {
    documentation:{
      version: '1',
      title: 'Muncher Test API ',
      description: 'This is a muncher test products API',
      models:[
        ...userModels
      ]
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
