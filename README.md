# FaziSimpleSavings - Angular Frontend

## 🎯 Project Goal

Build a **modern, production-grade Angular application** using the existing ASP.NET Core backend (shared with the React version). This Angular app is designed to demonstrate **senior-level frontend engineering** skills, including modern Angular practices, Signals, centralized state, SCAM pattern, TailwindCSS + DaisyUI UI, and advanced routing/state management.

---

## 🧱 Tech Stack

| Area    | Tools/Technologies                                                 |
| ------- | ------------------------------------------------------------------ |
| UI      | Angular 17+, Standalone Components, Signals, TailwindCSS + DaisyUI |
| State   | Signals + Service Store Pattern                                    |
| Routing | Angular Router with guards, lazy loading                           |
| Auth    | JWT via HttpInterceptor, Auth Guards                               |
| API     | ASP.NET Core Backend (REST endpoints)                              |
| Testing | Jest (Unit), Cypress (E2E optional)                                |
| Build   | Angular CLI, Azure Static Web Apps                                 |

---

## 📂 Folder Structure

```bash
src/app/
│
├── core/                  # Singleton services, interceptors, guards
├── shared/                # Reusable UI components, pipes, directives
├── features/              # Feature modules
│   ├── auth/              # login, register
│   ├── dashboard/         # dashboard summary
│   ├── savings-goals/     # personal savings goals
│   ├── group-goals/       # collaborative group goals
│   ├── notifications/     # notification center
│   └── settings/          # user profile and preferences
└── app.config.ts          # Router config and providers
```

---

## 🔐 Auth Module

### Endpoints

* `POST /api/auth/register`
* `POST /api/auth/login`

### Tasks

* Login/Register components with reactive forms
* JWT storage in `localStorage`
* `HttpInterceptor` to attach JWT
* `AuthGuard` for protected routes
* `AuthService` for authentication logic

---

## 🌐 Routing

* Lazy loaded using `provideRouter` in `app.config.ts`
* SCAM-based module route definitions

```ts
export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/dashboard/dashboard.routes') },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes') },
  ...
];
```

---

## 🧠 Signals + State

Use Angular Signals for state management:

```ts
export class AuthService {
  private userSignal = signal<User | null>(null);
  user = computed(() => this.userSignal());

  login() {
    this.http.post<User>('/api/auth/login').subscribe(res => this.userSignal.set(res));
  }
}
```

* Use `inject()` for services
* Avoid subscriptions, use computed + effects

---

## 🔁 API Feature Mapping

### 💰 Savings Goals

| Endpoint                                      | Description         |
| --------------------------------------------- | ------------------- |
| `POST /api/savingsgoals`                      | Create a goal       |
| `GET /api/savingsgoals`                       | List user goals     |
| `GET /api/savingsgoals/progress`              | Get goal progress % |
| `POST /api/savingsgoals/{goalId}/deposit`     | Manual deposit      |
| `GET /api/savingsgoals/{goalId}/transactions` | Goal transactions   |

### 🤝 Group Goals

| Endpoint                                    | Description                    |
| ------------------------------------------- | ------------------------------ |
| `POST /api/group-goals`                     | Create group goal              |
| `GET /api/group-goals`                      | List user’s group goals        |
| `GET /api/group-goals/{id}`                 | View group goal detail         |
| `POST /api/group-goals/{id}/contribute`     | Contribute to group goal       |
| `POST /api/group-goals/{id}/members`        | Add member to group            |
| `GET /api/group-goals/{id}/transactions`    | Group goal transactions        |
| `GET /api/group-goals/{id}/available-users` | List users that can be invited |

### 🔔 Notifications

| Endpoint                                    | Description        |
| ------------------------------------------- | ------------------ |
| `GET /api/notifications`                    | List notifications |
| `POST /api/notifications/{id}/mark-as-read` | Mark as read       |

### ⚙️ User Settings

| Endpoint                | Description            |
| ----------------------- | ---------------------- |
| `GET /api/usersettings` | Fetch current settings |
| `PUT /api/usersettings` | Update settings        |

---

## 🎨 TailwindCSS + DaisyUI Setup

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm install daisyui
```

* Modify `tailwind.config.js` to include DaisyUI plugin
* Use DaisyUI for consistent and themed UI
* Add responsive, dark/light theme support

---

## 📈 Dashboard Page (Home)

* List personal savings goals
* Show progress bar for each
* Group goals section
* Unread notification badge
* Quick actions: deposit, create goal, mark read

---

## 🔧 Advanced Features (Senior-Level)

| Feature              | Description                            |
| -------------------- | -------------------------------------- |
| ✅ Signals            | App-wide reactive state                |
| ✅ Computed + Effects | Derived state, lifecycle logic         |
| ✅ Http Interceptors  | Attach JWT, handle errors              |
| ✅ SCAM Pattern       | Component encapsulation and modularity |
| ✅ Routing Guards     | Route protection with `AuthGuard`      |
| ✅ Forms              | Reactive forms with validation         |
| ✅ Testing            | Unit tests for services/components     |
| ✅ Modularization     | Lazy loading, feature separation       |
| ✅ Reusability        | Shared cards, inputs, buttons          |
| ✅ PWA Ready          | Optional enhancement                   |
| ✅ i18n Support       | Optional demo of internationalization  |

---

## 🚀 Build & Deploy

```bash
ng build --configuration production
```

* Host via Azure Static Web Apps, Vercel, Netlify
* Backend already deployed and integrated

---

## 📘 README Suggestions

* High-level overview
* Architecture explanation
* List of endpoints with matching modules
* Summary of modern Angular features used
* Link to live demo or Loom video walkthrough
* Comparison to React version

---

## ✅ Next Step

Would you like to:

* Generate a starter Angular app with Tailwind, DaisyUI, and Signals preconfigured?
* Scaffold the feature modules and routing config for each endpoint?
* Create a README template for this project?
