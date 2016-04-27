import {Component, enableProdMode} from '@igorminar/core';
import {ROUTER_PROVIDERS} from '@igorminar/router';
import {HTTP_PROVIDERS} from '@igorminar/http';
import {enableDebugTools} from '@igorminar/platform-browser';
import {bootstrap} from '@igorminar/platform-browser-dynamic';

import {App} from './app/index';

enableProdMode();

bootstrap(App, [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS
])
.then(ref => (enableDebugTools(ref), ref));
