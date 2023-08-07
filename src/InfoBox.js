import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

import "./infoBox.css";

function InfoBox({ title, cases, isRed, total, active, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infobox ${active && "infobox__selected"} ${
        isRed && "infobox__Red"
      }`}
    >
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox_cases">{cases}</h2>
        <Typography className="infoBox_total" color="textSecondary">
          {total} total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
