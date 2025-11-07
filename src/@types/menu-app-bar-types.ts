export type linkDatatype = {
    link: string;
    href: string;
  }[];
  
export type MenuAppBarProps = {
    linkData:linkDatatype,
    currentLink:string
}
