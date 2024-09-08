'use strict';
import React from 'react';

let link = "https://stagingapi.limpopop2p.com/api";
let paylink = "https://stagingapi.limpopop2p.com/api";

class APILink  {
   
    getLink() {
        return link;
    }

    getPayLink() {
        return paylink;
    }

}

module.exports = new APILink();