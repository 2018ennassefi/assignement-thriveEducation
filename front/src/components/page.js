import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "../SVG/material-01.svg";
import { ReactComponent as Logo2 } from "../SVG/material-02.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";
const firstUpper = (str) => {
  return str[0].toUpperCase() + str.substring(1, str.length);
};
const addIcons = (str) => {
  if (str) {
    const words = str.split(" ");
    const icons = {
      javascript:
        "<img  width=15 height=15 src=https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/187_Js_logo_logos-512.png alt='Logo' />",
      python:
        "<img width=30 height=30  src=https://cdn.worldvectorlogo.com/logos/python-3.svg alt='Logo' />",
      docker:
        "<img width=15 height=15 src=https://cdn4.iconfinder.com/data/icons/vector-brand-logos/40/Docker-512.png alt='Logo' />",
      sql:
        "<img width=15 height=15 src=https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png alt='Logo' />",
      "vue.js":
        "<img width=15 height=15 src=data:image/png;base64,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 alt='Logo' />",
      aws:
        "<img width=15 height=15 src=https://www.idebil.com/wp-content/uploads/2020/02/aws_logo.png alt='Logo' />",
      security:
        "<img width=15 height=15 src=https://icons-for-free.com/iconfiles/png/512/lock+password+protect+safety+security+icon-1320086045132546966.png alt='Logo' />",
    };
    const keywords = [
      "Javascript",
      "Python",
      "Docker",
      "SQL",
      "Vue.js",
      "AWS",
      "Security",
    ];
    for (var i = 0; i < words.length; i++) {
      let treatedWord = words[i].replace(",", "");
      if (keywords.includes(treatedWord)) {
        if (words[i] === "Security") {
          words[i] = treatedWord + " " + icons[treatedWord.toLowerCase()] + ".";
        } else {
          words[i] = treatedWord + " " + icons[treatedWord.toLowerCase()] + ",";
        }
      }
    }
    return words.join(" ");
  }
};
const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: grey[800],
    "&:hover": {
      backgroundColor: grey[800],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar", "Access-Control-Allow-Origin": "*" },
});

function Page() {
  // Declare a new state variable, which we'll call "count"
  const content = [
    "introduction",
    "role",
    "profile",
    "location",
    "interested",
    "credentials",
    "weblink",
    "linkedin",
    "quote",
  ];
  const [data, setData] = useState({});
  const classes = useStyles();
  const icons = {
    role:
      "<img width=15 height=15 src='https://image.flaticon.com/icons/svg/25/25442.svg' alt='role' />",
    profile:
      "<img width=15 height=15 src='https://www.pngitem.com/pimgs/m/256-2560208_person-icon-black-png-transparent-png.png' alt='profile' />",
    location:
      "<img width=15 height=15 src='https://cdn1.iconfinder.com/data/icons/user-interface-89/50/General_Icons_Marker-512.png' alt='location' />",
    interested:
      "<img width=15 height=15 src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiJxTtZa3tsK_B57tl4EDOfGUiytJduslIkdxYocWwZZllipst&usqp=CAU' alt='Logo' />",
    weblink:
      "<img width=15 height=15 src='https://cdn1.iconfinder.com/data/icons/web-develover-1/32/web-512.png' alt='web' />",
    linkedin:
      "<img width=15 height=15 src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAAAD///9MTEz8/PyTk5PNzc339/c4ODjo6OhPT0+MjIzu7u6xsbERERGnp6fy8vIiIiLe3t6fn58+Pj5GRkaBgYF6enpfX1/R0dG6urqPj4/X19eZmZlmZmZZWVlkZGQuLi4xMTEZGRlycnK3t7fExMQnJycdHR0+1Fr0AAAFB0lEQVR4nO2daXeqMBCGQW8RcEG02kXa2lbo//+H17WKLJPKjFnO+3wup/Mck5BkksHzrwhHcTQdezYynkbxKLwW8sp62UB3mJ0ZZGGjYRDrjo6JOKg3nOgOjJFJjWES6Y6KlSi5NkwL3TExU6RlwwfdAQnwcGmY6o5GhPRsmLjWRA8Uya+hW4PMmehk6NJroszkYBjojkOQYG/oykymjnhnGOqOQpRwa5jpDkKUbGto/2qijYHvud1It83UG+kOQZiR5/JIuiP2XJ3PnIi8qe4QhJl6dm46qeO6HwAAACBB722ZbWaLt3fdgcjwcZG6GuZL3eGwsxxeJeb6bu0OPFUyjy6l47bMavycynfkDYK+H651x8ZCXQv9xYWdrOZfcD+q6g6vO0198MSz7gC78kQI+v5Md4gdae2EB+xOPy5pQf9Fd5CduJ7J1PKpO8oOfKgIWt0TR0qGNic/FMaZHXPdcd5MT03QX+gO9GbeFA3tPeyg8q7YkesO9GYyRUN7D1VtnDekZt32Gy4UDe3th+6Ppe+Khq+6A70dpYm371u8Q9y+g3Ei0R1mB9Re+VYfyuk73kjVZjUr3UF2I6ANe7pj7EZMCtr7uj/yQAgOv3RH2Blinf+oO77urFsFv3WHx8GgZWbjhOCW56Y+6EATPVK/UMztH2TOFC8Vv5Xl78EKn7PLQTUZWT1Va2K+mORpmuaTVyf1AAAAAAAAAACA+zL+Wc/n6+JHdxwyPC436anGU/j8Ejt2E3s+q+6vDx8Wwnd5e36/Hf9f/YMB9dz1ZY1lWtE70M+fZA0pGgzJ3GrZcNF6ZCAUvGZ1H8PKraqqo9j5x3sY/lAZvD0roVOsdzCkk7BHZA4myRtW8wWNpBJn5qUN100jaC2BQDZP2PBR4SRECf47j7KGc6XzOiXYO6Oo4effBflPYEka/iTU39TC/CtKGiq9Bmvg7YtyhvnrjYLM5yPkDIe3dMIDAed7Uc6wC5xH58005BxtDDVkvENuqiHfoVZTDX22NbGxhmzXOo01ZPsRzTXk+hHNNfSZduAMNmQ6YH43w2G6SsO/PWSTYf5d7He2p++bPyz6eTYY72DYL1cs+Fa8TsbVTOUNN5UqsZniszw3ysQN65papLj4ZznmKmzYrw/yS62YA8tiX9iwMT+o1Bk35hs2j4aPKs+zLDBEDdtq96jcI2eZuEka9ltT9Qrb/QFHASdJw/bKiyqFVThW+oKGAXHlZkUbcqQUBQ2pKYlCXpHj3pWgIbWELWhDjotJgobkKRK6mRpuSP7vpkuBthjSNSXp/LfZhnRJSboYgNmGdAHbfzCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEoYBhRP6Xhpug5HP0NWX6VhBHqehx1GsnWtc/SDzWi+j7n2vyfwuXiQYAAAAAAPfC9Ynd2KtUEnOMqefYl2oqRB5/IX6ziD3uIvWmMfLYatUaSugxVo02kYHvEfW2bCfbGrrdTMOtocBnTcwh9neGge4wBAn2hkJfUTKBiX8wZNlWNZH9ZvbeMOGor2geRfJryPo9DHM41M48ZhfoJIl9HD/Tc8qfpK411OJU/fQ3Q5S4Ndyci0lf5MBcemlMzlqXWb7AldlNfFm4vpzHDDP7VxqDrFwKvJKpDUdxNLVze2o8jeJRpdL5f2YjU4xtkVEnAAAAAElFTkSuQmCC' alt='linkedin' />",
  };
  const init = async () => {
    try {
      let content = await instance.get("/getData");
      setData(content.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Grid container style={{ alignContent: "center" }}>
        <Logo />
        <div item style={{ float: "left", alignContent: "center", top: "50%" }}>
          <ColorButton
            variant="contained"
            color="primary"
            style={{ marginTop: "40%" }}
            className={classes.margin}
          >
            <AccountCircleIcon></AccountCircleIcon>
            FULL-STACK ENGINEER
          </ColorButton>
        </div>
      </Grid>
      <Container
        align="justify"
        maxWidth="m"
        style={{ marginLeft: "3%", marginRight: "3%", maxWidth: "94%" }}
      >
        <hr></hr>
        <br />
        {content.map((content) => {
          var fullText;
          if (content === "credentials" || content === "introduction") {
            fullText = "<p>" + data[content] + "</p";
          } else if (content === "profile") {
            fullText =
              "<p><b>" +
              icons[content] +
              " " +
              firstUpper(content) +
              ":</b> " +
              addIcons(data[content]) +
              "</p>";
          } else if (content === "weblink" || content === "linkedin") {
            var startTag = content === "weblink" ? "<br>" : "";
            var endTag = content === "linkedin" ? "  <br> " : "";
            fullText = `${startTag}<div style='padding-left: 10%'>${icons[content]} ${data[content]}</div>${endTag}`;
          } else if (content !== "quote") {
            fullText =
              "<p><b>" +
              icons[content] +
              " " +
              firstUpper(content) +
              ":</b> " +
              data[content] +
              "</p>";
          }
          const text = { __html: fullText };
          return content === "linkedin" || content === "weblink" ? (
            <span
              style={{ paddingLeft: "10%", color: "#6d6d6d" }}
              dangerouslySetInnerHTML={text}
            ></span>
          ) : (
            <span
              style={{ align: "justify", color: "#6d6d6d" }}
              dangerouslySetInnerHTML={text}
            ></span>
          );
        })}

        <div
          style={{
            position: "absolute",
            paddingLeft: "5%",
            marginLeft: "4%",
            marginRight: "4%",
            marginBottom: "10%",
            display: "grid",
            gridTemplateColumns: "auto auto",
          }}
        >
          <span
            style={{
              display: "inline",
              verticalAlign: "top",
              color: "#6d6d6d",
            }}
            dangerouslySetInnerHTML={{ __html: data["quote"] }}
          ></span>
          <Logo2
            style={{
              alignItems: "center",
              justifyContent: "center",
              float: "right",
              display: "inline-block",
            }}
          />
        </div>
      </Container>
    </div>
  );
}
export default Page;
