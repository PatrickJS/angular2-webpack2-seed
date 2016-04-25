import {Component, enableProdMode} from '@igorminar/core';
import {ROUTER_PROVIDERS} from '@igorminar/router';
import {HTTP_PROVIDERS} from '@igorminar/http';
import {bootstrap} from '@igorminar/platform-browser';

import {App} from './app/index';

enableProdMode();

bootstrap(App, [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS
]);
