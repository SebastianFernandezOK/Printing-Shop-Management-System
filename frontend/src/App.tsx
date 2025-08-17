import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { ControlPostPrensaList } from "./ControlPostPrensa/ControlPostPrensaList";
import { ControlPostPrensaCreate } from "./ControlPostPrensa/ControlPostPrensaCreate";
import { ControlPostPrensaEdit } from "./ControlPostPrensa/ControlPostPrensaEdit";
import { ControlCalidadFinalList } from "./ControlCalidadFinal/ControlCalidadFinalList";
import { ControlCalidadFinalCreate } from "./ControlCalidadFinal/ControlCalidadFinalCreate";
import { ControlCalidadFinalEdit } from "./ControlCalidadFinal/ControlCalidadFinalEdit";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { RemitoList } from "./remito/RemitoList";
import { RemitoCreate } from "./remito/RemitoCreate";
import { RemitoEdit } from "./remito/RemitoEdit";
import { RemitoShow } from "./remito/RemitoShow";
import { authProvider } from "./authProvider";
import { OrdenTrabajoLoteSearch } from "./OrdenTrabajo/OrdenTrabajoLoteSearch";
import { lightTheme, darkTheme } from "./theme";

export const App = () => (
  <Admin
    authProvider={authProvider}
    layout={Layout}
    dataProvider={userDataProvider}
    theme={lightTheme}
    darkTheme={darkTheme}
    defaultTheme={lightTheme}
  >
    <CustomRoutes>
      <Route path="/buscar-orden-lote" element={<OrdenTrabajoLoteSearch />} />
    </CustomRoutes>
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
    <Resource
      name="controles_postprensa"
      list={ControlPostPrensaList}
      create={ControlPostPrensaCreate}
      edit={ControlPostPrensaEdit}
      options={{ label: "Control PostPrensa", hasDelete: true }}
      icon={AssignmentIndIcon}
    />
    <Resource
      name="controles_calidad"
      list={ControlCalidadFinalList}
      create={ControlCalidadFinalCreate}
      edit={ControlCalidadFinalEdit}
      options={{ label: "Control Calidad Final", hasDelete: true }}
      icon={AssignmentTurnedInIcon}
    />
    <Resource
      name="remitos"
      list={RemitoList}
      create={RemitoCreate}
      edit={RemitoEdit}
      show={RemitoShow}
      options={{ label: "Remitos", hasDelete: true }}
      icon={LocalShippingIcon}
      recordRepresentation="numero_remito"
    />
  </Admin>
);

export default App;
