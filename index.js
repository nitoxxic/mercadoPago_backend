import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference} from "mercadopago";
const client = new MercadoPagoConfig({ accessToken:'APP_USR-4021139532974623-101620-506707f7d313d1a8dcdb038bfedf91de-139642498'});

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Servidor onLine")
});

app.listen(port, () =>{
    console.log(`Servidor corriend en puerto ${port}`);
});

app.post("/create_preferences", async (req, res) =>{
    try{
    const body = {
        items:[ {

            title:req.body.title,
            quantity:Number(req.body.quantity),
            unit_price:Number(req.body.unit_price),
            currency_id: "ARS",
        }],
        back_urls:{
            success:"https://www.egarage.com.ar/success",
            failure:"https://www.egarage.com.ar/failure",
            pending:"https://www.egarage.com.ar/pending",

        },
        auto_return: "approved",
     };

     const preferences = new Preference(client);
     const result = await preferences.create({body});
     console.log(result);
     res.json({
        url:result.sandbox_init_point
     });
    }    catch(error){
        console.log(error)
    }
})
