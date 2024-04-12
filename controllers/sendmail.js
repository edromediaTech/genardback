const fs = require('fs');
const formData = require('form-data');
const Mailgun = require('mailgun-js');

// Créez une instance de l'API Mailgun avec votre clé d'API et votre domaine
const apiKey = "95fc3841734510480f0eacc214f233ab-4c205c86-c8302cb9";
const domain = "https://api.mailgun.net/v3/upnch.univ.ht";
const mg = new Mailgun({apiKey: apiKey, domain: domain});

exports.sendEmailWithAttachment = async (req, res) => {
    const { from, to, subject, text } = req.body;

    // Créez une instance de formData pour la pièce jointe
    const attachment = new formData();
    attachment.append('attachment', fs.createReadStream("C:/Users/COL/Downloads/admLaval.pdf")); // Assurez-vous que le chemin d'accès est correct

    // Configurations du message
    const messageData = {
        from: from,
        to: to,
        subject: subject,
        text:text,
        attachment: attachment
    };

    try {
        // Utilisez la méthode messages.send pour envoyer l'e-mail
        mg.messages().send(messageData, function (error, body) {
            if (error) {
                console.log(error)
                res.status(500).send(error);
            } else {
                res.send(body);
            }
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error);
    }
};
