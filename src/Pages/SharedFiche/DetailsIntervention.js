import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'reactstrap';
import Card from '../../Components/Card/Card';
import Field from '../../Components/ReduxForm/FieldInput/FieldInput';
// import Select from '../../../Components/ReduxForm/FieldSelect/FieldSelect';
import { getAllMotifs } from '../../Actions/Admin/Actions';
import Spinner from '../../Components/Spinner/Spinner';
import Checkbox from '../../Components/ReduxForm/FieldCheckbox/FieldCheckbox';

const DetailsIntervention = ({ header, previousHandler, handleSubmit, motifs, ...props }) => {
  const { getAllMotifs: getAllMotifsEffect } = props;
  // react hooks for componentDidMount
  useEffect(() => {
    getAllMotifsEffect();
  }, [getAllMotifsEffect]);

  if (!motifs) return <Spinner />;

  // transform all values
  const transformedMotifs = motifs.map(motif => ({ value: motif._id, label: motif.label }));
  return (
    <Row>
      <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
        <Card header={header}>
          <Form onSubmit={handleSubmit}>
            <Checkbox
              name="motif_appel"
              label="Motif d'appel: "
              options={transformedMotifs}
            />
            <Field
              name="motif_appel_autre"
              type="textarea"
              label="Autre motif: "
            />
            <Row>
              <Col lg={1}>
                <Field
                  name="gcs"
                  placeholder="gcs"
                  label="GCS:"
                />
              </Col>
              <Col lg={2}>
                <Row>
                  <Col xs={6}>
                    <Field
                      name="TAS"
                      placeholder="TAS"
                      label="TAS:"
                    />
                  </Col>
                  <Col style={{ marginTop: 30, marginLeft: -20 }} xs={6}>
                    <span> mmHG</span>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}>
                <Row>
                  <Col xs={6}>
                    <Field
                      name="TAD"
                      placeholder="TAD"
                      label="TAD:"
                    />
                  </Col>
                  <Col style={{ marginTop: 30, marginLeft: -20 }} xs={6}>
                    <span> mmHG</span>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}>
                <Row>
                  <Col xs={6}>
                    <Field
                      name="FC"
                      placeholder="FC"
                      label="FC:"
                    />
                  </Col>
                  <Col style={{ marginTop: 30, marginLeft: -20 }} xs={6}>
                    <span> bpm</span>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}>
                <Row>
                  <Col xs={6}>
                    <Field
                      name="FR"
                      placeholder="FR"
                      label="FR:"
                    />
                  </Col>
                  <Col style={{ marginTop: 30, marginLeft: -20 }} xs={6}>
                    <span> cy/min</span>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}>
                <Row>
                  <Col xs={9}>
                    <Field
                      name="SpO2"
                      placeholder="SpO2"
                      label="SpO2:"
                    />
                  </Col>
                  <Col style={{ marginTop: 30, marginLeft: -20 }} xs={3}>
                    <span> %</span>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}>
                <Row>
                  <Col xs={8}>
                    <Field
                      name="T"
                      placeholder="T"
                      label="T:"
                    />
                  </Col>
                  <Col style={{ marginTop: 30, marginLeft: -20 }} xs={4}>
                    <span>°C</span>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}>
                <Row>
                  <Col xs={6}>
                    <Field
                      name="GAD"
                      placeholder="GAD"
                      label="GAD:"
                    />
                  </Col>
                  <Col style={{ marginTop: 30, marginLeft: -20 }} xs={6}>
                    <span>g/l</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  motifs: state.admin.motifs,
});
export default connect(mapStateToProps, { getAllMotifs })(DetailsIntervention);
