'use strict';

import registr from './registr';
import { MsgDialog } from './MsgDialog';
import { initMap, IControls } from './init';
import { addressChangerHandler, estimateHandler } from './func';


export const init = (): void => {
  const controls: IControls = initMap(
    document.getElementById('map') as HTMLElement,
    document.querySelector('.addressFrom') as HTMLInputElement,
    document.querySelector('.addressTo') as HTMLInputElement,
    parseFloat(process.env.START_LAT as string),
    parseFloat(process.env.START_LNG as string),
  );

  controls.addressFrom.addListener(
    'place_changed',
    addressChangerHandler.bind(null, controls, controls.addressFrom),
  );
  controls.addressTo.addListener(
    'place_changed',
    addressChangerHandler.bind(null, controls, controls.addressTo),
  );

  (document.querySelector('.estimate') as HTMLElement).onclick =
    estimateHandler.bind(null, controls);

  registr.msgDialog =
    new MsgDialog(document.querySelector('.message-dialog-wrapper') as HTMLElement);
  registr.overloadHTML = document.querySelector('.overload') as HTMLElement;
  registr.controls = controls;
};
