import * as React from "react";

export enum LoadingType {
  FULL_PAGE_LOADING,
  ROUTER_LOADING,
  LIST_LOADING
}

interface Props {
  loadingType?: LoadingType;
  title?: string;
}

const LoadingComponent = ({ loadingType, title }: Props) => {
  return <div className="d-flex flex-column flex-justify-center flex-item-center width-100 h-100">{"loading"}</div>;
};

export default LoadingComponent;
