import React, { Component } from 'react';
import { CustomInput, Row, Col } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Upload from '../../../../SharedFiche/FicheUpload';
import CustomLabel from '../../../../../Components/Label/Label';
import Card from '../../../../../Components/Card/Card';

class FicheUpload extends Component {
  renderCustomInput = ({ input, ...rest }) => (
    <CustomInput type="switch" id="affect" {...input} {...rest} />
  );

  render() {
    const { handleSubmit, previousHandler, header, progress } = this.props;
    return (
      <>
        <Row>
          <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
            <Card>
              <CustomLabel>Voulez-vous que le parm associé à cette fiche affecte un SMUR ?</CustomLabel>
              <Field
                name="affect"
                component={this.renderCustomInput}
              />
            </Card>
          </Col>
        </Row>
        <Upload handleSubmit={handleSubmit} previousHandler={previousHandler} header={header} progress={progress} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  progress: state.ficheReg.progress,
});

export default connect(mapStateToProps)(reduxForm({
  form: 'regFormTransfer',
  destroyOnUnmount: false,
})(FicheUpload));
