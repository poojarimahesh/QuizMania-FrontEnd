import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizzesComponent } from './pages/user/load-quizzes/load-quizzes.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { LoadQuizzessAdminComponent } from './pages/admin/load-quizzess-admin/load-quizzess-admin.component';
import { ResultComponent } from './pages/result/result.component';
import { ResultAdminComponent } from './pages/admin/result-admin/result-admin.component';
import { LeaderboardComponent } from './pages/user/leaderboard/leaderboard.component';
import { LeaderboardAdminComponent } from './pages/admin/leaderboard-admin/leaderboard-admin.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent ,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent ,
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
        children: [
          {
            path: ':cid',
            component: LoadQuizzessAdminComponent
          }
        ]
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent
      },
      {
        path: 'update-quiz/:qid',
        component: UpdateQuizComponent
      },
      {
        path: 'view-questions/:qid/:qTitle',
        component: ViewQuizQuestionsComponent
      },
      {
        path: 'add-question/:quizId/:qTitle',
        component: AddQuestionComponent
      },
      {
        path: 'update-question/:questionId',
        component: UpdateQuestionComponent
      },
      {
        path: 'update-category/:categoryId',
        component: UpdateCategoryComponent
      },
      {
        path: 'results/user/:userId/quiz/:quizId/sortBy/:sortBy',
        component: ResultAdminComponent
      },
      {
        path: 'leaderboard/:quizId',
        component: LeaderboardAdminComponent
      }
    ],
    canActivate: [AdminGuard],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: ':categoryId',
        component: LoadQuizzesComponent,
        
      },
      {
        path: 'instructions/:quizId',
        component: InstructionsComponent,
        children: [
          {
            path: '',
            component: ResultComponent
          }
        ]
      },
      {
        path: 'results/:quizId',
        component: ResultComponent
      },
      {
        path: 'leaderboard/:quizId',
        component: LeaderboardComponent
      },
    ],
  },
  {
    path: 'start/:quizId',
    component: StartQuizComponent,
    canActivate: [NormalGuard],
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
