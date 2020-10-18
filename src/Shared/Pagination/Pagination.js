import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Row, Col } from 'reactstrap';

const CustomPagination = ({ itemsCount, pageSize, currentPage, onPageChange, onNextPage, onPreviousPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // don't render pagination if page count is 1
  if (pagesCount === 1) return null;
  const pages = [...Array(pagesCount)].map((item, index) => index + 1);
  return (
    <Row style={{ marginTop: 20 }}>
      <Col lg={{ size: 6, offset: 4 }}>
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink onClick={onPreviousPage} previous />
          </PaginationItem>
          { pages.map(page => (
            <PaginationItem key={page} active={currentPage === page}>
              <PaginationLink onClick={() => onPageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )) }
          <PaginationItem disabled={currentPage === pagesCount}>
            <PaginationLink onClick={onNextPage} next />
          </PaginationItem>
        </Pagination>
      </Col>
    </Row>
  );
};

export default CustomPagination;
