import { Plugin } from '@nuxt/types';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $stripe: stripe.Stripe;
  }
}

const stripePlugin: Plugin = () => {
  if (typeof window !== 'undefined' && window.Stripe) {
    if(!Vue.prototype.$stripe) {
      Vue.prototype.$stripe = window.Stripe('<%= options.publishableKey %>');
    }
  } else {
    throw new Error('Could not find Stripe');
  }
};

export default stripePlugin;
