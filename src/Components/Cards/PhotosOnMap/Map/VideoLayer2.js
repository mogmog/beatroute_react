import {BitmapLayer} from '@deck.gl/layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {Texture2D} from '@luma.gl/webgl';

export default class VideoBitmapLayer extends SimpleMeshLayer {

    draw(opts) {
        // const {texture} = this.props;

         //console.log(texture);
         const {texture} = this.state;

         //console.log(texture);
        //
        // // Update video frame
        // if (image instanceof HTMLVideoElement && image.readyState > HTMLVideoElement.HAVE_METADATA) {
        texture.resize({width: 500, height: 500});
        texture.setSubImageData({data: this.props.texture});
        // }

        super.draw(opts);
    }

}
