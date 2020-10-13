import React, { Component } from 'react';

class Canvas extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            ctx.font = "40px Courier"
            ctx.fillText(this.props.text, 0, 75)

            this.props.registerCanvas(ctx);
        }
    }

    render() {
        return(
            <div>
                <canvas ref="canvas" width={512} height={512} />
                <img style={{display: 'none'}} ref="image" src={'./logo512.png'} className="hidden" />
            </div>
        )
    }
}
export default Canvas
