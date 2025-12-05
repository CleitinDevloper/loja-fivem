require("dotenv").config();
const express = require('express');
const path = require('path');
const axios = require("axios");
const crypto = require("crypto");
const { createClient } = require('@supabase/supabase-js');
const { stat } = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;

async function sendMessageToFivem(action, infos, userId, token) {
  try{
    const response = await axios.post(
      "http://181.214.221.132:8080/sendMessage",
      {
        action, infos, userId, token
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.message;
  }catch(e){
    return false
  };
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const products = {
    [1]: { id: 1, name: 'Gemas', category: 'gemas', price: 50, img: 'https://via.placeholder.com/300x200/000/00aaff?text=VIP+Pack' },
};

var pedidos = {}

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

function generateToken(size){
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_"

  var token = "";

  for (var i = 0; i < size; i++){
    const newChar = Math.floor(Math.random() * chars.length);

    token += chars[newChar];
  };

  return token;
};

async function iniciar(){
  const { data, error } = await supabase
    .from('pedidos')
    .select('*')

  data.map(pedido => {
    pedidos[pedido.id] = { token: pedido.token, status: pedido.status, price: pedido.price, cart: JSON.parse(pedido.cart), player_id: pedido.player_id }
  });
};

iniciar();

app.post('/api/webhook', async (req, res) => {
  try{
    const paymentId = req.body.data?.id;
    if (!paymentId) return res.sendStatus(400);

    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      }
    );

    const data = response.data;
    var newStatus = "";

    switch (data.status){
      case "approved":
        newStatus = "Pagamento Aprovado.";
        break;
      case "pending":
        newStatus = "Aguardando Pagamento.";
        break;
      default:
        newStatus = "Pagamento Cancelado.";
        break;
    };

    if (newStatus != pedidos[data.external_reference].status){
      const { error } = await supabase
        .from('pedidos')
        .update({
          status: newStatus
        })
        .eq('id', data.external_reference);

      if (newStatus == "Pagamento Aprovado."){
        await sendMessageToFivem('loja_buy', { cart: JSON.stringify(pedidos[data.external_reference].cart), id: pedidos[data.external_reference].player_id }, `${data.external_reference}`, "onda_2020")
      };
    };
  } catch(e){
    console.log(e)
  }
});

app.post('/api/checkonline', async (req, res) => {
  const result = await sendMessageToFivem('server_on', {}, "1092124363886690364", "onda_2020");

  return res.json({ status: result })
})

app.post('/api/checkout', async (req, res) => {
  const { id, email, cart } = req.body;

  try{
    var newPrice = 0

    for (const item of cart){
      if (products[item.id].price) {
        newPrice += products[item.id].price;
      };
    };

    const paymentID = generateToken(35);
    const idempotencyKey = crypto.randomUUID();

    const { data: supaData, error } = await supabase
      .from('pedidos')
      .insert({ token: paymentID, status: "Aguardando Pagamento", price: newPrice, cart: JSON.stringify(cart), player_id: id })
      .select();

    const orderID = supaData[0].id;

    if (orderID){
      const response = await axios.post(
        "https://api.mercadopago.com/v1/payments",
        {
          transaction_amount: parseFloat(newPrice),
          description: "Pagamento via PIX",
          payment_method_id: "pix",
          payer: { email: email },
          external_reference: orderID,
          notification_url: "https://ondabrava.discloud.app/api/webhook",
          installments: 1
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
            "x-idempotency-key": idempotencyKey
          }
        }
      );

      const data = response.data;

      const qrCodeBase64 = data.point_of_interaction?.transaction_data?.qr_code_base64;
      const qrCodeText = data.point_of_interaction?.transaction_data?.qr_code;

      return res.json({ status: true, order_id: orderID, order_status: "Aguardando Pagamento", base64: qrCodeBase64, copiaecola: qrCodeText })
    };
  } catch(e){
    console.log(e)
    return res.json({ status: false, message: "Infelismente obtivemos um erro ao gerar seu pagamento, tente novamente mais tarde." })
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});