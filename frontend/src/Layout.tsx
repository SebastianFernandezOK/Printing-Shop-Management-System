import { Layout as RALayout } from "react-admin";
import { CustomMenu } from "./CustomMenu";

export const Layout = (props: any) => <RALayout {...props} menu={CustomMenu} />;
