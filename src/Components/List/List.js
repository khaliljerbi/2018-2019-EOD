import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const List = ({ data }) => (
  <ListGroup>
    {data.map(item => <ListGroupItem key={item}>{item}</ListGroupItem>)}
  </ListGroup>
);

export default List;
