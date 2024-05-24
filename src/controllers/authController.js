const { OAuth2Client } = require('google-auth-library');
const { User } = require('/models/user'); // Asegúrate de que esto apunte al modelo de Sequelize

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        // Asegúrate de que estos campos coincidan con los de tu modelo Sequelize User
        const { sub: googleId, email, given_name: firstName, family_name: lastName, picture: photoUrl } = payload;

        // Encuentra o crea el usuario en la base de datos
        const [user, created] = await User.findOrCreate({
            where: { googleId },
            defaults: {
                email,
                firstName,
                lastName,
                photoUrl
            }
        });

        // Devuelve la información del usuario
        res.status(200).json({
            message: 'Autenticación exitosa',
            user: { id: user.id, email, firstName, lastName, photoUrl }
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: 'Error en la autenticación',
            error: error.message
        });
    }
};
