const BanData = require('../models/ban');
const fs = require('fs');
const csvjson = require('csvjson');

exports.check = async(req,res)=>{
    // const data = await BanData.find();
    try{
        const ban = await BanData.find();
        var data = fs.readFileSync('D:\\network-traffic-analyzer\\controllers\\traffic data.csv', { encoding : 'utf8'});
        var options = {
            delimiter : ',', // optional
            quote     : '"' // optional
        };
        const TrafficData = csvjson.toObject(data, options);
        var BanIpList = []
        var suspectedData = []
        ban.forEach((dat)=>{
            BanIpList.push(dat.ip)
        })
        // console.log(BanIpList);
        TrafficData.forEach((Element)=>{
            if(BanIpList.includes(Element.Destination)){
                suspectedData.push(Element)
            }
        })
        // res.status(200).json({
        //     message: "Sucess!",
        //     suspectedData
        // })
        return res.render('showData',{
            message: "Data Fetched Sucessfully!",
            suspectedData
        });
    }
    catch(error)
    {
        console.log(error);
        // return res.status(500).json({
        //     message: "Server error!"
        // })
        return res.render('showData',{
            message: "Some error Occured!",
            suspectedData:[]
        });
    }
}