/* tipos de erros 
    2xx = sucesso
    4xx = erro no front-end
    5xx = erro no servidor
    
*/

import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient;
const app = express();

app.use(express.json());


app.get('/usuarios', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users);
});


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send("Usuario cadastrado com sucesso!");
});

app.put('/usuarios/:id', async (req,res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send("Usuario atualizado com sucesso!")
});

app.delete('/usuarios/:id', async (req,res) => {
    await prisma.user.delete({
        where: {
            id:req.params.id
        },
    })
    res.send("Usuario deletado com sucesso!");
});



app.listen(3000);


/*
user: enrico
senha: 5jC9lz1jQWwJEA6D
*/