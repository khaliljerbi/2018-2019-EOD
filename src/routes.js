import React from 'react';
import { roles } from './roles';
import Home from './Pages/Home/Home';

// rest
const Page404 = React.lazy(() => import('./Pages/Page404/Page404'));
const Email = React.lazy(() => import('./Pages/Parm/Email/Email'));
const Preview = React.lazy(() => import('./Pages/Preview/Preview'));
const Conversation = React.lazy(() => import('./Pages/Conversation/Conversation'));
const Contacts = React.lazy(() => import('./Pages/Contacts/Contacts'));
const Profile = React.lazy(() => import('./Pages/Profile/Profile'));
const Protocoles = React.lazy(() => import('./Pages/Protocoles/Protocoloes'));
// medecin routes
const FicheReg = React.lazy(() => import('./Pages/MedecinReg/FicheRegulation/FicheRegForm/RootFicheForm'));
const AllFiches = React.lazy(() => import('./Pages/MedecinReg/AllFiches/AllFiches'));
const FicheShow = React.lazy(() => import('./Pages/MedecinReg/FicheRegulation/DetailsFiche/FicheShow'));
const FicheEdit = React.lazy(() => import('./Pages/MedecinReg/FicheRegulation/FicheRegEdit/FicheEdit'));
const FichePDF = React.lazy(() => import('./Pages/MedecinReg/FicheRegulation/DetailsFiche/FichePDF'));
const TransferedFile = React.lazy(() => import('./Pages/MedecinReg/FicheRegulation/FicheRegForm/TransferedFile'));
// Admin routes
const UserDetails = React.lazy(() => import('./Pages/Admin/Users/UserDetails'));
const UserUpdateForm = React.lazy(() => import('./Pages/Admin/Users/UserUpdateForm'));
const UserDelete = React.lazy(() => import('./Pages/Admin/Users/UserDelete'));
const Register = React.lazy(() => import('./Pages/Admin/RegisterUser/RegisterUser'));
const Users = React.lazy(() => import('./Pages/Admin/Users/Users'));
const Statistiques = React.lazy(() => import('./Pages/Admin/Statistiques/globalStats'));
const AmbulanceList = React.lazy(() => import('./Pages/Admin/Ambulances/AmbulanceList'));
const AmbulanceAddForm = React.lazy(() => import('./Pages/Admin/Ambulances/AmbulanceAddForm'));
const TableauDeGarde = React.lazy(() => import('./Pages/Admin/Calendar/Calendar'));
const GlobalManagement = React.lazy(() => import('./Pages/Admin/GlobalManagement/GlobalManagement'));
const FullLogs = React.lazy(() => import('./Pages/Admin/AdminLogs/FullLogs'));
// Parm routes
const Annuaire = React.lazy(() => import('./Pages/Parm/Annuaire/Annuaire'));
const Map = React.lazy(() => import('./Pages/Parm/Ambulance/Map/Map'));
const RootForm = React.lazy(() => import('./Pages/Parm/FicheInfo/FicheInfoForm/RootForm'));
const Fiches = React.lazy(() => import('./Pages/Parm/FicheInfo/Allfiches/Allfiches'));
const Affectation = React.lazy(() => import('./Pages/Parm/Ambulance/Affectation/Affection'));
const ParmStats = React.lazy(() => import('./Pages/Parm/Stats/GlobalParmStats'));

const routes = [
  { path: '/', exact: true, role: [roles.medecin, roles.parm, roles.chefService, roles.medecinInt], name: 'Index', component: Home },
  { path: '/conversation/:id', exact: true, role: [roles.medecin, roles.parm, roles.chefService, roles.medecinInt], name: 'conversation', component: Conversation },
  { path: '/profile/:id', exact: true, role: [roles.medecin, roles.parm, roles.chefService, roles.medecinInt], name: 'profile', component: Profile },
  { path: '/contacts', exact: true, role: [roles.medecin, roles.parm, roles.chefService, roles.medecinInt], name: 'contacts', component: Contacts },
  { path: '/preview', role: [roles.medecin, roles.chefService, roles.medecinInt], exact: true, name: 'preview', component: Preview },
  { path: '/tableau_garde', role: [roles.medecin, roles.chefService, roles.medecinInt], exact: true, name: 'tabealu de garde', component: TableauDeGarde },
  { path: '/fiche_reg/add', role: [roles.medecin], exact: true, name: 'Fiche Régulation', component: FicheReg },
  { path: '/fiche_reg/pdf/:id', role: [roles.medecin], exact: true, name: 'Fiche Régulation PDF', component: FichePDF },
  { path: '/fiche_reg/all', role: [roles.medecin], exact: true, name: 'Toutes les fiches', component: AllFiches },
  { path: '/fiche_reg/:id', role: [roles.medecin, roles.parm, roles.chefService, roles.medecinInt], exact: true, name: 'Fiche Régulation', component: FicheShow },
  { path: '/fiche_reg/edit/:id', role: [roles.medecin, roles.chefService, roles.medecinInt], exact: true, name: 'Edit Fiche', component: FicheEdit },
  { path: '/fiche_reg/transfered/:id', role: [roles.medecin, roles.parm, roles.chefService, roles.medecinInt], exact: true, name: 'Get transfered Fiche', component: TransferedFile },
  { path: '/admin/global_stats', role: [roles.chefService], exact: true, name: 'Index', component: Statistiques },
  { path: '/admin/global_management', role: [roles.chefService], exact: true, name: 'Index', component: GlobalManagement },
  { path: '/admin/register', role: [roles.chefService], isAdmin: true, name: 'Register', exact: true, component: Register },
  { path: '/admin/users', role: [roles.chefService], name: 'Liste des utilisateurs', exact: true, component: Users },
  { path: '/admin/users/:id', role: [roles.chefService], name: 'Détails utilisateur', exact: true, component: UserDetails },
  { path: '/admin/users/delete/:id', role: [roles.chefService], name: 'Supprimer utilisateur', exact: true, component: UserDelete },
  { path: '/admin/users/update/:id', role: [roles.chefService], name: 'Modifier utilisateur', exact: true, component: UserUpdateForm },
  { path: '/admin/ambulances', role: [roles.chefService], name: 'Liste des ambulances', exact: true, component: AmbulanceList },
  { path: '/admin/ambulances/add_ambulance', role: [roles.chefService], name: 'Ajouter ambulance', exact: true, component: AmbulanceAddForm },
  { path: '/admin/history', role: [roles.chefService], name: 'History', exact: true, component: FullLogs },
  { path: '/mail', name: 'Email', role: [roles.parm], exact: true, component: Email },
  { path: '/parm/annuaire', role: [roles.parm], name: 'annuaire', exact: true, component: Annuaire },
  { path: '/parm/map', role: [roles.parm], name: 'map', exact: true, component: Map },
  { path: '/parm/fiche_info', role: [roles.parm], exact: true, name: 'Fiche informations', component: RootForm },
  { path: '/parm/fiches', role: [roles.parm], exact: true, name: 'Fiche informations', component: Fiches },
  { path: '/parm_stats', role: [roles.parm], exact: true, name: 'Parm stats', component: ParmStats },
  { path: '/protocole', role: [roles.parm], exact: true, name: 'Protocoles ', component: Protocoles },
  { path: '/fiche_reg/affectation/:id', role: [roles.parm], exact: true, name: 'Fiche informations', component: Affectation },
  { path: null, exact: true, role: [roles.medecin, roles.parm, roles.chefService, roles.medecinInt], component: Page404 },
];

export default routes;
