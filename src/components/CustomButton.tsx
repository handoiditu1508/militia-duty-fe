import { Button, ButtonProps } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

type CustomButtonProps = Omit<LinkProps, keyof ButtonProps> & Omit<ButtonProps, "LinkComponent" | "href">;

const CustomButton = (props: CustomButtonProps) => <Button LinkComponent={Link} {...props} />;

export default CustomButton;
