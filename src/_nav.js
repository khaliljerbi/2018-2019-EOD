export const navigation = () => ({
  items: [
    {
      name: 'Protocoles',
      url: '/protocole',
      icon: 'fa fa-question-circle',
      role: 'Permanencier',
      badge: {
        variant: 'success',
        text: 'Aide',
      },
    },
    {
      title: true,
      name: 'Permanencier',
      role: 'Permanencier',
    },
    {
      name: 'Fiche Médicale',
      url: '/fiche_med',
      icon: 'fa fa-file-text-o',
      role: 'Permanencier',
      children: [
        {
          name: 'Créer fiche médicale',
          url: '/parm/fiche_info',
          role: 'Permanencier',
          icon: 'fa fa-plus',
        },
        {
          name: 'Fiches',
          role: 'Permanencier',
          url: '/parm/fiches',
          icon: 'fa fa-folder-open',
        },
      ],
    },
    {
      name: 'Annuaire',
      url: '/parm/annuaire',
      role: 'Permanencier',
      icon: 'fa fa-user-md',
    },
    {
      name: 'Gestion ambulances',
      role: 'Permanencier',
      icon: 'fa fa-ambulance',
      children: [
        {
          name: 'Map',
          url: '/parm/map',
          role: 'Permanencier',
          icon: 'fa fa-map-marker',
        },
      ],
    },
    {
      name: 'Voir Statistiques',
      url: '/parm_stats',
      role: 'Permanencier',
      icon: 'fa fa-bar-chart',
    },
    {
      title: true,
      name: 'Médecin Régulateur',
      role: 'Médecin Régulateur',
    },
    {
      name: 'Fiche Régulation',
      url: '/fiche_reg/all',
      role: 'Médecin Régulateur',
      icon: 'fa fa-file',
      children: [
        {
          name: 'Créer fiche régulation',
          url: '/fiche_reg/add',
          role: 'Médecin Régulateur',
          icon: 'fa fa-plus',
        },
        {
          name: 'Fiches récentes',
          url: '/fiche_reg/all',
          role: 'Médecin Régulateur',
          icon: 'fa fa-archive',
        },
      ],
    },
    {
      title: true,
      name: 'Chef Service',
      role: 'Chef Service',
    },
    {
      name: 'Tableau de garde',
      url: '/tableau_garde',
      role: 'Chef Service',
      icon: 'fa fa-calendar',
    },
    {
      name: 'Utilisateurs',
      url: '/admin/users',
      role: 'Chef Service',
      icon: 'fa fa-users',
    },
    {
      name: 'Ambulances',
      url: '/admin/ambulances',
      role: 'Chef Service',
      icon: 'fa fa-ambulance',
    },
    {
      name: 'Statistiques',
      url: '/admin/global_stats',
      role: 'Chef Service',
      icon: 'fa fa-bar-chart',
    },
    {
      name: 'Gestion globale',
      role: 'Chef Service',
      icon: 'fa fa-stethoscope',
      url: '/admin/global_management',
    },
  ],
});
