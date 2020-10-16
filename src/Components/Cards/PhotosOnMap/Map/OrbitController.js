import {OrbitController, Controller} from '@deck.gl/core';

export default class MyController extends OrbitController {
    constructor(props) {
        super(props);
        this.invertPan = true;
    }}
