import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try{
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            message : 'Anda tidak memiliki izin. Silakan login kembali untuk melanjutkan.',
        });
    }
    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json ({
            message: 'Format token salah atau token tidak ditemukan.',
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;
    next();


    }catch(error){
if (error.name === 'TokenExpiredError'){
    return res.status(401).json({
        message: 'Sesi anda telah berakhir (token expired). silahkan login kembali.',
    });
}

return res.status(403).json({
    message: 'Token tidak valid atau telah di ubah.',
})
    }
    

};