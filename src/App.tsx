import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardContent, Dialog, DialogActions, DialogContent } from "@mui/material";
import { WhatsApp, LocationOn } from "@mui/icons-material";
import { GlobalStyles, palette } from "@mui/system";
import { db, doc, getDoc, updateDoc } from "./firebaseConfig";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import theme from "./styles/theme";

const ChaDeFraldas = () => {
  const whatsappLink = "https://wa.me/5537998709332?text=Olá! Quero confirmar presença no chá de fraldas!";
  const mapsLink = "https://maps.app.goo.gl/BmFpARzmiJpNTKyw7";

  const [tamanhoFralda, setTamanhoFralda] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [presenteConfirmado, setPresenteConfirmado] = useState(false);

  const marcasFraldas = [
    "/marcas/pampers.jpeg",
    "/marcas/huggies.jpeg",
    "/marcas/mamypoko.jpeg",
    "/marcas/personal.jpeg",
    "/marcas/babysec.jpeg",
  ];

  useEffect(() => {
    const fetchTamanhoFralda = async () => {
      const storedSize = localStorage.getItem("tamanhoFralda");
      const storedConfirmed = localStorage.getItem("presenteConfirmado");

      if (storedConfirmed === "true") {
        setPresenteConfirmado(true);
      }

      if (storedSize) {
        setTamanhoFralda(storedSize);
        return;
      }

      const fraldasRef = doc(db, "fraldas", "disponiveis");
      const fraldasSnap = await getDoc(fraldasRef);

      if (fraldasSnap.exists()) {
        const fraldas = fraldasSnap.data();
        const tamanhosDisponiveis = Object.keys(fraldas).filter(t => fraldas[t] > 0);

        if (tamanhosDisponiveis.length > 0) {
          const tamanhoSorteado = tamanhosDisponiveis[Math.floor(Math.random() * tamanhosDisponiveis.length)];
          setTamanhoFralda(tamanhoSorteado);
          localStorage.setItem("tamanhoFralda", tamanhoSorteado);

        }
      }
    };

    fetchTamanhoFralda();
  }, []);

  const handleConfirmarPresente = async () => {
    if (!tamanhoFralda || presenteConfirmado) return;

    const fraldasRef = doc(db, "fraldas", "disponiveis");
    const fraldasSnap = await getDoc(fraldasRef);

    if (fraldasSnap.exists()) {
      const fraldas = fraldasSnap.data();
      if (fraldas[tamanhoFralda] > 0) {
        await updateDoc(fraldasRef, {
          [tamanhoFralda]: fraldas[tamanhoFralda] - 1,
        });
        setPresenteConfirmado(true);
        localStorage.setItem("presenteConfirmado", "true"); 
      }
    }
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <>
      <GlobalStyles
        styles={{
          "*": { margin: 0, padding: 0, boxSizing: "border-box" },
          "html, body": { height: "100%", width: "100%", overflowX: "hidden" },
        }}
      />
      <Box
        sx={{
          position: "relative",
          backgroundImage: 'url("/fundo.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "black",
          textAlign: "center",
          padding: "20px",
          zIndex: 1,
          '@media (max-width: 600px)': {
            backgroundImage: 'url("/fundo-mobile.jpg")',
          }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#dab0a9",
            marginBottom: "250px",
            fontFamily: "'Brush Script Std', cursive",
            fontWeight: "normal",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
            textborder: "2px solid #dab0a9",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          Chá de bebê da Aurora
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
          <Card
            sx={{
              color: "#dab0a9",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
              height: 110,
              borderRadius: "50%",
              boxShadow: 3,
              cursor: "pointer",
            }}
            onClick={() => window.open(mapsLink, "_blank")}
          >
            <LocationOn sx={{ fontSize: "3rem", color: "#dab0a9" }} />
            <Typography variant="body2">Localização</Typography>
          </Card>

          <Card
            sx={{
              color: "#dab0a9",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
              height: 110,
              borderRadius: "50%",
              boxShadow: 3,
              cursor: "pointer",
            }}
            onClick={handleModalOpen}
          >
            <CardGiftcardIcon sx={{ fontSize: "3rem", color: "#dab0a9" }} />
            <Typography variant="body2">Sugestão de Presente</Typography>
          </Card>

          <Card
            sx={{
              color: "#dab0a9",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
              height: 110,
              borderRadius: "50%",
              boxShadow: 3,
              cursor: "pointer",
            }}
            onClick={() => window.open(whatsappLink, "_blank")}
          >
            <EventAvailableIcon sx={{ fontSize: "3rem", color: "#dab0a9" }} />
            <Typography variant="body2">Confirmar presença</Typography>
          </Card>
        </Box>
        
        <Card sx={{ marginTop: "20px", padding: "20px", textAlign: "center", boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#dab0a9" }}>
              Data e Horário do Evento
            </Typography>
            <Typography variant="body1">Sábado, 22 de Março de 2025</Typography>
            <Typography variant="body1">Às 18:00h</Typography>
        </Card>

        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogContent>
            {tamanhoFralda ? (
              <>
                <Typography variant="h6">Sugestão de Presente:</Typography>
                <Typography variant="h5" sx={{ color: "#dab0a9", fontWeight: "bold" }}>
                  Fralda tamanho {tamanhoFralda} + mimo da sua preferência
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", fontSize: "20px" }}>
                  Sugestões de marcas:
                </Typography>
                <Box sx={{ padding: "5px", display: "flex", justifyContent: "center", gap: "5px", marginTop: "10px" }}>
                  {marcasFraldas.map((src, index) => (
                    <img key={index} src={src} alt={`Marca ${index}`} style={{ width: 60, height: 60 }} />
                  ))}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                  {!presenteConfirmado ? (
                    <Button
                      onClick={handleConfirmarPresente}
                      variant="contained"
                      sx={{ backgroundColor: theme.palette.primary.main }}
                    >
                      Confirmar Presente
                    </Button>
                  ) : (
                    <Typography sx={{ color: "green", marginTop: "15px" }}>Presente confirmado!</Typography>
                  )}
                </Box>
              </>
            ) : (
              <Typography>Carregando sugestão...</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ChaDeFraldas;
