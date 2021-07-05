import { Loader } from "semantic-ui-react";
import loadable from "@loadable/component";

export enum CUSTOM_SVG_ICON {
  COLOR = "COLOR"
}

export const CustomIconRef: any = {
  [CUSTOM_SVG_ICON.COLOR]: loadable(() => import("./Icons/Color"), {
    fallback: <Loader active inline />
  })
};
