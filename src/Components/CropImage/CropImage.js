/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { Button, Row, Col, Card } from 'reactstrap';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';


class CropImage extends Component {
  constructor() {
    super();
    this.setupReaderHandler();
  }

  state = {
    file: null,
    initialBase64: '',
    crop: {},
  }

  setupReaderHandler = () => {
    this.reader = new FileReader();
    this.reader.addEventListener('load', (e) => {
      this.setState({ initialBase64: e.target.result });
    });
  }

  fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      this.setState({ file: selectedFile });
    }
    this.reader.readAsDataURL(selectedFile);
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  }

  onCropCompleted = async (crop, pixelCrop) => {
    const { file, initialBase64 } = this.state;
    const { input: { onChange } } = this.props;
    if (file && (pixelCrop.height > 0 && pixelCrop.width > 0)) {
      const img = new Image();
      img.src = initialBase64;
      const croppedImage = await getCroppedImg(img, pixelCrop, file.name);
      onChange(croppedImage);
    }
  }

  onImageLoaded = (image) => {
    this.setState({
      crop: makeAspectCrop({
        x: 0,
        y: 0,
        aspect: 16 / 9,
        width: 50,
      }, image.width / image.height),
    });
  }

  render() {
    const { file, initialBase64, crop } = this.state;
    return (
      <React.Fragment>
        <input style={{ display: 'none' }} onChange={this.fileChangeHandler} type="file" ref={inputRef => this.inputRef = inputRef} />
        <Button color="primary" onClick={() => this.inputRef.click()}><i className="fa fa-cloud-upload" />{' '}Ajouter fichier</Button> {' '}<span>&nbsp;{ file && file.name}</span>
        <br />
        <br />
        {initialBase64
           && (
           <Row>
             <Col xs={12}>
               <Card>
                 <ReactCrop
                   src={initialBase64}
                   crop={crop}
                   onChange={cr => this.onCropChange(cr)}
                   onImageLoaded={img => this.onImageLoaded(img)}
                   onComplete={(crop, pixelCrop) => this.onCropCompleted(crop, pixelCrop)}
                 />
               </Card>
             </Col>
           </Row>
           )}

      </React.Fragment>

    );
  }
}

function getCroppedImg(image, pixelCrop, fileName) {
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      // eslint-disable-next-line no-param-reassign
      blob.name = fileName;
      resolve(blob);
    }, 'image/jpeg');
  });
}
export default CropImage;
