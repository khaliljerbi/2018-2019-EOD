/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Row, Col, Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import Card from '../../Components/Card/Card';
import Field from '../../Components/ReduxForm/FieldInput/FieldInput';
import Select from '../../Components/ReduxForm/FieldSelect/FieldSelect';
import * as options from '../../Shared/StaticData/StaticOptions';
import Radio from '../../Components/ReduxForm/FieldRadio/FieldRadio';
import Spinner from '../../Components/Spinner/Spinner';
import Checkbox from '../../Components/ReduxForm/FieldCheckbox/FieldCheckbox';
import { getAllTypologies, getAllTypologiesSP } from '../../Actions/Admin/Actions';

const Bilan = ({ header, previousHandler, handleSubmit, typologies, typologies_sp, ...props }) => {
  const { getAllTypologies: getAllTypologiesEffect, getAllTypologiesSP: getAllTypologiesSPEffect } = props;
  // react hooks for componentDidMount
  useEffect(() => {
    getAllTypologiesEffect();
    getAllTypologiesSPEffect();
  }, [getAllTypologiesEffect, getAllTypologiesSPEffect]);
  if (!typologies || !typologies_sp) return <Spinner />;

  // transform all values
  const transformedTypologies = typologies.map(typ => ({ value: typ._id, label: typ.label }));
  const transformedTypologiesSp = typologies_sp.map(typ_sp => ({ value: typ_sp._id, label: typ_sp.label }));
  return (
    <Row>
      <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
        <Card header={header}>
          <Form onSubmit={handleSubmit}>
            <Field
              name="bilan"
              type="textarea"
              placeholder="Bilan..."
              label="Bilan: "
            />
            <Radio
              name="pathologie"
              label="Pathologie:"
              options={options.pathologieOptions}
            />
            <Checkbox
              name="typ_pathologie"
              label="Typologie Pathologie: "
              options={transformedTypologies}
            />
            <Select
              name="typ_pathologie_diag"
              label="Typologie spécifique et Diagnostic: "
              options={transformedTypologiesSp}
              multi
            />
            <Radio
              name="menace_vit"
              label="Menace des fonctions vitales:"
              options={options.yesNo}
            />
            <Radio
              name="circonstance"
              label="Circonstance: "
              options={options.circonstanceOptions}
            />
            <Row>
              <Col xs={{ size: 7, offset: 0 }} sm={{ size: 4, offset: 4 }} md={{ size: 4, offset: 2 }} lg={{ size: 4, offset: 3 }}>
                <Button outline color="primary" onClick={previousHandler}><i className="fa fa-arrow-left" />{' '}Précédent</Button>{' '}
              </Col>
              <Col xs={{ size: 5, offset: 0 }} sm={{ size: 4, offset: 0 }} md={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }}>
                <Button type="submit" color="primary">Suivant{' '} <i className="fa fa-arrow-right" /></Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  typologies: state.admin.typologies,
  typologies_sp: state.admin.typologies_sp,
});
export default connect(mapStateToProps, { getAllTypologies, getAllTypologiesSP })(Bilan);
