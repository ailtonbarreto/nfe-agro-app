import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const ASAAS_API = "https://www.asaas.com/api/v3";
const ASAAS_KEY = process.env.ASAAS_KEY;

// Função auxiliar para criar cobrança
async function criarCobranca(valor, descricao) {
  const response = await axios.post(
    `${ASAAS_API}/payments`,
    {
      customer: process.env.ASAAS_CUSTOMER_ID, // ID do cliente no Asaas
      value: valor,
      billingType: "PIX",
      description: descricao
    },
    {
      headers: {
        access_token: ASAAS_KEY
      }
    }
  );

  return response.data.invoiceUrl;
}

// Endpoint do Plano A (20 reais)
app.post("/pagamento/plano-a", async (req, res) => {
  try {
    const url = await criarCobranca(20, "Plano A - Assinatura");
    res.json({ paymentUrl: url });
  } catch (error) {
    res.status(500).json({ erro: "Falha ao gerar pagamento" });
  }
});

// Endpoint do Plano B (50 reais)
app.post("/pagamento/plano-b", async (req, res) => {
  try {
    const url = await criarCobranca(50, "Plano B - Assinatura");
    res.json({ paymentUrl: url });
  } catch (error) {
    res.status(500).json({ erro: "Falha ao gerar pagamento" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

