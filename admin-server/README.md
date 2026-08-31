# Logic Nest Admin Backend

This folder contains the deployment notes for the private admin backend.

## Important
A secure backend cannot run on GitHub Pages. Deploy the Node/Express server from `server/` to a Node-capable host.

## Webcam access
The recommended secure approach is **WebAuthn/passkeys**, which can use the device's built-in biometric authentication (Windows Hello, Touch ID, Android biometrics). A normal website cannot securely treat arbitrary webcam face recognition as an authentication factor without a trusted biometric system.

For a webcam command, run the local development server with:

```bash
npm install
npm run dev
```

Then open the admin URL and use the browser's permission prompt. Do not expose a camera stream or face images to GitHub Pages.

## Environment variables
Set these on the server/hosting provider, never in GitHub source:

- `ADMIN_PASSWORD_HASH`
- `JWT_SECRET`
- `PORT`
- `NODE_ENV=production`

The public site remains static and does not receive the password or JWT secret.
