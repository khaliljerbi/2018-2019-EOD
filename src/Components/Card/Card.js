import React, { memo } from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

const CustomCard = memo(({ header, content, children, ...props }) => (
  <Card {...props}>
    {header && (
      <CardHeader>
        <Row>
          <Col xs={7} lg={10}><strong>{header}</strong></Col>
          {content ? <Col xs={{ size: 4 }} lg={2}>{content}</Col> : null}
        </Row>
      </CardHeader>
    )}
    <CardBody>
      {children}
    </CardBody>
  </Card>
));

export default CustomCard;
