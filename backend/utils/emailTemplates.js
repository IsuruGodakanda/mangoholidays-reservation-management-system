export const reservationConfirmationEmailTemplate = (refNo) => {
  return {
    to: process.env.EMAIL_FROM,
    from: {
      name: 'Mangoholidays',
      email: process.env.EMAIL_FROM
    },
    subject: 'Place order',
    text: 'Order',
    html: `<div style="padding: 0; margin: 0; font-family: 'Open Sans', sans-serif;">
                    <div style="max-width:600px; margin:0 auto">
                        <div style="background-color:#ffffff;padding:30px">
                            <div style="margin:40px 0;text-align:center">
                                <h1>Mangoholidays</h1>
                            </div>
                            <div style="text-align:center">
                                <p style="font-size:44px;font-weight:700;letter-spacing:0.51px;color:#630059;line-height:44px;margin-bottom:10px">
                                    Welcome to Mangoholidays!
                                </p>
                                <p style="font-size:22px;font-weight:500;letter-spacing:0.41px;color:#404a46;margin-bottom:40px">
                                    Reservation Details
                                </p>
                            </div>
                            <div style="text-align:center;margin:15px 0 20px 0;font-size:22px;letter-spacing:0.41px">
                                Ref-${refNo}
                            </div>
                        </div>
                    </div>
                </div>`
  };
};
