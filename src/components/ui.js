// /** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
// import { css } from "@emotion/react";  // if you need the css prop

// import styled from "@emotion/styled";
import { space, layout, color, border, typography, flexbox } from "styled-system";

// A container for cards grid
export const Grid = styled("div")(
   {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: 16,
   },
   space,
   layout
);

// A card for each song
export const Card = styled("div")(
   {
      borderStyle: "solid",
      borderWidth: 1,
      backgroundColor: "background",
      //   width: "100%",
      boxSizing: "border-box",
   },
   color,
   border,
   space,
   layout,
   // to allow bg image props
   { backgroundImage: (props) => props.backgroundImage },
   { backgroundSize: (props) => props.backgroundSize || "cover" }
);

// A styled button
export const Button = styled("button")(
   {
      cursor: "pointer",
      border: "none",
      fontSize: 14,
   },
   space,
   color,
   border,
   typography
);

// A styled input
export const Input = styled("input")(
   {
      fontSize: 14,
      padding: 8,
      width: "90%",
      boxSizing: "border-box",
   },
   space,
   color,
   border,
   typography
);
