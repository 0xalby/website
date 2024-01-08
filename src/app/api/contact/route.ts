const email_env = {
  from_email: process.env.FROM_EMAIL,
  from_email_password: process.env.FROM_EMAIL_PASSWORD,
  to_email: process.env.TO_EMAIL,
};

export async function POST(request: Request) {
  if (
    !email_env.from_email ||
    !email_env.from_email_password ||
    !email_env.to_email
  )
    return Response.json({ error: "Internal Server Error" }, { status: 500 });

  const json = await request.json();
  const { name, email, body } = json;

  if (name == "")
    return Response.json({ error: "Empty Name" }, { status: 401 });
  if (body == "")
    return Response.json({ error: "Empty Body" }, { status: 401 });

  const emailregex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const validEmail = emailregex.test(email);

  if (!validEmail)
    return Response.json({ error: "Invalid Email" }, { status: 401 });

  let nodemailer = require("nodemailer");

  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "mail.privateemail.com",
      auth: {
        user: email_env.from_email,
        pass: email_env.from_email_password,
      },
      secure: true,
    });

    const data = {
      from: `${name} <${email_env.from_email}>`,
      to: email_env.to_email,
      subject: `Software inquiry: ${name} | ${email}`,
      text: body,
      html: `<div>
      <p>${body}</p>
      <hr />
      <h3>${name}</h3>
      <p>${email}</p>
    </div>`,
    };

    await transporter.sendMail(data);
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Failed to contact" }, { status: 500 });
  }

  return Response.json({ error: "Success" }, { status: 200 });
}
