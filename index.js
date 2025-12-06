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
    [1]:  { id: 1,  name: 'Casa no Condomínio', desc: "", category: 'Propriedades', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Condomínio', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [2]:  { id: 2,  name: 'Facs VIPs', desc: "Facs VIPs", category: 'Facs', price: 299.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Facs+VIPs', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [3]:  { id: 3,  name: 'Mansões', desc: "", category: 'Propriedades', price: 399.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Mansões', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [4]:  { id: 4,  name: 'Vale Casa VIP', desc: "", category: 'Propriedades', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Vale+Casa+VIP', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [5]:  { id: 5,  name: 'Vale Garagem', desc: "", category: 'Propriedades', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Vale+Garagem', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [6]:  { id: 6,  name: 'Vale Casa + Vale Garagem', desc: "", category: 'Propriedades', price: 129.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Vale+Casa+Garagem', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [7]:  { id: 7,  name: 'Kit Blips', desc: "Barbearia, tattoo e roupas", category: 'Personalização', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Kit+Blips', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [8]:  { id: 8,  name: 'Troca ID 2 dig', desc: "", category: 'Personalização', price: 149.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Troca+ID+2+dig', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [9]:  { id: 9,  name: 'Troca ID 3 dig', desc: "", category: 'Personalização', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Troca+ID+3+dig', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [10]: { id: 10, name: 'Skin Cocudo Existente', desc: "", category: 'Personalização', price: 19.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Skin+Cocudo', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [11]: { id: 11, name: 'Skin Cocudo Nova', desc: "", category: 'Personalização', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Skin+Cocudo+Nova', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [12]: { id: 12, name: 'Rem Adv Verbal', desc: "", category: 'Punições', price: 29.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rem+Adv+Verbal', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [13]: { id: 13, name: 'Rem Adv 1', desc: "", category: 'Punições', price: 59.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rem+Adv+1', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [14]: { id: 14, name: 'Rem Adv 2', desc: "", category: 'Punições', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rem+Adv+2', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [15]: { id: 15, name: 'Rem Adv 3 / Desban', desc: "", category: 'Punições', price: 199.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rem+Adv+3+Desban', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [16]: { id: 16, name: 'Remover Prisão', desc: "", category: 'Punições', price: 9.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Remover+Prisão', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [17]: { id: 17, name: 'Cirurgia', desc: "", category: 'Personalização', price: 9.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Cirurgia', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [18]: { id: 18, name: 'Blips Arena PVP', desc: "", category: 'Personalização', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Blips+Arena+PVP', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [19]: { id: 19, name: 'Aumentar +2.000kg Baú', desc: "", category: 'Facs', price: 59.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Aumentar+Baú+2k', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [20]: { id: 20, name: 'Aumentar +4.000kg Baú', desc: "", category: 'Facs', price: 109.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Aumentar+Baú+4k', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [21]: { id: 21, name: 'Adição 1 Roupa Masc/Fem', desc: "", category: 'Personalização', price: 59.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Roupa+Masc+Fem', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [22]: { id: 22, name: 'Roupa Pack Masc + Fem', desc: "", category: 'Personalização', price: 109.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Roupa+Pack', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [23]: { id: 23, name: 'Carro Bau Fac M', desc: "", category: 'Facs', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Carro+Bau+Fac+M', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [24]: { id: 24, name: 'Carro Bau Fac G', desc: "", category: 'Facs', price: 299.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Carro+Bau+Fac+G', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [25]: { id: 25, name: 'Rádio Privada', desc: "", category: 'Personalização', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rádio+Privada', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [26]: { id: 26, name: 'VIP Fac', desc: "", category: 'Facs', price: 399.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=VIP+Fac', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    [27]: { id: 27, name: 'Outro Personagem', desc: "", category: 'Personalização', price: 199.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Outro+Personagem', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A","Carro B","Carro C","Carro D"] }},
    
    // VIPs
    [28]: { id: 28, name: 'VIP Bronze', desc: "Tag Discord | Dinheiro | Salário | Onda Coins", category: 'VIP', price: 29.99, img: 'https://via.placeholder.com/300x200/b8860b/000000?text=VIP+Bronze', obs: { enabled: false, max: 0, title: "", options: [] }},
    [29]: { id: 29, name: 'VIP Prata', desc: "Tag Discord | Dinheiro | Salário | Onda Coins", category: 'VIP', price: 69.99, img: 'https://via.placeholder.com/300x200/C0C0C0/000000?text=VIP+Prata', obs: { enabled: false, max: 0, title: "", options: [] }},
    [30]: { id: 30, name: 'VIP Ouro', desc: "Tag Discord | Dinheiro | Salário | Onda Coins | /som | RGB", category: 'VIP', price: 129.99, img: 'https://via.placeholder.com/300x200/FFD700/000000?text=VIP+Ouro', obs: { enabled: true, max: 1, title: "Selecione 1 carro (opções: 2)", options: ["Carro Opção A","Carro Opção B"] }},
    [31]: { id: 31, name: 'VIP Platina', desc: "Tag Discord | Dinheiro | Salário | Onda Coins | /som | RGB | Câmeras | FixVIP", category: 'VIP', price: 199.99, img: 'https://via.placeholder.com/300x200/E5E4E2/000000?text=VIP+Platina', obs: { enabled: true, max: 1, title: "Selecione 1 carro (opções: 5)", options: ["Carro Opção 1","Carro Opção 2","Carro Opção 3","Carro Opção 4","Carro Opção 5"] }},
    [32]: { id: 32, name: 'VIP Onda Brava', desc: "Tag Discord | Dinheiro | Salário | Onda Coins | /som | RGB | Câmeras | FixVIP | Vale Casa", category: 'VIP', price: 499.90, img: 'https://via.placeholder.com/300x200/000080/FFFFFF?text=VIP+Onda+Brava', obs: { enabled: true, max: 2, title: "Selecione 2 carros (opções: 10)", options: ["Carro OB 1","Carro OB 2","Carro OB 3","Carro OB 4","Carro OB 5","Carro OB 6","Carro OB 7","Carro OB 8","Carro OB 9","Carro OB 10"] }},
    [33]: { id: 33, name: 'VIP Supremo Onda Brava', desc: "Tag Discord | Dinheiro | Salário | Onda Coins | /som | RGB | Câmeras | FixVIP | Tratamento VIP HP | Vale Casa | Vale Garagem", category: 'VIP', price: 699.90, img: 'https://via.placeholder.com/300x200/800080/FFFFFF?text=VIP+Supremo', obs: { enabled: true, max: 2, title: "Selecione 2 carros (opções: 20)", options: ["Carro S 1","Carro S 2","Carro S 3","Carro S 4","Carro S 5","Carro S 6","Carro S 7","Carro S 8","Carro S 9","Carro S 10","Carro S 11","Carro S 12","Carro S 13","Carro S 14","Carro S 15","Carro S 16","Carro S 17","Carro S 18","Carro S 19","Carro S 20"] }}
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

app.post('/api/getstatus', async (req, res) => {
  const { id } = req.body;

  try{

    const { data: supaData, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq({ id: id })

    if (supaData[0].id_mp){
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${supaData[0].id_mp}`,
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

      return res.json({ status: newStatus || pedidos[id].status })
    }

    return res.json({ status: false, message: "Erro inesperado." })
  } catch(e){
    console.log(e)
  }
})

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
      pedidos[data.external_reference].status = newStatus

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
      .insert({ token: paymentID, status: "Aguardando Pagamento", price: newPrice, cart: JSON.stringify(cart), player_id: id, id_mp: 0 })
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

      const id_mp = data.id;

      const qrCodeBase64 = data.point_of_interaction?.transaction_data?.qr_code_base64;
      const qrCodeText = data.point_of_interaction?.transaction_data?.qr_code;

      pedidos[orderID] = { token: paymentID, status: "Aguardando Pagamento", price: newPrice, cart: cart, player_id: id, id_mp: id_mp }

      const { data: supaData, error } = await supabase
        .from('pedidos')
        .update({ id_mp: id_mp })
        .eq({ token: paymentID })

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