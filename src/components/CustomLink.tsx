import { Link, LinkProps, styled } from "@mui/material";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

export type CustomLinkProps = Omit<RouterLinkProps, keyof LinkProps> & Omit<LinkProps, "href" | "component"> & {
  disabled?: boolean;
}

const CustomLink = styled(({
  disabled,
  to,
  reloadDocument,
  replace,
  state,
  preventScrollReset,
  relative,
  unstable_viewTransition,
  ...props
}: CustomLinkProps) => {
  return (
    disabled ? <Link
      {...props}
      href={undefined}
      underline='none'
    /> : <Link
      component={RouterLink}
      to={to}
      reloadDocument={reloadDocument}
      replace={replace}
      state={state}
      preventScrollReset={preventScrollReset}
      relative={relative}
      unstable_viewTransition={unstable_viewTransition}
      {...props}
    />
  );
})(({ theme, disabled }) => ({
  ...(disabled && {
    "&, &:active": {
      color: theme.palette.text.disabled,
    },
  }),
}));

export default CustomLink;
