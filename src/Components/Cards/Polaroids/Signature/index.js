import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SignaturePad from 'react-signature-canvas'

import styles from './styles.css'

export default class App extends Component {
    state = {trimmedDataURL: null}
    sigPad = {}
    clear = () => {
        console.log(this.sigPad);
    }
    trim = () => {
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
                .toDataURL('image/png')})
    }
    render () {

        let {trimmedDataURL} = this.state
        return <div className={'container'}>

            <div className={'sigContainer'}>

                <SignaturePad xvelocityFilterWeight={0.3} xminDistance={10} maxWidth={8} minWidth={3} penColor='#f8cc2b' canvasProps={{width: 500, height: 600, className: 'sigPad'}}

                              ref={(ref) => {

                                  this.sigPad = ref

                                  ref && ref._canvas.addEventListener("mousemove", () => {
                                      this.props.setSigCanvas(ref.getCanvas());
                                  }, true);

//console.log(ref);
                                  ref && this.props.setSigCanvas(ref.getCanvas());
                              }} />
            </div>
            <div>

            </div>

        </div>
    }
}
