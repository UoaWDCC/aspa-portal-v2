/*
 * Steps to receive webhooks
 * 
 * You can start receiving event notifications in your app using the steps in this section:
 * 
 * - Identify the events you want to monitor and the event payloads to parse.
 *      - checkout.session.async_payment_succeeded
 * - Create a webhook endpoint as an HTTP endpoint (URL) on your local server.
 *      - router.post('/stripe_webhooks', foo);
 * - Handle requests from Stripe by parsing each event object and returning 2xx response status codes.
 * - Test that your webhook endpoint is working properly using the Stripe CLI.
 * - Deploy your webhook endpoint so it’s a publicly accessible HTTPS URL.
 * - Register your publicly accessible HTTPS URL in the Stripe dashboard.
 */