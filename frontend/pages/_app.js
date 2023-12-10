// pages/_app.js
import React from 'react';
import App from 'next/app';
import { AnonAadhaarProvider } from 'anon-aadhaar-react';
import Web3Provider from '../context/Web3Context';
import '../styles/globals.css';

const app_id = process.env.NEXT_PUBLIC_APP_ID || "";


function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <AnonAadhaarProvider _appId={app_id}>
        <Component {...pageProps} />
      </AnonAadhaarProvider>
    </Web3Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
