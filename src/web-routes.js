import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { venueController } from "./controllers/venue-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addvenue", config: dashboardController.addVenue },
  { method: "GET", path: "/venue/{id}", config: venueController.index },
  { method: "GET", path: "/dashboard/deletevenue/{id}", config: dashboardController.deleteVenue },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

];
