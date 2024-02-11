import logo from "@/assets/logo.svg";
import CustomLink from "@/components/CustomLink";
import CONFIG from "@/configs";
import { BreakpointsContext } from "@/providers/BreakpointsProvider";
import CopyrightIcon from "@mui/icons-material/Copyright";
import EmailIcon from "@mui/icons-material/Email";
import { Box, BoxProps, Breadcrumbs, Divider, Grid, Link, Paper, Stack, Typography, styled } from "@mui/material";
import { useContext } from "react";

const navigatesList: { text: string; link: string; }[] = [
  {
    text: "Nature",
    link: "/nature",
  },
  {
    text: "Wild",
    link: "/wild",
  },
  {
    text: "Fire",
    link: "/fire",
  },
  {
    text: "Water",
    link: "/water",
  },
  {
    text: "Ice",
    link: "/ice",
  },
  {
    text: "Electricity",
    link: "/electricity",
  },
  {
    text: "Light",
    link: "/light",
  },
  {
    text: "Shadow",
    link: "/shadow",
  },
  {
    text: "Magic",
    link: "/magic",
  },
];

const Footer = styled((props: BoxProps) => {
  const { xs, smAndUp } = useContext(BreakpointsContext);
  const year = new Date().getFullYear();

  return (
    <Box {...props}>
      <Paper square>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack direction="row">
              <Box>
                <img src={logo} alt="logo" width={100} height={100} />
              </Box>
              <Box>
                <Typography className="title" variant="h5">About Us</Typography>
                <Typography variant="body1">
                  Lorem ipsum {CONFIG.APP_NAME} sit amet, consectetur adipiscing elit.<br />
                  Aliquam non euismod nibh, nec viverra lacus. Vivamus porta, elementum gravida lorem justo eget justo.<br />
                  Praesent maximus dui nec diam luctus, non dictum lectus cursus. Etiam vitae aliquet sapien.
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography className="title" variant="h5" textAlign={{ xs: "center", md: "start" }}>Navigates</Typography>
              </Grid>
              {smAndUp && <Grid item sm={6} />}
              <Grid item xs={12} sm={6}>
                <Stack alignItems={{ xs: "center", md: "flex-start" }}>
                  {navigatesList.slice(0, smAndUp ? (navigatesList.length / 2 + 1) : undefined).map(nav => <CustomLink key={nav.text} to={nav.link} underline="hover" variant="body1">{nav.text}</CustomLink>)}
                </Stack>
              </Grid>
              {smAndUp && <Grid item sm={6}>
                <Stack alignItems={{ xs: "center", md: "flex-start" }}>
                  {navigatesList.slice(navigatesList.length / 2 + 1).map(nav => <CustomLink key={nav.text} to={nav.link} underline="hover" variant="body1">{nav.text}</CustomLink>)}
                </Stack>
              </Grid>}
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Box className="legal-section" component="section">
          <Box flexGrow={1} />
          {smAndUp && <Breadcrumbs separator="•" aria-label="footer-breadcrumbs">
            <Typography className="copyright-text" variant="subtitle2">
              <CopyrightIcon />
              Copyright {year}, {window.location.host}
            </Typography>
            <CustomLink to="/privacy-policy" underline="hover" variant="subtitle2">Privacy Policy</CustomLink>
          </Breadcrumbs>}
          {xs && <Stack alignItems="center">
            <Typography className="copyright-text" variant="subtitle2" textAlign="center">
              <CopyrightIcon />
              Copyright {year}, {window.location.host}
            </Typography>
            <CustomLink to="/privacy-policy" underline="hover" variant="subtitle2">Privacy Policy</CustomLink>
          </Stack>}
          <Box flexGrow={1} />
          <Link href="mailto:handoiditu1508@gmail.com">
            <EmailIcon className="send-email-icon" fontSize="small" />
          </Link>
        </Box>
      </Paper>
    </Box>
  );
})(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.text.secondary,
  ">.MuiPaper-root": {
    boxShadow: "none",
    padding: theme.spacing(CONFIG.LAYOUT_PADDING),
    paddingTop: theme.spacing(2),
  },
  ".MuiDivider-root": {
    margin: theme.spacing(2, -CONFIG.LAYOUT_PADDING, 1),
  },
  ".MuiTypography-root": {
    color: theme.palette.text.secondary,
    "&.title": {
      color: theme.palette.text.primary,
    },
  },
  ".footer-content-section": {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  ".legal-section": {
    display: "flex",
    alignItems: "center",
  },
  ".copyright-text": {
    ".MuiSvgIcon-root": {
      marginRight: theme.spacing(0.5),
      fontSize: "inherit",
      verticalAlign: "middle",
    },
  },
  ul: {
    listStyleType: "none",
    padding: 0,
  },
}));
Footer.defaultProps = {
  component: "footer",
};

export default Footer;
