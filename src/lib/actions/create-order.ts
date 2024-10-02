"use server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import products from "../../../public/products/products.json";
import nodemailer from "nodemailer";
import deliveryPrices from "../../../public/products/delivery-price.json";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function createOrder(formData: FormData, cart: Array<any>) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.RECEIVER_EMAIL,
      pass: process.env.RECEIVER_PASS,
    },
  });

  let htmlBody = `<b>Zamówienie:</b><br/>
    Imię: ${formData.get("first-name")}<br/>
    Nazwisko: ${formData.get("last-name")}<br/>
    Email: ${formData.get("email")}<br/>
    Numer telefonu: ${formData.get("phone-number")}<br/>
    Adres: ${formData.get("place")}, ${formData.get("street")} ${formData.get(
    "building-number"
  )}, ${formData.get("postal-code")}<br/>
    <b>Przedmioty:</b><br/>
    <ol>
    ${cart.map((i) => {
      let product = products[products.map((i) => i.id).indexOf(i.productId)];
      return `<li>Nazwa: "${product.name}" - Rozmiar:${i.size} - Sztuk:${i.amount}</li>`;
    })}
    </ol>
    <p><b>Cena: ${(
      cart.map((i) => i.price * i.amount).reduce((total, sum) => total + sum) /
      100
    ).toFixed(2)} zł</b></p>
    `;

  await transporter.sendMail({
    from: formData.get("email")?.toString(),
    to: process.env.RECEIVER_EMAIL,
    subject: "Zamówienie",
    html: htmlBody,
  });

  if (formData.get("delivery") === "Kurier") {
    var items = [
      ...cart.map((item: any, index: number) => {
        let product =
          products[products.map((i) => i.id).indexOf(item.productId)];
        return {
          price_data: {
            currency: "pln",
            product_data: {
              name: `${product.name} | Rozmiar:${item.size}`,
            },
            unit_amount: item.price,
          },
          quantity: item.amount,
        };
      }),
    ];

    let delivery = {
      price_data: {
        currency: "pln",
        product_data: {
          name: "Dostawa na adres",
        },
        unit_amount: deliveryPrices.kurierZwykły,
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [...items, delivery],
      mode: "payment",
      success_url: `${
        process.env.NODE_ENV === "production"
          ? process.env.SERVER_URL
          : "http://localhost:3000"
      }/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.NODE_ENV === "production"
          ? process.env.SERVER_URL
          : "http://localhost:3000"
      }/canceled`,
    });
    redirect(session.url!);
  } else {
    redirect("/success");
  }
}

export default createOrder;
