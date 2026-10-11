
const crypto = require("crypto");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Méthode non autorisée."
    });
  }

  if (process.env.MONCASH_MODE !== "sandbox") {
    return res.status(403).json({
      error: "Le mode Sandbox doit être activé."
    });
  }

  const clientId = process.env.MONCASH_CLIENT_ID;
  const clientSecret = process.env.MONCASH_CLIENT_SECRET;
  const amount = Number(process.env.MONCASH_TEST_AMOUNT_HTG);

  if (
    !clientId ||
    !clientSecret ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return res.status(500).json({
      error: "Configuration Sandbox incomplète."
    });
  }

  try {
    const apiBase =
      "https://sandbox.moncashbutton.digicelgroup.com/Api";

    const gatewayBase =
      "https://sandbox.moncashbutton.digicelgroup.com/Moncash-middleware";

    const credentials = Buffer
      .from(`${clientId}:${clientSecret}`)
      .toString("base64");

    const tokenResponse = await fetch(
      `${apiBase}/oauth/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          scope: "read,write",
          grant_type: "client_credentials"
        })
      }
    );

    if (!tokenResponse.ok) {
      return res.status(502).json({
        error: "Authentification MonCash Sandbox échouée."
      });
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(502).json({
        error: "Jeton MonCash absent."
      });
    }

    const orderId =
      `HDS-TEST-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    const paymentResponse = await fetch(
      `${apiBase}/v1/CreatePayment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount,
          orderId
        })
      }
    );

    if (!paymentResponse.ok) {
      return res.status(502).json({
        error: "Création du paiement Sandbox échouée."
      });
    }

    const paymentData = await paymentResponse.json();
    const paymentToken = paymentData.payment_token?.token;

    if (!paymentToken) {
      return res.status(502).json({
        error: "Jeton de paiement absent de la réponse."
      });
    }

    const redirectUrl = new URL(
      `${gatewayBase}/Payment/Redirect`
    );

    redirectUrl.searchParams.set("token", paymentToken);

    return res.status(200).json({
      mode: "sandbox",
      orderId,
      amount,
      currency: "HTG",
      redirectUrl: redirectUrl.toString(),
      notice: "Paiement de test uniquement."
    });
  } catch {
    return res.status(500).json({
      error: "Erreur technique lors de la demande de paiement."
    });
  }
};
