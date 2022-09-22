import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { ArrowForward } from "@mui/icons-material";

export type CardStatsVerticalProps = {
  title: string;
  stats: string;
  to: string;
};

const CardStats = (props: CardStatsVerticalProps) => {
  const { title, stats, to } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexWrap: "wrap",
        color: "whitesmoke",
        backgroundColor: "#6e37d6",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexWrap: "wrap",
            mb: 1.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ mr: 2 }}>
            {stats}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
          {title}
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <Link to={to} style={{ textDecoration: "none" }}>
            <IconButton
              size="small"
              aria-label="redirect"
              sx={{ color: "text.secondary" }}
            >
              <ArrowForward />
            </IconButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardStats;

CardStats.defaultProps = {
  color: "primary",
  trend: "positive",
};
