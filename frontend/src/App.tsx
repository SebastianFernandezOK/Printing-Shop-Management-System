import { Admin, Resource } from "react-admin";
import { userDataProvider } from "./userDataProvider";
import { Layout } from "./Layout";
import UserList from "./usuario/UserList";
import UserCreate from "./usuario/UserCreate";
import UserEdit from "./usuario/UserEdit";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from "@mui/icons-material/Group";
import { ClienteList } from "./cliente/ClienteList";
import { ClienteCreate } from "./cliente/ClienteCreate";
import { ClienteEdit } from "./cliente/ClienteEdit";
import BuildIcon from '@mui/icons-material/Build';
import { OrdenTrabajoList } from "./OrdenTrabajo/OrdenTrabajoList";
import { OrdenTrabajoCreate } from "./OrdenTrabajo/OrdenTrabajoCreate";
import { OrdenTrabajoEdit } from "./OrdenTrabajo/OrdenTrabajoEdit";
import { ControlPrePrensaList } from "./ControlPrePrensa/ControlPrePrensaList";
import { ControlPrePrensaCreate } from "./ControlPrePrensa/ControlPrePrensaCreate";
import { ControlPrePrensaEdit } from "./ControlPrePrensa/ControlPrePrensaEdit";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { ControlPrensaList } from "./ControlPrensa/ControlPrensaList";
import { ControlPrensaCreate } from "./ControlPrensa/ControlPrensaCreate";
import { ControlPrensaEdit } from "./ControlPrensa/ControlPrensaEdit";
import PrintIcon from '@mui/icons-material/Print';

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
    <Resource
      name="ordenes_trabajo"
      list={OrdenTrabajoList}
      create={OrdenTrabajoCreate}
      edit={OrdenTrabajoEdit}
      options={{ label: "Órdenes de Trabajo", hasDelete: true }}
      icon={BuildIcon}
    />
    <Resource
      name="controles_preprensa"
      list={ControlPrePrensaList}
      create={ControlPrePrensaCreate}
      edit={ControlPrePrensaEdit}
      options={{ label: "Control PrePrensa", hasDelete: true }}
      icon={AssignmentTurnedInIcon}
    />
    <Resource
      name="controles_prensa"
      list={ControlPrensaList}
      create={ControlPrensaCreate}
      edit={ControlPrensaEdit}
      options={{ label: "Control Prensa", hasDelete: true }}
      icon={PrintIcon}
    />
    <Resource name="roles" options={{ label: "Roles" }} />
  </Admin>
);

export default App;
