import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import multer from "multer";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "188080s" });
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .send({ error: "Usuario no autentificado o falta token." });
  }
  const token = authHeader.split(" ")[1]; 
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error)
      return res.status(403).send({ error: "Token invalido, no autorizado!" });
    req.user = credentials.user;
    next();
  });
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);

      if (user) {
        req.user = user;
      }
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user)
      return res.status(401).send("No autorizado:No se encuentra un User en el token");
    if (req.user.role !== role) {
      return res
        .status(403)
        .send("Acceso Prohibido: El usuario no tiene permisos con este rol.");
    }
    next();
  };
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log('Recibiendo archivo:', file.originalname);
    cb(null, Date.now() + '-' + file.originalname)
}
});

export const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
      if (file.mimetype.startsWith('image/')) {
          cb(null, true);
      } else {
          cb(new Error('No es un archivo de imagen'), false);
      }
  }
});

export default __dirname;