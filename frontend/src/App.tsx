import { Admin, Resource } from "react-admin";
import { userDataProvider } from "./userDataProvider";
import { Layout } from "./Layout";
import UserList from "./list/UserList";
import UserCreate from "./create/UserCreate";
import UserEdit from "./edit/UserEdit";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from "@mui/icons-material/Group";
import { ClienteList } from "./cliente/ClienteList";
import { ClienteCreate } from "./cliente/ClienteCreate";
import { ClienteEdit } from "./cliente/ClienteEdit";

export const App = () => (
  <Admin layout={Layout} dataProvider={userDataProvider}>
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      options={{ label: "Usuarios", hasDelete: true }}
      icon={PersonIcon}
    />
    <Resource
      name="clientes"
      list={ClienteList}
      create={ClienteCreate}
      edit={ClienteEdit}
      options={{ label: "Clientes", hasDelete: true }}
      icon={GroupIcon}
    />
  </Admin>
);

export default App;
