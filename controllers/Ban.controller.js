const BanData = require('../models/ban');
const domainPing = require("domain-ping");
// 142.250.195.238

exports.Showpage = (req,res)=>{
    return res.render('adddata',{
        message: ""
    });
}
exports.AddData = async(req,res)=>{
    const { domain } = req.body;
    console.log(domain);
    try{
        var data; // Insert the domain you want to ping
        try{
            data = await domainPing(domain);
            console.log(data);
        }
        catch(error)
        {
            // return res.status(400).json({
            //     message: "Can't Add Data to db!"
            // })
            return res.render('adddata',{
                message: "Can't Add Data to db!"
            });
        }
        if(!data.ping)
        {
            // return res.status(400).json({
            //     message: "Can't Add Data to db!"
            // })
            return res.render('adddata',{
                message: "Can't Add Data to db!"
            });
        }
        await BanData.create(data);
        // return res.status(200).json({
        //     message: "Website added to ban list"
        // })
        return res.render('adddata',{
            message: "Website added to ban list"
        });
    }
    catch(error)
    {
        console.log(error);
        // return res.status(500).json({
        //     message: "Server error!"
        // })
        return res.render('adddata',{
            message: "Server error!"
        });
    }
}