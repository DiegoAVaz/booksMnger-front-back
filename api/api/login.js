module.exports = (app) => {

    const auth = async (req, res) => {
        const { email, senha } = req.body;
            
        try {
          const user = await app
            .database('users')
            .select('*')
            .where({ email: email })
            .andWhere({ senha: senha })
            .first();

          console.log(user)
          
          if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
          }
      
          res.status(200).json({ user });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };

    return { auth }

}