import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    // console.log("\n\ncheck Session = ", req.session.userId);
    
    if (!req.session.userId) {
        return res.status(401).json({msg: "Please log in to your account."})
    }

    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    // console.log("\n\ncheck User in verifyUser = ", user);
    if (!user) res.status(404).json({msg: "User doesn't exist"});

    req.userId = user.id;
    req.role = user.role;
    next();
}

export const verifyAdmin = async (req, res, next) => {

    const user = await Users.findOne({
        where: {
            uuid: req.session.userId,
        }
    });

    // console.log("\n\ncheck User in verifyAdmin = ", user);

    if (!user) res.status(404).json({msg: "User doesn't exist"});

    // console.log("\n\n Check User role = ", user.role);
    // console.log("\n\nuser.role !== 'admin' = ", user.role !== 'admin');

    if (user.role !== 'admin') {
        // console.log("Here");
        
        return res.status(403).json({msg: "User is not Admin"});
    }
    next();
}