import Intercom from '@intercom/messenger-js-sdk';

Intercom({
  app_id: process.env.INTERCOM_APP_ID, // Use an environment variable for your app ID
});
