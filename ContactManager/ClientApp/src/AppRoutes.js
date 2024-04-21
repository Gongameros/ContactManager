import FetchContacts from "./components/FetchContact/FetchContacts"
import AddContacts from "./components/AddContacts"

const AppRoutes = [
  {
    index: true,
    element: <FetchContacts />
  },
  {
    path: '/add-contacts',
    element: <AddContacts />
  }
];

export default AppRoutes;
