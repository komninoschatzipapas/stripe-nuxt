import path from 'path';
import { Module } from '@nuxt/types';

declare module 'vue/types/vue' {
  interface Vue {
    $stripe: stripe.Stripe;
  }
}

declare global {
  interface Window {
    Stripe: stripe.StripeStatic;
  }
}

type Options = string;

const stripeModule: Module<Options> = function(publishableKey) {
  if (!publishableKey) {
    throw new Error('Please provide a publishable key to the Stripe module');
  }

  this.options.head!.script!.push({
    src: `//js.stripe.com/v3/`,
    async: true,
    defer: true,
  });

  this.addPlugin({
    src: path.resolve(__dirname, './templates/plugin.js'),
    ssr: false,
    options: {
      publishableKey
    }
  });
};

export const meta = require('../package.json');

export default stripeModule;
