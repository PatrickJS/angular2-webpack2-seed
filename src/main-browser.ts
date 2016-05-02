import {Component, enableProdMode} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {enableDebugTools} from '@angular/platform-browser';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {App} from './app/index';

enableProdMode();

bootstrap(App, [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS
])
.then(ref => (enableDebugTools(ref), ref));
