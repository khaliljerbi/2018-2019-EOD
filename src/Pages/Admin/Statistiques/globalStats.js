import React from 'react';
import Statistiques from './Statistiques';

const globalStats = ({ location }) => <Statistiques location={location} initialValues={{ year: new Date().getFullYear() }} />;

export default globalStats;
