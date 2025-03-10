import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardContent, Dialog, DialogActions, DialogContent } from "@mui/material";
import { WhatsApp, LocationOn } from "@mui/icons-material";
import { GlobalStyles } from "@mui/system";
import { db, doc, getDoc, updateDoc } from "./firebaseConfig";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ChaDeFraldas = () => {
  const whatsappLink = "https://wa.me/5537998709332?text=Olá! Quero confirmar presença no chá de fraldas!";
  const mapsLink = "https://maps.app.goo.gl/BmFpARzmiJpNTKyw7";

  const [tamanhoFralda, setTamanhoFralda] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchTamanhoFralda = async () => {
      const storedSize = localStorage.getItem("tamanhoFralda");
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

          await updateDoc(fraldasRef, {
            [tamanhoSorteado]: fraldas[tamanhoSorteado] - 1,
          });
        }
      }
    };

    fetchTamanhoFralda();
  }, []);

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
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)", 
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
              width: 120,
              height: 120,
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
              width: 120,
              height: 120,
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
              width: 120,
              height: 120,
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

        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogContent>
            {tamanhoFralda ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Sugestão de Presente:
                </Typography>
                <Typography variant="h5" color="#dab0a9" sx={{ fontWeight: "bold" }}>
                  Fralda tamanho {tamanhoFralda} + mimo da sua preferencia
                </Typography>
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
