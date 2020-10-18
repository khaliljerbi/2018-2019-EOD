import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Upload from '../../../SharedFiche/FicheUpload';

class FicheUpload extends Component {
  render() {
    const { handleSubmit, previousHandler, header, progress } = this.props;
    return (
      <Upload handleSubmit={handleSubmit} previousHandler={previousHandler} header={header} progress={progress} />
    );
  }
}

const mapStateToProps = state => ({
  progress: state.ficheReg.progress,
});

export default connect(mapStateToProps)(reduxForm({
  form: 'regForm',
  destroyOnUnmount: false,
})(FicheUpload));
