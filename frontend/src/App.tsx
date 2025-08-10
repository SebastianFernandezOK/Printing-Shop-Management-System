import { Admin, Resource } from "react-admin";
import { userDataProvider } from "./userDataProvider";
import { Layout } from "./Layout";
import UserList from "./list/UserList";
import UserCreate from "./create/UserCreate";
import UserEdit from "./edit/UserEdit";
import PeopleIcon from "@mui/icons-material/People";

export const App = () => (
  <Admin layout={Layout} dataProvider={userDataProvider}>
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      options={{ label: "Usuarios", hasDelete: true }}
      icon={PeopleIcon}
    />
  </Admin>
);

export default App;
