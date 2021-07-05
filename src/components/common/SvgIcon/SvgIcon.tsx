import * as React from "react";
import { Icon } from "semantic-ui-react";
import { IconSizeProp } from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import classNames from "classnames";
import { CustomIconRef } from "./IconRef";

import "./SvgIcon.scss";

export enum SVGType {
  SEMANTIC = "SEMANTIC",
  CUSTOM = "CUSTOM"
}

export interface Props {
  svgType: SVGType;
  circular?: boolean;
  name: any;
  size?: IconSizeProp;
  baseClassName?: any;
}



const SvgIcon = (props: Props) => {
  const { circular, name, size, baseClassName } = props;
  const CustomIcon = CustomIconRef[name];
  return props.svgType === SVGType.SEMANTIC ? (
    <Icon
      circular={circular}
      name={name}
      size={size}
      className={baseClassName}
    />
  ) : (
    <div
      className={classNames(["custom-svg-icon", baseClassName, `${size}`], {
        circular: circular
      })}
    >
      {CustomIcon && <CustomIcon />}
    </div>
  );
};

export default SvgIcon;
