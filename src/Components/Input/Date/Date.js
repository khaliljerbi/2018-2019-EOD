import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import CommonInput from '../CommonInput/CommonInput';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';
// french config of rang picker
const customConfig = {
  cancelLabel: 'Annuler',
  applyLabel: 'Appliquer',
  daysOfWeek: [
    'Lun',
    'Mar',
    'Mer',
    'Jeu',
    'Ven',
    'Sam',
    'Dim',
  ],
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
};

const Date = ({ startDate, endDate, onDateChange }) => {
  const inputDate = endDate ? `${dateFormat.slashFormat(startDate)} - ${dateFormat.slashFormat(endDate)}` : `${dateFormat.slashFormat(startDate)}`;
  return (
    <DateRangePicker locale={customConfig} onApply={onDateChange} cancelButtonClasses={{ color: 'red' }} showCustomRangeLabel>
      <CommonInput label="Date: " placeholder={inputDate} />
    </DateRangePicker>
  );
};

export default Date;
