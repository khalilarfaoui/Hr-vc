import { UtilisateurModule } from './app-admin/utilisateur/utilisateur.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModuleComponent } from './feature-module.component';
import { AuthService } from '../core/core.index';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FeatureModuleComponent,
    //canActivate: [AuthService],
    children: [
      {
        path: 'categories',
        loadChildren: () =>
        import('./app-responsable/categories/categories.module').then((m) => m.CategoriesModule)
      },
      {
        path: 'postulation',
        loadChildren: () =>
        import('./app-responsable/postulation-list/postulation-list.module').then((m) => m.PostulationListModule)
      },
      {
        path: 'offres',
        loadChildren: () =>
        import('./app-responsable/offre/offre.module').then((m) => m.OffreModule)
      },
      {
        path: 'acceuil',
        loadChildren: () =>
        import('./app-condidat/acceuil/acceuil.module').then((m) => m.AcceuilModule)
      },

      {
        path: 'user',
        loadChildren: () =>
        import('./app-admin/utilisateur/utilisateur.module').then((m) => m.UtilisateurModule)
      },

      {
        path: 'welcome',
        loadChildren: () =>
        import('./welcome/welcome.module').then((m) => m.WelcomeModule)
      },

      {
        path: 'messages',
        loadChildren: () =>
        import('./messages/messages.module').then((m) => m.MessagesModule)
      },



      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "apps",
        loadChildren: () =>
          import("./apps/apps.module").then((m) => m.AppsModule),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule)
      },
      {
        path: 'clients',
        loadChildren: () =>
        import('./clients/clients.module').then((m) => m.ClientsModule)
      },
      {
        path: 'projects',
        loadChildren: () =>
        import('./projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'leads',
        loadChildren: () =>
        import('./leads/leads.module').then((m) => m.LeadsModule)
      },
      {
        path: 'tickets',
        loadChildren: () =>
        import('./tickets/tickets.module').then((m) => m.TicketsModule)
      },
      {
        path: 'sales',
        loadChildren: () =>
        import('./sales/sales.module').then((m) => m.SalesModule)
      },
      {
        path: 'accounting',
        loadChildren: () =>
        import('./accounting/accounting.module').then(m => m.AccountingModule)
      },
      {
        path: 'payroll',
        loadChildren: () =>
        import('./payroll/payroll.module').then((m) => m.PayrollModule)
      },
      {
        path: 'policies',
        loadChildren: () =>
        import('./policies/policies.module').then((m) => m.PoliciesModule)
      },
      {
        path: 'reports',
        loadChildren: () =>
        import('./reports/reports.module').then((m) => m.ReportsModule)
      },
      {
        path: 'performance',
        loadChildren: () =>
        import('./performance/performance.module').then((m) => m.PerformanceModule)
      },
      {
        path: 'goals',
        loadChildren: () =>
        import('./crosshairs/crosshairs.module').then((m) => m.CrosshairsModule)
      },
      {
        path: 'training',
        loadChildren: () =>
        import('./training/training.module').then((m) => m.TrainingModule)
      },
      {
        path: 'promotion',
        loadChildren: () =>
        import('./promotion/promotion.module').then((m) => m.PromotionModule)
      },
      {
        path: 'resignation',
        loadChildren: () =>
        import('./resignation/resignation.module').then((m) => m.ResignationModule)
      },
      {
        path: 'termination',
        loadChildren: () =>
        import('./termination/termination.module').then((m) => m.TerminationModule)
      },
      {
        path: 'assets',
        loadChildren: () =>
        import('./assets/assets.module').then((m) => m.AssetsModule)
      },
      {
        path: 'jobs',
        loadChildren: () =>
        import('./jobs/jobs.module').then((m) => m.JobsModule)
      },
      {
        path: 'knowledgebase',
        loadChildren: () =>
        import('./knowledgebase/knowledgebase.module').then((m) => m.KnowledgebaseModule)
      },
      {
        path: 'activities',
        loadChildren: () =>
        import('./activities/activities.module').then((m) => m.ActivitiesModule)
      },
      {
        path: 'users',
        loadChildren: () =>
        import('./users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
        import('./settings/settings.module').then((m) => m.SettingsModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
        import('./profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'subscriptions',
        loadChildren: () =>
        import('./subscriptions/subscriptions.module').then((m) => m.SubscriptionsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
        import('./pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'components',
        loadChildren: () =>
        import('./components/components.module').then((m) => m.ComponentsModule)
      },
      {
        path: 'forms',
         loadChildren: () =>
         import('./forms/forms.module').then((m) => m.FormsModule)
        },
      {
        path: 'tables',
        loadChildren: () =>
        import('./tables/tables.module').then((m) => m.TablesModule)

      },

    ]

   },
   {
    path: 'login',
    loadChildren: () =>
    import('./auth/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
    import('./auth/register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
    import('./auth/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
  },
  {
    path: 'otp',
    loadChildren: () =>
    import('./auth/otp/otp.module').then((m) => m.OtpModule)
  },
  {
    path: 'lock-screen',
    loadChildren: () =>
    import('./auth/lock-screen/lock-screen.module').then((m) => m.LockScreenModule)
  },
  {
    path: '404',
    loadChildren: () =>
    import('./auth/error404/error404.module').then((m) => m.Error404Module)
  },
  {
    path: '500',
    loadChildren: () =>
    import('./auth/error500/error500.module').then((m) => m.Error500Module)
  },
  {path: '**', redirectTo: 'admin/404'},



  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModuleRoutingModule { }
