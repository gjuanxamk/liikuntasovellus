import {
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Paper,
  LinearProgress,
  Box,
} from "@mui/material";
import { Link } from "react-router";
import { useState } from "react";
import gymi from "../assets/gymi.jpg";

function Aloitus() {
  const [list, setList] = useState(() => {
    try {
      const stored = localStorage.getItem("list");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const progress = (list.length / 15) * 100;

  const remove = (id: string) => {
    const updated = list.filter((item: any) => item.id !== id);
    setList(updated);
    localStorage.setItem("list", JSON.stringify(updated));
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Liikuntasovellus
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Etusivu
          </Button>

          <Button color="inherit" component={Link} to="/lisaa">
            Lisää urheilusuoritus
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e0f7fa, #f3e5f5)",
          py: 3,
        }}
      >
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
            Arkiliikunnan seuranta
          </Typography>

        <Box
        component="img"
            src={gymi}
            alt="gymi"
            sx={{
            width:"100%",
            maxWidth: 800,
            height: "auto",
            display: "block",
            margin: "20px auto",
            borderRadius: 2,
            }}
          />

          <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
            Kirjaa tähän kaikki urheilusuoritukset kuukauden ajalta.
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography>Kuukausitavoite</Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>

          <ul>
            {list.map((item: any) => (
              <Card key={item.id} sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6">{item.sport}</Typography>

                  <Typography>Kesto: {item.duration}</Typography>

                  <Typography>Aika: {item.time}</Typography>

                  <Button onClick={() => remove(item.id)} color="error">
                    Poista
                  </Button>
                </CardContent>
              </Card>
            ))}
          </ul>

          <Typography variant="h6">Suorituksia yhteensä</Typography>

          <Typography variant="h4">{list.length}</Typography>

          <Button
            component={Link}
            to="/lisaa"
            variant="contained"
            color="primary"
          >
            Lisää urheilusuoritus
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default Aloitus;
